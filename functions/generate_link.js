import { SignJWT } from "jose";

export async function onRequestGet(context) {
  const apiKey = context.request.headers.get("Authorization");

  if (!apiKey || apiKey !== `Bearer ${context.env.key}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const secret = new TextEncoder().encode(context.env.secret);

  const payload = {
    images: ["me.webp", "2.jpeg", "guts.jpeg"],
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration
  };

  // Create JWT token with the payload and sign it
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);

  // Respond with the JWT token,
  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
