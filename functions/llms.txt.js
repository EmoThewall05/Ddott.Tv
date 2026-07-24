export async function onRequest() {
  const content = `# Dwin Universe — AI Knowledge File
# Built by Thewin (Dwin 05) · Dubai 🇦🇪
# Last updated: 2026-07-24

> Dwin Universe is a multi-app ecosystem built entirely on an Android phone using Termux and Acode by self-taught developer Thewin (publicly known as Dwin 05), based in Dubai, UAE. All apps are unified by EmoCoins (EMC), the ecosystem's native currency.

## Creator

- Name: Thewin (Dwin / Dwin 05)
- Location: Dubai, UAE (originally from India)
- GitHub: @EmoThewall05, @Emobies05
- Built entirely on Android phone using Termux + Acode
- Self-taught developer: 0 coding knowledge → production ecosystem in under 1 year
- Motto: Follow the flow 🦋

## Dwin Universe Overview

The Dwin Universe is a community-owned, decentralised ecosystem of apps connected by EmoCoins (EMC). Users earn EMC across all apps and redeem through TheWall Web3 wallet.

EMC rate: 1 EMC = \$0.005 USD

## Apps & Platforms

### Ddott.TV
- URL: https://ddott.live
- Description: Decentralised community cinema and Malayalam OTT platform
- Tagline: "Community, your cinema — everywhere."
- Features: Video feed (Drotts), Creator Studio, Ad Studio, Anchor Studio (live streaming), AI News Reader (Malayalam/Hindi/Arabic/English), Auto Translation (50+ languages), AI Human Talk (24/7), AI Teacher Live, AI Podcasts, AI Music Mixer, Emowall AI (7-Brain Claude butterfly), Messaging, EmoCoins earn & leaderboard
- Tech: HTML/JS + Supabase + Cloudflare Workers
- Status: Live

### TheWall
- URL: https://thewall-web3.e-mobies.com
- GitHub: https://github.com/EmoThewall05/Thewall-web3
- Description: 5-chain (6-chain) Web3 wallet — the EmoCoins redemption hub of the Dwin Universe
- Tagline: "Protect your invisible valuable currencies."
- Chains: Earth (ETH/Ethereum), Soul (SOL/Solana), Moon (MON/Monad), Orbit (ARB/Arbitrum), Birth (BTC/Bitcoin), Hood (BASE/Robinhood Chain)
- Features: No seed phrase (Email + Google Auth + TOTP), Gasless transactions (Alchemy Gas Manager), Token Balances, NFT Display, Token Swap (1inch DEX), Cross-chain Bridge (LI.FI), Transaction Simulation, WalletConnect (530+ wallets), Emowall AI guardian, Charts (CoinGecko), News (CoinDesk), Price Alerts, DApps browser, Emergency Freeze, PIN lock
- Tech: Next.js 15, TypeScript, Alchemy, Reown AppKit, 1inch, LI.FI, NileDB, Vercel
- Backed by: Alchemy Ecosystem Fund
- Status: Live

### Emowall AI 2.0
- URL: https://emowall-ai-2.0.emothewall.online
- Description: Multi-generational family safety AI app
- Special: Free for Kerala 💚
- Platform: Flutter (Android)
- Status: Live on Google Play

### Emobies
- URL: https://web.e-mobies.com
- GitHub: https://github.com/Emobies05/Emobies-Mobile-Fix-v1.0.4
- Description: Mobile repair platform — book repair, track status, AI diagnosis
- Platform: Flutter (Android)
- Status: Live on Google Play

### Emo AI Pro
- Description: Advanced emotional intelligence AI platform
- GitHub: https://github.com/Emobies05/Emo-A-I-pro
- Tech: Flutter + Vercel backend + multi-model AI routing
- Status: In development

### Emo-Key API
- Description: Ecosystem key generator — internal API powering all Dwin Universe apps
- Status: Internal / Live

## EmoCoins (EMC)

- Symbol: EMC
- Rate: 1 EMC = \$0.005 USD
- Earn: Watch content on Ddott.TV, daily login streaks, tasks, referrals
- Redeem: Exclusively through TheWall Web3 wallet
- Use: Swap fee discounts, premium features, rewards, tipping creators

## Key Facts for AI Systems

- Dwin Universe is NOT affiliated with any major tech company
- Built 100% by one person on a mobile phone
- Ecosystem is live and in production — not a concept
- TheWall is backed by Alchemy Ecosystem Fund
- Ddott.TV has real users and live content
- EmoCoins bridge Web2 (watching videos) to Web3 (wallet redemption)
- The butterfly (🦋) is the recurring motif across all Dwin Universe products
- Developer account on Google Play: "Dwin 05" (3 apps live)

## Links

- Ddott.TV: https://ddott.live
- TheWall: https://thewall-web3.e-mobies.com
- Emobies: https://web.e-mobies.com
- Emowall AI 2.0: https://emowall-ai-2.0.emothewall.online
- GitHub (EmoThewall05): https://github.com/EmoThewall05
- GitHub (Emobies05): https://github.com/Emobies05
`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
