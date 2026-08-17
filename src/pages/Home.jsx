import { Link } from 'react-router-dom';
import { FaHandHoldingHeart, FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaArrowRight, FaHeart, FaGift, FaGlobe, FaWhatsapp, FaTiktok, FaInstagram } from 'react-icons/fa';
import ScrollReveal from '../components/ScrollReveal';
import Counter from '../components/Counter';
import DailyQuotesWidget from '../components/DailyQuotesWidget';
import WallOfKindness from '../components/WallOfKindness';
import InstagramFeed from '../components/InstagramFeed';
import { programs } from '../data/programs';
import { newsArticles } from '../data/news';
import './Home.css';
import './Home.cta.css';

export default function Home() {
  const latestNews = newsArticles.slice(0, 3);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-particles">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="particle" style={{
                left: `${(i * 17) % 100}%`,
                top: `${(i * 23) % 100}%`,
                animationDelay: `${(i * 0.4) % 5}s`,
                animationDuration: `${4 + (i % 4)}s`,
                width: `${3 + (i % 4)}px`,
                height: `${3 + (i % 4)}px`,
                background: i % 2 === 0 ? 'rgba(141, 198, 63, 0.4)' : 'rgba(56, 189, 248, 0.35)'
              }} />
            ))}
          </div>
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
        </div>

        <div className="container hero-content">
          <ScrollReveal>
            <span className="hero-badge">
              <FaHandHoldingHeart className="badge-icon" /> Est. 2022 • Lampung 🇲🇨 • @belajarsedekah.id
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h1 className="hero-title">
              Temanmu <span className="gradient-text-green">Belajar</span>, Berbagi & <span className="gradient-text-blue">Bertumbuh</span> 🪴
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="hero-description">
              "Mari bumikan sedekah, berapapun, dimanapun dan kapanpun." Komunitas gerakan sosial pemuda di Lampung
              yang rutin menghadirkan Jum'at Berkah (Jumber 💌), Paket Bingkisan Lebaran, dan aksi kemanusiaan.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <div className="hero-actions">
              <Link to="/donasi" className="btn btn-primary btn-lg">
                <FaHandHoldingHeart /> Salurkan Sedekah (BSI)
              </Link>
              <a href="https://chat.whatsapp.com/BIxQoqQQwyt1UwaApddVT7" target="_blank" rel="noopener noreferrer" className="btn btn-outline-blue btn-lg">
                <FaUsers /> Gabung Sobat BS
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="stats section">
        <div className="container">
          <div className="stats-grid">
            <ScrollReveal delay={0}>
              <div className="stat-card">
                <div className="stat-icon stat-icon-green">
                  <FaHeart />
                </div>
                <div className="stat-number">
                  <Counter end={4800} suffix="+" />
                </div>
                <div className="stat-label">Paket Makanan Jumber Tersalurkan</div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="stat-card">
                <div className="stat-icon stat-icon-blue">
                  <FaGift />
                </div>
                <div className="stat-number">
                  <Counter end={1200} suffix="+" />
                </div>
                <div className="stat-label">Paket Bingkisan Ramadhan & Sembako</div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="stat-card">
                <div className="stat-icon stat-icon-navy">
                  <FaMapMarkerAlt />
                </div>
                <div className="stat-number">
                  <Counter end={24} suffix=" Titik" />
                </div>
                <div className="stat-label">Wilayah Aksi Sosial di Lampung</div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <div className="stat-card">
                <div className="stat-icon stat-icon-teal">
                  <FaCalendarAlt />
                </div>
                <div className="stat-number">
                  <Counter end={4} suffix=" Tahun" />
                </div>
                <div className="stat-label">Konsisten Mengabdi (Est. 2022)</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Daily Quotes & Sedekah Reminder Widget */}
      <section className="daily-quotes-section section" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-16)' }}>
        <div className="container">
          <ScrollReveal>
            <DailyQuotesWidget />
          </ScrollReveal>
        </div>
      </section>

      {/* Programs Section */}
      <section className="programs-section section">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">
              Program <span className="gradient-text-green">Kebaikan</span> Belajar Sedekah
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="section-subtitle">
              Aksi sosial nyata yang menyentuh langsung kehidupan masyarakat prasejahtera di lapangan
            </p>
          </ScrollReveal>

          <div className="programs-grid">
            {programs.map((program, index) => (
              <ScrollReveal key={program.id} delay={index * 0.15} direction={index % 2 === 0 ? 'right' : 'left'}>
                <div className="program-card glass-card">
                  <div className="program-icon program-icon-green">
                    {program.id === 'jumat-berkah' && <FaHeart size={30} />}
                    {program.id === 'bingkisan-lebaran' && <FaGift size={30} />}
                    {program.id === 'qurban-kemanusiaan' && <FaGlobe size={30} />}
                    {program.id === 'sobat-bs-edukasi' && <FaUsers size={30} />}
                  </div>
                  <h3 className="program-title">{program.title}</h3>
                  <p className="program-subtitle">{program.subtitle}</p>
                  <p className="program-desc">{program.shortDescription}</p>
                  <Link to={`/program#${program.id}`} className="program-link">
                    Lihat Rincian Aksi <FaArrowRight />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview section">
        <div className="container">
          <div className="about-preview-grid">
            <ScrollReveal direction="right">
              <div className="about-preview-content">
                <span className="about-badge">Tentang Komunitas</span>
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
                <div className="visual-card visual-card-1">
                  <FaHeart size={36} />
                  <span>Jum'at Berkah</span>
                </div>
                <div className="visual-card visual-card-2">
                  <FaGift size={36} />
                  <span>Bingkisan Ramadhan</span>
                </div>
                <div className="visual-card visual-card-3">
                  <FaUsers size={36} />
                  <span>Sobat BS Lampung</span>
                </div>
                <div className="visual-glow" />
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
            <h2 className="section-title">
              Kabar & <span className="gradient-text-blue">Dokumentasi Aksi</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="section-subtitle">
              Informasi terkini mengenai rilis LPJ, kegiatan Jumber mingguan, dan kolaborasi kepemudaan
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

      {/* CTA Banner */}
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
