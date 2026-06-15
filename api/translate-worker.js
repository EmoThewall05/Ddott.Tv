export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS')
      return new Response(null, { headers: cors });

    try {
      const body = await request.json();
      const text = body.text || '';
      const target = body.target || 'ml';
      const source = body.source || 'auto';

      // MyMemory free API - no key needed
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;
      const res = await fetch(url);
      const data = await res.json();

      const translated = data.responseData?.translatedText || text;

      return new Response(JSON.stringify({
        translated,
        source,
        target,
        original: text,
        timestamp: new Date().toISOString()
      }), { headers: { ...cors, 'Content-Type': 'application/json' } });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500, headers: { ...cors, 'Content-Type': 'application/json' }
      });
    }
  }
}
