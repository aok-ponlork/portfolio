import { jwtVerify } from "jose";

export async function onRequestGet(context) {
  const token = new URL(context.request.url).searchParams.get("token");
  if (!token) {
    return new Response("Missing or invalid token", { status: 401 });
  }
  try {
    const secret = new TextEncoder().encode(context.env.secret);
    const { payload } = await jwtVerify(token, secret);

    const imagePath = payload.image;
    if (!imagePath) {
      return new Response("No image path in token", { status: 400 });
    }

    // Get image from R2
    const object = await context.env["personal-data"].get(imagePath);
    if (!object || !object.body) {
      return new Response("Image not found", { status: 404 });
    }

    // Send image as response
    return new Response(object.body, {
      headers: {
        "Content-Type": object.httpMetadata?.contentType || "image/webp",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return new Response("Invalid or expired token", { status: 403 });
  }
}
