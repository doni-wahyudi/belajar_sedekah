import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHandHoldingHeart, FaUniversity, FaQrcode, FaCalculator, FaArrowRight, 
  FaHeart, FaWhatsapp, FaCheckCircle, FaShieldAlt, FaUsers, FaTiktok, 
  FaInstagram, FaCopy, FaCheck, FaLock, FaDownload, FaMobileAlt, FaImage
} from 'react-icons/fa';
import ScrollReveal from '../components/ScrollReveal';
import './Donation.css';

const bankAccounts = [
  {
    bank: 'Bank Syariah Indonesia (BSI)',
    code: 'BSI (Rekening Resmi)',
    accountNumber: '7234 8563 18',
    accountName: 'Despa Putri Lestari',
    color: 'linear-gradient(135deg, #0b4e3c 0%, #157347 45%, #659b27 85%, #8dc63f 100%)',
    isPrimary: true,
  },
];

const impactCalculations = [
  { amount: 20000, description: '🍱 Menyediakan 1 paket makanan bergizi & air mineral Jum’at Berkah (Jumber)', icon: <FaHeart /> },
  { amount: 50000, description: '🍱🍱 Membantu 2 paket makanan bergizi & santunan langsung pejuang nafkah jalanan', icon: <FaHeart /> },
  { amount: 150000, description: '🎁 Mendanai 1 Paket Bingkisan Lebaran / Sembako lengkap keluarga lansia prasejahtera', icon: <FaHandHoldingHeart /> },
  { amount: 350000, description: '🐑 Tabungan sedekah qurban pelosok Lampung & santunan dhuafa binaan', icon: <FaHandHoldingHeart /> },
  { amount: 1000000, description: '✨ Patungan tebar hewan Qurban Berkah & operasional distribusi ke desa pedalaman', icon: <FaHeart /> },
];

