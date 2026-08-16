import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaHeart, FaTiktok, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import Logo from './Logo';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <Logo size="large" />
            </div>
            <p className="footer-description">
              "Temanmu belajar, berbagi dan bertumbuh setiap hari 🪴" — Komunitas sosial berbasis di Lampung yang menggerakkan aksi Jum'at Berkah, Bingkisan Ramadhan, dan donasi kemanusiaan.
            </p>
            <div className="footer-social">
              <a href="https://www.instagram.com/belajarsedekah.id/" target="_blank" rel="noopener noreferrer" className="social-link instagram" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://vt.tiktok.com/ZS2JAStEo/" target="_blank" rel="noopener noreferrer" className="social-link tiktok" aria-label="TikTok">
                <FaTiktok />
              </a>
              <a href="https://wa.me/6282269665134" target="_blank" rel="noopener noreferrer" className="social-link whatsapp" aria-label="WhatsApp Admin">
                <FaWhatsapp />
              </a>
              <a href="https://chat.whatsapp.com/BIxQoqQQwyt1UwaApddVT7" target="_blank" rel="noopener noreferrer" className="social-link community" aria-label="Grup WhatsApp Sobat BS">
                <FaUsers />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-section-title">Navigasi Utama</h4>
            <div className="footer-links">
              <Link to="/">Beranda</Link>
              <Link to="/program">Program Utama</Link>
              <Link to="/galeri">Galeri Kegiatan</Link>
              <Link to="/transparansi">Laporan Donasi & LPJ</Link>
              <Link to="/berita">Kabar & Informasi</Link>
            </div>
          </div>

          {/* Programs */}
          <div className="footer-section">
            <h4 className="footer-section-title">Program Sosial</h4>
            <div className="footer-links">
              <Link to="/program#jumat-berkah">Jum'at Berkah (Jumber 💌)</Link>
              <Link to="/program#bingkisan-lebaran">Bingkisan Ramadhan</Link>
              <Link to="/program#qurban-kemanusiaan">Qurban & Kemanusiaan 🇵🇸</Link>
              <Link to="/donasi">Rekening Resmi BSI</Link>
              <Link to="/tentang">Tentang Sobat BS</Link>
            </div>
          </div>

          {/* Contact & Confirmation */}
          <div className="footer-section">
            <h4 className="footer-section-title">Kontak & Lokasi</h4>
            <div className="footer-contact">
              <p>
                <FaMapMarkerAlt className="contact-icon" />
                <span>Lampung, Indonesia 🇲🇨</span>
              </p>
              <p>
                <FaWhatsapp className="contact-icon" />
                <span>0822-6966-5134 (Admin)</span>
              </p>
              <p>
                <FaInstagram className="contact-icon" />
                <span>@belajarsedekah.id</span>
              </p>
              <div className="footer-cta-box">
                <span>Yuk jadi Sobat BS!</span>
                <a href="https://chat.whatsapp.com/BIxQoqQQwyt1UwaApddVT7" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ marginTop: '8px', width: '100%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                  <FaUsers /> Gabung Komunitas
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Komunitas Belajar Sedekah (@belajarsedekah.id). Seluruh hak cipta dilindungi.</p>
          <p className="footer-built">
            Mari bumikan sedekah, berapapun, dimanapun dan kapanpun 🪴
          </p>
        </div>
      </div>
    </footer>
  );
}
