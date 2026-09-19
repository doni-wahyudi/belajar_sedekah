import { useState, useEffect } from 'react';
import { FaHeart, FaHandsHelping, FaPaperPlane, FaUserCircle, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaPray } from 'react-icons/fa';
import { initialPrayers, prayerTags } from '../data/wallOfKindness';
import { 
  fetchKindnessMessages, 
  subscribeKindnessMessages, 
  submitKindnessMessage, 
  likeKindnessMessage 
} from '../services/wallService';
import ScrollReveal from './ScrollReveal';
import './WallOfKindness.css';

const LIKED_KEY = 'belajar_sedekah_liked_prayers';

export default function WallOfKindness() {
  const [prayers, setPrayers] = useState(initialPrayers);

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
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [authorName, setAuthorName] = useState('');
  const [location, setLocation] = useState('');
  const [programTag, setProgramTag] = useState("Jum'at Berkah 💌");
  const [message, setMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    // Fetch from Supabase
    fetchKindnessMessages().then((data) => {
      if (isMounted && data && data.length > 0) {
        setPrayers(data);
      }
    });

    // Realtime subscription
    const unsubscribe = subscribeKindnessMessages((newMessage) => {
      if (isMounted && newMessage) {
        setPrayers((prev) => [newMessage, ...prev.filter(p => p.id !== newMessage.id)]);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LIKED_KEY, JSON.stringify(likedIds));
    } catch (e) {
      console.error(e);
    }
  }, [likedIds]);

  const handleLike = async (id) => {
    if (likedIds.includes(id)) return; // Already liked

    setPrayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p))
    );
    setLikedIds((prev) => [...prev, id]);

    // Send like increment to Supabase
    await likeKindnessMessage(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || submitting) return;

    setSubmitting(true);

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

    const newPrayerPayload = {
      author: authorName.trim() || 'Hamba Allah',
      location: location.trim() || 'Lampung',
      role: 'Donatur / Sobat BS',
      programTag: programTag,
      message: message.trim(),
      date: todayDate,
      likes: 1,
      avatarBg: randomBg,
    };

    // Optimistic UI update
    const tempId = Date.now();
    setPrayers((prev) => [{ ...newPrayerPayload, id: tempId }, ...prev]);

    // Send to Supabase
    const res = await submitKindnessMessage(newPrayerPayload);
    if (res.success && res.data && !res.isMock) {
      setPrayers((prev) => prev.map(p => p.id === tempId ? res.data : p));
    }

    setSubmitting(false);
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
            <div className="section-kicker-wrap">
              <span className="section-kicker">
                <span className="kicker-bullet">🤲</span> Wall of Kindness • Doa & Harapan
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="section-title">
              Untaian <span className="gradient-text-green">Doa Donatur</span> & Sahabat Sedekah
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="section-subtitle">
              Ruang saling menguatkan dan mengaminkan kebaikan. Kirimkan doa tulus Anda untuk para mustahik, relawan, dan sesama dermawan di Lampung.
            </p>
          </ScrollReveal>
        </div>

        {/* Action button to open Form & Filter Tabs */}
        <div className="wall-controls-bar">
          <div className="wall-filter-tabs-scroll">
            <div className="wall-filter-tabs">
              {prayerTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`wall-tab-btn ${activeTag === tag ? 'active' : ''}`}
                  onClick={() => setActiveTag(tag)}
                  aria-pressed={activeTag === tag}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm btn-open-prayer-form"
            onClick={() => setFormOpen(!formOpen)}
          >
            <FaPray /> {formOpen ? 'Tutup Formulir' : 'Tuliskan Doa & Harapan'}
          </button>
        </div>

        {/* Expandable Prayer Form */}
        {formOpen && (
          <ScrollReveal>
            <form className="prayer-form-card glass-card" onSubmit={handleSubmit}>
              <h3 className="prayer-form-title">
                <FaPaperPlane /> Kirimkan Doa Kebaikan
              </h3>
              <p className="prayer-form-desc">
                Doa Anda akan ditampilkan di Wall of Kindness dan dibaca oleh seluruh relawan & sesama donatur.
              </p>

              {submitted ? (
                <div className="prayer-success-alert">
                  <FaCheckCircle size={28} />
                  <div>
                    <strong>Jazakumullah Khairan Katsiran!</strong>
                    <p>Doa tulus Anda telah diterbitkan di Wall of Kindness.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="prayer-form-row">
                    <div className="form-group">
                      <label htmlFor="prayer-author">Nama Anda / Inisial</label>
                      <input
                        id="prayer-author"
                        type="text"
                        placeholder="Contoh: Hamba Allah / Sarah"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        maxLength={50}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="prayer-location">Kota / Daerah Asal</label>
                      <input
                        id="prayer-location"
                        type="text"
                        placeholder="Contoh: Bandar Lampung / Pringsewu"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        maxLength={50}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="prayer-tag">Program / Kategori</label>
                      <select
                        id="prayer-tag"
                        value={programTag}
                        onChange={(e) => setProgramTag(e.target.value)}
                      >
                        {prayerTags.filter(t => t !== 'Semua Doa').map(tag => (
                          <option key={tag} value={tag}>{tag}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="label-count-flex">
                      <label htmlFor="prayer-message">Untaian Doa & Harapan *</label>
                      <span className="char-count">{message.length}/300 karakter</span>
                    </div>
                    <textarea
                      id="prayer-message"
                      rows={3}
                      placeholder="Tuliskan doa kebaikan, harapan untuk adik-adik dhuafa, atau semangat untuk tim relawan..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      maxLength={300}
                    />
                  </div>

                  <div className="form-action-row">
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                      <FaPaperPlane /> {submitting ? 'Mengirim Doa...' : 'Terbitkan Doa'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => setFormOpen(false)}
                    >
                      Batal
                    </button>
                  </div>
                </>
              )}
            </form>
          </ScrollReveal>
        )}

        {/* Prayer Grid */}
        <div className="prayers-masonry-grid">
          {filteredPrayers.map((prayer) => {
            const isLiked = likedIds.includes(prayer.id);
            return (
              <div key={prayer.id} className="prayer-card glass-card">
                <div className="prayer-card-top">
                  <div className="prayer-avatar" style={{ background: prayer.avatarBg }}>
                    {prayer.author === 'Hamba Allah' ? 'HA' : (prayer.author || 'BS').slice(0, 2).toUpperCase()}
                  </div>
                  <div className="prayer-author-meta">
                    <strong className="prayer-author-name">{prayer.author}</strong>
                    <div className="prayer-sub-meta">
                      <span className="prayer-location"><FaMapMarkerAlt size={10} /> {prayer.location}</span>
                      <span className="meta-bullet">•</span>
                      <span className="prayer-role">{prayer.role}</span>
                    </div>
                  </div>
                </div>

                <div className="prayer-tag-pill">
                  {prayer.programTag}
                </div>

                <p className="prayer-body-text">
                  "{prayer.message}"
                </p>

                <div className="prayer-card-footer">
                  <span className="prayer-date">
                    <FaCalendarAlt size={11} /> {prayer.date}
                  </span>
                  <button
                    type="button"
                    className={`btn-amin-like ${isLiked ? 'liked' : ''}`}
                    onClick={() => handleLike(prayer.id)}
                    title="Aminkan Doa"
                  >
                    <FaHeart size={12} className={isLiked ? 'heart-anim' : ''} />
                    <span>Aamiin ({prayer.likes || 0})</span>
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
