-- ==============================================================================
-- BELAJAR SEDEKAH (belajarsedekah.id) — SUPABASE COMPLETE DATABASE SETUP & SEED
-- ==============================================================================
-- Instructions:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard
-- 2. Select your Project -> SQL Editor
-- 3. Click "New query", paste this entire script, and click "Run" (▶)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. TABLE: DONATIONS (Riwayat & Transparansi Donasi Live)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.donations (
    id BIGSERIAL PRIMARY KEY,
    donor_name VARCHAR(255) NOT NULL DEFAULT 'Hamba Allah',
    is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    program_tag VARCHAR(100) NOT NULL DEFAULT 'jumat-berkah',
    program_name VARCHAR(255) NOT NULL DEFAULT 'Jum''at Berkah (Jumber 💌)',
    message TEXT DEFAULT '',
    location VARCHAR(150) DEFAULT 'Lampung',
    badge VARCHAR(100) DEFAULT 'Terverifikasi BSI',
    is_verified BOOLEAN DEFAULT TRUE,
    avatar_bg VARCHAR(255) DEFAULT 'linear-gradient(135deg, #15803d, #4ade80)',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('Asia/Jakarta', NOW())
);

-- ==============================================================================
-- 2. TABLE: WALL_MESSAGES (Wall of Kindness • Doa & Harapan)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.wall_messages (
    id BIGSERIAL PRIMARY KEY,
    author VARCHAR(255) NOT NULL DEFAULT 'Hamba Allah',
    location VARCHAR(150) DEFAULT 'Lampung',
    role VARCHAR(150) DEFAULT 'Donatur / Sobat BS',
    program_tag VARCHAR(100) NOT NULL DEFAULT 'Jum''at Berkah 💌',
    message TEXT NOT NULL,
    likes INT NOT NULL DEFAULT 0,
    avatar_bg VARCHAR(255) DEFAULT 'linear-gradient(135deg, #15803d, #4ade80)',
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('Asia/Jakarta', NOW())
);

-- ==============================================================================
-- 3. TABLE: TRANSPARENCY_REPORTS (Laporan Pertanggungjawaban Tahunan)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.transparency_reports (
    id BIGSERIAL PRIMARY KEY,
    year INT NOT NULL UNIQUE,
    incoming_amount NUMERIC(12, 2) NOT NULL,
    outgoing_amount NUMERIC(12, 2) NOT NULL,
    beneficiaries_count INT NOT NULL DEFAULT 0,
    document_url TEXT NOT NULL,
    document_title VARCHAR(255) NOT NULL,
    status VARCHAR(100) DEFAULT 'Tersedia Publik',
    breakdown_json JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('Asia/Jakarta', NOW())
);

-- ==============================================================================
-- 4. TABLE: PROGRAMS (Program Kebaikan Belajar Sedekah)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.programs (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    color VARCHAR(50) DEFAULT '#73a932',
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    target_amount NUMERIC(12, 2) DEFAULT 0,
    raised_amount NUMERIC(12, 2) DEFAULT 0,
    beneficiary_target VARCHAR(100) DEFAULT '',
    schedule VARCHAR(150) DEFAULT '',
    location VARCHAR(150) DEFAULT 'Lampung',
    status VARCHAR(50) DEFAULT 'Aktif',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('Asia/Jakarta', NOW())
);

-- ==============================================================================
-- 5. TABLE: NEWS_ARTICLES (Kabar & Berita Komunitas)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.news_articles (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    read_time VARCHAR(50) DEFAULT '3 menit',
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    image_url TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('Asia/Jakarta', NOW())
);

