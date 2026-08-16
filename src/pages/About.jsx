import { FaEnvelope, FaInstagram, FaFacebookF, FaTwitter, FaHeart } from 'react-icons/fa';
import { HiLightBulb, HiEye, HiSparkles } from 'react-icons/hi';
import ScrollReveal from '../components/ScrollReveal';
import { teamMembers, milestones, values } from '../data/team';
import './About.css';

const valueIcons = {
  transparency: '💎',
  education: '🎓',
  community: '🤝',
  sustainability: '🌱',
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
              Mengenal lebih dekat visi kemanusiaan, dedikasi relawan, dan rekam jejak pengabdian
              kami dalam pemerataan pendidikan sejak tahun 2017.
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
                  Menjadi komunitas sosial edukasi terdepan dan terpercaya di Indonesia yang berkontribusi nyata
                  dalam menghapus hambatan ekonomi demi pemerataan akses pendidikan berkualitas.
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
                  <li>Menyalurkan beasiswa tepat sasaran bagi mahasiswa berprestasi prasejahtera.</li>
                  <li>Mendistribusikan buku bacaan berkualitas ke pelosok dan taman bacaan desa.</li>
                  <li>Mengedukasi kesadaran berinfaq dan bersedekah di kalangan generasi muda.</li>
                  <li>Menerapkan tata kelola donasi yang 100% transparan dan dapat diaudit publik.</li>
                </ul>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="vision-card glass-card">
                <div className="vision-icon-wrapper icon-navy">
                  <HiSparkles size={32} />
                </div>
                <h3>Filosofi Logo & Tagline</h3>
                <p className="tagline-text">
                  "Share, We Care"
                </p>
                <p>
                  Simbol tangan hijau yang mengasuh di atas perahu navy mencerminkan kepedulian tulus
                  yang mengantarkan harapan anak bangsa menuju pelabuhan cita-cita yang cerah.
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
            <p className="section-subtitle">Empat pilar nilai yang menuntun gerak langkah setiap relawan dan pengurus kami</p>
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
            <p className="section-subtitle">Perjalanan 9 tahun merajut asa bersama donatur, relawan, dan para penerima manfaat</p>
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
            <p className="section-subtitle">Sinergi relawan dan divisi yang mendedikasikan waktu demi kelancaran seluruh program</p>
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
            <p className="section-subtitle">Silakan hubungi kami untuk informasi kemitraan, pertanyaan beasiswa, atau konfirmasi donasi</p>
          </ScrollReveal>

          <div className="contact-grid">
            <ScrollReveal>
              <a href="mailto:humas@belajarsedekah.com" className="contact-card glass-card">
                <FaEnvelope className="contact-card-icon icon-color-green" />
                <h4>Surel Resmi</h4>
                <p>humas@belajarsedekah.com</p>
              </a>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <a href="https://instagram.com/belajarsedekah.id" target="_blank" rel="noopener noreferrer" className="contact-card glass-card">
                <FaInstagram className="contact-card-icon icon-color-blue" />
                <h4>Instagram</h4>
                <p>@belajarsedekah.id</p>
              </a>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <a href="https://facebook.com/komunitasbelajarsedekah" target="_blank" rel="noopener noreferrer" className="contact-card glass-card">
                <FaFacebookF className="contact-card-icon icon-color-navy" />
                <h4>Facebook</h4>
                <p>Komunitas Belajar Sedekah</p>
              </a>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <a href="https://twitter.com/belajar_sedekah" target="_blank" rel="noopener noreferrer" className="contact-card glass-card">
                <FaTwitter className="contact-card-icon icon-color-blue" />
                <h4>Twitter / X</h4>
                <p>@belajar_sedekah</p>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
