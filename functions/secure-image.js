import { jwtVerify } from "jose";

export async function onRequestGet(context) {
  const token = new URL(context.request.url).searchParams.get("token");
  if (!token) return new Response("Missing token", { status: 401 });

  try {
    const secret = new TextEncoder().encode(context.env.secret);
    const { payload } = await jwtVerify(token, secret);

    // Get R2 binding with (personal_data)
    const object = await context.env.personal_data.get(payload.image);
    console.log(object);
    if (!object) return new Response("Image not found", { status: 404 });

    return new Response(object.body, {
      headers: {
        "Content-Type": object.httpMetadata?.contentType || "image/webp",
      },
    });
  } catch (err) {
    return new Response("Invalid or expired token", { status: 403 });
  }
}