-- ==============================================================================
-- 6. TABLE: DAILY_QUOTES (Hadits & Kutipan Motivasi Sedekah)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.daily_quotes (
    id BIGSERIAL PRIMARY KEY,
    quote_text TEXT NOT NULL,
    source VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'Keberkahan Harta',
    narrator VARCHAR(255) DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('Asia/Jakarta', NOW())
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wall_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transparency_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_quotes ENABLE ROW LEVEL SECURITY;

-- 1. Public Read (SELECT) Policies
DROP POLICY IF EXISTS "Public can view verified donations" ON public.donations;
CREATE POLICY "Public can view verified donations" ON public.donations
    FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Public can view approved wall messages" ON public.wall_messages;
CREATE POLICY "Public can view approved wall messages" ON public.wall_messages
    FOR SELECT USING (is_approved = TRUE);

DROP POLICY IF EXISTS "Public can view transparency reports" ON public.transparency_reports;
CREATE POLICY "Public can view transparency reports" ON public.transparency_reports
    FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Public can view programs" ON public.programs;
CREATE POLICY "Public can view programs" ON public.programs
    FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Public can view news articles" ON public.news_articles;
CREATE POLICY "Public can view news articles" ON public.news_articles
    FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Public can view daily quotes" ON public.daily_quotes;
CREATE POLICY "Public can view daily quotes" ON public.daily_quotes
    FOR SELECT USING (TRUE);

-- 2. Public Write (INSERT) Policies for Interactive Features
DROP POLICY IF EXISTS "Public can insert donations" ON public.donations;
CREATE POLICY "Public can insert donations" ON public.donations
    FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Public can submit wall messages" ON public.wall_messages;
CREATE POLICY "Public can submit wall messages" ON public.wall_messages
    FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Public can update likes on wall messages" ON public.wall_messages;
CREATE POLICY "Public can update likes on wall messages" ON public.wall_messages
    FOR UPDATE USING (TRUE) WITH CHECK (TRUE);

-- ==============================================================================
-- STORED PROCEDURE: INCREMENT WALL MESSAGE LIKE
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.increment_wall_message_like(message_id BIGINT)
RETURNS VOID AS $$
BEGIN
    UPDATE public.wall_messages
    SET likes = likes + 1
    WHERE id = message_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- ENABLE SUPABASE REALTIME REPLICATION
-- ==============================================================================
-- Allows browser clients to instantly listen to live inserts without page refresh
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'donations'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.donations;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'wall_messages'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.wall_messages;
    END IF;
END $$;

-- ==============================================================================
-- SEED DATA INSERTION
-- ==============================================================================

-- 1. Seed Programs
INSERT INTO public.programs (id, title, subtitle, category, color, short_description, full_description, target_amount, raised_amount, beneficiary_target, schedule, location, status)
VALUES
(
    'jumat-berkah',
    'Jum''at Berkah (Jumber 💌)',
    'Berbagi Makanan Bergizi & Senyuman bagi Pejuang Nafkah',
    'Rutin Mingguan',
    '#73a932',
    'Penyaluran ratusan paket makanan siap santap, air mineral, dan santunan langsung ke tangan pekerja jalanan, pemulung, pedagang kecil, dan lansia dhuafa.',
    'Program unggulan mingguan yang telah konsisten berjalan sejak 2022. Setiap Jum''at siang setelah shalat Jum''at, relawan Sobat BS menyusuri sudut-sudut jalan di Bandar Lampung dan sekitarnya.',
    120000000,
    95000000,
    '4.800+ Paket Makanan',
    'Setiap Hari Jum''at',
    'Bandar Lampung & Sekitarnya',
    'Aktif Rutin'
),
(
    'bingkisan-lebaran',
    'Paket Bingkisan Ramadhan & Lebaran 🎁',
    'Menghadirkan Kebahagiaan Hari Raya untuk Dhuafa & Yatim',
    'Program Ramadhan',
    '#0284c7',
    'Penyaluran paket sembako lengkap (beras, minyak, sirup, biskuit) dan santunan tunai menjelang Idul Fitri bagi keluarga prasejahtera dan anak yatim.',
    'Program tahunan menyambut hari raya Idul Fitri. Kami menghimpun amanah sembako berkualitas tinggi agar saudara-saudara kita di pelosok dapat merasakan suka cita lebaran yang sama.',
    50000000,
    42500000,
    '1.200+ Keluarga Penerima',
    'Bulan Ramadhan & Menjelang Idul Fitri',
    'Pelosok Lampung (Pringsewu, Pesawaran, Lampung Selatan)',
    'Tahunan'
),
(
    'qurban-kemanusiaan',
    'Qurban & Aksi Solidaritas Kemanusiaan 🐑🇵🇸',
    'Tebar Hewan Qurban Pelosok & Bantuan Darurat Kemanusiaan',
    'Qurban & Kemanusiaan',
    '#059669',
    'Penyaluran hewan qurban ke wilayah terpencil yang jarang menikmati daging qurban, serta penggalangan dana solidaritas kemanusiaan untuk bencana & Palestina.',
    'Menjangkau desa-desa pelosok Lampung yang minim shohibul qurban serta menyalurkan bantuan darurat kemanusiaan secara cepat dan transparan.',
    40000000,
    31500000,
    '850+ KK Pelosok & Mustahik',
    'Hari Raya Idul Adha & Insidental',
    'Desa Pedalaman Lampung & Titik Kemanusiaan',
    'Aktif'
),
(
    'sobat-bs-edukasi',
    'Sobat BS Community & Edukasi Berbagi 🪴',
    'Wadah Relawan Pemuda untuk Belajar, Berbagi, dan Bertumbuh',
    'Komunitas & Relawan',
    '#7c3aed',
    'Komunitas pemuda relawan yang saling menginspirasi melalui kajian rutin, penguatan mental spiritual, dan kolaborasi aksi sosial nyata.',
    'Ruang inkubasi kebaikan bagi generasi muda di Lampung untuk menumbuhkan empati sosial dan kepemimpinan berakhlak mulia.',
    15000000,
    12000000,
    '120+ Relawan Aktif',
    'Kajian Bulanan & Aksi Pekanan',
    'Basecamp Belajar Sedekah Lampung',
    'Aktif Terbuka'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    short_description = EXCLUDED.short_description;

-- 2. Seed Donations (20 Records)
INSERT INTO public.donations (id, donor_name, is_anonymous, amount, program_tag, program_name, message, location, badge, is_verified, avatar_bg, created_at)
OVERRIDING SYSTEM VALUE
VALUES
(1, 'Hamba Allah', TRUE, 50000, 'jumat-berkah', 'Jum''at Berkah (Jumber 💌)', 'Bismillah, titipan sedekah Jum’at berkah untuk pejuang nafkah di jalanan. Semoga bermanfaat.', 'Bandar Lampung', 'Terverifikasi BSI', TRUE, 'linear-gradient(135deg, #15803d, #4ade80)', NOW() - INTERVAL '2 minutes'),
(2, 'Keluarga Bpk. H. Supardi', FALSE, 250000, 'bingkisan-lebaran', 'Paket Bingkisan Lebaran 🎁', 'Semoga paket sembako ini menghadirkan kebahagiaan untuk dhuafa dan anak yatim saat lebaran.', 'Metro, Lampung', 'Terverifikasi BSI', TRUE, 'linear-gradient(135deg, #0284c7, #38bdf8)', NOW() - INTERVAL '6 minutes'),
(3, 'Sarah Nadira & Sahabat', FALSE, 100000, 'jumat-berkah', 'Jum''at Berkah (Jumber 💌)', 'Semoga lancar aksi bagi-bagi nasi berkahnya teman-teman relawan Sobat BS! Terus semangat.', 'Pringsewu', 'Terverifikasi BSI', TRUE, 'linear-gradient(135deg, #7c3aed, #c084fc)', NOW() - INTERVAL '14 minutes'),
(4, 'Hamba Allah', TRUE, 20000, 'sedekah-subuh', 'Sedekah Subuh 🌅', 'Sedekah subuh niat untuk kesehatan kedua orang tua. Aamiin ya Rabbal alamin.', 'Lampung Selatan', 'Terverifikasi BSI', TRUE, 'linear-gradient(135deg, #d97706, #fbbf24)', NOW() - INTERVAL '23 minutes'),
(5, 'Ahmad Fauzi & Rekan', FALSE, 150000, 'jumat-berkah', 'Jum''at Berkah (Jumber 💌)', 'Titipan infaq makan siang jumat berkah untuk ojol, tukang becak dan penyapu jalanan.', 'Bandar Lampung', 'Terverifikasi BSI', TRUE, 'linear-gradient(135deg, #0d9488, #2dd4bf)', NOW() - INTERVAL '35 minutes'),
(6, 'Ibu Rina Wulandari', FALSE, 500000, 'bingkisan-lebaran', 'Paket Bingkisan Lebaran 🎁', 'Infaq sembako untuk lansia prasejahtera di pelosok. Barakallahu fiikum tim Belajar Sedekah.', 'Pesawaran', 'Terverifikasi BSI', TRUE, 'linear-gradient(135deg, #e11d48, #fb7185)', NOW() - INTERVAL '48 minutes'),
(7, 'Hamba Allah', TRUE, 30000, 'jumat-berkah', 'Jum''at Berkah (Jumber 💌)', 'Niat sedekah jumat berkah untuk kelancaran rezeki dan dijauhkan dari marabahaya.', 'Tanggamus', 'Terverifikasi BSI', TRUE, 'linear-gradient(135deg, #15803d, #4ade80)', NOW() - INTERVAL '1 hour'),
(8, 'Komunitas Pemuda Hijrah', FALSE, 350000, 'qurban-kemanusiaan', 'Sedekah Qurban Pelosok 🐑', 'Tabungan sedekah qurban untuk warga pelosok pedalaman Lampung yang jarang makan daging.', 'Bandar Lampung', 'Terverifikasi BSI', TRUE, 'linear-gradient(135deg, #4f46e5, #818cf8)', NOW() - INTERVAL '2 hours'),
(9, 'Dwi Cahyo Utomo', FALSE, 50000, 'jumat-berkah', 'Jum''at Berkah (Jumber 💌)', 'Semoga berkah untuk yang menerima dan yang menyalurkan. Terimakasih Belajar Sedekah.', 'Lampung Tengah', 'Terverifikasi BSI', TRUE, 'linear-gradient(135deg, #0284c7, #38bdf8)', NOW() - INTERVAL '3 hours'),
(10, 'Hamba Allah', TRUE, 100000, 'sedekah-subuh', 'Sedekah Subuh 🌅', 'Semoga hajat keluarga diijabah oleh Allah SWT. Aamiin.', 'Bandar Lampung', 'Terverifikasi BSI', TRUE, 'linear-gradient(135deg, #d97706, #fbbf24)', NOW() - INTERVAL '4 hours'),
(11, 'Alumni SMAN 1 BDL 2018', FALSE, 600000, 'jumat-berkah', 'Jum''at Berkah (Jumber 💌)', 'Patungan teman-teman sekelas untuk 30 paket nasi Jum’at berkah bagi lansia dhuafa.', 'Bandar Lampung', 'Terverifikasi BSI', TRUE, 'linear-gradient(135deg, #15803d, #4ade80)', NOW() - INTERVAL '5 hours'),
(12, 'Hamba Allah', TRUE, 25000, 'jumat-berkah', 'Jum''at Berkah (Jumber 💌)', 'Bismillah sedekah jum’at berkah.', 'Lampung Timur', 'Terverifikasi BSI', TRUE, 'linear-gradient(135deg, #7c3aed, #c084fc)', NOW() - INTERVAL '6 hours'),
(13, 'dr. Maya Sartika', FALSE, 400000, 'bingkisan-lebaran', 'Paket Bingkisan Lebaran 🎁', 'Sedekah paket sembako untuk keluarga dhuafa dan anak yatim di Lampung.', 'Pringsewu', 'Terverifikasi BSI', TRUE, 'linear-gradient(135deg, #0d9488, #2dd4bf)', NOW() - INTERVAL '8 hours'),
(14, 'Hamba Allah', TRUE, 50000, 'jumat-berkah', 'Jum''at Berkah (Jumber 💌)', 'Untuk adik-adik pejuang nafkah di jalanan, tetap semangat.', 'Bandar Lampung', 'Terverifikasi BSI', TRUE, 'linear-gradient(135deg, #15803d, #4ade80)', NOW() - INTERVAL '10 hours'),
(15, 'Bpk. Hendra Gunawan', FALSE, 1000000, 'qurban-kemanusiaan', 'Donasi Darurat Kemanusiaan 🕊', 'Bantuan darurat kemanusiaan dan paket pangan. Semoga Allah lindungi kita semua.', 'Metro', 'Terverifikasi BSI', TRUE, 'linear-gradient(135deg, #e11d48, #fb7185)', NOW() - INTERVAL '12 hours'),
(16, 'Sobat BS Jabodetabek', FALSE, 200000, 'jumat-berkah', 'Jum''at Berkah (Jumber 💌)', 'Titipan dari perantau Lampung di Jakarta untuk aksi jumat berkah di kampung halaman tercinta.', 'Jakarta / Lampung', 'Terverifikasi BSI', TRUE, 'linear-gradient(135deg, #0284c7, #38bdf8)', NOW() - INTERVAL '14 hours'),
(17, 'Hamba Allah', TRUE, 35000, 'sedekah-subuh', 'Sedekah Subuh 🌅', 'Semoga dimudahkan segala urusan pekerjaan dan diberi kelapangan rizki.', 'Lampung Selatan', 'Terverifikasi BSI', TRUE, 'linear-gradient(135deg, #d97706, #fbbf24)', NOW() - INTERVAL '16 hours'),
(18, 'Nabila Khairunnisa', FALSE, 75000, 'jumat-berkah', 'Jum''at Berkah (Jumber 💌)', 'Semoga sedikit rezeki ini membawa kebahagiaan untuk yang menerima. Berkah selalu Sobat BS.', 'Bandar Lampung', 'Terverifikasi BSI', TRUE, 'linear-gradient(135deg, #7c3aed, #c084fc)', NOW() - INTERVAL '18 hours'),
(19, 'Keluarga Besar Alm. Bpk. Syafei', FALSE, 300000, 'bingkisan-lebaran', 'Paket Bingkisan Lebaran 🎁', 'Sedekah jariyah atas nama almarhum ayahanda tercinta. Mohon doa dari teman-teman semua.', 'Kalianda', 'Terverifikasi BSI', TRUE, 'linear-gradient(135deg, #0d9488, #2dd4bf)', NOW() - INTERVAL '20 hours'),
(20, 'Hamba Allah', TRUE, 50000, 'jumat-berkah', 'Jum''at Berkah (Jumber 💌)', 'Sedekah Jumat Berkah. Jazakumullah khairan tim Belajar Sedekah.', 'Bandar Lampung', 'Terverifikasi BSI', TRUE, 'linear-gradient(135deg, #15803d, #4ade80)', NOW() - INTERVAL '22 hours')
ON CONFLICT (id) DO NOTHING;

-- 3. Seed Transparency Reports (2023–2026)
INSERT INTO public.transparency_reports (year, incoming_amount, outgoing_amount, beneficiaries_count, document_url, document_title, status, breakdown_json)
VALUES
(
    2026,
    42500000,
    39800000,
    1450,
    'https://docs.google.com/document/d/1ATNxcU1O3NuDv2i4PcAF_Z8_66aA_tqmX0e8ol2QT3E/edit?usp=sharing',
    'LPJ Paket Bingkisan Lebaran 2026 (Google Docs)',
    'Tersedia Publik',
    '{
      "income": [
        {"source": "Infaq & Sedekah Donatur Umum via BSI", "amount": 26500000},
        {"source": "Program Khusus Bingkisan Lebaran & Sembako", "amount": 12000000},
        {"source": "Sedekah Jum’at Berkah Mingguan", "amount": 4000000}
      ],
      "expense": [
        {"category": "Penyaluran Paket Bingkisan Sembako Lebaran", "amount": 22500000},
        {"category": "Distribusi Paket Makanan Jum’at Berkah", "amount": 11300000},
        {"category": "Santunan Tunai Lansia Dhuafa & Yatim", "amount": 3800000},
        {"category": "Operasional Logistik & Kemasan", "amount": 2200000}
      ]
    }'::jsonb
),
(
    2025,
    51200000,
    48650000,
    1680,
    'https://docs.google.com/document/d/1ATNxcU1O3NuDv2i4PcAF_Z8_66aA_tqmX0e8ol2QT3E/edit?usp=sharing',
    'LPJ Tahunan Belajar Sedekah 2025 (Google Docs)',
    'Tersedia Publik',
    '{
      "income": [
        {"source": "Sedekah Jum’at Berkah Rutin", "amount": 31200000},
        {"source": "Bingkisan Idul Fitri & Ramadhan", "amount": 14000000},
        {"source": "Donasi Qurban & Tanggap Bencana", "amount": 6000000}
      ],
      "expense": [
        {"category": "Pengadaan 3.120 Paket Makanan Jumber", "amount": 28080000},
        {"category": "Distribusi 280 Paket Sembako Ramadhan", "amount": 12600000},
        {"category": "Bantuan Darurat Mustahik & Yatim", "amount": 4800000},
        {"category": "Operasional, Survei & Kemasan", "amount": 3170000}
      ]
    }'::jsonb
),
(
    2024,
    38400000,
    36900000,
    1150,
    'https://docs.google.com/document/d/1ATNxcU1O3NuDv2i4PcAF_Z8_66aA_tqmX0e8ol2QT3E/edit?usp=sharing',
    'LPJ Tahunan Belajar Sedekah 2024 (Google Docs)',
    'Tersedia Publik',
    '{
      "income": [
        {"source": "Donasi Jumber Rutin Mingguan", "amount": 24400000},
        {"source": "Sembako Ramadhan 1445 H", "amount": 11000000},
        {"source": "Infaq Sobat BS", "amount": 3000000}
      ],
      "expense": [
        {"category": "Distribusi Paket Nasi Jum’at Berkah", "amount": 22100000},
        {"category": "Bingkisan Sembako Dhuafa", "amount": 10500000},
        {"category": "Santunan Anak Yatim", "amount": 2500000},
        {"category": "Logistik & Transportasi Relawan", "amount": 1800000}
      ]
    }'::jsonb
),
(
    2023,
    13750000,
    13200000,
    520,
    'https://docs.google.com/document/d/1ATNxcU1O3NuDv2i4PcAF_Z8_66aA_tqmX0e8ol2QT3E/edit?usp=sharing',
    'LPJ Perdana Belajar Sedekah 2023 (Google Docs)',
    'Tersedia Publik',
    '{
      "income": [
        {"source": "Patungan Awal Inisiator & Teman Dekat", "amount": 7500000},
        {"source": "Donasi Terbuka Instagram @belajarsedekah.id", "amount": 6250000}
      ],
      "expense": [
        {"category": "Distribusi Nasi Bungkus Jum’at Berkah", "amount": 9600000},
        {"category": "Santunan Paket Bingkisan Lebaran", "amount": 2800000},
        {"category": "Kantong Ramah Lingkungan & Transportasi", "amount": 800000}
      ]
    }'::jsonb
)
ON CONFLICT (year) DO UPDATE SET
    incoming_amount = EXCLUDED.incoming_amount,
    outgoing_amount = EXCLUDED.outgoing_amount,
    beneficiaries_count = EXCLUDED.beneficiaries_count,
    document_url = EXCLUDED.document_url;

