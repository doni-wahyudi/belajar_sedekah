import { useState } from 'react';
import { FaChartBar, FaChartPie, FaCalendarAlt, FaArrowUp, FaArrowDown, FaFileAlt, FaShieldAlt, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';
import ScrollReveal from '../components/ScrollReveal';
import Counter from '../components/Counter';
import { yearlyReports, impactStats, fundAllocation } from '../data/transparency';
import './Transparency.css';

export default function Transparency() {
  const [selectedYear, setSelectedYear] = useState(yearlyReports[0].year);
  const report = yearlyReports.find(r => r.year === selectedYear);

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const maxExpense = Math.max(...(report.breakdown?.expense?.map(e => e.amount) ?? [1]));
  const maxIncome  = Math.max(...(report.breakdown?.income?.map(e => e.amount) ?? [1]));
  const balance = report.incoming - report.outgoing;

  return (
    <div className="transparency-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <ScrollReveal>
            <h1 className="page-hero-title">
              Transparansi & <span className="gradient-text-green">Akuntabilitas</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="page-hero-subtitle">
              Komitmen amanah Komunitas Belajar Sedekah: setiap rupiah yang kami kelola dilaporkan
              secara terbuka melalui Laporan Pertanggungjawaban (LPJ) yang dapat diakses publik.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="transparency-overview">
        <div className="container">
          <div className="overview-grid">
            <ScrollReveal>
              <div className="overview-card glass-card">
                <div className="overview-icon overview-icon-green">
                  <FaChartBar />
                </div>
                <div className="overview-value">{impactStats.totalDonationsReceived}</div>
                <div className="overview-label">Total Donasi Dikelola (Est. 2022–2026)</div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="overview-card glass-card">
                <div className="overview-icon overview-icon-blue">
                  <FaChartPie />
                </div>
                <div className="overview-value">
                  <Counter end={impactStats.totalBeneficiaries} suffix="+" />
                </div>
                <div className="overview-label">Total Penerima Manfaat Terbantu</div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="overview-card glass-card">
                <div className="overview-icon overview-icon-navy">
                  <FaShieldAlt />
                </div>
                <div className="overview-value">100%</div>
                <div className="overview-label">Amanah & LPJ Terbuka Publik</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Fund Allocation Donut */}
      <section className="allocation-section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">Alokasi <span className="gradient-text-green">Penggunaan Dana</span></h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="section-subtitle">Struktur penyaluran donasi yang transparan demi maksimalnya dampak nyata setiap program</p>
          </ScrollReveal>

          <div className="allocation-grid">
            <ScrollReveal direction="right">
              <div className="donut-chart">
                <svg viewBox="0 0 200 200" className="donut-svg">
                  {fundAllocation.reduce((acc, item, i) => {
                    const offset = acc.offset;
                    const circumference = 2 * Math.PI * 70;
                    const dash = (item.percentage / 100) * circumference;
                    const gap = circumference - dash;
                    acc.elements.push(
                      <circle
                        key={i}
                        cx="100"
                        cy="100"
                        r="70"
                        fill="none"
                        stroke={item.color}
                        strokeWidth="26"
                        strokeDasharray={`${dash} ${gap}`}
                        strokeDashoffset={-offset}
                        className="donut-segment"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    );
                    acc.offset = offset + dash;
                    return acc;
                  }, { elements: [], offset: 0 }).elements}
                  <text x="100" y="93" textAnchor="middle" className="donut-center-text" fill="var(--text-primary)">
                    100%
                  </text>
                  <text x="100" y="113" textAnchor="middle" className="donut-center-label" fill="var(--text-tertiary)">
                    Tersalurkan
                  </text>
                </svg>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <div className="allocation-legend">
                {fundAllocation.map((item, i) => (
                  <div key={i} className="legend-item">
                    <div className="legend-top">
                      <div className="legend-color" style={{ background: item.color }} />
                      <span className="legend-name">{item.name || item.category}</span>
                      <span className="legend-percentage">{item.percentage}%</span>
                    </div>
                    <div className="legend-bar">
                      <div className="legend-bar-fill" style={{ width: `${item.percentage}%`, background: item.color }} />
                    </div>
                    {item.description && (
                      <p className="legend-description">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Yearly Reports */}
      <section className="yearly-section section">
        <div className="container">
          <div className="yearly-header-flex">
            <div>
              <ScrollReveal>
                <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 'var(--space-2)' }}>
                  Laporan Keuangan <span className="gradient-text-blue">Tahunan</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="section-subtitle" style={{ textAlign: 'left', margin: 0 }}>
                  Detail penerimaan dan penyaluran donasi per periode, dengan dokumen LPJ terbuka publik
                </p>
              </ScrollReveal>
            </div>

            <div className="year-selector">
              {yearlyReports.map(r => (
                <button
                  key={r.year}
                  className={`year-btn ${selectedYear === r.year ? 'year-active' : ''}`}
                  onClick={() => setSelectedYear(r.year)}
                >
                  {r.year}
                </button>
              ))}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="report-summary">
            <ScrollReveal delay={0} className="summary-card-wrapper">
              <div className="summary-card glass-card summary-card-income">
                <div className="summary-header">
                  <span className="summary-icon-badge income">
                    <FaArrowUp />
                  </span>
                  <span className="summary-label">Total Pemasukan ({selectedYear})</span>
                </div>
                <div className="summary-amount text-green">{formatCurrency(report.incoming)}</div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="summary-card-wrapper">
              <div className="summary-card glass-card summary-card-expense">
                <div className="summary-header">
                  <span className="summary-icon-badge expense">
                    <FaArrowDown />
                  </span>
                  <span className="summary-label">Total Penyaluran ({selectedYear})</span>
                </div>
                <div className="summary-amount text-blue">{formatCurrency(report.outgoing)}</div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="summary-card-wrapper">
              <div className="summary-card glass-card summary-card-balance">
                <div className="summary-header">
                  <span className="summary-icon-badge balance">
                    <FaChartBar />
                  </span>
                  <span className="summary-label">Saldo Akhir Periode</span>
                </div>
                <div className="summary-amount text-balance">{formatCurrency(balance)}</div>
              </div>
            </ScrollReveal>
          </div>

          {/* Breakdown */}
          {report.breakdown && (
            <div className="breakdown-grid">
              <ScrollReveal direction="right">
                <div className="breakdown-card glass-card">
                  <h3 className="breakdown-heading-green">Sumber Penerimaan Donasi</h3>
                  <div className="breakdown-list">
                    {report.breakdown.income.map((item, i) => (
                      <div key={i} className="breakdown-item">
                        <div className="breakdown-item-header">
                          <span className="breakdown-name">{item.source}</span>
                          <span className="breakdown-amount">{formatCurrency(item.amount)}</span>
                        </div>
                        <div className="breakdown-bar">
                          <div
                            className="breakdown-bar-fill"
                            style={{
                              width: `${(item.amount / maxIncome) * 100}%`,
                              background: 'var(--gradient-green)',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="left">
                <div className="breakdown-card glass-card">
                  <h3 className="breakdown-heading-blue">Rincian Realisasi Penyaluran</h3>
                  <div className="breakdown-list">
                    {report.breakdown.expense.map((item, i) => (
                      <div key={i} className="breakdown-item">
                        <div className="breakdown-item-header">
                          <span className="breakdown-name">{item.category}</span>
                          <span className="breakdown-amount">{formatCurrency(item.amount)}</span>
                        </div>
                        <div className="breakdown-bar">
                          <div
                            className="breakdown-bar-fill"
                            style={{
                              width: `${(item.amount / maxExpense) * 100}%`,
                              background: 'var(--gradient-blue)',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          )}

          {/* LPJ Document Link */}
          <ScrollReveal>
            <a
              href={report.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="doc-link-card"
              style={{ marginTop: 'var(--space-8)', textDecoration: 'none' }}
            >
              <div className="doc-icon-wrapper">
                <FaFileAlt />
              </div>
              <div className="doc-link-info">
                <span className="doc-link-title">{report.documentTitle}</span>
                <span className="doc-link-meta">Klik untuk membuka dokumen LPJ resmi — dapat diakses publik</span>
              </div>
              <div className="doc-status-badge">
                <FaCheckCircle /> {report.status}
              </div>
              <FaExternalLinkAlt style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
