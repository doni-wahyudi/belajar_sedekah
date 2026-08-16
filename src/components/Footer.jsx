import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaHeart, FaWhatsapp } from 'react-icons/fa';
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
              Komunitas sosial yang bergerak di bidang pendidikan, berfokus pada penyaluran beasiswa
              dan distribusi buku untuk mewujudkan pendidikan yang merata dan berkualitas di Indonesia.
            </p>
            <div className="footer-social">
              <a href="https://instagram.com/belajarsedekah.id" target="_blank" rel="noopener noreferrer" className="social-link instagram" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://facebook.com/komunitasbelajarsedekah" target="_blank" rel="noopener noreferrer" className="social-link facebook" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com/belajar_sedekah" target="_blank" rel="noopener noreferrer" className="social-link twitter" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="mailto:humas@belajarsedekah.com" className="social-link email" aria-label="Email">
                <FaEnvelope />
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
              <Link to="/transparansi">Laporan Donasi</Link>
              <Link to="/berita">Berita & Informasi</Link>
            </div>
          </div>

          {/* Programs */}
          <div className="footer-section">
            <h4 className="footer-section-title">Program Sosial</h4>
            <div className="footer-links">
              <Link to="/program#beasiswa-pandawa">Beasiswa Pandawa</Link>
              <Link to="/program#drop-books">Drop Books Indonesia</Link>
              <Link to="/donasi">Salurkan Donasi</Link>
              <Link to="/tentang">Tentang Relawan</Link>
            </div>
          </div>

          {/* Contact & Confirmation */}
          <div className="footer-section">
            <h4 className="footer-section-title">Kontak & Donasi</h4>
            <div className="footer-contact">
              <p>
                <FaEnvelope className="contact-icon" />
                <span>humas@belajarsedekah.com</span>
              </p>
              <p>
                <FaInstagram className="contact-icon" />
                <span>@belajarsedekah.id</span>
              </p>
              <div className="footer-cta-box">
                <span>Ingin berkolaborasi?</span>
                <Link to="/donasi" className="btn btn-primary btn-sm" style={{ marginTop: '8px', width: '100%' }}>
                  Mulai Berbagi
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Komunitas Belajar Sedekah. Seluruh hak cipta dilindungi.</p>
          <p className="footer-built">
            Dibuat dengan <FaHeart className="heart-icon" /> untuk kemajuan pendidikan Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
