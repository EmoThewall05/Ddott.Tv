# 📺 Ddott.TV

> **The Creator Platform built on mobile. No laptop. No excuses.**
> Videos · Live · Community · AI · Web3 — all in one.



![Platform](https://img.shields.io/badge/Platform-Web-cyan)

 

![Stack](https://img.shields.io/badge/Stack-Supabase%20%2B%20Vanilla%20JS-purple)

 

![Built on](https://img.shields.io/badge/Built%20on-Mobile%20%28Termux%20%2B%20Acode%29-green)

 

![Status](https://img.shields.io/badge/Status-Active%20Development-orange)



---

## 🌐 Live

| Page | URL |
|---|---|
| Platform | ddott-tv.vercel.app/ddott-login.html |
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
- **Sticker reactions** — 🍕 🚀 🔥 🦋 💎 ⚡ 👑 ⭐ 🪙 💜 drop on video
- **EMO COINS Tip Creator** — tip directly from the player
- **Proof of Watch Quiz** — answer a question after watching to earn EMO COINS
- Comments tab — real Supabase comments, no mock data
- Up Next tab — video queue
- Live Chat tab — real-time chat during streams
- Description with tags, timestamps, share, save, clip actions
- 4K / LIVE / fullscreen / pip controls

#### 🎬 Proof of Watch — Video Quiz
After watching a video, a timed quiz appears:
- Question generated from video content
- Multiple choice answers
- Correct answer → **+5 EMO COINS** credited instantly to wallet
- Wrong answer → no coins, can retry next video
- Powered by Supabase (`video_quizzes` table) — creator sets Q&A at upload time

---

### 🌐 Community Center
> *Random talents come together. AI helps you build.*

The Community Center is where creators collaborate across skills to produce content no single person could make alone.

**Singer + Lyricist + Editor = One masterpiece. 🎭**

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
> 1 EMO = $0.005 USD (current rate)
> Conversion is direct — no middleman, no third-party exchange.

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

> Unique constraint required:
> ```sql
> ALTER TABLE video_likes
> ADD CONSTRAINT unique_video_like UNIQUE (video_id, user_id);
> ```

### `profiles`
| Column | Type | Notes |
|---|---|---|
| id | uuid | FK → auth.users.id |
| username | text | Display name |
| emo_coins | int8 | Current balance |
| level | text | Starter / Pro / Legend |
| streak | int4 | Daily login streak |

### `video_quizzes`
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| video_id | uuid | FK → videos.id |
| question | text | Quiz question |
| options | jsonb | Array of 3–4 options |
| correct_index | int4 | Index of correct answer |
| coin_reward | int4 | Default 5 |

### `collabs`
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| title | text | Collab name |
| category | text | music / film / news etc |
| roles | jsonb | Required roles array |
| members | jsonb | Joined member IDs |
| coin_reward | int4 | On completion |
| status | text | open / active / complete |

### `communities`
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| name | text | Community name |
| category | text | music / film / news etc |
| member_count | int8 | Total members |
| is_live | bool | Live indicator |

---

## ⚙️ Setup

### 1. Clone
```bash
git clone https://github.com/EmoThewall05/Ddott.Tv.git
cd Ddott.Tv
### 2. Configure Supabase
Find the Supabase client init block and update:
```js
const db = supabase.createClient(
  'https://YOUR_PROJECT.supabase.co',
  'YOUR_ANON_KEY'
);
``
### 3. Run locally
    ```bash
    python3 -m http.server 8080
    # Open: http://localhost:8080/ddott-player-v2.html?id=<video_id>
```
--------------------------------------------------
    🧱 Tech Stack
------------------------------------------------- 

Layer          -   Tech

Frontend       -   Vanilla HTML,C S JavaScript

Backend / DB   -  Supabase (Postgres + Auth +    Storage)

Web3           - TheWall — Alchemy WalletConnect + Reown

AI             -  Claude (Anthropic) + Gemini + OpenAI + Perplexity

Hosting        -  GitHub Pages + Vercel

Dev Environment-  Termux + Acode — Android mobile only

Version Control-  Git (mobile                     -------------------------------------------------   📁 Project Structure
 Ddott.Tv/
    ├── index.html                  # Home feed
    ├── ddott-player-v2.html        # Video player (V2)
    ├── community.html              # Community center
    ├── coins.html                  # EMO Coins wallet + tasks
    ├── studio.html                 # Creator studio (WIP)
    ├── messaging.html              # Chat + stickers (WIP)
    ├── channel.html                # Creator profile page (WIP)
    ├── landing.html                # Public landing page (WIP)
    └── README.md
--------------------------------------------------
    🗺️ Roadmap
    
    ✅ Done
     [x] Video player V2 — neon UI, stickers, comments, likes
    
    [x] Real Supabase view count, comments, like system
    
    [x] Proof of Watch quiz → EMO COINS reward
    
    [x] Community Center UI — collabs, 
     categories, AI superpowers
    
    [x] EMO Coins wallet — daily tasks, streak, level, conversion via TheWall
    
    [x] Home feed shell with live stream card
    
    [x] Emowall AI butterfly integration
    
    🔨 In Progress
    
    [ ] Video upload flow → Supabase storage + videos table insert
    
    [ ] Homepage feed — dynamic cards from Supabase
    
    [ ] Creator Studio — upload + quiz builder + script AI
    
    [ ] Auth page — sign in / sign up
   
    🔜 Next
    
    [ ] Creator channel page — profile, video grid, playlists
    
    [ ] Messaging — DM + stickers + voice
    
    [ ] EMO COINS live tipping (Supabase realtime)
   
    [ ] Collab system — join, roles, completion
    reward
    
    [ ] AI News Reader — Malayalam/Arabic live feed
    [ ] Search — videos, creators, communities
    
    [ ] Notifications — likes, comments, collab
    invites
    
    [ ] TheWall coin conversion live integration   -----------------------------------------------    🔗 Dwin Universe
     Project
--------------------------------------------------
    Description
    Status
    
    📺 🅓︎🅓︎🅞︎🅣︎🅣︎.🅣︎🅥︎
    
    Creator video platform
    Active
    
    🔗 🅃🄷🄴🅆🄰🄻🄻-🅆🄴🄱3
    
    5-chain Web3 wallet
    Live
    
    📱 E̤M̤O̤W̤A̤L̤L̤.A̤I̤. 2̤.0̤
    
    Flutter child safety app
    In Development
    
    📱 🇪‌🇲‌🇴‌🇧‌🇮‌🇪‌🇸‌ 
     Mobile repair platform
--------------------------------------------------
    👤 Author

    Dwin · Emobies05 / EmoThewall05
    Based in Dubai. Building on mobile. No laptop. No excuses.

    GitHub: @EmoThewall05
    TheWall: thewall-web3-iie7.vercel.app
    Emowall AI: emowall-ai-2-0.vercel.app
---------------------------------------------------
    📄 License
    MIT — build freely, credit kindly.
    Code
