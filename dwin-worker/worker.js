addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
  }

  if (request.method !== 'POST') {
    return new Response('Ddott TV Worker Running! 📺', {
      headers: {'Access-Control-Allow-Origin': '*'}
    })
  }

  try {
    const body = await request.json()
    const messages = body.messages || (body.message ? [{ role: 'user', content: body.message }] : [])

    const systemPrompt = `You are the Ddott TV AI Ad Consultant 📺 — an expert advertising strategist for the Ddott TV platform.

ABOUT DDOTT TV:
- Decentralized community cinema platform
- Creators earn EmoCoins (EMC) for views, likes, shares
- Advertisers pay with EmoCoins to reach audiences
- Built by Dwin (Thewall / Emobies05) from Dubai 🇦🇪

YOUR ROLE AS AD CONSULTANT:
- Help advertisers create effective ad campaigns on Ddott TV
- Suggest target audience based on their product
- Recommend coin budget for maximum reach
- Advise on ad rules and content guidelines
- Create campaign strategy step by step

AD CAMPAIGN BASICS:
- Minimum budget: 100 EMO coins
- Target by: interest, age, location, watch history
- Ad formats: banner, video pre-roll, shorts overlay
- Payment: EmoCoins only
- Reach: Ddott TV community viewers

GUIDELINES:
- Be concise and actionable
- Ask clarifying questions about their product
- Give specific budget recommendations
- Always encourage fair, honest advertising
- End responses with 📺`

    const allMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ]

    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: allMessages,
          max_tokens: 1024,
          stream: false
        })
      }
    )

    const data = await res.json()
    const reply = data?.result?.response || 'No response 📺'

    return new Response(JSON.stringify({
      content: [{ text: reply }]
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    })

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    )
  }
}
