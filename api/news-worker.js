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

    if (url.pathname === '/' || url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok', worker: 'ddott-news' }), {
        headers: { ...cors, 'Content-Type': 'application/json' }
      });
    }

    if (url.pathname === '/news' && request.method === 'POST') {
      try {
        const body = await request.json();
        const language = body.language || 'en';
        const gender = body.gender || 'female';
        const anchorName = gender === 'female' ? 'Sarah' : 'James';
        const langLabel = {en:'English',ml:'Malayalam',hi:'Hindi',ar:'Arabic'}[language] || 'English';

        const response = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
          messages: [
            {
              role: 'system',
              content: 'You are a JSON API. Output ONLY a raw JSON array of 5 objects. Each object has three keys: "title" (a string), "description" (a string), "source" (an object with one key "name" which is a string). Do not nest arrays. Do not add any other keys. Start your response with [ and end with ].'
            },
            {
              role: 'user',
              content: `Generate 5 global news items in ${langLabel}. Output only the JSON array, nothing else.`
            }
          ],
          max_tokens: 1024
        });

        // TEMP DEBUG - remove after diagnosing
        const debugInfo = {
          responseType: typeof response.response,
          isArray: Array.isArray(response.response),
          rawPreview: typeof response.response === 'string'
            ? response.response.slice(0, 300)
            : JSON.stringify(response.response).slice(0, 300)
        };

        let articles = [];
        try {
          const raw = response.response.trim();
          const jsonStart = raw.indexOf('[');
          const jsonEnd = raw.lastIndexOf(']') + 1;
          const parsed = JSON.parse(raw.slice(jsonStart, jsonEnd));

          // Handle all nesting cases
          if (parsed.length === 1 && Array.isArray(parsed[0]?.title)) {
            articles = parsed[0].title; // nested bug
          } else if (Array.isArray(parsed[0])) {
            articles = parsed[0]; // double nested
          } else if (typeof parsed[0]?.title === 'string') {
            articles = parsed; // correct format
          } else {
            // Last resort - find any array in response
            const match = raw.match(/\[[\s\S]*?\{[\s\S]*?"title"[\s\S]*?\}\s*\]/g);
            const inner = match ? match[match.length-1] : null;
            articles = inner ? JSON.parse(inner) : [];
          }
        } catch(parseErr) {
          articles = [{
            title: response.response,
            description: '',
            source: { name: 'DDOTT News' }
          }];
        }

        return new Response(JSON.stringify({
          articles,
          language,
          gender,
          anchor: anchorName,
          timestamp: new Date().toISOString(),
          _debug: debugInfo
        }), { headers: { ...cors, 'Content-Type': 'application/json' } });

      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500, headers: { ...cors, 'Content-Type': 'application/json' }
        });
      }
    }

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

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404, headers: { ...cors, 'Content-Type': 'application/json' }
    });
  }
}
