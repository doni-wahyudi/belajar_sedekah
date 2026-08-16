import { Link } from 'react-router-dom';
import { FaHandHoldingHeart, FaUniversity, FaQrcode, FaCalculator, FaArrowRight, FaHeart, FaBook, FaGraduationCap, FaWhatsapp, FaEnvelope, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';
import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import './Donation.css';

const bankAccounts = [
  {
    bank: 'Bank Syariah Indonesia (BSI)',
    code: 'BSI',
    accountNumber: '7182 7391 23',
    accountName: 'Komunitas Belajar Sedekah',
    color: 'linear-gradient(135deg, #00897b, #26a69a)',
  },
  {
    bank: 'Bank Mandiri',
    code: 'MANDIRI',
    accountNumber: '1370 0123 4567 890',
    accountName: 'Komunitas Belajar Sedekah',
    color: 'linear-gradient(135deg, #0f2444, #0284c7)',
  },
  {
    bank: 'Bank Central Asia (BCA)',
    code: 'BCA',
    accountNumber: '8120 4567 89',
    accountName: 'Komunitas Belajar Sedekah',
    color: 'linear-gradient(135deg, #004b8d, #1e88e5)',
  },
];

const impactCalculations = [
  { amount: 50000, description: 'Menyediakan 5 buku cerita edukatif untuk taman baca desa', icon: <FaBook /> },
  { amount: 100000, description: 'Mengirimkan paket buku Drop Books ke 1 sekolah terpencil', icon: <FaBook /> },
  { amount: 250000, description: 'Membantu tunjangan buku & uang saku mingguan 1 mahasiswa', icon: <FaGraduationCap /> },
  { amount: 500000, description: 'Bantuan biaya hidup & pendampingan 1 bulan penerima beasiswa', icon: <FaGraduationCap /> },
  { amount: 1500000, description: 'Mendanai 1 semester penuh beasiswa mahasiswa prasejahtera', icon: <FaHeart /> },
];

export default function Donation() {
  const [donationAmount, setDonationAmount] = useState(100000);
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
    const text = `Halo Komunitas Belajar Sedekah,%0A%0ASaya ingin konfirmasi donasi:%0A- Nominal: Rp ${new Intl.NumberFormat('id-ID').format(donationAmount)}%0A- Program: Beasiswa Pandawa / Drop Books%0A%0AMohon konfirmasi dan terima kasih.`;
    return `https://wa.me/6281234567890?text=${text}`;
  };

  return (
    <div className="donation-page">
      {/* Hero */}
      <section className="page-hero donation-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <ScrollReveal>
            <h1 className="page-hero-title">
              Salurkan <span className="gradient-text-green">Kebaikan</span>, Wujudkan <span className="gradient-text-blue">Harapan</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="page-hero-subtitle">
              Setiap rupiah yang Anda titipkan adalah jembatan mimpi bagi anak-anak dan mahasiswa
              Indonesia untuk meraih pendidikan yang layak dan bermartabat.
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
            <p className="section-subtitle">Simulasikan seberapa besar dampak nyata yang dihasilkan dari donasi Anda</p>
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
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(Math.max(0, Number(e.target.value)))}
                      min="10000"
                      step="10000"
                      className="calc-input"
                    />
                  </div>
                </div>
                
                <div className="calc-presets">
                  {[50000, 100000, 250000, 500000, 1500000].map(amount => (
                    <button
                      key={amount}
                      className={`preset-btn ${donationAmount === amount ? 'preset-active' : ''}`}
                      onClick={() => setDonationAmount(amount)}
                    >
                      Rp {new Intl.NumberFormat('id-ID').format(amount)}
                    </button>
                  ))}
                </div>

                <div className="calc-result">
                  <div className="calc-result-icon">{getImpact(donationAmount).icon}</div>
                  <div className="calc-result-text">
                    <span>Dampak yang Anda ciptakan:</span>
                    <strong>{getImpact(donationAmount).description}</strong>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Bank Accounts */}
      <section className="bank-section section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">Rekening Resmi <span className="gradient-text-blue">Donasi</span></h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="section-subtitle">Silakan transfer donasi ke salah satu rekening resmi atas nama lembaga kami</p>
          </ScrollReveal>

          <div className="bank-grid">
            {bankAccounts.map((account, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bank-card glass-card">
                  <div className="bank-header">
                    <div className="bank-logo" style={{ background: account.color }}>
                      <FaUniversity />
                    </div>
                    <div>
                      <h3 className="bank-name">{account.bank}</h3>
                      <span className="bank-code-badge">{account.code}</span>
                    </div>
                  </div>
                  
                  <div className="bank-info">
                    <div className="bank-account-number">
                      <span className="bank-label">Nomor Rekening</span>
                      <div className="bank-number-row">
                        <span className="bank-number">{account.accountNumber}</span>
                        <button
                          className={`copy-btn ${copied === index ? 'copied-active' : ''}`}
                          onClick={() => copyToClipboard(account.accountNumber, index)}
                          title="Salin Nomor Rekening"
                        >
                          {copied === index ? <><FaCheckCircle /> Tersalin</> : 'Salin'}
                        </button>
                      </div>
                    </div>
                    
                    <div className="bank-account-name">
                      <span className="bank-label">Atas Nama Rekening</span>
                      <span className="bank-owner">{account.accountName}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* QR Code Section */}
      <section className="qr-section section">
        <div className="container">
          <ScrollReveal>
            <div className="qr-card glass-card">
              <div className="qr-content">
                <div className="qr-icon-wrap">
                  <FaQrcode className="qr-icon" />
                </div>
                <h3>Donasi Praktis via QRIS</h3>
                <p>
                  Mendukung seluruh aplikasi mobile banking (BSI, Mandiri, BCA, BRI, BNI) dan e-wallet (GoPay, OVO, Dana, ShopeePay, LinkAja)
                </p>
                <div className="qr-placeholder">
                  <div className="qr-box">
                    <div className="qr-mockup-pattern">
                      <FaQrcode size={110} style={{ color: 'var(--color-navy)' }} />
                    </div>
                    <div className="qris-badge-tag">QRIS NASIONAL</div>
                    <p className="qr-institution">NMID: ID102003892019</p>
                    <p className="qr-institution-bold">KOMUNITAS BELAJAR SEDEKAH</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Confirmation */}
      <section className="confirm-section section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="confirm-card glass-card">
              <div className="confirm-icon-wrap">
                <FaHandHoldingHeart className="confirm-icon" />
              </div>
              <h3>Konfirmasi Donasi Anda</h3>
              <p>
                Setelah melakukan transfer, silakan klik tombol di bawah untuk konfirmasi otomatis melalui WhatsApp atau Email
                agar donasi Anda segera dicatat dalam buku laporan transparansi kami.
              </p>
              <div className="confirm-actions">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                >
                  <FaWhatsapp size={20} /> Konfirmasi via WhatsApp
                </a>
                <a
                  href="mailto:humas@belajarsedekah.com?subject=Konfirmasi%20Donasi%20Belajar%20Sedekah"
                  className="btn btn-outline-blue btn-lg"
                >
                  <FaEnvelope /> Konfirmasi via Email
                </a>
              </div>
              <div className="confirm-footer-links">
                <Link to="/transparansi" className="confirm-transparency">
                  <FaShieldAlt /> Lihat Buku Laporan Transparansi Donasi <FaArrowRight />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