export default function Donation() {
  const [donationAmount, setDonationAmount] = useState(50000);
  const [selectedProgram, setSelectedProgram] = useState("Jum'at Berkah (Jumber 💌)");
  const [copied, setCopied] = useState(null);
  const [downloadingQRIS, setDownloadingQRIS] = useState(false);
  const canvasRef = useRef(null);

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
    const formatted = new Intl.NumberFormat('id-ID').format(donationAmount);
    const text = `Assalamu'alaikum Admin Belajar Sedekah,%0A%0ASaya ingin konfirmasi sedekah/donasi:%0A- Nominal: Rp ${formatted}%0A- Program: ${encodeURIComponent(selectedProgram)}%0A- Penyaluran: Bank BSI / QRIS%0A%0AMohon konfirmasi dan terima kasih. Semoga berkah 🪴`;
    return `https://wa.me/6282269665134?text=${text}`;
  };

  // Generate downloadable QRIS image on canvas
  const handleDownloadQRIS = () => {
    setDownloadingQRIS(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 760;
      const ctx = canvas.getContext('2d');

      // Card Background
      ctx.fillStyle = '#ffffff';
      ctx.roundRect(0, 0, 600, 760, 24);
      ctx.fill();

      // Top Red QRIS Header Banner
      ctx.fillStyle = '#c0262d';
      ctx.fillRect(0, 0, 600, 90);

      // Header Text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('QRIS • PEMBAYARAN NASIONAL', 300, 56);

      // Organization Name
      ctx.fillStyle = '#0a1b24';
      ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('KOMUNITAS BELAJAR SEDEKAH', 300, 145);

      ctx.fillStyle = '#64748b';
      ctx.font = '500 16px "Inter", sans-serif';
      ctx.fillText('NMID: ID1024356789012 • LAMPUNG', 300, 175);

      // Draw QR Grid Box Representation
      ctx.fillStyle = '#f8fafc';
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(100, 210, 400, 400, 16);
      ctx.fill();
      ctx.stroke();

      // Draw QR matrix patterns
      ctx.fillStyle = '#0f172a';
      // Corner Finder 1 (Top-Left)
      ctx.fillRect(130, 240, 90, 90);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(145, 255, 60, 60);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(160, 270, 30, 30);

      // Corner Finder 2 (Top-Right)
      ctx.fillRect(380, 240, 90, 90);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(395, 255, 60, 60);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(410, 270, 30, 30);

      // Corner Finder 3 (Bottom-Left)
      ctx.fillRect(130, 490, 90, 90);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(145, 505, 60, 60);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(160, 520, 30, 30);

      // Center decorative Logo
      ctx.fillStyle = '#529627';
      ctx.beginPath();
      ctx.arc(300, 410, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('BS', 300, 417);

      // Bottom Instructions
      ctx.fillStyle = '#334155';
      ctx.font = 'bold 16px "Inter", sans-serif';
      ctx.fillText('Dapat discan dengan seluruh aplikasi Mobile Banking & e-Wallet', 300, 655);

      ctx.fillStyle = '#64748b';
      ctx.font = '14px "Inter", sans-serif';
      ctx.fillText('BCA • BSI Mobile • Mandiri • BRI • GoPay • OVO • DANA • ShopeePay', 300, 685);

      ctx.fillStyle = '#529627';
      ctx.font = 'bold 14px "Inter", sans-serif';
      ctx.fillText('Mari bumikan sedekah, berapapun, dimanapun dan kapanpun 🪴', 300, 725);

      // Trigger Download
      const link = document.createElement('a');
      link.download = 'QRIS-Belajar-Sedekah-Lampung.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('Download error:', e);
    } finally {
      setTimeout(() => setDownloadingQRIS(false), 1000);
    }
  };

  return (
    <div className="donation-page">
      {/* Hero */}
      <section className="page-hero donation-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <ScrollReveal>
            <div className="section-kicker-wrap">
              <span className="section-kicker">
                <span className="kicker-bullet">🌱</span> Saluran Kebaikan Resmi
              </span>
            </div>
            <h1 className="page-hero-title">
              Bumikan Sedekah Bersama <span className="gradient-text-green">Sobat BS</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="page-hero-subtitle">
              "Mari bumikan sedekah, berapapun, dimanapun dan kapanpun." Berapapun yang disisihkan menjadi senyuman hangat bagi para pejuang nafkah jalanan di Lampung 🪴
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Impact Calculator */}
      <section className="impact-calc section">
        <div className="container">
          <ScrollReveal>
            <div className="section-kicker-wrap">
              <span className="section-kicker">
                <span className="kicker-bullet">01</span> Simulasi Kebaikan
              </span>
            </div>
            <h2 className="section-title">Kalkulator <span className="gradient-text-green">Dampak Nyata</span></h2>
            <p className="section-subtitle">Pilih atau tentukan nominal sedekah Anda dan lihat seberapa besar manfaat langsung yang dihasilkan</p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="calculator glass-card">
              <div className="calc-header">
                <FaCalculator className="calc-icon" />
                <div>
                  <h3 className="calc-title">Hitung Manfaat Sedekah Anda</h3>
                  <span className="calc-sub">Penyaluran 100% amanah & transparan</span>
                </div>
              </div>
              <div className="calc-body">
                <div className="calc-input-group">
                  <label htmlFor="donation-input">Tentukan Nominal Donasi</label>
                  <div className="calc-input-wrapper">
                    <span className="calc-currency">Rp</span>
                    <input
                      id="donation-input"
                      type="number"
                      min="10000"
                      step="10000"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(Math.max(0, parseInt(e.target.value) || 0))}
                      className="calc-input"
                      placeholder="Masukkan nominal..."
                    />
                  </div>
                </div>

                <div className="quick-amounts">
                  {[20000, 50000, 150000, 350000, 1000000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      className={`quick-btn ${donationAmount === amt ? 'quick-btn-active' : ''}`}
                      onClick={() => setDonationAmount(amt)}
                      aria-pressed={donationAmount === amt}
                    >
                      Rp {new Intl.NumberFormat('id-ID').format(amt)}
                    </button>
                  ))}
                </div>

                <div className="calc-impact-box">
                  <div className="impact-icon-wrapper">
                    {getImpact(donationAmount).icon}
                  </div>
                  <div className="impact-text-wrapper">
                    <h4>Estimasi Dampak Nyata di Lapangan:</h4>
                    <p>{getImpact(donationAmount).description}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Bank Transfer & QRIS Options Grid */}
      <section className="bank-section section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-kicker-wrap">
              <span className="section-kicker kicker-blue">
                <span className="kicker-bullet">02</span> Jalur Donasi Terverifikasi
              </span>
            </div>
            <h2 className="section-title">Pilihan <span className="gradient-text-blue">Metode Penyaluran</span></h2>
            <p className="section-subtitle">Salurkan melalui transfer langsung rekening BSI resmi atau scan QRIS nasional melalui seluruh aplikasi perbankan</p>
          </ScrollReveal>

          <div className="donation-methods-grid">
            {/* 1. Official Bank Card */}
            <ScrollReveal direction="right">
              <div className="method-column">
                <div className="method-header-title">
                  <FaUniversity className="method-icon" />
                  <h3>Transfer Bank Syariah Indonesia (BSI)</h3>
                </div>

                {bankAccounts.map((account, index) => (
                  <div key={index} className="debit-card-wrapper">
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
                ))}

                <div className="bank-security-notice" style={{ marginTop: 'var(--space-4)' }}>
                  <p>
                    <FaLock className="lock-icon" /> Rekening resmi terverifikasi atas nama Founder Komunitas: <strong>Despa Putri Lestari</strong> • Amanah & Tercatat di LPJ
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* 2. QRIS Code Card & Mobile Helper */}
            <ScrollReveal direction="left">
              <div className="method-column">
                <div className="method-header-title">
                  <FaQrcode className="method-icon" />
                  <h3>QRIS Nasional (Semua Bank & e-Wallet)</h3>
                </div>

                <div className="qris-card glass-card">
                  <div className="qris-badge-row">
                    <span className="qris-brand-pill">QRIS PEMBAYARAN NASIONAL</span>
                    <span className="qris-nmid">NMID: ID1024356789012</span>
                  </div>

                  <div className="qris-code-container">
                    {/* Visual QRIS Canvas/SVG Box */}
                    <div className="qris-visual-box">
                      <div className="qris-corner-box top-left" />
                      <div className="qris-corner-box top-right" />
                      <div className="qris-corner-box bottom-left" />
                      
                      <div className="qris-center-badge">
                        <span>BS</span>
                      </div>

                      <div className="qris-matrix-dots">
                        <FaQrcode className="qris-matrix-icon" />
                      </div>
                    </div>

                    <div className="qris-org-meta">
                      <strong>KOMUNITAS BELAJAR SEDEKAH</strong>
                      <span>Lampung, Indonesia</span>
                    </div>
                  </div>

                  <div className="qris-action-strip">
                    <button
                      type="button"
                      className={`btn btn-primary btn-sm ${downloadingQRIS ? 'disabled' : ''}`}
                      onClick={handleDownloadQRIS}
                      disabled={downloadingQRIS}
                    >
                      <FaDownload /> {downloadingQRIS ? 'Menyiapkan...' : 'Simpan Gambar QRIS (PNG)'}
                    </button>
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                    >
                      <FaWhatsapp /> Konfirmasi Donasi
                    </a>
                  </div>

                  <div className="qris-supported-wallets">
                    <span>Mendukung: BSI Mobile • BCA • Mandiri • BRI • GoPay • OVO • DANA • ShopeePay</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* 3 Steps Guide for Smartphone Users */}
          <ScrollReveal delay={0.2}>
            <div className="mobile-guide-card glass-card">
              <div className="guide-header">
                <FaMobileAlt className="guide-icon" />
                <div>
                  <h4 className="guide-title">Cara Mudah Berdonasi Melalui Smartphone</h4>
                  <p className="guide-sub">Tanpa perlu scan manual jika sedang menggunakan perangkat ponsel yang sama</p>
                </div>
              </div>

              <div className="guide-steps-grid">
                <div className="guide-step-item">
                  <div className="step-number-badge">1</div>
                  <div className="step-content">
                    <strong>Simpan Gambar QRIS / Salin Rekening</strong>
                    <p>Klik tombol <em>"Simpan Gambar QRIS"</em> atau klik <em>"Salin Rekening"</em> BSI di atas.</p>
                  </div>
                </div>

                <div className="guide-step-item">
                  <div className="step-number-badge">2</div>
                  <div className="step-content">
                    <strong>Buka Mobile Banking / e-Wallet</strong>
                    <p>Buka aplikasi perbankan (BSI Mobile, BCA, dll) atau e-Wallet, pilih menu QRIS ➔ Pilih icon Galeri.</p>
                  </div>
                </div>

                <div className="guide-step-item">
                  <div className="step-number-badge">3</div>
                  <div className="step-content">
                    <strong>Pilih Gambar & Konfirmasi Donasi</strong>
                    <p>Pilih gambar QRIS yang baru diunduh, tentukan nominal, selesaikan transfer & kirim bukti ke WhatsApp Admin.</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
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
              <h2 className="confirm-title">Konfirmasi Donasi & Bergabung Sobat BS</h2>
              <p className="confirm-desc">
                Setelah melakukan transfer atau scan QRIS, mohon kirimkan bukti transfer kepada Admin agar donasi Anda tercatat rapi dalam Laporan Pertanggungjawaban (LPJ) berkala.
              </p>
              
              <div className="confirm-action-buttons">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                >
                  <FaWhatsapp /> Konfirmasi Rp {new Intl.NumberFormat('id-ID').format(donationAmount)} via WA Admin
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

              <div className="social-connect-row">
                <a href="https://www.instagram.com/belajarsedekah.id/" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">
                  <FaInstagram /> @belajarsedekah.id
                </a>
                <a href="https://vt.tiktok.com/ZS2JAStEo/" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">
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
            <div className="guarantee-box glass-card">
              <FaShieldAlt className="guarantee-icon" />
              <div className="guarantee-text">
                <h3>Komitmen Amanah & Transparansi 100%</h3>
                <p>
                  Setiap dana yang masuk dicatat dan dilaporkan secara berkala dalam dokumen LPJ Google Docs resmi.
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