-- 4. Seed Wall Messages (Doa & Harapan)
INSERT INTO public.wall_messages (id, author, location, role, program_tag, message, likes, avatar_bg, is_approved)
OVERRIDING SYSTEM VALUE
VALUES
(1, 'Hamba Allah', 'Bandar Lampung', 'Donatur Rutin', 'Jum''at Berkah 💌', 'Bismillah, semoga sedikit rezeki ini menjadi jalan keberkahan untuk kita semua dan membantu saudara-saudara kita yang membutuhkan di Lampung. Aamiin.', 42, 'linear-gradient(135deg, #15803d, #4ade80)', TRUE),
(2, 'Rizky & Keluarga', 'Pringsewu, Lampung', 'Donatur Bingkisan', 'Bingkisan Lebaran 🎁', 'Semoga paket sembako ini membawa senyum bahagia untuk keluarga penerima saat hari raya. Terima kasih tim Belajar Sedekah yang amanah!', 38, 'linear-gradient(135deg, #0284c7, #38bdf8)', TRUE),
(3, 'Dimas Pratama', 'Universitas Lampung', 'Relawan Sobat BS', 'Sobat BS 🪴', 'Alhamdulillah setiap turun aksi Jumber selalu dapat pelajaran berharga tentang rasa syukur. Semangat terus seluruh pejuang kebaikan!', 56, 'linear-gradient(135deg, #7c3aed, #c084fc)', TRUE),
(4, 'Ibu Fatimah', 'Metro, Lampung', 'Donatur Qurban', 'Qurban Pelosok 🐑', 'Doa terbaik untuk adik-adik dan masyarakat di pelosok pedalaman. Semoga hewan qurban berkah dan membawa kebahagiaan berlimpah.', 29, 'linear-gradient(135deg, #d97706, #fbbf24)', TRUE),
(5, 'Sobat BS Lampung', 'Pesisir Barat', 'Relawan Aksi', 'Collabs GenRe 🕊', 'Bangga bisa berkolaborasi mengedukasi generasi muda bahwa sedekah itu bukan tentang seberapa kaya kita, tapi seberapa tulus hati kita berbagi.', 47, 'linear-gradient(135deg, #0d9488, #2dd4bf)', TRUE)
ON CONFLICT (id) DO NOTHING;

