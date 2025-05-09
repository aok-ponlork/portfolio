import { jwtVerify } from "jose";

// Function to return common CORS headers
function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "*",
  };
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(),
  });
}

export async function onRequestGet(context) {
  // Extract token from query parameters
  const token = new URL(context.request.url).searchParams.get("token");

  // If token is missing, return a 401 response
  if (!token) {
    return new Response("Missing token", {
      status: 401,
      headers: getCorsHeaders(),
    });
  }

  try {
    // Decode secret from environment variable
    const secret = new TextEncoder().encode(context.env.secret);

    // Verify JWT
    const { payload } = await jwtVerify(token, secret);

    // Validate the images field in the payload
    if (!payload?.images || !Array.isArray(payload.images)) {
      return new Response("Invalid token payload", { status: 400 });
    }

    const imageNames = payload.images;

    // Process each image name and retrieve data
    const images = await Promise.all(
      imageNames.map(async (name) => {
        try {
          const object = await context.env.personal_data.get(name);
          if (!object) return null;

          // Convert image to base64 format
          const arrayBuffer = await object.arrayBuffer();
          const base64 = btoa(
            new Uint8Array(arrayBuffer).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const contentType = object.httpMetadata?.contentType || "image/webp";

          // Return image data in base64 format
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

    // Filter out invalid images (null values)
    const validImages = images.filter(Boolean);

    // Return response with valid images in base64 format
    return new Response(JSON.stringify({ images: validImages }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...getCorsHeaders(),
      },
    });
  } catch (err) {
    console.error("JWT Verification Error:", err);
    // Return response for invalid or expired token
    return new Response(`Invalid or expired token. ${err.message ?? ""}`, {
      status: 403,
      headers: getCorsHeaders(),
    });
  }
}
