export async function onRequestGet(context) {
  return new Response("Hello from Cloudflare Functions!", { status: 200 });
}
