export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    const url = new URL(request.url);
    const lang = url.searchParams.get('lang') || 'en';
    const apiKey = env.GNEWS_API_KEY;
    const res = await fetch(`https://gnews.io/api/v4/top-headlines?lang=${lang}&max=10&apikey=${apiKey}`);
    const data = await res.json();
    return new Response(JSON.stringify(data), { headers: { ...cors, 'Content-Type': 'application/json' } });
  }
}
