import { FaWhatsapp, FaInstagram, FaTiktok, FaHeart, FaMapMarkerAlt, FaUsers, FaShieldAlt } from 'react-icons/fa';
import { HiLightBulb, HiEye, HiSparkles } from 'react-icons/hi';
import ScrollReveal from '../components/ScrollReveal';
import { teamMembers, milestones, values } from '../data/team';
import './About.css';

const valueIcons = {
  transparency: '💎',
  education: '🌱',
  community: '🪴',
  sustainability: '🤝',
};

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <ScrollReveal>
            <div className="section-kicker-wrap">
              <span className="section-kicker">
                <span className="kicker-bullet">🪴</span> Gerakan Pemuda Lampung
              </span>
            </div>
            <h1 className="page-hero-title">
              Tentang <span className="gradient-text-green">Komunitas</span> Belajar <span className="gradient-text-blue">Sedekah</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="page-hero-subtitle">
              Mengenal lebih dekat visi kemanusiaan, ketulusan relawan, dan rekam jejak dedikasi sosial yang diinisiasi oleh <strong>Despa Putri Lestari</strong> di Lampung sejak tahun 2022.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Asymmetrical Story & Pillars Bento (Anti-AI-Slop) */}
      <section className="vision-section section">
        <div className="container">
          <div className="story-pillars-bento">
            {/* Left Col: Founder & Philosophy Spotlight Card */}
            <ScrollReveal direction="right" className="bento-story-col">
              <div className="story-spotlight-card glass-card">
                <div className="story-badge-row">
                  <span className="story-pill">FILOSOFI & INSPIRASI GERAKAN</span>
                  <span className="founder-tag">Inisiator: Despa Putri Lestari</span>
                </div>

                <div className="story-body">
                  <h3 className="story-tagline">
                    "Temanmu belajar, berbagi dan bertumbuh setiap hari 🪴"
                  </h3>
                  <p className="story-paragraph">
                    Komunitas Belajar Sedekah lahir dari kesederhanaan niat di sudut kota Bandar Lampung pada tahun 2022. Kami meyakini bahwa sedekah bukanlah tentang menunggu diri berkelebihan, melainkan tentang <strong>kebiasaan membahagiakan orang lain</strong> tanpa memandang nominal.
                  </p>
                  <p className="story-paragraph">
                    Setiap rupiah yang dititipkan oleh para donatur dikelola dengan prinsip <strong>100% amanah, tanpa potongan tersembunyi</strong>, dan dilaporkan secara terbuka melalui Laporan Pertanggungjawaban (LPJ) berkala di Google Docs.
                  </p>
                </div>

                <div className="story-footer-chips">
                  <span className="story-chip">📍 Berbasis di Lampung</span>
                  <span className="story-chip">💌 Rutin Jum'at Berkah</span>
                  <span className="story-chip">💎 100% Transparan</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Col: Visi & Misi Stacked Cards */}
            <div className="bento-pillars-stack">
              <ScrollReveal delay={0.1}>
                <div className="pillar-card glass-card">
                  <div className="pillar-header">
                    <div className="pillar-icon-box icon-green">
                      <HiEye size={24} />
                    </div>
                    <div>
                      <h4 className="pillar-title">Visi Utama Komunitas</h4>
                      <span className="pillar-sub">Arah Gerak Kebaikan</span>
                    </div>
                  </div>
                  <p className="pillar-desc">
                    Menjadi ruang belajar dan bertumbuh bersama dalam membumikan sedekah, merangkul generasi muda untuk peduli, serta menghadirkan kebahagiaan nyata bagi dhuafa di Lampung dan sekitarnya.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="pillar-card glass-card">
                  <div className="pillar-header">
                    <div className="pillar-icon-box icon-blue">
                      <HiLightBulb size={24} />
                    </div>
                    <div>
                      <h4 className="pillar-title">Misi Mulia Kami</h4>
                      <span className="pillar-sub">5 Langkah Konkret</span>
                    </div>
                  </div>
                  <ul className="pillar-misi-list">
                    <li>Membiasakan sedekah tanpa batas: berapapun, dimanapun, dan kapanpun.</li>
                    <li>Melaksanakan aksi rutin Jum'at Berkah (Jumber 💌) bagi pekerja jalanan di Lampung.</li>
                    <li>Menyalurkan Paket Bingkisan Ramadhan & Lebaran bagi lansia dhuafa & yatim.</li>
                    <li>Membina wadah relawan pemuda Sobat BS untuk bertumbuh bersama.</li>
                    <li>Menjaga tata kelola donasi 100% amanah dengan LPJ terbuka di Google Docs.</li>
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-kicker-wrap">
              <span className="section-kicker">
                <span className="kicker-bullet">01</span> Nilai & Prinsip
              </span>
            </div>
            <h2 className="section-title">Nilai-Nilai <span className="gradient-text-green">Integritas</span></h2>
            <p className="section-subtitle">Empat pilar nilai yang menuntun langkah relawan Sobat BS dalam setiap aksi sosial di lapangan</p>
          </ScrollReveal>

          <div className="values-grid">
            {values.map((value, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="value-card glass-card">
                  <span className="value-emoji">{valueIcons[value.icon]}</span>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section section">
        <div className="container">
          <ScrollReveal>
            <div className="section-kicker-wrap">
              <span className="section-kicker kicker-blue">
                <span className="kicker-bullet">02</span> Rekam Jejak
              </span>
            </div>
            <h2 className="section-title">Jejak Langkah <span className="gradient-text-blue">Pengabdian</span></h2>
            <p className="section-subtitle">Perjalanan sejak tahun 2022 merajut asa bersama donatur, relawan, dan para penerima manfaat di Lampung</p>
          </ScrollReveal>

          <div className="timeline">
            {milestones.map((milestone, index) => (
              <ScrollReveal key={index} delay={index * 0.08} direction={index % 2 === 0 ? 'right' : 'left'}>
                <div className={`timeline-entry ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}>
                  <div className="timeline-marker">
                    <div className="timeline-year-badge">{milestone.year}</div>
                  </div>
                  <div className="timeline-card glass-card">
                    <h4>{milestone.title}</h4>
                    <p>{milestone.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            <div className="timeline-line" />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-kicker-wrap">
              <span className="section-kicker">
                <span className="kicker-bullet">03</span> Penggerak Komunitas
              </span>
            </div>
            <h2 className="section-title">Struktur <span className="gradient-text-green">Relawan & Tim</span></h2>
            <p className="section-subtitle">Sinergi relawan dan pengurus yang mendedikasikan waktu dan tenaga demi kelancaran seluruh aksi sosial</p>
          </ScrollReveal>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="team-card glass-card">
                  <div className="team-avatar">
                    {member.name.charAt(0)}
                  </div>
                  <h4 className="team-name">{member.name}</h4>
                  <span className="team-role">{member.role}</span>
                  <p className="team-desc">{member.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section section">
        <div className="container">
          <ScrollReveal>
            <div className="section-kicker-wrap">
              <span className="section-kicker kicker-blue">
                <span className="kicker-bullet">04</span> Narahubung Resmi
              </span>
            </div>
            <h2 className="section-title">Kanal <span className="gradient-text-blue">Komunikasi Resmi</span></h2>
            <p className="section-subtitle">Hubungi narahubung resmi kami untuk konfirmasi donasi, info relawan, atau ajakan kolaborasi</p>
          </ScrollReveal>

          <div className="contact-grid">
            <ScrollReveal>
              <a href="https://wa.me/6282269665134" target="_blank" rel="noopener noreferrer" className="contact-card glass-card">
                <FaWhatsapp className="contact-card-icon icon-color-green" />
                <h4>WhatsApp Admin</h4>
                <p>0822-6966-5134 (Narahubung)</p>
              </a>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <a href="https://www.instagram.com/belajarsedekah.id/" target="_blank" rel="noopener noreferrer" className="contact-card glass-card">
                <FaInstagram className="contact-card-icon icon-color-blue" />
                <h4>Instagram Resmi</h4>
                <p>@belajarsedekah.id</p>
              </a>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <a href="https://vt.tiktok.com/ZS2JAStEo/" target="_blank" rel="noopener noreferrer" className="contact-card glass-card">
                <FaTiktok className="contact-card-icon icon-color-navy" />
                <h4>TikTok Komunitas</h4>
                <p>@belajarsedekah.id</p>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
