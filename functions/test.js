export async function onRequestGet(context) {
  const secret = new TextEncoder().encode(context.env.secret);
  // Just a quick test response
  return new Response("Your secret is loaded!", { status: 200 });
}
