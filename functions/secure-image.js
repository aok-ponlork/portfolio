import { jwtVerify } from "jose";

export async function onRequestGet(context) {
  const token = new URL(context.request.url).searchParams.get("token");
  if (!token) {
    return new Response("Missing or invalid token", { status: 401 });
  }
  try {
    const secret = new TextEncoder().encode(context.env.secret);
    // Verify JWT token
    const { payload } = await jwtVerify(token, secret);

    // If successful, return the image
    return new Response(`Access granted to image: ${payload.image}`, {
      status: 200,
    });
  } catch (err) {
    return new Response("Invalid or expired token", { status: 403 });
  }
}
