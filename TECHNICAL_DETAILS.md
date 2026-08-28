# Project Technical Details — Belajar Sedekah

Official single-page community web application for Komunitas Belajar Sedekah (@belajarsedekah.id) based in Lampung, Indonesia. Built to showcase social programs, financial transparency, real-time live donor feed, community engagement, and direct donation channels.

---

## 1. System Overview & Tech Stack
* **Framework & Build System**: React 19 (`react` 19.2.8, `react-dom` 19.2.8), Vite 8 (`vite` 8.2.0), `@vitejs/plugin-react` 6.0.5.
* **Routing**: `react-router-dom` 7.18.2 configured with `HashRouter` for static deployment on GitHub Pages (`belajarsedekah.id`).
* **Database & Realtime Backend**: **Supabase** (`@supabase/supabase-js` 2.98.0) with PostgreSQL, Row Level Security (RLS), and Postgres Realtime replication for instant live donation feeds and community prayer updates.
* **Animations & Icons**: `framer-motion` 13.1.0, `react-icons` 5.7.0.
* **Global Styling Strategy**: Human-crafted Vanilla CSS with warm organic design tokens in [`src/index.css`](file:///c:/Users/whydo/D9043DB2025/code/explore/web_project/belajar_sedekah/src/index.css) (Deep Forest Slate `#07151c`, Warm Meadow Green `#5c9e2b`, Crisp Sky `#0ea5e9`, Warm Honey Amber `#d97706`, and Warm Alabaster `#fbfbfa` in light mode).

---

## 2. Supabase Integration & Architecture
* **Client SDK**: [`src/lib/supabase.js`](file:///c:/Users/whydo/D9043DB2025/code/explore/web_project/belajar_sedekah/src/lib/supabase.js) with safe fallback to local mock data when credentials are not configured.
* **Environment Variables**:
  - `VITE_SUPABASE_URL`: Supabase Project REST URL.
  - `VITE_SUPABASE_ANON_KEY`: Supabase Anon Public Key.
  - Configuration template provided in [`.env.example`](file:///c:/Users/whydo/D9043DB2025/code/explore/web_project/belajar_sedekah/.env.example).
* **Service Layer**:
  - [`src/services/donationService.js`](file:///c:/Users/whydo/D9043DB2025/code/explore/web_project/belajar_sedekah/src/services/donationService.js): Realtime live donation stream & submission.
  - [`src/services/wallService.js`](file:///c:/Users/whydo/D9043DB2025/code/explore/web_project/belajar_sedekah/src/services/wallService.js): Realtime wall of kindness prayers & like increments.
  - [`src/services/transparencyService.js`](file:///c:/Users/whydo/D9043DB2025/code/explore/web_project/belajar_sedekah/src/services/transparencyService.js): Multi-year financial audit records & LPJ links.
  - [`src/services/programService.js`](file:///c:/Users/whydo/D9043DB2025/code/explore/web_project/belajar_sedekah/src/services/programService.js): Social action programs & impact metrics.
* **Database Schema & Migration**: Full DDL, RLS, functions, realtime publications, and initial seed data in [`supabase_schema.sql`](file:///c:/Users/whydo/D9043DB2025/code/explore/web_project/belajar_sedekah/supabase_schema.sql).

---

## 3. Active Routing & Navigation
* `#/` — [Home.jsx](file:///c:/Users/whydo/D9043DB2025/code/explore/web_project/belajar_sedekah/src/pages/Home.jsx): Editorial Bento Hero with interactive donation impact calculator and quick BSI copy, Key Impact Metrics Ribbon, Asymmetrical Bento Program Showcase with Jum'at Berkah Flagship Spotlight, Financial Audit Transparency Section with official Google Docs LPJ links, Live Donation Chat Stream (connected to Supabase Realtime), Daily Quotes, Wall of Kindness (connected to Supabase Realtime), News, Instagram feed, and CTA banner.
* `#/program` — [Programs.jsx](file:///c:/Users/whydo/D9043DB2025/code/explore/web_project/belajar_sedekah/src/pages/Programs.jsx): Comprehensive breakdowns for Jum'at Berkah, Bingkisan Lebaran, Qurban & Kemanusiaan, Sobat BS.
* `#/donasi` — [Donation.jsx](file:///c:/Users/whydo/D9043DB2025/code/explore/web_project/belajar_sedekah/src/pages/Donation.jsx): Preset nominal amounts, BSI account copier, QRIS scanner, and automated WhatsApp confirmation URL builder.
* `#/transparansi` — [Transparency.jsx](file:///c:/Users/whydo/D9043DB2025/code/explore/web_project/belajar_sedekah/src/pages/Transparency.jsx): Multi-year interactive financial dashboard (2023-2026), fund allocation breakdown, and official Google Docs LPJ links.
* `#/tentang` — [About.jsx](file:///c:/Users/whydo/D9043DB2025/code/explore/web_project/belajar_sedekah/src/pages/About.jsx): History, founder info (Despa Putri Lestari), vision/mission, team roster.
* `#/galeri` — [Gallery.jsx](file:///c:/Users/whydo/D9043DB2025/code/explore/web_project/belajar_sedekah/src/pages/Gallery.jsx): Photo & video distribution documentation.
* `#/berita` & `#/berita/:slug` — [News.jsx](file:///c:/Users/whydo/D9043DB2025/code/explore/web_project/belajar_sedekah/src/pages/News.jsx): Articles, press releases, and detailed story views.

---

## 4. Guidelines for Future Chats & Agents
* **Graceful Degradation**: Always preserve local fallback data so the app runs smoothly in development even if Supabase keys are not set.
* **Design Philosophy**: Keep UI human-crafted, warm, trustworthy, and organic. Avoid generic AI-generated dark mode tropes (blurred orb blobs, glowing neon borders).
* **Git Protocol**: Do not perform preemptive `git commit`, `git push`, or `npm run deploy` unless explicitly commanded.

---

## 5. Verification Pipeline & Smoke Tests
* **Dev Server**: `npm run dev`
* **Production Build Verification**: `npm run build`
