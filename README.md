# ⚽ GoalGate: The Ultimate Footy Hub 🏆

Welcome to **GoalGate**, a premium, automated football highlights platform built for the modern fan.

## 🚀 Live Deployment Instructions

This project is optimized for **Vercel**. To deploy:
1. Push this repo to GitHub.
2. Connect the repo to Vercel.
3. Add the following Environment Variables in Vercel Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`: `https://uugcytfecejvrwhtwbfv.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `sb_publishable_kMoFXsgMj5_-3njQbw1ZGA_nFkf6Acz`
   - `API_FOOTBALL_KEY`: `f2ea830942msh790c32c04190c9dp131247jsn77ed9e66fca6`

## ✨ Features
- **Premium UI**: Glassmorphism aesthetic with "Night-Mode Pro" theme.
- **Automated Data**: Real-time match highlights via API-Football.
- **Global Feedback**: Interactive fan rating system powered by Supabase.
- **Responsive**: Fully optimized for mobile and desktop viewing.

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (React 19)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Vanilla CSS (Premium Custom Design)
- **Icons**: Lucide React
- **Animations**: Framer Motion

## ⚙️ API Configuration Note
The application integrates with API-Football (`v3.football.api-sports.io`). Match highlights are fetched and cached for 1 hour locally to optimize API requests and usage limits.


## 🚀 Local Development

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env.local` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   API_FOOTBALL_KEY=your_api_football_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

**Enjoy watching and managing your favorite football highlights in one place! ⚽🔥**
Currently web runs statically as work is in process to integrate live match scores here.