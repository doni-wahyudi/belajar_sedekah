import { useState, useEffect } from 'react';
import { FaQuoteLeft, FaWhatsapp, FaCopy, FaCheck, FaSyncAlt, FaCalendarDay, FaHeart } from 'react-icons/fa';
import { dailyQuotes } from '../data/dailyQuotes';
import './DailyQuotesWidget.css';

export default function DailyQuotesWidget() {
  // Use day-of-year or day-of-month to pick initial quote
  const getInitialIndex = () => {
    const today = new Date();
    return (today.getDate() + today.getMonth() * 3) % dailyQuotes.length;
  };

  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);
  const [copied, setCopied] = useState(false);
  const [animating, setAnimating] = useState(false);

  const currentQuote = dailyQuotes[currentIndex];

  const handleNextQuote = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % dailyQuotes.length);
      setAnimating(false);
    }, 200);
  };

  const handleCopyQuote = () => {
    const fullText = `"${currentQuote.text}"\n— ${currentQuote.source}\n\n🪴 Pengingat Kebaikan Komunitas Belajar Sedekah (@belajarsedekah.id)`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getWhatsAppShareUrl = () => {
    const message = `✨ *Pengingat Sedekah Hari Ini*\n\n"${currentQuote.text}"\n\n— *${currentQuote.source}*\n\n🪴 _Temanmu belajar, berbagi, dan bertumbuh setiap hari_\n@belajarsedekah.id • belajarsedekah.id`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  };

  const todayFormatted = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="daily-quotes-widget glass-card">
      <div className="quotes-top-bar">
        <div className="quotes-badge-group">
          <span className="quotes-pill-tag" style={{ color: currentQuote.themeColor, borderColor: `${currentQuote.themeColor}40`, backgroundColor: `${currentQuote.themeColor}15` }}>
            <FaHeart className="quotes-tag-icon" /> {currentQuote.tag}
          </span>
          <span className="quotes-category-label">{currentQuote.category}</span>
        </div>
        <div className="quotes-date">
          <FaCalendarDay /> {todayFormatted}
        </div>
      </div>

      <div className={`quotes-content-area ${animating ? 'fade-out' : 'fade-in'}`}>
        <FaQuoteLeft className="quotes-watermark" style={{ color: `${currentQuote.themeColor}20` }} />
        <p className="quotes-main-text">“{currentQuote.text}”</p>
        <div className="quotes-source-tag">
          <span className="quotes-source-line" style={{ background: currentQuote.themeColor }} />
          <strong>{currentQuote.source}</strong>
        </div>
      </div>

      <div className="quotes-actions-bar">
        <div className="quotes-action-buttons">
          <a
            href={getWhatsAppShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-quote-action share-wa"
            title="Bagikan ke WhatsApp Status / Teman"
          >
            <FaWhatsapp /> Bagikan ke WA
          </a>
          <button
            type="button"
            className={`btn-quote-action copy-text ${copied ? 'copied' : ''}`}
            onClick={handleCopyQuote}
            title="Salin teks kutipan"
          >
            {copied ? (
              <>
                <FaCheck /> Tersalin
              </>
            ) : (
              <>
                <FaCopy /> Salin
              </>
            )}
          </button>
        </div>

        <button
          type="button"
          className="btn-next-quote"
          onClick={handleNextQuote}
          title="Ganti ke kutipan harian lainnya"
        >
          <FaSyncAlt className={animating ? 'spinning' : ''} /> Ganti Kutipan
        </button>
      </div>
    </div>
  );
}
