import { jwtVerify } from "jose";

export async function onRequestGet(context) {
  const token = new URL(context.request.url).searchParams.get("token");
  if (!token) {
    return new Response("Missing token", {
      status: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  try {
    const secret = new TextEncoder().encode(context.env.secret);
    const { payload } = await jwtVerify(token, secret);

    if (!payload?.images || !Array.isArray(payload.images)) {
      return new Response("Invalid token payload", { status: 400 });
    }

    const imageNames = payload.images;

    const images = await Promise.all(
      imageNames.map(async (name) => {
        try {
          const object = await context.env.personal_data.get(name);
          if (!object) return null;

          const arrayBuffer = await object.arrayBuffer();
          const base64 = btoa(
            new Uint8Array(arrayBuffer).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const contentType = object.httpMetadata?.contentType || "image/webp";
          return {
            name,
            data: `data:${contentType};base64,${base64}`,
          };
        } catch (error) {
          console.error(`Error processing image ${name}:`, error);
          return null;
        }
      })
    );

    const validImages = images.filter(Boolean);

    return new Response(JSON.stringify({ images: validImages }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return new Response(
      `Invalid or expired token. ${err.message ?? ""}`,
      {
        status: 403,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "*",
        },
      }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}