-- 5. Seed Daily Quotes
INSERT INTO public.daily_quotes (id, quote_text, source, category, narrator)
OVERRIDING SYSTEM VALUE
VALUES
(1, 'Sedekah itu tidak akan mengurangi harta. Tidak ada orang yang memberi maaf kecuali Allah akan menambah kemuliaannya.', 'HR. Muslim no. 2588', 'Keberkahan Harta', 'Abu Hurairah radhiyallahu ''anhu'),
(2, 'Bentengilah hartamu dengan zakat, obatilah orang-orang sakitmu dengan sedekah, dan persiapkanlah doa untuk menghadapi cobaan.', 'HR. Baihaqi & Thabrani', 'Penyembuh & Perlindungan', 'Ibnu Mas''ud radhiyallahu ''anhu'),
(3, 'Tangan yang di atas lebih baik daripada tangan yang di bawah. Tangan di atas adalah yang memberi, dan tangan di bawah adalah yang meminta.', 'HR. Bukhari no. 1429', 'Keutamaan Berbagi', 'Hakim bin Hizam radhiyallahu ''anhu'),
(4, 'Naungan seorang mukmin pada hari kiamat kelak adalah sedekahnya.', 'HR. Ahmad no. 18043', 'Naungan Hari Kiamat', 'Uqbah bin Amir radhiyallahu ''anhu'),
(5, 'Sedekah secara sembunyi-sembunyi dapat memadamkan kemurkaan Allah dan menolak kematian yang buruk.', 'HR. Thabrani no. 3150', 'Penolak Bala', 'Mu''awiyah bin Haidah radhiyallahu ''anhu')
ON CONFLICT (id) DO NOTHING;

-- Reset sequence counters
SELECT setval('public.donations_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.donations));
SELECT setval('public.wall_messages_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.wall_messages));
SELECT setval('public.transparency_reports_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.transparency_reports));
SELECT setval('public.daily_quotes_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.daily_quotes));
