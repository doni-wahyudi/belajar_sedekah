import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaGraduationCap, FaBook, FaCheckCircle, FaArrowRight, FaUsers, FaMapMarkerAlt, FaWhatsapp, FaHandHoldingHeart } from 'react-icons/fa';
import ScrollReveal from '../components/ScrollReveal';
import { programs, recipients } from '../data/programs';
import './Programs.css';

export default function Programs() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, [location]);

  const pandawa = programs[0];
  const dropBooks = programs[1];

  return (
    <div className="programs-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <ScrollReveal>
            <h1 className="page-hero-title">
              Program <span className="gradient-text-green">Pendidikan</span> & <span className="gradient-text-blue">Sosial</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="page-hero-subtitle">
              Pendidikan adalah investasi terbaik peradaban. Kami menjalankan program beasiswa berkelanjutan
              dan penyaluran buku untuk membuka akses belajar yang merata.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Beasiswa Pandawa */}
      <section className="program-detail section" id="beasiswa-pandawa">
        <div className="container">
          <div className="program-detail-grid">
            <ScrollReveal direction="right">
              <div className="program-detail-content">
                <div className="program-detail-icon icon-green">
                  <FaGraduationCap size={38} />
                </div>
                <h2 className="program-detail-title">{pandawa.title}</h2>
                <p className="program-detail-subtitle">{pandawa.subtitle}</p>
                <div className="program-detail-text">
                  {pandawa.fullDescription.split('\n\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="program-stats-row">
                  <div className="program-stat">
                    <FaUsers className="program-stat-icon icon-color-green" />
                    <div>
                      <strong>{pandawa.stats.totalRecipients}+</strong>
                      <span>Penerima Manfaat</span>
                    </div>
                  </div>
                  <div className="program-stat">
                    <FaGraduationCap className="program-stat-icon icon-color-green" />
                    <div>
                      <strong>{pandawa.stats.totalFunding}</strong>
                      <span>Dana Tersalurkan</span>
                    </div>
                  </div>
                  <div className="program-stat">
                    <FaMapMarkerAlt className="program-stat-icon icon-color-green" />
                    <div>
                      <strong>{pandawa.stats.yearsRunning} Tahun</strong>
                      <span>Konsisten Berjalan</span>
                    </div>
                  </div>
                </div>

                <div className="program-cta-group">
                  <Link to="/donasi" className="btn btn-primary">
                    <FaHandHoldingHeart /> Dukung Penerima Beasiswa
                  </Link>
                  <Link to="/berita/pendaftaran-beasiswa-pandawa-2026" className="btn btn-outline">
                    Info Pendaftaran 2026 <FaArrowRight />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <div className="program-sidebar">
                {/* Eligibility */}
                <div className="sidebar-card glass-card">
                  <h3 className="sidebar-heading-green">Syarat Pendaftaran</h3>
                  <ul className="eligibility-list">
                    {pandawa.eligibility.map((item, i) => (
                      <li key={i}>
                        <FaCheckCircle className="check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timeline */}
                <div className="sidebar-card glass-card">
                  <h3 className="sidebar-heading-green">Tahapan Seleksi Tahunan</h3>
                  <div className="timeline-mini">
                    {pandawa.timeline.map((item, i) => (
                      <div key={i} className="timeline-item">
                        <div className="timeline-dot" />
                        <div className="timeline-content">
                          <strong>{item.month}</strong>
                          <span>{item.activity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Recipients */}
      <section className="recipients section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">Penerima Beasiswa <span className="gradient-text-green">Pandawa</span></h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="section-subtitle">Kisah inspiratif para mahasiswa dan alumni yang telah didukung melalui amanah donasi Anda</p>
          </ScrollReveal>

          <div className="recipients-grid">
            {recipients.map((person, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div className="recipient-card glass-card">
                  <div className="recipient-avatar">
                    {person.name.charAt(0)}
                  </div>
                  <h4 className="recipient-name">{person.name}</h4>
                  <p className="recipient-program">{person.program}</p>
                  <span className={`recipient-status ${person.status === 'Alumni' ? 'status-alumni' : 'status-active'}`}>
                    {person.status === 'Alumni' ? '🎓 Alumni' : '✨ Mahasiswa Aktif'}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Drop Books */}
      <section className="program-detail section" id="drop-books">
        <div className="container">
          <div className="program-detail-grid reverse">
            <ScrollReveal direction="right">
              <div className="program-sidebar">
                {/* How It Works */}
                <div className="sidebar-card glass-card">
                  <h3 className="sidebar-heading-blue">Alur Penyaluran Buku</h3>
                  <div className="how-it-works">
                    {dropBooks.howItWorks.map((item) => (
                      <div key={item.step} className="how-step">
                        <div className="how-step-number">{item.step}</div>
                        <div className="how-step-content">
                          <strong>{item.title}</strong>
                          <span>{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="sidebar-card glass-card">
                  <h3 className="sidebar-heading-blue">Capaian Literasi</h3>
                  <div className="achievement-list">
                    <div className="achievement">
                      <FaBook className="achievement-icon icon-color-blue" />
                      <div>
                        <strong>{dropBooks.stats.booksDistributed.toLocaleString()}+</strong>
                        <span>Buku Edukatif Terdistribusi</span>
                      </div>
                    </div>
                    <div className="achievement">
                      <FaMapMarkerAlt className="achievement-icon icon-color-green" />
                      <div>
                        <strong>{dropBooks.stats.locationsServed} Titik TBM & Sekolah</strong>
                        <span>Lokasi Terjangkau</span>
                      </div>
                    </div>
                    <div className="achievement">
                      <FaUsers className="achievement-icon icon-color-navy" />
                      <div>
                        <strong>{dropBooks.stats.provinces} Provinsi</strong>
                        <span>Jangkauan Penyaluran</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <div className="program-detail-content">
                <div className="program-detail-icon icon-blue">
                  <FaBook size={38} />
                </div>
                <h2 className="program-detail-title">{dropBooks.title}</h2>
                <p className="program-detail-subtitle">{dropBooks.subtitle}</p>
                <div className="program-detail-text">
                  {dropBooks.fullDescription.split('\n\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="program-cta-group">
                  <Link to="/donasi" className="btn btn-secondary">
                    <FaBook /> Donasikan Buku / Dana
                  </Link>
                  <a
                    href="https://wa.me/6281234567890?text=Halo%20Komunitas%20Belajar%20Sedekah,%20saya%20ingin%20mengirimkan%20donasi%20buku%20untuk%20program%20Drop%20Books."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-blue"
                  >
                    <FaWhatsapp /> Koordinasi Donasi Buku
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
