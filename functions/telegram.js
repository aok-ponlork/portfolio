// CORS headers
function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "*",
  };
}

// Telegram handler function for incoming requests
export async function onRequestPost(event) {
  // Parse the POST body to retrieve the form data
  const formData = await event.request.json();
  const { telegram, message, name } = formData;

  // Validate that both required fields are provided
  if (!telegram || !message) {
    return new Response("Missing data", {
      status: 400,
      headers: getCorsHeaders(),
    });
  }

  // Telegram Bot API endpoint for sending messages
  const TELEGRAM_API_URL = `https://api.telegram.org/bot${event.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  // Prepare the message to send to the admin
  const messageTosent = `📥 *New Telegram Contact Request*\n\n👤 Name: ${name}\n📨 From: ${telegram}\n\n💬 Message: ${message}`;
  const requestBodyAdmin = {
    chat_id: event.env.CHAT_ID, // chat ID
    text: messageTosent, // message content
  };

  try {
    const sendAdminResponse = await fetch(TELEGRAM_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBodyAdmin),
    });

    if (!sendAdminResponse.ok) {
      const errorText = await sendAdminResponse.text();
      return new Response(
        JSON.stringify({ message: `Failed to notify: ${errorText}` }),
        {
          status: sendAdminResponse.status,
          headers: getCorsHeaders(),
        }
      );
    }

    return new Response(JSON.stringify({ message: "Message sent!" }), {
      status: 200,
      headers: {
        ...getCorsHeaders(),
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ message: `Error sending message: ${err.message}` }),
      {
        status: 500,
        headers: getCorsHeaders(),
      }
    );
  }
}

// Handle CORS preflight request
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(),
  });
}
