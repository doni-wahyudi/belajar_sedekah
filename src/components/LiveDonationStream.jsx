import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaHandHoldingHeart, FaCheckCircle, FaHeart, FaGift, FaSun, FaGlobe, FaUsers, FaArrowRight, FaCommentDots, FaShieldAlt } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';
import { fetchLiveDonations, subscribeLiveDonations } from '../services/donationService';
import { liveDonationHistory } from '../data/liveDonations';
import './LiveDonationStream.css';

export default function LiveDonationStream() {
  const [donations, setDonations] = useState(liveDonationHistory);
  const [selectedTag, setSelectedTag] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    // Initial fetch from Supabase (or fallback)
    fetchLiveDonations(20).then((data) => {
      if (isMounted && data && data.length > 0) {
        setDonations(data);
      }
    });

    // Realtime subscription
    const unsubscribe = subscribeLiveDonations((newDonation) => {
      if (isMounted && newDonation) {
        setDonations((prev) => [newDonation, ...prev.filter(d => d.id !== newDonation.id)]);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const filteredDonations = useMemo(() => {
    if (selectedTag === 'all') return donations;
    return donations.filter(item => item.programTag === selectedTag);
  }, [donations, selectedTag]);

  const totalFilteredAmount = useMemo(() => {
    return filteredDonations.reduce((sum, item) => sum + item.amount, 0);
  }, [filteredDonations]);

  const formatIDR = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const getProgramIcon = (tag) => {
    switch (tag) {
      case 'jumat-berkah':
        return <FaHeart className="stream-tag-icon color-green" />;
      case 'bingkisan-lebaran':
        return <FaGift className="stream-tag-icon color-blue" />;
      case 'sedekah-subuh':
        return <FaSun className="stream-tag-icon color-amber" />;
      case 'qurban-kemanusiaan':
        return <FaGlobe className="stream-tag-icon color-emerald" />;
      case 'sobat-bs':
        return <FaUsers className="stream-tag-icon color-purple" />;
      default:
        return <FaHeart className="stream-tag-icon color-green" />;
    }
  };

  return (
    <section className="live-stream-section section" id="live-donasi">
      <div className="container">
        <ScrollReveal>
          <div className="stream-header-badge">
            <span className="live-pulse-dot" />
            <span className="live-pulse-text">LIVE ACTIVITY FEED</span>
            <span className="stream-badge-divider">•</span>
            <span className="stream-badge-sub">Riwayat Terverifikasi Rekening BSI</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="section-title">
            Jejak Kebaikan <span className="gradient-text-green">Para Donatur</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="section-subtitle">
            Transparansi arus sedekah dan untaian doa tulus dari para muhsinin untuk masyarakat dhuafa di Lampung
          </p>
        </ScrollReveal>

        {/* Live Stream Main Card */}
        <ScrollReveal delay={0.2}>
          <div className="stream-main-card">
            {/* Card Header & Controls */}
            <div className="stream-card-topbar">
              <div className="stream-topbar-info">
                <span className="live-status-pill">
                  <span className="pulsing-circle" /> Live Stream
                  <span className="live-count-badge">{filteredDonations.length} Riwayat Terakhir</span>
                </span>
                <span className="stream-verified-pill">
                  <FaShieldAlt className="shield-icon" /> BSI: 7234856318 a.n Despa Putri Lestari
                </span>
              </div>

              {/* Filter Pills */}
              <div className="stream-filter-pills">
                <button
                  type="button"
                  className={`stream-filter-btn ${selectedTag === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedTag('all')}
                >
                  Semua ({donations.length})
                </button>
                <button
                  type="button"
                  className={`stream-filter-btn ${selectedTag === 'jumat-berkah' ? 'active' : ''}`}
                  onClick={() => setSelectedTag('jumat-berkah')}
                >
                  <FaHeart size={10} /> Jumber
                </button>
                <button
                  type="button"
                  className={`stream-filter-btn ${selectedTag === 'bingkisan-lebaran' ? 'active' : ''}`}
                  onClick={() => setSelectedTag('bingkisan-lebaran')}
                >
                  <FaGift size={10} /> Bingkisan
                </button>
                <button
                  type="button"
                  className={`stream-filter-btn ${selectedTag === 'sedekah-subuh' ? 'active' : ''}`}
                  onClick={() => setSelectedTag('sedekah-subuh')}
                >
                  <FaSun size={10} /> Subuh
                </button>
                <button
                  type="button"
                  className={`stream-filter-btn ${selectedTag === 'qurban-kemanusiaan' ? 'active' : ''}`}
                  onClick={() => setSelectedTag('qurban-kemanusiaan')}
                >
                  <FaGlobe size={10} /> Qurban/Palestine
                </button>
              </div>
            </div>

            {/* Scrollable Chat Viewport — exactly 5 visible items at 480px */}
            <div className="stream-chat-viewport" tabIndex={0} role="region" aria-label="Riwayat Donasi Live">
              {filteredDonations.map((item) => (
                <div key={item.id} className="stream-chat-item">
                  <div className="stream-item-avatar" style={{ background: item.avatarBg }}>
                    {item.initials}
                  </div>

                  <div className="stream-item-body">
                    <div className="stream-item-header">
                      <div className="donor-meta-row">
                        <strong className="donor-name">{item.donorName}</strong>
                        <span className="verified-chip">
                          <FaCheckCircle size={10} /> {item.badge}
                        </span>
                        <span className="donor-location-tag">• {item.location}</span>
                      </div>
                      <span className="stream-item-time">{item.timeAgo}</span>
                    </div>

                    <div className="stream-item-program">
                      {getProgramIcon(item.programTag)}
                      <span>{item.program}</span>
                    </div>

                    {item.message && (
                      <p className="donor-prayer-bubble">
                        "{item.message}"
                      </p>
                    )}
                  </div>

                  <div className="stream-item-amount">
                    <span className="amount-label">Donasi</span>
                    <strong className="amount-val">{item.formattedAmount}</strong>
                  </div>
                </div>
              ))}

              {filteredDonations.length === 0 && (
                <div className="stream-empty-state">
                  <p>Belum ada riwayat pada kategori ini.</p>
                </div>
              )}
            </div>

            {/* Card Footer Bar */}
            <div className="stream-card-footer">
              <div className="stream-footer-left">
                <span className="scroll-hint-icon">↕</span>
                <span>Scroll untuk melihat seluruh <strong>{donations.length} riwayat donasi</strong> • Total Terfilter: <strong>{formatIDR(totalFilteredAmount)}</strong></span>
              </div>
              <div className="stream-footer-right">
                <Link to="/donasi" className="btn btn-primary btn-sm">
                  <FaHandHoldingHeart /> Salurkan Sedekah Sekarang <FaArrowRight size={10} />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
