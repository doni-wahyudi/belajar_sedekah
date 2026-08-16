import { Link } from 'react-router-dom';
import { FaGraduationCap, FaBook, FaHandHoldingHeart, FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaArrowRight, FaShieldAlt } from 'react-icons/fa';
import ScrollReveal from '../components/ScrollReveal';
import Counter from '../components/Counter';
import { programs } from '../data/programs';
import { newsArticles } from '../data/news';
import './Home.css';

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
              <FaHandHoldingHeart className="badge-icon" /> Komunitas Sosial & Edukasi Indonesia
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h1 className="hero-title">
              Dengan <span className="gradient-text-green">Berbagi</span>,<br />
              Kita <span className="gradient-text-blue">Peduli</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="hero-description">
              Komunitas Belajar Sedekah mengabdi untuk pemerataan akses pendidikan di Indonesia.
              Melalui program beasiswa mahasiswa berprestasi dan distribusi ribuan buku ke pelosok nusantara.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <div className="hero-actions">
              <Link to="/donasi" className="btn btn-primary btn-lg">
                <FaHandHoldingHeart /> Mulai Berdonasi
              </Link>
              <Link to="/program" className="btn btn-outline-blue btn-lg">
                Jelajahi Program <FaArrowRight />
              </Link>
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
                  <FaGraduationCap />
                </div>
                <div className="stat-number">
                  <Counter end={28} suffix="+" />
                </div>
                <div className="stat-label">Penerima Beasiswa Pandawa</div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="stat-card">
                <div className="stat-icon stat-icon-blue">
                  <FaBook />
                </div>
                <div className="stat-number">
                  <Counter end={5000} suffix="+" />
                </div>
                <div className="stat-label">Buku Terdistribusi</div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="stat-card">
                <div className="stat-icon stat-icon-navy">
                  <FaMapMarkerAlt />
                </div>
                <div className="stat-number">
                  <Counter end={15} suffix=" Titik" />
                </div>
                <div className="stat-label">Wilayah & Sekolah Binaan</div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <div className="stat-card">
                <div className="stat-icon stat-icon-teal">
                  <FaCalendarAlt />
                </div>
                <div className="stat-number">
                  <Counter end={6} suffix=" Tahun" />
                </div>
                <div className="stat-label">Bergerak Sejak 2020</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="programs-section section">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">
              Program <span className="gradient-text-green">Utama</span> Kami
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="section-subtitle">
              Fokus pengabdian yang terarah untuk mencerdaskan generasi penerus bangsa
            </p>
          </ScrollReveal>

          <div className="programs-grid">
            {programs.map((program, index) => (
              <ScrollReveal key={program.id} delay={index * 0.15} direction={index === 0 ? 'right' : 'left'}>
                <div className="program-card glass-card">
                  <div className={`program-icon ${program.id === 'beasiswa-pandawa' ? 'program-icon-green' : 'program-icon-blue'}`}>
                    {program.icon === 'graduation' ? <FaGraduationCap size={32} /> : <FaBook size={32} />}
                  </div>
                  <h3 className="program-title">{program.title}</h3>
                  <p className="program-subtitle">{program.subtitle}</p>
                  <p className="program-desc">{program.shortDescription}</p>
                  <Link to={`/program#${program.id}`} className="program-link">
                    Lihat Rincian Program <FaArrowRight />
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
                <span className="about-badge">Mengenal Lebih Dekat</span>
                <h2 className="about-preview-title">
                  Menyalakan Harapan Melalui <span className="gradient-text-green">Pendidikan</span>
                </h2>
                <p className="about-preview-desc">
                  Komunitas Belajar Sedekah (@belajarsedekah.id) didirikan oleh <strong>Despa Putri Lestari</strong> pada tahun 2020 sebagai gerakan sosial kemanusiaan untuk membuka akses pendidikan dan memperluas jendela literasi bagi anak-anak Indonesia.
                </p>
                <p className="about-preview-desc">
                  Setiap rupiah donasi disalurkan 100% tepat sasaran dan dilaporkan secara transparan dan terbuka kepada publik dan seluruh donatur dermawan.
                </p>
                <div className="about-values">
                  <div className="value-tag"><span className="val-icon">🎓</span> Pendidikan Merata</div>
                  <div className="value-tag"><span className="val-icon">💎</span> 100% Transparan</div>
                  <div className="value-tag"><span className="val-icon">🤝</span> Kolaborasi Relawan</div>
                  <div className="value-tag"><span className="val-icon">🌱</span> Berkelanjutan</div>
                </div>
                <div className="about-actions" style={{ marginTop: 'var(--space-8)' }}>
                  <Link to="/tentang" className="btn btn-outline">
                    Tentang Kami & Tim <FaArrowRight />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="left">
              <div className="about-preview-visual">
                <div className="visual-card visual-card-1">
                  <FaGraduationCap size={36} />
                  <span>Beasiswa Kuliah</span>
                </div>
                <div className="visual-card visual-card-2">
                  <FaBook size={36} />
                  <span>Drop Books</span>
                </div>
                <div className="visual-card visual-card-3">
                  <FaUsers size={36} />
                  <span>Jaringan Relawan</span>
                </div>
                <div className="visual-glow" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="news-section section">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">
              Kabar & <span className="gradient-text-blue">Pengumuman</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="section-subtitle">
              Informasi terkini mengenai seleksi beasiswa, penyaluran donasi buku, dan laporan kegiatan
            </p>
          </ScrollReveal>

          <div className="news-grid">
            {latestNews.map((news, index) => (
              <ScrollReveal key={news.id} delay={index * 0.1}>
                <article className="news-card glass-card">
                  <div className="news-meta">
                    <span className={`news-category ${news.category === 'Pengumuman' ? 'cat-announcement' : news.category === 'Laporan' ? 'cat-report' : 'cat-news'}`}>
                      {news.category}
                    </span>
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

          <ScrollReveal delay={0.3}>
            <div className="news-more">
              <Link to="/berita" className="btn btn-outline-blue">
                Lihat Seluruh Berita & Laporan <FaArrowRight />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Donation CTA */}
      <section className="donation-cta section">
        <div className="cta-bg">
          <div className="cta-orb cta-orb-1" />
          <div className="cta-orb cta-orb-2" />
        </div>
        <div className="container">
          <ScrollReveal>
            <div className="cta-content">
              <h2 className="cta-title">Dengan Berbagi, Kita Peduli</h2>
              <p className="cta-description">
                Uluran tangan Anda hari ini adalah masa depan bagi generasi penerus bangsa.
                Mari bersama memperluas kebermanfaatan.
              </p>
              <div className="cta-actions">
                <Link to="/donasi" className="btn btn-white btn-lg">
                  <FaHandHoldingHeart style={{ color: 'var(--color-primary)' }} /> Salurkan Donasi
                </Link>
                <Link to="/transparansi" className="btn btn-outline-white btn-lg">
                  <FaShieldAlt /> Transparansi Dana
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
