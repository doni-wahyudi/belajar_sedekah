import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaChevronLeft, FaChevronRight, FaCamera, FaMapMarkerAlt, FaCalendarAlt, FaHandsHelping, FaExpand, FaHeart, FaTag } from 'react-icons/fa';
import ScrollReveal from '../components/ScrollReveal';
import { galleryImages, galleryCategories } from '../data/gallery';
import './Gallery.css';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredImages = activeCategory === 'Semua'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const navigateLightbox = useCallback((dir) => {
    setActiveIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return filteredImages.length - 1;
      if (next >= filteredImages.length) return 0;
      return next;
    });
  }, [filteredImages.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, navigateLightbox]);

  const activePhoto = filteredImages[activeIndex] || filteredImages[0];

  return (
    <div className="gallery-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <ScrollReveal>
            <h1 className="page-hero-title">
              Galeri <span className="gradient-text-green">Aksi Sosial</span> & <span className="gradient-text-blue">Dokumentasi</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="page-hero-subtitle">
              Rekam jejak visual dari setiap amanah donatur yang kami salurkan secara langsung ke lapangan:
              Jum'at Berkah, Paket Bingkisan Lebaran, Qurban Pelosok, dan kolaborasi kepemudaan di Lampung.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section section">
        <div className="container">
          {/* Filters */}
          <ScrollReveal>
            <div className="gallery-filters-wrapper">
              <div className="gallery-filters">
                {galleryCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`gallery-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <span className="gallery-count-badge">
                Menampilkan {filteredImages.length} dokumentasi
              </span>
            </div>
          </ScrollReveal>

          {/* Grid of Cards */}
          <div className="gallery-grid">
            {filteredImages.map((image, index) => (
              <ScrollReveal key={image.id} delay={index * 0.05}>
                <div
                  className="gallery-card glass-card"
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                >
                  {/* Photo Visual Banner */}
                  <div className="gallery-card-banner" style={{ background: image.bgGradient }}>
                    <div className="gallery-card-icon-wrap">
                      <FaCamera />
                    </div>
                    <span className="gallery-impact-pill">{image.impactTag}</span>
                    <div className="gallery-card-hover-overlay">
                      <FaExpand className="expand-icon" />
                      <span>Lihat Detail Foto</span>
                    </div>
                  </div>

                  {/* Card Info Body */}
                  <div className="gallery-card-body">
                    <div className="gallery-card-meta-top">
                      <span className="gallery-card-cat">
                        <FaTag className="meta-icon" /> {image.category}
                      </span>
                      <span className="gallery-card-date">
                        <FaCalendarAlt className="meta-icon" /> {image.date}
                      </span>
                    </div>

                    <h3 className="gallery-card-title">{image.title}</h3>
                    <p className="gallery-card-caption">{image.caption}</p>

                    <div className="gallery-card-footer">
                      <span className="gallery-card-loc">
                        <FaMapMarkerAlt className="loc-icon" /> {image.location}
                      </span>
                      <span className="gallery-card-action">Buka Lightbox →</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && activePhoto && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <button className="lightbox-btn-close" onClick={closeLightbox} aria-label="Tutup foto">
            <FaTimes />
          </button>

          <button
            className="lightbox-btn-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox(-1);
            }}
            aria-label="Foto sebelumnya"
          >
            <FaChevronLeft />
          </button>

          <div className="lightbox-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Visual Screen */}
            <div className="lightbox-visual" style={{ background: activePhoto.bgGradient }}>
              <div className="lightbox-visual-center">
                <FaCamera className="lightbox-camera-icon" />
                <span className="lightbox-impact-badge">{activePhoto.impactTag}</span>
              </div>
            </div>

            {/* Detail Drawer */}
            <div className="lightbox-details">
              <div className="lightbox-tag-row">
                <span className="lightbox-category-pill">{activePhoto.category}</span>
                <span className="lightbox-counter-pill">
                  {activeIndex + 1} dari {filteredImages.length}
                </span>
              </div>

              <h2 className="lightbox-title">{activePhoto.title}</h2>

              <div className="lightbox-meta-row">
                <span><FaMapMarkerAlt className="loc-pin" /> {activePhoto.location}</span>
                <span><FaCalendarAlt className="cal-icon" /> {activePhoto.date}</span>
              </div>

              <p className="lightbox-full-caption">{activePhoto.caption}</p>

              <div className="lightbox-actions-group">
                <Link to="/donasi" className="btn btn-primary" onClick={closeLightbox}>
                  <FaHeart /> Dukung Aksi Serupa
                </Link>
                <a
                  href="https://www.instagram.com/belajarsedekah.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Lihat Dokumentasi Instagram
                </a>
              </div>
            </div>
          </div>

          <button
            className="lightbox-btn-nav next"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox(1);
            }}
            aria-label="Foto selanjutnya"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
