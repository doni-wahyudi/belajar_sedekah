import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHandHoldingHeart, FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaArrowRight, 
  FaHeart, FaGift, FaGlobe, FaWhatsapp, FaShieldAlt, FaExternalLinkAlt, 
  FaCheckCircle, FaFileAlt, FaCopy, FaCheck, FaQuoteLeft, FaClock, FaQrcode
} from 'react-icons/fa';
import ScrollReveal from '../components/ScrollReveal';
import Counter from '../components/Counter';
import DailyQuotesWidget from '../components/DailyQuotesWidget';
import LiveDonationStream from '../components/LiveDonationStream';
import WallOfKindness from '../components/WallOfKindness';
import InstagramFeed from '../components/InstagramFeed';
import { programs } from '../data/programs';
import { newsArticles } from '../data/news';
import { yearlyReports, impactStats, fundAllocation } from '../data/transparency';
import './Home.css';
import './Home.cta.css';

export default function Home() {
  const [selectedPreset, setSelectedPreset] = useState(50000);
  const [copiedBSI, setCopiedBSI] = useState(false);
  const [selectedProgramCategory, setSelectedProgramCategory] = useState('all');

  const latestNews = newsArticles.slice(0, 3);
  const latestReport = yearlyReports[0]; // 2026 report

  const handleCopyBSI = () => {
    navigator.clipboard.writeText('7234856318');
    setCopiedBSI(true);
    setTimeout(() => setCopiedBSI(false), 2500);
  };

  const getImpactDescription = (amount) => {
    switch (amount) {
      case 20000:
        return '🍱 Menyediakan 1 paket nasi bungkus bergizi lengkap untuk pekerja jalanan / dhuafa di Lampung.';
      case 50000:
        return '🍱🍱 Menyediakan 2 paket nasi Jum’at Berkah lengkap dengan air mineral dan buah segar.';
      case 150000:
        return '🎁 Menyediakan 1 paket sembako lengkap (beras, minyak, gula, biskuit) untuk keluarga lansia prasejahtera.';
      case 350000:
        return '🐑 Tabungan sedekah qurban pelosok desa pedalaman Lampung & bantuan darurat kemanusiaan.';
      default:
        return '💌 Berapapun nominal yang disedekahkan menjadi berkah yang bermakna bagi mereka yang membutuhkan.';
    }
  };

  const filteredPrograms = selectedProgramCategory === 'all' 
    ? programs 
    : programs.filter(p => p.id === selectedProgramCategory);

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="home">
      {/* ========================================================
          HERO SECTION — EDITORIAL BENTO LAYOUT
          ======================================================== */}
      <section className="hero-editorial">
        <div className="container">
          <div className="hero-bento-grid">
            {/* Left: Headline & Community Mission */}
            <div className="hero-editorial-content">
              <ScrollReveal>
                <div className="hero-editorial-badge">
                  <span className="hero-badge-dot" />
                  <span className="hero-badge-text">Gerakan Sosial Pemuda Lampung • Est. 2022</span>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.08}>
                <h1 className="hero-editorial-title">
                  Bumikan Sedekah, Hangatkan Sesama di <span className="text-highlight">Lampung</span> 🪴
                </h1>
              </ScrollReveal>
              
              <ScrollReveal delay={0.15}>
                <p className="hero-editorial-desc">
                  "Berapapun, dimanapun, dan kapanpun." Gerakan kepedulian sosial yang diinisiasi oleh <strong>Despa Putri Lestari</strong> untuk menyalurkan sedekah Jum'at rutin, bingkisan Ramadhan, dan transparansi dana 100% terbuka ke publik.
                </p>
              </ScrollReveal>

              {/* Trust checkpoints */}
              <ScrollReveal delay={0.2}>
                <div className="hero-trust-row">
                  <div className="hero-trust-item">
                    <FaCheckCircle className="trust-icon-green" />
                    <span>4.800+ Paket Nasi Jumber</span>
                  </div>
                  <div className="hero-trust-item">
                    <FaCheckCircle className="trust-icon-green" />
                    <span>Rekening BSI Terverifikasi</span>
                  </div>
                  <div className="hero-trust-item">
                    <FaCheckCircle className="trust-icon-green" />
                    <span>LPJ Google Docs Terbuka</span>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.25}>
                <div className="hero-editorial-actions">
                  <Link to="/donasi" className="btn btn-primary btn-lg">
                    <FaHandHoldingHeart /> Salurkan Sedekah (BSI)
                  </Link>
                  <a href="#transparansi-dana" className="btn btn-outline btn-lg">
                    <FaShieldAlt /> Laporan Transparansi (LPJ)
                  </a>
                  <a href="https://chat.whatsapp.com/BIxQoqQQwyt1UwaApddVT7" target="_blank" rel="noopener noreferrer" className="btn btn-outline-blue btn-lg">
                    <FaUsers /> Gabung Sobat BS
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Interactive Quick Donation & Impact Bento Card */}
            <div className="hero-bento-interactive">
              <ScrollReveal delay={0.15} direction="left">
                <div className="quick-donate-card glass-card">
                  <div className="quick-donate-header">
                    <div className="quick-donate-title-wrap">
                      <span className="quick-badge">Kalkulator Kebaikan Cepat</span>
                      <h3 className="quick-donate-title">Simulasi Dampak Sedekah</h3>
                    </div>
                    <span className="bsi-verified-tag">
                      <FaCheckCircle size={11} /> Rekening Resmi BSI
                    </span>
                  </div>

                  {/* Nominal Preset Buttons */}
                  <div className="preset-grid">
                    {[
                      { amount: 20000, label: 'Rp 20.000', tag: '1 Nasi Jumber' },
                      { amount: 50000, label: 'Rp 50.000', tag: '2 Nasi + Buah' },
                      { amount: 150000, label: 'Rp 150.000', tag: '1 Paket Sembako' },
                      { amount: 350000, label: 'Rp 350.000', tag: 'Sedekah Qurban' },
                    ].map((p) => (
                      <button
                        key={p.amount}
                        type="button"
                        className={`preset-btn ${selectedPreset === p.amount ? 'active' : ''}`}
                        onClick={() => setSelectedPreset(p.amount)}
                        aria-pressed={selectedPreset === p.amount}
                      >
                        <strong className="preset-amount">{p.label}</strong>
                        <span className="preset-tag">{p.tag}</span>
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Impact Output Box */}
                  <div className="impact-preview-box">
                    <div className="impact-preview-header">
                      <span className="impact-box-label">Manfaat Nyata untuk Dhuafa:</span>
                      <span className="impact-nominal-highlight">{formatCurrency(selectedPreset)}</span>
                    </div>
                    <p className="impact-box-text">{getImpactDescription(selectedPreset)}</p>
                  </div>

                  {/* Bank BSI Account Strip with Celebratory Tooltip */}
                  <div className="bsi-copy-strip">
                    <div className="bsi-info">
                      <span className="bsi-bank-name">Bank Syariah Indonesia (BSI)</span>
                      <strong className="bsi-number">7234 8563 18</strong>
                      <span className="bsi-holder">a.n. Despa Putri Lestari</span>
                    </div>
                    <button 
                      type="button" 
                      className={`btn-copy-bsi ${copiedBSI ? 'copied' : ''}`}
                      onClick={handleCopyBSI}
                      aria-label="Salin nomor rekening BSI"
                    >
                      {copiedBSI ? (
                        <>
                          <FaCheck className="copy-icon-check" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <FaCopy />
                          <span>Salin Rekening</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="quick-donate-footer">
                    <Link to="/donasi" className="quick-donate-cta">
                      <span>Buka Halaman Donasi & QRIS Lengkap</span>
                      <FaArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          KEY IMPACT METRICS RIBBON
          ======================================================== */}
      <section className="impact-ribbon-section">
        <div className="container">
          <div className="impact-ribbon-grid">
            <ScrollReveal delay={0}>
              <div className="ribbon-card glass-card">
                <div className="ribbon-icon green">
                  <FaHeart />
                </div>
                <div className="ribbon-body">
                  <h3 className="ribbon-number"><Counter end={4800} suffix="+" /></h3>
                  <p className="ribbon-label">Paket Makanan Jumber Tersalurkan</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="ribbon-card glass-card">
                <div className="ribbon-icon blue">
                  <FaGift />
                </div>
                <div className="ribbon-body">
                  <h3 className="ribbon-number"><Counter end={1200} suffix="+" /></h3>
                  <p className="ribbon-label">Paket Bingkisan Ramadhan & Sembako</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <div className="ribbon-card glass-card">
                <div className="ribbon-icon navy">
                  <FaMapMarkerAlt />
                </div>
                <div className="ribbon-body">
                  <h3 className="ribbon-number"><Counter end={24} suffix=" Titik" /></h3>
                  <p className="ribbon-label">Wilayah Aksi Sosial di Lampung</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.24}>
              <div className="ribbon-card glass-card">
                <div className="ribbon-icon teal">
                  <FaShieldAlt />
                </div>
                <div className="ribbon-body">
                  <h3 className="ribbon-number">100%</h3>
                  <p className="ribbon-label">Amanah & LPJ Google Docs Terbuka</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========================================================
          1. FEATURED SECTION: PROGRAM KEBAIKAN (BENTO HIERARCHY)
          ======================================================== */}
      <section className="programs-section section" id="program-kebaikan">
        <div className="container">
          <ScrollReveal>
            <div className="section-kicker-wrap">
              <span className="section-kicker">
                <span className="kicker-bullet">01</span> Aksi Nyata di Lapangan
              </span>
            </div>
            <h2 className="section-title">
              Pilar Program <span className="gradient-text-green">Belajar Sedekah</span>
            </h2>
            <p className="section-subtitle">
              Penyaluran sedekah yang tepat sasaran, terjun langsung menyusuri lorong-lorong dan sudut jalanan di Lampung
            </p>
          </ScrollReveal>

          {/* Category Filter Tabs */}
          <ScrollReveal delay={0.1}>
            <div className="program-filter-bar">
              <button 
                type="button" 
                className={`program-tab-btn ${selectedProgramCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedProgramCategory('all')}
              >
                Semua Program (4)
              </button>
              <button 
                type="button" 
                className={`program-tab-btn ${selectedProgramCategory === 'jumat-berkah' ? 'active' : ''}`}
                onClick={() => setSelectedProgramCategory('jumat-berkah')}
              >
                <FaHeart size={12} /> Jum'at Berkah (Rutin)
              </button>
              <button 
                type="button" 
                className={`program-tab-btn ${selectedProgramCategory === 'bingkisan-lebaran' ? 'active' : ''}`}
                onClick={() => setSelectedProgramCategory('bingkisan-lebaran')}
              >
                <FaGift size={12} /> Bingkisan Lebaran
              </button>
              <button 
                type="button" 
                className={`program-tab-btn ${selectedProgramCategory === 'qurban-kemanusiaan' ? 'active' : ''}`}
                onClick={() => setSelectedProgramCategory('qurban-kemanusiaan')}
              >
                <FaGlobe size={12} /> Qurban & Kemanusiaan
              </button>
              <button 
                type="button" 
                className={`program-tab-btn ${selectedProgramCategory === 'sobat-bs-edukasi' ? 'active' : ''}`}
                onClick={() => setSelectedProgramCategory('sobat-bs-edukasi')}
              >
                <FaUsers size={12} /> Sobat BS Relawan
              </button>
            </div>
          </ScrollReveal>

          {/* Program Cards Grid */}
          <div className="programs-grid-clean">
            {/* Flagship Card: Jum'at Berkah Spotlight */}
            {(selectedProgramCategory === 'all' || selectedProgramCategory === 'jumat-berkah') && (
              <ScrollReveal delay={0.1}>
                <div className="program-spotlight-card glass-card">
                  <div className="spotlight-badge-row">
                    <span className="flagship-pill">⚡ PROGRAM UTAMA MINGGUAN</span>
                    <span className="routine-schedule"><FaClock size={11} /> Setiap Hari Jum’at</span>
                  </div>

                  <div className="spotlight-main-content">
                    <div className="spotlight-left">
                      <h3 className="spotlight-program-title">Jum’at Berkah (Jumber 💌)</h3>
                      <p className="spotlight-program-sub">Berbagi Makanan Bergizi & Senyuman bagi Pejuang Nafkah Jalanan</p>
                      <p className="spotlight-program-desc">
                        Aksi rutin menyusuri sudut jalanan di Lampung untuk membagikan ratusan paket makanan siap santap, air mineral, dan santunan langsung ke tangan pemulung, tukang becak, pedagang kecil, dan lansia dhuafa.
                      </p>

                      <div className="spotlight-meta-grid">
                        <div className="spotlight-meta-box">
                          <strong>4.800+ Paket</strong>
                          <span>Tersalurkan (Est. 2022)</span>
                        </div>
                        <div className="spotlight-meta-box">
                          <strong>Rp 95.000.000+</strong>
                          <span>Total Dana Penyaluran</span>
                        </div>
                        <div className="spotlight-meta-box">
                          <strong>4 Tahun</strong>
                          <span>Konsisten Berjalan</span>
                        </div>
                      </div>

                      <div className="spotlight-actions">
                        <Link to="/donasi" className="btn btn-primary">
                          <FaHandHoldingHeart /> Salurkan Nasi Jumber
                        </Link>
                        <Link to="/program#jumat-berkah" className="btn btn-outline">
                          Detail Alur Aksi <FaArrowRight size={11} />
                        </Link>
                      </div>
                    </div>

                    <div className="spotlight-right">
                      <div className="timeline-clean-box">
                        <h4 className="timeline-clean-title">Alur Aksi Tiap Pekan:</h4>
                        <ul className="timeline-step-list">
                          <li>
                            <span className="step-tag">Senin - Kamis</span>
                            <p>Penggalangan donasi & open slot sedekah Jum’at</p>
                          </li>
                          <li>
                            <span className="step-tag">Kamis Malam</span>
                            <p>Belanja bahan & persiapan konsumsi bersama relawan</p>
                          </li>
                          <li>
                            <span className="step-tag">Jum’at Pagi</span>
                            <p>Pengepakan paket nasi bergizi & briefing relawan</p>
                          </li>
                          <li>
                            <span className="step-tag highlight">Jum’at Siang</span>
                            <p>Distribusi langsung door-to-door ke jalanan di Lampung</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Other Secondary Program Cards */}
            <div className="programs-secondary-grid">
              {filteredPrograms.filter(p => p.id !== 'jumat-berkah' || selectedProgramCategory !== 'all').map((program, idx) => (
                <ScrollReveal key={program.id} delay={idx * 0.1}>
                  <div className="program-card-clean glass-card">
                    <div className="program-card-top">
                      <div className="program-icon-clean" style={{ background: program.color }}>
                        {program.id === 'bingkisan-lebaran' && <FaGift size={24} />}
                        {program.id === 'qurban-kemanusiaan' && <FaGlobe size={24} />}
                        {program.id === 'sobat-bs-edukasi' && <FaUsers size={24} />}
                        {program.id === 'jumat-berkah' && <FaHeart size={24} />}
                      </div>
                      <span className="program-category-tag">{program.subtitle}</span>
                    </div>

                    <h3 className="program-clean-title">{program.title}</h3>
                    <p className="program-clean-desc">{program.shortDescription}</p>

                    <div className="program-clean-footer">
                      <Link to="/donasi" className="btn btn-primary btn-sm flex-1">
                        <FaHandHoldingHeart /> Donasi
                      </Link>
                      <Link to={`/program#${program.id}`} className="btn btn-outline btn-sm">
                        Detail <FaArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className="programs-view-more">
            <Link to="/program" className="btn btn-outline-blue">
              Lihat Rincian Seluruh Program & Dokumentasi <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. FEATURED SECTION: TRANSPARANSI DANA & LPJ AUDIT
          ======================================================== */}
      <section className="home-transparency-section section" id="transparansi-dana">
        <div className="container">
          <ScrollReveal>
            <div className="section-kicker-wrap">
              <span className="section-kicker kicker-blue">
                <span className="kicker-bullet">02</span> Akuntabilitas & Integritas
              </span>
            </div>
            <h2 className="section-title">
              Transparansi <span className="gradient-text-blue">Pengelolaan Dana</span>
            </h2>
            <p className="section-subtitle">
              Setiap rupiah amanah donatur tercatat dan dilaporkan secara berkala melalui Laporan Pertanggungjawaban (LPJ) terbuka
            </p>
          </ScrollReveal>

          {/* 3 Metrics Cards */}
          <div className="transparency-metrics-row">
            <ScrollReveal delay={0}>
              <div className="metric-box glass-card">
                <span className="metric-box-label">Total Donasi Dikelola (2022–2026)</span>
                <h3 className="metric-box-val">{impactStats.totalDonationsReceived}</h3>
                <span className="metric-box-sub">Tercatat di pembukuan resmi</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="metric-box glass-card">
                <span className="metric-box-label">Penerima Manfaat Terbantu</span>
                <h3 className="metric-box-val"><Counter end={impactStats.totalBeneficiaries} suffix="+" /> Jiwa</h3>
                <span className="metric-box-sub">Pekerja jalanan, lansia & dhuafa</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <div className="metric-box glass-card">
                <span className="metric-box-label">Rasio Penyaluran Program</span>
                <h3 className="metric-box-val">92% Langsung ke Aksi</h3>
                <span className="metric-box-sub">Biaya operasional rendah terkontrol (8%)</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Allocation & LPJ Bento Row */}
          <div className="transparency-bento-grid">
            {/* Left: Fund Allocation Breakdown */}
            <ScrollReveal direction="right">
              <div className="allocation-clean-card glass-card">
                <div className="bento-card-header">
                  <span className="bento-badge">Alokasi Penyaluran Donasi</span>
                  <h3 className="bento-title">Penyaluran Tepat Sasaran</h3>
                </div>

                <div className="allocation-breakdown-list">
                  {fundAllocation.map((item, i) => (
                    <div key={i} className="alloc-row">
                      <div className="alloc-row-header">
                        <div className="alloc-title-group">
                          <span className="alloc-color-dot" style={{ background: item.color }} />
                          <span className="alloc-name-text">{item.name}</span>
                        </div>
                        <strong className="alloc-percentage-text" style={{ color: item.color }}>{item.percentage}%</strong>
                      </div>
                      <div className="alloc-track">
                        <div className="alloc-fill" style={{ width: `${item.percentage}%`, background: item.color }} />
                      </div>
                      <p className="alloc-detail-text">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Official Google Docs LPJ Report */}
            <ScrollReveal direction="left">
              <div className="lpj-clean-card glass-card">
                <div className="bento-card-header">
                  <span className="bento-badge badge-green">Laporan Pertanggungjawaban (LPJ)</span>
                  <h3 className="bento-title">{latestReport.documentTitle}</h3>
                </div>

                <p className="lpj-desc-text">
                  Dokumen laporan pertanggungjawaban resmi yang mencakup rekap nota belanja, rincian biaya sembako, dan dokumentasi penyerahan bantuan dapat diakses bebas oleh seluruh donatur.
                </p>

                <div className="lpj-stat-summary">
                  <div className="lpj-box-in">
                    <span>Dana Masuk {latestReport.year}</span>
                    <strong>{formatCurrency(latestReport.incoming)}</strong>
                  </div>
                  <div className="lpj-box-out">
                    <span>Dana Tersalurkan</span>
                    <strong>{formatCurrency(latestReport.outgoing)}</strong>
                  </div>
                </div>

                <div className="lpj-checkpoints">
                  <div className="check-item">
                    <FaCheckCircle className="chk-icon" />
                    <span>Rekening Resmi: <strong>Bank BSI 7234856318</strong> a.n Despa Putri Lestari</span>
                  </div>
                  <div className="check-item">
                    <FaCheckCircle className="chk-icon" />
                    <span><strong>100% Bebas Potongan Biaya Admin</strong> tersembunyi</span>
                  </div>
                  <div className="check-item">
                    <FaCheckCircle className="chk-icon" />
                    <span>Dokumentasi berkala dipublikasikan di Instagram <strong>@belajarsedekah.id</strong></span>
                  </div>
                </div>

                <div className="lpj-button-row">
                  <a 
                    href={latestReport.documentUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary flex-1"
                  >
                    <FaExternalLinkAlt size={12} /> Buka Google Docs LPJ Resmi
                  </a>
                  <Link to="/transparansi" className="btn btn-outline">
                    Dashboard Lengkap <FaArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. FEATURED SECTION: LIVE DONATION ACTIVITY FEED
          ======================================================== */}
      <LiveDonationStream />

      {/* Daily Quotes & Sedekah Reminder Widget */}
      <section className="daily-quotes-section section" style={{ paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-12)' }}>
        <div className="container">
          <ScrollReveal>
            <DailyQuotesWidget />
          </ScrollReveal>
        </div>
      </section>

      {/* About Community Section */}
      <section className="about-preview section">
        <div className="container">
          <div className="about-preview-grid">
            <ScrollReveal direction="right">
              <div className="about-preview-content">
                <div className="section-kicker-wrap" style={{ textAlign: 'left' }}>
                  <span className="section-kicker">
                    <span className="kicker-bullet">04</span> Mengenal Komunitas
                  </span>
                </div>
                <h2 className="about-preview-title">
                  Menyemai Kebaikan, <span className="gradient-text-green">Bertumbuh</span> Bersama
                </h2>
                <p className="about-preview-desc">
                  Komunitas Belajar Sedekah (@belajarsedekah.id) didirikan oleh <strong>Despa Putri Lestari</strong> pada tahun 2022 di Lampung sebagai ruang belajar bersama untuk mengamalkan sedekah secara konsisten tanpa memandang nominal.
                </p>
                <p className="about-preview-desc">
                  Seluruh dana donasi dihimpun melalui rekening resmi <strong>Bank BSI (7234856318 a.n. Despa Putri Lestari)</strong> dan dilaporkan secara terbuka melalui Laporan Pertanggungjawaban (LPJ) berkala.
                </p>
                <div className="about-values">
                  <div className="value-tag"><span className="val-icon">💎</span> 100% Transparan</div>
                  <div className="value-tag"><span className="val-icon">🪴</span> Bertumbuh Bersama</div>
                  <div className="value-tag"><span className="val-icon">🤝</span> Kolaborasi Pemuda</div>
                  <div className="value-tag"><span className="val-icon">💌</span> Jum’at Berkah</div>
                </div>
                <div className="about-actions" style={{ marginTop: 'var(--space-8)' }}>
                  <Link to="/tentang" className="btn btn-outline">
                    Profil Lengkap & Relawan <FaArrowRight />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="left">
              <div className="about-preview-visual">
                <div className="visual-card visual-card-1 glass-card">
                  <FaHeart size={32} />
                  <span>Jum'at Berkah</span>
                </div>
                <div className="visual-card visual-card-2 glass-card">
                  <FaGift size={32} />
                  <span>Bingkisan Ramadhan</span>
                </div>
                <div className="visual-card visual-card-3 glass-card">
                  <FaUsers size={32} />
                  <span>Sobat BS Lampung</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Wall of Kindness */}
      <WallOfKindness />

      {/* Latest News */}
      <section className="news-section section">
        <div className="container">
          <ScrollReveal>
            <div className="section-kicker-wrap">
              <span className="section-kicker kicker-blue">
                <span className="kicker-bullet">05</span> Kabar & Dokumentasi
              </span>
            </div>
            <h2 className="section-title">
              Dokumentasi & <span className="gradient-text-blue">Rilis Kegiatan</span>
            </h2>
            <p className="section-subtitle">
              Informasi terkini mengenai kegiatan Jumber mingguan, rilis LPJ, dan agenda kebaikan komunitas
            </p>
          </ScrollReveal>

          <div className="news-grid">
            {latestNews.map((news, index) => (
              <ScrollReveal key={news.id} delay={index * 0.1}>
                <article className="news-card glass-card">
                  <div className="news-meta">
                    <span className="news-category">{news.category}</span>
                    <span className="news-date">
                      {new Date(news.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h3 className="news-title">{news.title}</h3>
                  <p className="news-excerpt">{news.excerpt}</p>
                  <Link to={`/berita/${news.slug}`} className="news-link">
                    Baca Selengkapnya <FaArrowRight />
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <Link to="/berita" className="btn btn-outline">
              Lihat Semua Kabar & LPJ <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram Feed Showcase */}
      <InstagramFeed />

      {/* Final CTA Banner */}
      <section className="cta-section section">
        <div className="container">
          <ScrollReveal>
            <div className="cta-banner glass-card">
              <div className="cta-content">
                <h2>Mari Bumikan Sedekah Bersama Kami</h2>
                <p>
                  "Berapapun, dimanapun, dan kapanpun." Salurkan sedekah terbaikmu atau bergabung dalam komunitas Sobat BS untuk bertumbuh bersama.
                </p>
                <div className="cta-buttons">
                  <Link to="/donasi" className="btn btn-primary btn-lg">
                    <FaHandHoldingHeart /> Mulai Berdonasi (BSI)
                  </Link>
                  <a href="https://chat.whatsapp.com/BIxQoqQQwyt1UwaApddVT7" target="_blank" rel="noopener noreferrer" className="btn btn-outline-blue btn-lg">
                    <FaUsers /> Gabung Grup Sobat BS
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
