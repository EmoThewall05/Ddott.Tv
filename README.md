# 📺 Ddott.TV — The Dwin Universe

> **Watch. Earn. Own.**

![Platform](https://img.shields.io/badge/Platform-Watch--to--Earn-blueviolet?style=flat-square)
![Cloudflare](https://img.shields.io/badge/Hosted-Cloudflare%20Pages-orange?style=flat-square)
![Ecosystem](https://img.shields.io/badge/Dwin%20Universe-4%20Apps-cyan?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

Built by **Thewin (Dwin 05)** · India 🇮🇳 → Dubai 🇦🇪
Built entirely on phone using **Termux + Acode**

---

## 🌍 Live Demo

🚀 **[ddott.live](https://ddott.live/)**

---

## ⚡ What is Ddott.TV?

Ddott.TV is the **central console of the Dwin Universe** — a watch-and-earn video platform that connects and powers a full ecosystem of sovereign apps under one Emo Coin economy.

Advertisers buy Emo Coins, viewers earn Emo Coins by watching, and those coins move freely across every app in the ecosystem. One coin, one identity, one ecosystem.

---

## 🎬 Core Features

| Feature | Description |
|---|---|
| ▶️ Player V2 | Full-length watch-and-earn video player with quiz-based coin rewards |
| 📱 Player V3 | Split-screen mode — main video + Drotts/shorts feed |
| 🎞️ Shorts | Fast-swipe short-form feed with the DWIN like system |
| 🪙 Emo Coin Economy | Advertisers buy coins, viewers earn coins, creators get paid |
| 📊 Ad Studio | Tiered ad pricing — Normal / Mid / Viral / Share |
| 🏆 Leaderboard | Top earners and creators, rewards paid in EMC |
| 🤖 Emo Robos | Telegram bot for referrals and coin tracking |
| 📰 AI News & Podcast | Auto-generated news + Malayalam TTS podcast, powered by AI |
| 👥 Demos | Social network inside Ddott.TV — Dwall posts, Dreels, 12-hour Dlooks, DMs, follows |
| 🏆 Weekly Competitions | Singing, dancing, short film and talent contests — top 3 win Emo Coins (launching soon) |

---

## 🪙 The DWIN Like System

Shorts use a tiered engagement system:

| Action | Result |
|---|---|
| Single tap | 1 like |
| Double tap | 2 likes |
| Hold 600ms | Super-like — +1 coin (once per video) |

---

## 💰 Advertising Economy

| Metric | Value |
|---|---|
| Rate | ₹0.20 / view |
| Ad packages | ₹1,000 – ₹45,000 |
| Coin value | 1 EMO = ₹0.10 |
| Revenue split | 30% platform / 40% creator / 30% viewer |

Ad count per video scales with length (1, 2, or 3 ads).

---

## 🪙 Server-Side Emo Coin Rewards

Emo Coins are granted by the database, not by the app. Every reward has a fixed amount, can be claimed once per item, and has a daily cap.

| Reward | Coins | Limit |
|---|---|---|
| Daily login | 1 (3 from a 7-day streak) | Once per day |
| Upload a video | 50 | Once per video, 5 per day |
| Watch a video (quiz) | 10 | Once per video, 100 coins per day |
| Super-like | 1 | Once per video, 20 coins per day |

Views and likes are counted once per logged-in user per video.

---

## 👥 Demos — Social Network Inside Ddott.TV

Demos is a social layer built into Ddott.TV. It has its own profile, separate from the Ddott.TV profile — only the login account is shared.

| Tab | What it is |
|---|---|
| 📝 Dwall | Text and photo posts |
| 🎬 Dreels | Short videos |
| 👀 Dlooks | Stories that disappear after 12 hours |

**What you can do**
- Profile with picture, banner, details, your own uploads and follow counts
- Follow people, with follow requests for private accounts
- Comment, rate (stars), save and favourite posts
- Private messaging (DM) with a DM privacy setting
- Block, mute and restrict people, hide words, report content
- Notifications, plus Settings: deactivate profile, archive, limit interactions

**How it is built**
- Photos are stored in Supabase Storage (`demos-media`), videos on Cloudflare Stream
- Row Level Security on every table; profile statistics are served through a view that only logged-in users can read
- Status: in preparation for the Play Store release together with Ddott.TV — content moderation and automatic abuse protection are being added

---

## 🏆 Weekly Competitions *(launching soon)*

Creators compete every week in four categories: 🎤 Singing · 💃 Dancing · 🎬 Short Film · ⭐ Talent.

**How it works**
1. Each week a new competition opens in every category.
2. Pick one of your own videos and pay the entry fee in Emo Coins from your Ddott.TV profile. One entry per user per competition. Entries go live immediately.
3. Viewers watch and rate entries from 1 to 5 stars on the Community page.
4. When the week ends, the top 3 win Emo Coins automatically.

**Prizes**
- Prize pool = 50% of all entry fees collected
- 🥇 1st: 50% of the pool · 🥈 2nd: 30% · 🥉 3rd: 20%
- If fewer than 3 people enter, every entry fee is refunded

**Scoring**
- Score = unique views + 5 × rating points
- Your own views and ratings are not counted, and an account must be at least 24 hours old to rate
- Ties are broken by more ratings, then the earlier entry

**Built to be fair**
- Entry, rating, prize payout and refunds all run as server-side database functions
- Payout can run only once per competition, so winners are never paid twice

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Hosting | Cloudflare Pages |
| Backend | Supabase (Postgres, RLS, Storage) |
| Media | Cloudflare Stream (video) + Supabase Storage (images) |
| Automation | Cloudflare Workers (bots, news, podcast) |
| AI | Multi-provider — Gemini, Claude, GPT-4o, Grok, Perplexity, Llama, DeepSeek |
| TTS | Malayalam text-to-speech for AI podcast |

---

## 📱 The Dwin Universe

Ddott.TV is the hub. Every other app in the ecosystem plugs into it through the shared Emo Coin economy.

| Project | Description | Link |
|---|---|---|
| 📺 **Ddott.TV** | Watch-and-earn video platform · Emo Coin hub (this) | [ddott.live](https://ddott.live/) |
| 🧱 **TheWall Web3** | Gasless 6-chain crypto wallet — Emo Coins earned here convert to real crypto | [thewall-web3.e-mobies.com](https://thewall-web3.e-mobies.com/) |
| 🤖 **EmoMulti AI Studio** | 25+ AI providers under one vault (BYOK), Chef Mode, community feed | [emomulti-landing.meradivin.workers.dev](https://emomulti-landing.meradivin.workers.dev) |
| 🦋 **Emowall AI 2.0** | Free child-safety app for Kerala government school children — 7 AI safety brains, silent threat detection, verification chain to Kerala Police/Cyber Cell/Child Helpline | [emowall-ai-2.0.emothewall.online](https://emowall-ai-2.0.emothewall.online) |
| 📱 **Emobies** | Mobile repair service platform | [web.e-mobies.com](https://web.e-mobies.com) |

---

## 🔗 How the Ecosystem Connects

- 🪙 **Ddott.TV → TheWall Web3**: Emo Coins earned by watching/creating on Ddott.TV convert to real crypto through TheWall's gasless wallet.
- 🤖 **Ddott.TV ↔ EmoMulti AI Studio**: Creators on EmoMulti can cross-post content into the Ddott.TV community feed.
- 🦋 **Emowall AI 2.0**: A humanitarian arm of the ecosystem — free child-safety protection, independent of the coin economy.
- 📱 **Emobies**: Mobile repair services, part of the same builder's wider app suite.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Clone & Install
```bash
git clone https://github.com/EmoThewall05/Ddott.Tv.git
cd Ddott.Tv
npm install
```

### Environment Variables

Create `.env.local`:

```env
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Run Development Server
```bash
npm run dev
```

---

## 🏆 Colosseum Hackathon

Ddott.TV — The Dwin Universe is submitted to the Colosseum hackathon under **AI Platforms / Agents**, pitching Ddott.TV as the hub connecting TheWall Web3, EmoMulti AI Studio, Emowall AI 2.0, and the shared Emo Coin economy.

---

## 🎯 Philosophy — "Nere Va Nere Po"

Transparent, non-exploitative. The platform earns from ads and subscriptions — never by selling user data.

---

## 👤 Creator

**Thewin (EmoThewall05)**

🇮🇳 India → 🇦🇪 Dubai
Self-taught developer
Every app in the Dwin Universe — coded, deployed, and shipped from a single Android phone using **Termux + Acode**, no laptop, no team, no external funding.

GitHub: [@EmoThewall05](https://github.com/EmoThewall05)

---

## 📄 License

MIT License — Built with ❤️

*Watch. Earn. Own. 🦋*
