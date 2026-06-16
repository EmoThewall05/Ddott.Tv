export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS')
      return new Response(null, { headers: cors });

    const url = new URL(request.url);

    // Health check
    if (url.pathname === '/' || url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok', worker: 'ddott-news' }), {
        headers: { ...cors, 'Content-Type': 'application/json' }
      });
    }

    // AI News generation
    if (url.pathname === '/news' && request.method === 'POST') {
      try {
        const body = await request.json();
        const language = body.language || 'en';
        const gender = body.gender || 'female';
        const anchorName = gender === 'female' ? 'Sarah' : 'James';

        const response = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
          messages: [
            { role: 'system', content: 'You are a professional TV news anchor. Keep responses concise, 3-4 sentences max.' },
            { role: 'user', content: `You are ${anchorName}, a professional news anchor. Generate a short news briefing about latest global news.` }
          ],
          max_tokens: 256
        });

        return new Response(JSON.stringify({
          text: response.response || 'News unavailable.',
          language, gender,
          timestamp: new Date().toISOString()
        }), { headers: { ...cors, 'Content-Type': 'application/json' } });

      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500, headers: { ...cors, 'Content-Type': 'application/json' }
        });
      }
    }

    // GNews headlines (only if API key exists)
    if (url.pathname === '/headlines') {
      if (!env.GNEWS_API_KEY) {
        return new Response(JSON.stringify({ error: 'GNews API key not configured' }), {
          status: 503, headers: { ...cors, 'Content-Type': 'application/json' }
        });
      }
      try {
        const lang = url.searchParams.get('lang') || 'en';
        const res = await fetch(`https://gnews.io/api/v4/top-headlines?lang=${lang}&max=10&apikey=${env.GNEWS_API_KEY}`);
        const data = await res.json();
        return new Response(JSON.stringify(data), {
          headers: { ...cors, 'Content-Type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500, headers: { ...cors, 'Content-Type': 'application/json' }
        });
      }
    }

    // 404
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404, headers: { ...cors, 'Content-Type': 'application/json' }
    });
  }
}
