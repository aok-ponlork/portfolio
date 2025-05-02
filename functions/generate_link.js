import { SignJWT } from "jose";

export async function onRequestGet(context) {
  const secret = new TextEncoder().encode(context.env.secret);

  // Payload containing the image path and expiration time
  const payload = {
    image: "me.webp", // Adjust with your actual image path
    exp: Math.floor(Date.now() / 1000) + 3600 * 24, // 1 day expiration
  };

  // Create JWT token with the payload and sign it
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);

  // Respond with the JWT token and a message
  return new Response(`Generated Token:\n${token}`, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}
