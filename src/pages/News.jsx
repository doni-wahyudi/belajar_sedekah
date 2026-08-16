import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft, FaSearch, FaCalendarAlt, FaTag } from 'react-icons/fa';
import ScrollReveal from '../components/ScrollReveal';
import { newsArticles, categories } from '../data/news';
import './News.css';

function NewsDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = newsArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="news-page">
        <section className="page-hero">
          <div className="page-hero-bg" />
          <div className="container page-hero-content">
            <h1 className="page-hero-title">Artikel Tidak Ditemukan</h1>
            <p className="page-hero-subtitle">Maaf, artikel atau pengumuman yang Anda cari tidak tersedia.</p>
          </div>
        </section>
        <section className="section">
          <div className="container" style={{ textAlign: 'center' }}>
            <Link to="/berita" className="btn btn-primary">
              <FaArrowLeft /> Kembali ke Halaman Berita
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="news-page">
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <ScrollReveal>
            <span className={`article-category-badge ${article.category === 'Pengumuman' ? 'badge-announcement' : article.category === 'Laporan' ? 'badge-report' : 'badge-news'}`}>
              <FaTag size={12} /> {article.category}
            </span>
            <h1 className="page-hero-title" style={{ fontSize: 'var(--text-4xl)' }}>
              {article.title}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="article-date">
              <FaCalendarAlt />
              {new Date(article.date).toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="article-section section">
        <div className="container">
          <ScrollReveal>
            <article className="article-content glass-card">
              {article.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return <h3 key={i}>{paragraph.replace(/\*\*/g, '')}</h3>;
                }
                if (paragraph.startsWith('- ')) {
                  return (
                    <ul key={i}>
                      {paragraph.split('\n').map((item, j) => (
                        <li key={j}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i}>{paragraph.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
              })}
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="article-nav">
              <button onClick={() => navigate('/berita')} className="btn btn-outline">
                <FaArrowLeft /> Kembali ke Berita & Pengumuman
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

function NewsList() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNews = newsArticles.filter(article => {
    const categoryMatch = activeCategory === 'Semua' || article.category === activeCategory;
    const searchMatch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="news-page">
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <ScrollReveal>
            <h1 className="page-hero-title">
              Kabar & <span className="gradient-text-green">Informasi</span> <span className="gradient-text-blue">Terkini</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="page-hero-subtitle">
              Pusat rilis berita resmi, pengumuman seleksi beasiswa, dan transparansi laporan kegiatan Komunitas Belajar Sedekah
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="news-list-section section">
        <div className="container">
          {/* Search & Filter */}
          <ScrollReveal>
            <div className="news-controls">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Cari pengumuman, beasiswa, atau laporan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="news-filters">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`filter-btn ${activeCategory === cat ? 'filter-active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* News Grid */}
          {filteredNews.length === 0 ? (
            <ScrollReveal>
              <div className="no-results">
                <p>Tidak ada artikel atau pengumuman yang sesuai dengan pencarian.</p>
              </div>
            </ScrollReveal>
          ) : (
            <div className="news-list-grid">
              {filteredNews.map((article, index) => (
                <ScrollReveal key={article.id} delay={index * 0.08}>
                  <article className="news-list-card glass-card">
                    <div className="news-list-meta">
                      <span className={`news-category ${article.category === 'Pengumuman' ? 'cat-announcement' : article.category === 'Laporan' ? 'cat-report' : 'cat-news'}`}>
                        {article.category}
                      </span>
                      <span className="news-date">
                        {new Date(article.date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="news-list-title">{article.title}</h3>
                    <p className="news-list-excerpt">{article.excerpt}</p>
                    <Link to={`/berita/${article.slug}`} className="news-link">
                      Baca Selengkapnya <FaArrowRight />
                    </Link>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export { NewsDetail };
export default NewsList;
