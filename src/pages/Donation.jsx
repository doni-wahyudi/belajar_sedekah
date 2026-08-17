import { Link } from 'react-router-dom';
import { FaHandHoldingHeart, FaUniversity, FaQrcode, FaCalculator, FaArrowRight, FaHeart, FaWhatsapp, FaCheckCircle, FaShieldAlt, FaUsers, FaTiktok, FaInstagram, FaCopy, FaCheck, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import './Donation.css';

const bankAccounts = [
  {
    bank: 'Bank Syariah Indonesia (BSI)',
    code: 'BSI (Rekening Resmi)',
    accountNumber: '7234 8563 18',
    accountName: 'Despa Putri Lestari',
    color: 'linear-gradient(135deg, #00897b, #73a932)',
    isPrimary: true,
  },
];

const impactCalculations = [
  { amount: 25000, description: 'Menyediakan 1 paket makanan bergizi & air mineral Jum’at Berkah (Jumber)', icon: <FaHeart /> },
  { amount: 50000, description: 'Membantu 2 paket makanan bergizi & santunan langsung pejuang nafkah jalanan', icon: <FaHeart /> },
  { amount: 150000, description: 'Mendanai 1 Paket Bingkisan Lebaran / Sembako lengkap keluarga prasejahtera', icon: <FaHandHoldingHeart /> },
  { amount: 350000, description: 'Santunan biaya hidup, nutrisi balita, dan kebutuhan lansia dhuafa binaan', icon: <FaHandHoldingHeart /> },
  { amount: 1000000, description: 'Patungan tebar hewan Qurban Berkah ke pelosok desa minim pequrban', icon: <FaHeart /> },
];

export default function Donation() {
  const [donationAmount, setDonationAmount] = useState(150000);
  const [copied, setCopied] = useState(null);

  const getImpact = (amount) => {
    const sorted = [...impactCalculations].reverse();
    return sorted.find(item => amount >= item.amount) || impactCalculations[0];
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''));
    setCopied(index);
    setTimeout(() => setCopied(null), 2500);
  };

  const generateWhatsAppUrl = () => {
    const text = `Assalamu'alaikum Admin Belajar Sedekah,%0A%0ASaya ingin konfirmasi donasi:%0A- Nominal: Rp ${new Intl.NumberFormat('id-ID').format(donationAmount)}%0A- Program: Jum'at Berkah (Jumber) / Bingkisan Lebaran / Sedekah Umum%0A%0AMohon konfirmasi dan terima kasih.`;
    return `https://wa.me/6282269665134?text=${text}`;
  };

  return (
    <div className="donation-page">
      {/* Hero */}
      <section className="page-hero donation-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <ScrollReveal>
            <h1 className="page-hero-title">
              Mari <span className="gradient-text-green">Bumikan Sedekah</span> Bersama <span className="gradient-text-blue">Sobat BS</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="page-hero-subtitle">
              "Mari bumikan sedekah, berapapun, dimanapun dan kapanpun." Temanmu belajar, berbagi, dan bertumbuh setiap hari 🪴
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Impact Calculator */}
      <section className="impact-calc section">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">Kalkulator <span className="gradient-text-green">Dampak Kebaikan</span></h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="section-subtitle">Simulasikan seberapa besar manfaat nyata yang dihasilkan dari sedekah Anda</p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="calculator glass-card">
              <div className="calc-header">
                <FaCalculator className="calc-icon" />
                <h3>Hitung Manfaat Sedekah Anda</h3>
              </div>
              <div className="calc-body">
                <div className="calc-input-group">
                  <label>Tentukan Nominal Donasi</label>
                  <div className="calc-input-wrapper">
                    <span className="calc-currency">Rp</span>
                    <input
                      type="number"
                      min="10000"
                      step="10000"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(Math.max(0, parseInt(e.target.value) || 0))}
                      className="calc-input"
                    />
                  </div>
                </div>

                <div className="quick-amounts">
                  {[25000, 50000, 150000, 350000, 1000000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      className={`quick-btn ${donationAmount === amt ? 'quick-btn-active' : ''}`}
                      onClick={() => setDonationAmount(amt)}
                    >
                      Rp {new Intl.NumberFormat('id-ID').format(amt)}
                    </button>
                  ))}
                </div>

                <div className="calc-impact-box">
                  <div className="impact-icon-wrapper">
                    {getImpact(donationAmount).icon}
                  </div>
                  <div>
                    <h4>Estimasi Dampak Kebaikan:</h4>
                    <p>{getImpact(donationAmount).description}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Bank Transfer */}
      <section className="bank-section section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">Rekening <span className="gradient-text-blue">Resmi Donasi</span></h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="section-subtitle">Salurkan infaq & sedekah terbaik Anda langsung ke rekening resmi yang amanah</p>
          </ScrollReveal>

          <div className="bank-card-container">
            {bankAccounts.map((account, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="debit-card-wrapper">
                  <div className="debit-card">
                    <div className="debit-card-glow" />
                    
                    {/* Card Top Row */}
                    <div className="debit-card-top">
                      <div className="bank-brand">
                        <div className="bank-logo-badge">
                          <FaUniversity />
                        </div>
                        <div className="bank-brand-text">
                          <span className="bank-brand-title">BANK BSI</span>
                          <span className="bank-brand-sub">Bank Syariah Indonesia (Kode: 451)</span>
                        </div>
                      </div>
                      <span className="account-type-badge">REKENING RESMI</span>
                    </div>

                    {/* Card Chip & Contactless */}
                    <div className="debit-card-middle">
                      <div className="card-chip">
                        <div className="chip-inner"></div>
                      </div>
                      <div className="contactless-waves">
                        <span></span><span></span><span></span>
                      </div>
                    </div>

                    {/* Card Number */}
                    <div className="debit-card-number-row">
                      <span className="debit-card-number">{account.accountNumber}</span>
                    </div>

                    {/* Card Bottom Row */}
                    <div className="debit-card-bottom">
                      <div className="card-holder-info">
                        <span className="card-holder-label">NAMA PEMILIK REKENING</span>
                        <span className="card-holder-name">{account.accountName}</span>
                      </div>
                      <button
                        type="button"
                        className={`card-copy-btn ${copied === index ? 'copied' : ''}`}
                        onClick={() => copyToClipboard(account.accountNumber, index)}
                        title="Salin nomor rekening BSI"
                      >
                        {copied === index ? (
                          <>
                            <FaCheck /> Tersalin!
                          </>
                        ) : (
                          <>
                            <FaCopy /> Salin Rekening
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="bank-security-notice">
            <p>
              <FaLock className="lock-icon" /> Rekening resmi terverifikasi atas nama Founder Komunitas Belajar Sedekah: <strong>Despa Putri Lestari</strong> • Amanah & Tercatat di LPJ
            </p>
          </div>
        </div>
      </section>

      {/* WhatsApp Confirmation & Community Group */}
      <section className="confirmation-section section">
        <div className="container">
          <ScrollReveal>
            <div className="confirm-card glass-card">
              <div className="confirm-icon-wrapper">
                <FaWhatsapp size={48} />
              </div>
              <h2>Konfirmasi Donasi & Komunitas Sobat BS</h2>
              <p>
                Setelah melakukan transfer, mohon kirimkan bukti transfer kepada Admin agar donasi Anda tercatat rapi dalam Laporan Pertanggungjawaban (LPJ).
              </p>
              
              <div className="confirm-action-buttons">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                >
                  <FaWhatsapp /> Konfirmasi via WhatsApp Admin (0822-6966-5134)
                </a>
                <a
                  href="https://chat.whatsapp.com/BIxQoqQQwyt1UwaApddVT7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-blue btn-lg"
                >
                  <FaUsers /> Gabung Grup WhatsApp Sobat BS
                </a>
              </div>

              <div className="social-connect-row" style={{ marginTop: 'var(--space-8)', display: 'flex', justifyContent: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
                <a href="https://www.instagram.com/belajarsedekah.id/" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <FaInstagram /> @belajarsedekah.id
                </a>
                <a href="https://vt.tiktok.com/ZS2JAStEo/" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <FaTiktok /> TikTok @belajarsedekah.id
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Transparency Guarantee */}
      <section className="guarantee-section section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="guarantee-box">
              <FaShieldAlt className="guarantee-icon" />
              <div>
                <h3>Komitmen Amanah & Transparansi 100%</h3>
                <p>
                  Setiap dana yang masuk dicatat dan dilaporkan secara berkala dalam dokumen LPJ resmi.
                  Anda dapat memantau penggunaan dana secara terbuka melalui menu Transparansi.
                </p>
              </div>
              <Link to="/transparansi" className="btn btn-outline">
                Buka Laporan Keuangan <FaArrowRight />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
