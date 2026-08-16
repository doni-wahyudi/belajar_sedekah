import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaHeart, FaGift, FaGlobe, FaUsers, FaCheckCircle, FaArrowRight, FaMapMarkerAlt, FaWhatsapp, FaHandHoldingHeart } from 'react-icons/fa';
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

  return (
    <div className="programs-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <ScrollReveal>
            <h1 className="page-hero-title">
              Program <span className="gradient-text-green">Kebaikan</span> & Aksi <span className="gradient-text-blue">Sosial</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="page-hero-subtitle">
              "Mari bumikan sedekah, berapapun, dimanapun dan kapanpun." Kami menggerakkan aksi rutin Jum'at Berkah,
              bingkisan Ramadhan, tebar qurban, dan pemberdayaan komunitas Sobat BS di Lampung.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Program 1: Jum'at Berkah */}
      <section className="program-detail section" id="jumat-berkah">
        <div className="container">
          <div className="program-detail-grid">
            <ScrollReveal direction="right">
              <div className="program-detail-content">
                <div className="program-detail-icon icon-green">
                  <FaHeart size={38} />
                </div>
                <h2 className="program-detail-title">{programs[0].title}</h2>
                <p className="program-detail-subtitle">{programs[0].subtitle}</p>
                <div className="program-detail-text">
                  {programs[0].fullDescription.split('\n\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="program-stats-row">
                  <div className="program-stat">
                    <FaUsers className="program-stat-icon icon-color-green" />
                    <div>
                      <strong>{programs[0].stats.totalRecipients}+</strong>
                      <span>Paket Makanan Dibagikan</span>
                    </div>
                  </div>
                  <div className="program-stat">
                    <FaHandHoldingHeart className="program-stat-icon icon-color-green" />
                    <div>
                      <strong>{programs[0].stats.totalFunding}</strong>
                      <span>Dana Tersalurkan</span>
                    </div>
                  </div>
                  <div className="program-stat">
                    <FaMapMarkerAlt className="program-stat-icon icon-color-green" />
                    <div>
                      <strong>{programs[0].stats.yearsRunning} Tahun</strong>
                      <span>Konsisten Berjalan</span>
                    </div>
                  </div>
                </div>

                <div className="program-cta-group">
                  <Link to="/donasi" className="btn btn-primary">
                    <FaHandHoldingHeart /> Sedekah Jum'at Sekarang
                  </Link>
                  <a href="https://chat.whatsapp.com/BIxQoqQQwyt1UwaApddVT7" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    <FaUsers /> Ikut Jadi Relawan Jumber
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <div className="program-sidebar">
                <div className="sidebar-card glass-card">
                  <h3 className="sidebar-heading-green">Sasaran Penerima Manfaat</h3>
                  <ul className="eligibility-list">
                    {programs[0].eligibility.map((item, i) => (
                      <li key={i}>
                        <FaCheckCircle className="check-icon icon-color-green" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sidebar-card glass-card">
                  <h3 className="sidebar-heading-green">Timeline Aksi Mingguan</h3>
                  <div className="timeline-mini">
                    {programs[0].timeline.map((t, i) => (
                      <div key={i} className="timeline-mini-item">
                        <div className="timeline-mini-dot dot-green" />
                        <div>
                          <strong>{t.month}</strong>
                          <p>{t.activity}</p>
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

      {/* Program 2: Paket Bingkisan Lebaran */}
      <section className="program-detail section section-alt" id="bingkisan-lebaran" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="program-detail-grid program-detail-reversed">
            <ScrollReveal direction="left">
              <div className="program-detail-content">
                <div className="program-detail-icon icon-blue">
                  <FaGift size={38} />
                </div>
                <h2 className="program-detail-title">{programs[1].title}</h2>
                <p className="program-detail-subtitle">{programs[1].subtitle}</p>
                <div className="program-detail-text">
                  {programs[1].fullDescription.split('\n\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="how-it-works-grid">
                  {programs[1].howItWorks.map((step) => (
                    <div key={step.step} className="how-step-card glass-card">
                      <div className="step-number step-number-blue">{step.step}</div>
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="program-cta-group" style={{ marginTop: 'var(--space-6)' }}>
                  <Link to="/donasi" className="btn btn-primary">
                    <FaHandHoldingHeart /> Donasi Paket Bingkisan
                  </Link>
                  <Link to="/transparansi" className="btn btn-outline-blue">
                    Lihat LPJ Resmi Lebaran <FaArrowRight />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="program-sidebar">
                <div className="sidebar-card glass-card">
                  <h3 className="sidebar-heading-blue">Rincian Isi Bingkisan</h3>
                  <ul className="eligibility-list">
                    <li><FaCheckCircle className="check-icon icon-color-blue" /> <span>Beras Premium 5kg</span></li>
                    <li><FaCheckCircle className="check-icon icon-color-blue" /> <span>Minyak Goreng 2 Liter</span></li>
                    <li><FaCheckCircle className="check-icon icon-color-blue" /> <span>Gula Pasir & Teh Celup</span></li>
                    <li><FaCheckCircle className="check-icon icon-color-blue" /> <span>Biskuit Kaleng & Sirup Lebaran</span></li>
                    <li><FaCheckCircle className="check-icon icon-color-blue" /> <span>Santunan Tunai Hari Raya</span></li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Program 3: Qurban & Kemanusiaan */}
      <section className="program-detail section" id="qurban-kemanusiaan">
        <div className="container">
          <div className="program-detail-grid">
            <ScrollReveal direction="right">
              <div className="program-detail-content">
                <div className="program-detail-icon icon-green">
                  <FaGlobe size={38} />
                </div>
                <h2 className="program-detail-title">{programs[2].title}</h2>
                <p className="program-detail-subtitle">{programs[2].subtitle}</p>
                <div className="program-detail-text">
                  {programs[2].fullDescription.split('\n\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="how-it-works-grid">
                  {programs[2].howItWorks.map((step) => (
                    <div key={step.step} className="how-step-card glass-card">
                      <div className="step-number step-number-green">{step.step}</div>
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="program-cta-group" style={{ marginTop: 'var(--space-6)' }}>
                  <Link to="/donasi" className="btn btn-primary">
                    <FaHandHoldingHeart /> Ikut Sedekah Qurban / Kemanusiaan
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="recipients-section section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">Suara <span className="gradient-text-green">Penerima Manfaat</span> & Relawan</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="section-subtitle">Kisah tulus dari mereka yang tersentuh oleh kebaikan para donatur dermawan</p>
          </ScrollReveal>

          <div className="recipients-grid">
            {recipients.map((rec, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="recipient-card glass-card">
                  <div className="recipient-header">
                    <div className="recipient-avatar">
                      {rec.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="recipient-name">{rec.name}</h4>
                      <span className="recipient-uni">{rec.university} • {rec.major}</span>
                      <span className="recipient-batch badge-batch">{rec.batch}</span>
                    </div>
                  </div>
                  <p className="recipient-quote">"{rec.quote}"</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
