import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';
import { FaHandHoldingHeart } from 'react-icons/fa';
import Logo from './Logo';
import './Navbar.css';

const navLinks = [
  { path: '/', label: 'Beranda' },
  { path: '/program', label: 'Program' },
  { path: '/galeri', label: 'Galeri' },
  { path: '/transparansi', label: 'Transparansi' },
  { path: '/donasi', label: 'Donasi' },
  { path: '/tentang', label: 'Tentang' },
  { path: '/berita', label: 'Berita' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container container">
        <Link to="/" className="navbar-brand">
          <Logo />
        </Link>

        <div className={`navbar-links ${isOpen ? 'navbar-links-open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-link ${location.pathname === link.path ? 'navbar-link-active' : ''}`}
            >
              {link.label}
              {location.pathname === link.path && (
                <span className="navbar-link-indicator" />
              )}
            </Link>
          ))}
          <Link to="/donasi" className="btn btn-primary btn-sm navbar-cta-mobile">
            <FaHandHoldingHeart /> Donasi Sekarang
          </Link>
        </div>

        <div className="navbar-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <Link to="/donasi" className="btn btn-primary btn-sm navbar-cta">
            <FaHandHoldingHeart /> Donasi
          </Link>

          <button
            className="navbar-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {isOpen && <div className="navbar-overlay" onClick={() => setIsOpen(false)} />}
    </nav>
  );
}
