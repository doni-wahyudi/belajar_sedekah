import { useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaCamera } from 'react-icons/fa';
import ScrollReveal from '../components/ScrollReveal';
import { galleryImages, galleryCategories } from '../data/gallery';
import './Gallery.css';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredImages = activeCategory === 'Semua'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const navigateLightbox = (dir) => {
    setActiveIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return filteredImages.length - 1;
      if (next >= filteredImages.length) return 0;
      return next;
    });
  };

  // Generate brand-aligned placeholder styles (Green, Blue, Teal, Navy)
  const getPlaceholderStyle = (id) => {
    const gradients = [
      'linear-gradient(135deg, #558b2f 0%, #8dc63f 100%)',
      'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
      'linear-gradient(135deg, #0f2444 0%, #1e3a8a 100%)',
      'linear-gradient(135deg, #0d9488 0%, #34d399 100%)',
      'linear-gradient(135deg, #659b27 0%, #0284c7 100%)',
      'linear-gradient(135deg, #1e3a8a 0%, #60a5fa 100%)',
    ];
    return { background: gradients[(id - 1) % gradients.length] };
  };

  return (
    <div className="gallery-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <ScrollReveal>
            <h1 className="page-hero-title">
              Galeri <span className="gradient-text-green">Kegiatan</span> & <span className="gradient-text-blue">Dokumentasi</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="page-hero-subtitle">
              Momen-momen bermakna dalam menyalurkan amanah pendidikan, donasi buku,
              dan kebersamaan relawan Komunitas Belajar Sedekah
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery-section section">
        <div className="container">
          {/* Filters */}
          <ScrollReveal>
            <div className="gallery-filters">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${activeCategory === cat ? 'filter-active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid */}
          <div className="gallery-grid">
            {filteredImages.map((image, index) => (
              <ScrollReveal key={image.id} delay={index * 0.05}>
                <div
                  className="gallery-item"
                  onClick={() => openLightbox(index)}
                  style={getPlaceholderStyle(image.id)}
                >
                  <div className="gallery-item-overlay">
                    <span className="gallery-item-category">{image.category}</span>
                    <p className="gallery-item-caption">{image.caption}</p>
                  </div>
                  <div className="gallery-item-icon">
                    <FaCamera />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Tutup lightbox">
            <FaTimes size={24} />
          </button>
          <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }} aria-label="Foto sebelumnya">
            <FaChevronLeft size={24} />
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-image" style={getPlaceholderStyle(filteredImages[activeIndex]?.id)}>
              <div className="lightbox-image-icon">
                <FaCamera size={64} />
              </div>
            </div>
            <div className="lightbox-info">
              <span className="lightbox-category">{filteredImages[activeIndex]?.category}</span>
              <p className="lightbox-caption">{filteredImages[activeIndex]?.caption}</p>
              <span className="lightbox-counter">{activeIndex + 1} / {filteredImages.length}</span>
            </div>
          </div>
          <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }} aria-label="Foto selanjutnya">
            <FaChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
