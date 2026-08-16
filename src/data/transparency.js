export const impactStats = {
  totalDonationsReceived: 'Rp 145.850.000+',
  totalBeneficiaries: 4800,
  yearsActive: '4 Tahun (Est. 2022)',
  operationalRatio: '8%',
};

export const fundAllocation = [
  {
    name: "Jum’at Berkah (Jumber 💌)",
    percentage: 45,
    color: '#73a932',
    description: 'Penyaluran paket makanan bergizi mingguan, air mineral, dan santunan untuk pekerja jalanan & dhuafa di Lampung.',
  },
  {
    name: 'Paket Bingkisan Ramadhan & Lebaran',
    percentage: 30,
    color: '#0284c7',
    description: 'Penyediaan paket sembako lengkap dan santunan hari raya bagi keluarga prasejahtera dan yatim.',
  },
  {
    name: 'Qurban Pelosok & Kemanusiaan 🇵🇸',
    percentage: 15,
    color: '#059669',
    description: 'Penyaluran hewan qurban ke desa pelosok pedalaman dan donasi darurat kemanusiaan.',
  },
  {
    name: 'Operasional Logistik & Relawan',
    percentage: 10,
    color: '#0f2444',
    description: 'Biaya transportasi survei penerima manfaat, kemasan ramah lingkungan, dan akomodasi aksi relawan.',
  },
];

export const yearlyReports = [
  {
    year: 2026,
    incoming: 42500000,
    outgoing: 39800000,
    beneficiaries: 1450,
    documentUrl: 'https://docs.google.com/document/d/1ATNxcU1O3NuDv2i4PcAF_Z8_66aA_tqmX0e8ol2QT3E/edit?usp=sharing',
    documentTitle: 'LPJ Paket Bingkisan Lebaran 2026 (Google Docs)',
    status: 'Tersedia Publik',
    breakdown: {
      income: [
        { source: 'Infaq & Sedekah Donatur Umum via BSI', amount: 26500000 },
        { source: 'Program Khusus Bingkisan Lebaran & Sembako', amount: 12000000 },
        { source: 'Sedekah Jum’at Berkah Mingguan', amount: 4000000 },
      ],
      expense: [
        { category: 'Penyaluran Paket Bingkisan Sembako Lebaran', amount: 22500000 },
        { category: 'Distribusi Paket Makanan Jum’at Berkah', amount: 11300000 },
        { category: 'Santunan Tunai Lansia Dhuafa & Yatim', amount: 3800000 },
        { category: 'Operasional Logistik & Kemasan', amount: 2200000 },
      ],
    },
  },
  {
    year: 2025,
    incoming: 51200000,
    outgoing: 49100000,
    beneficiaries: 1800,
    documentUrl: 'https://docs.google.com/document/d/1ATNxcU1O3NuDv2i4PcAF_Z8_66aA_tqmX0e8ol2QT3E/edit?usp=sharing',
    documentTitle: 'Rekap Laporan Tahunan Donasi 2025',
    status: 'Tersedia Publik',
    breakdown: {
      income: [
        { source: 'Infaq & Sedekah Donatur BSI', amount: 31200000 },
        { source: 'Program Qurban Pelosok 2025', amount: 12500000 },
        { source: 'Donasi Kemanusiaan Palestina', amount: 7500000 },
      ],
      expense: [
        { category: 'Aksi Rutin Jum’at Berkah (Jumber)', amount: 22800000 },
        { category: 'Pengadaan & Penyaluran Hewan Qurban', amount: 12500000 },
        { category: 'Penyaluran Donasi Kemanusiaan', amount: 7500000 },
        { category: 'Operasional & Dokumentasi Media', amount: 6300000 },
      ],
    },
  },
  {
    year: 2024,
    incoming: 34150000,
    outgoing: 32800000,
    beneficiaries: 1100,
    documentUrl: 'https://docs.google.com/document/d/1ATNxcU1O3NuDv2i4PcAF_Z8_66aA_tqmX0e8ol2QT3E/edit?usp=sharing',
    documentTitle: 'Rekap Laporan Donasi Jumber & Ramadhan 2024',
    status: 'Tersedia Publik',
    breakdown: {
      income: [
        { source: 'Sedekah Subuh & Donasi Rutin', amount: 18500000 },
        { source: 'Bingkisan Ramadhan & Lebaran 1445H', amount: 15650000 },
      ],
      expense: [
        { category: 'Penyaluran Bingkisan Lebaran & Sembako', amount: 15650000 },
        { category: 'Distribusi Paket Nasi Jum’at Berkah', amount: 14500000 },
        { category: 'Transportasi & Logistik Lapangan', amount: 2650000 },
      ],
    },
  },
  {
    year: 2023,
    incoming: 18000000,
    outgoing: 16500000,
    beneficiaries: 450,
    documentUrl: 'https://docs.google.com/document/d/1ATNxcU1O3NuDv2i4PcAF_Z8_66aA_tqmX0e8ol2QT3E/edit?usp=sharing',
    documentTitle: 'Laporan Aksi Awal Belajar Sedekah 2023',
    status: 'Tersedia Publik',
    breakdown: {
      income: [
        { source: 'Inisiatif Sedekah Relawan & Sobat BS', amount: 18000000 },
      ],
      expense: [
        { category: 'Penyaluran Makanan Jum’at Berkah Perdana', amount: 14200000 },
        { category: 'Peralatan & Logistik Distribusi', amount: 2300000 },
      ],
    },
  },
];
