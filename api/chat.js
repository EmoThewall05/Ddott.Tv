export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { messages, system } = req.body
    const cfMessages = [
      { role: 'system', content: system || 'You are Emowall AI, the butterfly companion for Ddott TV.' },
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
      res.status(200).json({
        content: [{ type: 'text', text: data.result.response }]
      })
    } else {
      res.status(500).json({ error: 'No response from AI', raw: data })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
