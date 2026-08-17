import { useState, useEffect } from 'react';
import { FaHeart, FaHandsHelping, FaPaperPlane, FaUserCircle, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaPray } from 'react-icons/fa';
import { initialPrayers, prayerTags } from '../data/wallOfKindness';
import ScrollReveal from './ScrollReveal';
import './WallOfKindness.css';

const STORAGE_KEY = 'belajar_sedekah_prayers';
const LIKED_KEY = 'belajar_sedekah_liked_prayers';

export default function WallOfKindness() {
  const [prayers, setPrayers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialPrayers;
      }
    } catch (e) {
      console.error(e);
    }
    return initialPrayers;
  });

  const [likedIds, setLikedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(LIKED_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [activeTag, setActiveTag] = useState('Semua Doa');
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [authorName, setAuthorName] = useState('');
  const [location, setLocation] = useState('');
  const [programTag, setProgramTag] = useState("Jum'at Berkah 💌");
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prayers));
    } catch (e) {
      console.error(e);
    }
  }, [prayers]);

  useEffect(() => {
    try {
      localStorage.setItem(LIKED_KEY, JSON.stringify(likedIds));
    } catch (e) {
      console.error(e);
    }
  }, [likedIds]);

  const handleLike = (id) => {
    if (likedIds.includes(id)) return; // Already liked

    setPrayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p))
    );
    setLikedIds((prev) => [...prev, id]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const gradients = [
      'linear-gradient(135deg, #15803d, #4ade80)',
      'linear-gradient(135deg, #0284c7, #38bdf8)',
      'linear-gradient(135deg, #7c3aed, #c084fc)',
      'linear-gradient(135deg, #d97706, #fbbf24)',
      'linear-gradient(135deg, #0d9488, #2dd4bf)',
    ];
    const randomBg = gradients[Math.floor(Math.random() * gradients.length)];

    const todayDate = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const newPrayer = {
      id: Date.now(),
      author: authorName.trim() || 'Hamba Allah',
      location: location.trim() || 'Lampung',
      role: 'Donatur / Sobat BS',
      programTag: programTag,
      message: message.trim(),
      date: todayDate,
      likes: 1,
      avatarBg: randomBg,
    };

    setPrayers([newPrayer, ...prayers]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormOpen(false);
      setAuthorName('');
      setLocation('');
      setMessage('');
    }, 2000);
  };

  const filteredPrayers = activeTag === 'Semua Doa'
    ? prayers
    : prayers.filter(p => p.programTag === activeTag);

  return (
    <section className="wall-of-kindness-section section" id="wall-of-kindness">
      <div className="container">
        <div className="wall-header-wrap">
          <ScrollReveal>
            <span className="wall-section-badge">
              <FaHandsHelping /> Wall of Kindness • Doa & Harapan
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="section-title">
              Untaian <span className="gradient-text-green">Doa Donatur</span> & Sahabat Sedekah
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="section-subtitle">
              Ruang saling menguatkan dan mengaminkan kebaikan. Kirimkan doa tulus Anda untuk para mustahik, relawan, dan sesama dermawan.
            </p>
          </ScrollReveal>
        </div>

        {/* Action button to open Form & Filter Tabs */}
        <div className="wall-controls-bar">
          <div className="wall-filter-tabs">
            {prayerTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`wall-tab-btn ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn btn-primary btn-write-prayer"
            onClick={() => setFormOpen(!formOpen)}
          >
            <FaPray /> {formOpen ? 'Tutup Formulir Doa' : 'Kirim Doa & Harapan'}
          </button>
        </div>

        {/* Modal / Inline Submission Form */}
        {formOpen && (
          <ScrollReveal>
            <form className="prayer-form-card glass-card" onSubmit={handleSubmit}>
              <div className="form-title-row">
                <FaPray className="form-icon" />
                <div>
                  <h3>Kirimkan Doa / Pesan Kebaikan</h3>
                  <p>Doa Anda akan tampil langsung di Wall of Kindness Belajar Sedekah</p>
                </div>
              </div>

              {submitted ? (
                <div className="form-success-banner">
                  <FaCheckCircle className="success-icon" />
                  <h4>Jazakumullah Khairan Katsiran!</h4>
                  <p>Doa tulus Anda telah berhasil dipublikasikan.</p>
                </div>
              ) : (
                <>
                  <div className="form-grid-inputs">
                    <div className="form-group">
                      <label>Nama Anda (Boleh Anonim / 'Hamba Allah')</label>
                      <input
                        type="text"
                        placeholder="Contoh: Hamba Allah / Rina"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Kota / Wilayah Asal</label>
                      <input
                        type="text"
                        placeholder="Contoh: Bandar Lampung / Metro"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Terkait Program / Kategori</label>
                      <select
                        value={programTag}
                        onChange={(e) => setProgramTag(e.target.value)}
                        className="form-input form-select"
                      >
                        <option value="Jum'at Berkah 💌">Jum'at Berkah 💌</option>
                        <option value="Bingkisan Lebaran 🎁">Bingkisan Lebaran 🎁</option>
                        <option value="Qurban Pelosok 🐑">Qurban Pelosok 🐑</option>
                        <option value="Sobat BS 🪴">Sobat BS 🪴</option>
                      </select>
                    </div>
                    <div className="form-group full-width">
                      <label>Tuliskan Doa / Harapan Anda *</label>
                      <textarea
                        required
                        rows="3"
                        placeholder="Tuliskan doa kebaikan untuk sesama, mustahik, atau keluarga tercinta..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="form-input form-textarea"
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn btn-outline" onClick={() => setFormOpen(false)}>
                      Batal
                    </button>
                    <button type="submit" className="btn btn-primary">
                      <FaPaperPlane /> Publikasikan Doa
                    </button>
                  </div>
                </>
              )}
            </form>
          </ScrollReveal>
        )}

        {/* Grid of Prayer Cards */}
        <div className="prayers-grid">
          {filteredPrayers.map((prayer) => {
            const isLiked = likedIds.includes(prayer.id);
            return (
              <div key={prayer.id} className="prayer-card glass-card">
                <div className="prayer-card-top">
                  <div className="prayer-avatar" style={{ background: prayer.avatarBg }}>
                    {prayer.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="prayer-author-info">
                    <h4 className="prayer-author-name">{prayer.author}</h4>
                    <span className="prayer-location">
                      <FaMapMarkerAlt className="loc-pin" /> {prayer.location}
                    </span>
                  </div>
                  <span className="prayer-program-tag">{prayer.programTag}</span>
                </div>

                <div className="prayer-message-body">
                  <p>“{prayer.message}”</p>
                </div>

                <div className="prayer-card-footer">
                  <span className="prayer-date">
                    <FaCalendarAlt className="date-icon" /> {prayer.date}
                  </span>
                  <button
                    type="button"
                    className={`btn-aamiin ${isLiked ? 'liked' : ''}`}
                    onClick={() => handleLike(prayer.id)}
                    title="Aminkan doa ini"
                  >
                    <span className="aamiin-hands">🤲</span>
                    <span className="aamiin-label">{isLiked ? 'Diaminkan' : 'Aamiin'}</span>
                    <span className="aamiin-count">{prayer.likes || 0}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
