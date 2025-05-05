import { jwtVerify } from "jose";

export async function onRequestGet(context) {
  const token = new URL(context.request.url).searchParams.get("token");
  if (!token) return new Response("Missing token", { status: 401 });

  try {
    const secret = new TextEncoder().encode(context.env.secret);
    const { payload } = await jwtVerify(token, secret);

    const imageNames = payload.images;

    const images = await Promise.all(
      imageNames.map(async (name) => {
        const object = await context.env.personal_data.get(name);
        if (!object) return null;
        const buffer = object.body;
        const contentType = object.httpMetadata?.contentType || "image/webp";
        return {
          name,
          data: `data:${contentType};base64,${buffer}`,
        };
      })
    );

    const validImages = images.filter(Boolean);

    return new Response(JSON.stringify({ images: validImages }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return new Response(
      `Invalid or expired token, Message ${err.message ?? ""}`,
      {
        status: 403,
      }
    );
  }
}
