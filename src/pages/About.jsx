import { FaWhatsapp, FaInstagram, FaTiktok, FaHeart, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
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
            <h1 className="page-hero-title">
              Tentang <span className="gradient-text-green">Komunitas</span> Belajar <span className="gradient-text-blue">Sedekah</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="page-hero-subtitle">
              Mengenal lebih dekat visi kemanusiaan, ketulusan relawan, dan rekam jejak dedikasi
              kami yang diinisiasi oleh <strong>Despa Putri Lestari</strong> di Lampung sejak tahun 2022.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision Mission */}
      <section className="vision-section section">
        <div className="container">
          <div className="vision-grid">
            <ScrollReveal>
              <div className="vision-card glass-card">
                <div className="vision-icon-wrapper icon-green">
                  <HiEye size={32} />
                </div>
                <h3>Visi Utama</h3>
                <p>
                  Menjadi ruang belajar dan bertumbuh bersama dalam membumikan sedekah, merangkul generasi muda untuk peduli, serta menghadirkan kebahagiaan nyata bagi dhuafa di Lampung dan sekitarnya.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="vision-card glass-card">
                <div className="vision-icon-wrapper icon-blue">
                  <HiLightBulb size={32} />
                </div>
                <h3>Misi Mulia</h3>
                <ul>
                  <li>Membiasakan sedekah tanpa batas: berapapun, dimanapun, dan kapanpun.</li>
                  <li>Melaksanakan aksi rutin mingguan Jum'at Berkah (Jumber 💌) bagi pejuang nafkah jalanan.</li>
                  <li>Menyalurkan Paket Bingkisan Ramadhan & Lebaran bagi keluarga prasejahtera dan yatim.</li>
                  <li>Membina komunitas pemuda Sobat BS untuk belajar, berbagi, dan bertumbuh bersama.</li>
                  <li>Menerapkan tata kelola donasi 100% amanah dengan LPJ transparan dan terbuka.</li>
                </ul>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="vision-card glass-card">
                <div className="vision-icon-wrapper icon-navy">
                  <HiSparkles size={32} />
                </div>
                <h3>Filosofi & Tagline</h3>
                <p className="tagline-text">
                  "Temanmu belajar, berbagi dan bertumbuh setiap hari 🪴"
                </p>
                <p>
                  Setiap langkah kecil kebaikan yang ditanam bersama-sama dengan niat ikhlas akan tumbuh menjadi pohon kebaikan yang menaungi dan memberi manfaat luas bagi sesama.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">Nilai-Nilai <span className="gradient-text-green">Integritas</span></h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="section-subtitle">Empat pilar nilai yang menuntun langkah relawan Sobat BS dalam setiap aksi sosial</p>
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
            <h2 className="section-title">Jejak Langkah <span className="gradient-text-blue">Pengabdian</span></h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
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
            <h2 className="section-title">Struktur <span className="gradient-text-green">Penggerak</span> Komunitas</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="section-subtitle">Sinergi relawan dan tim yang mendedikasikan waktu dan tenaga demi kelancaran seluruh aksi sosial</p>
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
            <h2 className="section-title">Kanal <span className="gradient-text-blue">Komunikasi Resmi</span></h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
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
              <a href="https://chat.whatsapp.com/BIxQoqQQwyt1UwaApddVT7" target="_blank" rel="noopener noreferrer" className="contact-card glass-card">
                <FaUsers className="contact-card-icon icon-color-navy" />
                <h4>Grup WhatsApp</h4>
                <p>Keluarga Sobat BS</p>
              </a>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <a href="https://vt.tiktok.com/ZS2JAStEo/" target="_blank" rel="noopener noreferrer" className="contact-card glass-card">
                <FaTiktok className="contact-card-icon icon-color-blue" />
                <h4>TikTok</h4>
                <p>@belajarsedekah.id</p>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
