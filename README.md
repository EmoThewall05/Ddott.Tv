# 📺 Ddott.TV

> **The Creator Platform built on mobile. No laptop. No excuses.**
> Videos · Live · Community · AI · Web3 — all in one.



![Platform](https://img.shields.io/badge/Platform-Web-cyan?style=flat-square)




![Stack](https://img.shields.io/badge/Stack-Supabase%20%2B%20Vanilla%20JS-purple?style=flat-square)




![Built on](https://img.shields.io/badge/Built%20on-Termux%20%2B%20Acode-green?style=flat-square)




![Status](https://img.shields.io/badge/Status-Active%20Development-orange?style=flat-square)



---

## 🌐 Live

| Page | URL |
|---|---|
| Platform | https://ddott-tv.vercel.app/ddott-login.html |
| Video Player | `ddott-player-v2.html?id=<video_id>` |
| TheWall (Web3) | https://thewall-web3-iie7.vercel.app |

---

## 🧭 What is Ddott.TV?

Ddott.TV is a next-generation creator video platform — part OTT streaming, part creator economy, part AI-powered community hub.

Built entirely on **Android mobile** using Termux + Acode, it is the flagship product of **Dwin Universe** — an indie builder ecosystem connecting creators, developers, and communities across Dubai, Kerala, and beyond.

Ddott.TV is not just a video platform. It is:

- A **community collab engine** where creators with different skills unite to build content together
- A **coin economy** where watching, liking, and creating earns real EMO COINS
- A **Web3 gateway** — EMO COINS convert to crypto directly via TheWall wallet
- An **AI-powered content network** — news, teaching, translation, podcasts, music mixing, all AI-driven
- A home for **Dwin Universe** — TheWall, Emowall AI, Emobies, and future projects

---

## ✨ Platform Features

### 🏠 Home Feed
- Personalized video feed pulling live from Supabase
- Live stream cards with real-time viewer count
- Trending, latest, and creator-followed content
- Stats dashboard — Views, Coins, Likes, Videos at a glance

---

### 📺 Video Player (V2)
- Full custom neon dark player UI
- Real-time view count (increments on every load via Supabase)
- Like system with duplicate prevention
- Sticker reactions — 🍕 🚀 🔥 🦋 💎 ⚡ 👑 ⭐ 🪙 💜 drop on video
- EMO COINS Tip Creator — tip directly from the player
- Proof of Watch Quiz — answer a question after watching to earn EMO COINS
- Comments tab — real Supabase comments, no mock data
- Up Next tab — video queue
- Live Chat tab — real-time chat during streams
- Description with tags, timestamps, share, save, clip actions
- 4K / LIVE / fullscreen / pip controls

---

### 🎬 Proof of Watch — Video Quiz

After watching a video, a timed quiz appears:

- Question generated from video content
- Multiple choice answers
- Correct answer → **+5 EMO COINS** credited instantly to wallet
- Wrong answer → no coins, can retry next video
- Powered by Supabase (`video_quizzes` table) — creator sets Q&A at upload time

---

### 🌐 Community Center

> *Random talents come together. AI helps you build.*
> Singer + Lyricist + Editor = One masterpiece. 🎭

The Community Center is where creators collaborate across skills to produce content no single person could make alone.

#### Community Categories

| Category | Description |
|---|---|
| 🎵 Music Hub | Singers, producers, lyricists — Malayalam, Hindi |
| 🎬 Film Studio | Short films, scripts, cinematography — Drama, Comedy |
| 📰 AI News | News in your language, AI-powered — Malayalam, Arabic |
| 📚 Edu Center | AI teacher, live sessions, any subject — Free |
| 😂 Comedy | Sketches, reels, stand-up collabs |
| 🎙️ Podcast | Auto and manual podcasts on any topic |
| 🤖 AI Projects | Build AI tools together as a community |

#### Open Collabs

Creators post open collaboration slots:

- Set required roles (Vocalist, Lyricist, Producer, Editor, Designer)
- Members join and fill slots
- EMO COINS reward on completion
- AI handles mixing, mastering, subtitles automatically

**Example active collabs:**

- 🎵 Malayalam Indie Song — "Dubai Dreams" · 3/5 joined · +200 🪙
- 😂 Short Comedy Film — "Termux Life" · +200 🪙
- 📰 Dubai Tech News — Weekly Malayalam Show · +150 🪙
- 📚 Malayalam Coding Tutorial Series · +300 🪙
- 🎙️ Web3 & Crypto Podcast — Weekly · +100 🪙
- 🎬 IND → DXB Documentary · +500 🪙

---

### 🤖 AI Superpowers

Built into the platform — no third-party apps needed:

| Feature | Description | Status |
|---|---|---|
| 📰 AI News Reader | World news in Malayalam, Hindi, Arabic, English — AI voice reads live | LIVE |
| 🌐 Auto Translation | Every video translated to your language with AI subtitles | 50+ LANG |
| 🤖 AI Human Talk | 24/7 live AI support for work, life, or project questions | 24/7 |
| 📚 AI Teacher Live | Real-time AI teaching — math, coding, language, science | FREE |
| 🎙️ AI Podcasts | Auto-generated podcasts on any topic — tech, crypto, culture | NEW |
| 🎵 AI Music Mixer | AI mixes and masters collab tracks — studio quality | BETA |

---

### 🪙 EMO COINS

The native currency of the Ddott.TV ecosystem.

**Earn by:**
- ✅ Daily login (+1 coin · streak bonus)
- ▶️ Watch 30 minutes of video (+5 coins)
- 👍 Like 3 videos (+3 coins)
- 🎬 Complete Proof of Watch quiz (+5 coins per video)
- 🤝 Complete a community collab (+100–500 coins)
- 🎬 Upload content (creator reward)

**Spend / Use:**
- 🪙 Tip creators directly from video player
- 🏆 Leaderboard ranking (top coin earners featured)
- 🔄 Convert to crypto via TheWall Web3 wallet

**Conversion:**

> EMO COINS only convert to crypto through **TheWall** — Ddott.TV's integrated Web3 wallet.
> 1 EMO = $0.005 USD · Conversion is direct — no middleman, no third-party exchange.

**Wallet display:**
- Total balance shown in header
- Connected wallet address (0x...da08)
- Level system (Starter → Pro → Legend)
- Daily streak tracker

---

### 🦋 Emowall AI

The 7-Brain Claude AI butterfly — integrated directly into Ddott.TV.

- Claude AI + 6 other AI engines (Gemini, OpenAI, Perplexity, Kimi, Cursor, Copilot)
- Answers questions about videos, community, content creation, Web3
- Available as floating butterfly button across all pages
- Full Emowall AI 2.0 app: `com.emobies.emowall` · [emowall-ai-2-0.vercel.app](https://emowall-ai-2-0.vercel.app)

---

### 🎬 Creator Studio
- Upload videos with title, description, tags, thumbnail
- Set Proof of Watch quiz question + answers at upload
- **Spot Pay** — get paid per verified watch (Proof of Watch confirmation)
- Script AI — AI writes your video script from a topic prompt
- Analytics — views, likes, coins earned, watch time

---

### 💬 Messaging
- Direct messages between users
- Sticker pack — 🍕 🚀 🔥 🦋 💎 ⚡ 👑 ⭐ 🪙 💜
- Voice messages
- Community group chats per collab project

---

### 👤 Creator Channel
- Profile page with avatar, bio, subscriber count
- Video grid with play counts
- Playlists
- Follow / Unfollow
- EMO COINS earned displayed publicly

---

## 🗄️ Database Schema (Supabase)

### `videos`
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| title | text | Video title |
| views | int8 | Incremented on load |
| trending_rank | int4 | Nullable — badge shows if set |
| subscriber_count | int8 | Creator subscriber count |
| created_at | timestamptz | Auto |

### `comments`
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| video_id | uuid | FK → videos.id |
| user_id | uuid | FK → auth.users.id |
| username | text | Cached at post time |
| content | text | Comment body |
| likes | int4 | Default 0 |
| created_at | timestamptz | Auto |

### `video_likes`
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| video_id | uuid | FK → videos.id |
| user_id | uuid | FK → auth.users.id |
| created_at | timestamptz | Auto |

```sql
ALTER TABLE video_likes
ADD CONSTRAINT unique_video_like UNIQUE (video_id, user_id);
