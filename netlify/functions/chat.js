exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  try {
    const { messages, system } = JSON.parse(event.body)
    const cfMessages = [
      { role: 'system', content: system || 'You are Emowall AI, butterfly companion for Ddott TV.' },
      ...messages.slice(-10)
    ]

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: cfMessages })
      }
    )

    const data = await response.json()

    if (data.result?.response) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          content: [{ type: 'text', text: data.result.response }]
        })
      }
    } else {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'No response', raw: data }) }
    }
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) }
  }
}
// netlify function fix Wed May 20 00:25:26 +04 2026
