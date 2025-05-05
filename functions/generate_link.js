import { SignJWT } from "jose";

export async function onRequestPost(context) {
  const apiKey = context.request.headers.get("Authorization");

  if (!apiKey || apiKey !== `Bearer ${context.env.key}`) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  const secret = new TextEncoder().encode(context.env.secret);

  const payload = {
    images: ["me.webp", "2.jpeg", "guts.jpeg"],
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);

  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}
