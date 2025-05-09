import { SignJWT } from "jose";

// Function to return common CORS headers
function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "*",
  };
}
//  CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(),
  });
}

export async function onRequestPost(context) {
  // Extract the Authorization header
  const apiKey = context.request.headers.get("Authorization");

  // Check for valid Authorization header
  if (!apiKey || apiKey !== `Bearer ${context.env.key}`) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        ...getCorsHeaders(),
      },
    });
  }

  try {
    // secret key from cloud flare env
    const secret = new TextEncoder().encode(context.env.secret);
    // JWT payload
    const payload = {
      images: ["me.webp", "2.jpeg", "guts.jpeg"], // Data to expose
      exp: Math.floor(Date.now() / 1000) + 3600, // Expiration time 1 hour
    };

    // Sign the JWT
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    // Send the response with the JWT
    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...getCorsHeaders(),
      },
    });
  } catch (error) {
    // Handle error
    return new Response("Error", {
      status: 500,
      headers: {
        ...getCorsHeaders(),
      },
    });
  }
}
