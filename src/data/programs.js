export const programs = [
  {
    id: 'jumat-berkah',
    title: 'Jum’at Berkah (Jumber 💌)',
    subtitle: 'Berbagi Makanan Bergizi & Kebahagiaan di Hari Jum’at',
    icon: 'heart',
    color: '#73a932',
    accentColor: '#8dc63f',
    shortDescription: 'Gerakan rutin setiap pekan membagikan ratusan paket makanan siap santap dan santunan bagi para pekerja jalanan, lansia, dan dhuafa di Lampung.',
    fullDescription: `Jum'at Berkah (Jumber) adalah program rutin mingguan dari Komunitas Belajar Sedekah (@belajarsedekah.id) yang diinisiasi oleh Despa Putri Lestari di Lampung sejak 2022.

Melalui program ini, para relawan muda Sobat BS menyusuri sudut-sudut kota untuk membagikan paket nasi bergizi, air minum, dan santunan langsung ke tangan mereka yang berjuang mencari nafkah halal (pemulung, tukang becak, pedagang kecil, ojek online, dan lansia).

Program ini membuktikan bahwa sedekah tidak harus menunggu berlebih—sedekah sekecil apapun jika disalurkan bersama-sama mampu menghadirkan senyum dan energi bagi sesama.`,
    eligibility: [
      'Pekerja harian lepas dan pejuang nafkah jalanan',
      'Lansia prasejahtera dan tuna wisma',
      'Anak-anak jalanan dan yatim dhuafa binaan',
      'Terbuka untuk kolaborasi relawan lapangan setiap hari Jum’at',
    ],
    timeline: [
      { month: 'Senin - Kamis', activity: 'Penggalangan donasi & open slot sedekah Jum’at' },
      { month: 'Kamis Malam', activity: 'Belanja bahan & persiapan konsumsi bersama relawan' },
      { month: 'Jum’at Pagi', activity: 'Pengepakan paket makanan & briefing relawan' },
      { month: 'Jum’at Siang', activity: 'Aksi distribusi langsung ke titik-titik sasaran di Lampung' },
      { month: 'Jum’at Sore', activity: 'Dokumentasi & rekap laporan terbuka di Instagram' },
    ],
    stats: {
      totalRecipients: 4800,
      totalFunding: 'Rp 95.000.000+',
      yearsRunning: 4,
    },
  },
  {
    id: 'bingkisan-lebaran',
    title: 'Paket Bingkisan Ramadhan & Lebaran',
    subtitle: 'Menghadirkan Kebahagiaan Hari Raya untuk Yatim & Dhuafa',
    icon: 'gift',
    color: '#0284c7',
    accentColor: '#38bdf8',
    shortDescription: 'Penyaluran paket sembako premium, santunan tunai, dan bingkisan Idul Fitri bagi keluarga dhuafa dan anak yatim di pelosok Lampung.',
    fullDescription: `Program Paket Bingkisan Lebaran adalah agenda tahunan terbesar Belajar Sedekah di bulan suci Ramadhan. Kami mengumpulkan dan menyalurkan ratusan paket sembako lengkap (beras, minyak goreng, gula, biskuit kaleng, sirup, dan kebutuhan pokok) serta santunan tunai hari raya.

Laporan Pertanggungjawaban (LPJ) program ini disusun secara transparan dan dapat diakses terbuka oleh seluruh donatur melalui Google Docs resmi komunitas.`,
    howItWorks: [
      { step: 1, title: 'Open Donasi Ramadhan', desc: 'Penggalangan donasi paket bingkisan (Rp 100rb - Rp 250rb/paket).' },
      { step: 2, title: 'Survei & Pendataan Sasaran', desc: 'Relawan mendata keluarga dhuafa dan janda lansia yang paling membutuhkan.' },
      { step: 3, title: 'Packing Bersama Sobat BS', desc: 'Gotong royong relawan mengemas ratusan paket bingkisan berkah.' },
      { step: 4, title: 'Penyaluran & Terbit LPJ', desc: 'Distribusi door-to-door dan publikasi laporan keuangan terbuka.' },
    ],
    stats: {
      booksDistributed: 1200,
      locationsServed: 24,
      provinces: 1,
    },
  },
  {
    id: 'qurban-kemanusiaan',
    title: 'Qurban & Donasi Kemanusiaan 🇵🇸',
    subtitle: 'Tebar Hewan Qurban Pelosok & Aksi Solidaritas Kemanusiaan',
    icon: 'globe',
    color: '#059669',
    accentColor: '#34d399',
    shortDescription: 'Penyaluran hewan qurban ke daerah minim pequrban serta penggalangan dana solidaritas kemanusiaan untuk saudara kita di Palestina dan korban bencana.',
    fullDescription: `Belajar Sedekah memfasilitasi para shohibul qurban untuk menyalurkan daging qurban ke desa-desa terpencil dan pedalaman Lampung yang jarang menikmati daging qurban. 

Selain itu, komunitas secara aktif membuka dompet kemanusiaan darurat untuk membantu pengungsi Palestina dan korban bencana alam di tanah air secara amanah.`,
    howItWorks: [
      { step: 1, title: 'Patungan / Titip Qurban', desc: 'Menerima qurban utuh maupun tabungan sedekah qurban.' },
      { step: 2, title: 'Pemilihan Hewan Sehat', desc: 'Bekerjasama dengan peternak lokal terpercaya sesuai syariat.' },
      { step: 3, title: 'Penyembelihan & Distribusi', desc: 'Dibagikan langsung ke warga desa dhuafa yang berhak.' },
      { step: 4, title: 'Laporan Dokumentasi', desc: 'Foto, video, dan sertifikat diserahkan kepada shohibul qurban.' },
    ],
    stats: {
      booksDistributed: 450,
      locationsServed: 10,
      provinces: 2,
    },
  },
  {
    id: 'sobat-bs-edukasi',
    title: 'Sobat BS & Tumbuh Bersama 🪴',
    subtitle: 'Wadah Relawan Belajar, Berbagi, dan Bertumbuh',
    icon: 'users',
    color: '#0f2444',
    accentColor: '#38bdf8',
    shortDescription: 'Komunitas pemuda relawan yang saling menginspirasi melalui kajian rutin, penguatan mental spiritual, dan kolaborasi aksi sosial nyata.',
    fullDescription: `Sesuai slogan "Temanmu belajar, berbagi dan bertumbuh setiap hari", Sobat BS adalah rumah bagi para pemuda dan masyarakat umum yang ingin mengasah empati sosial, memperluas relasi kebaikan, dan memperdalam pemahaman agama.

Kami juga menjalin kolaborasi erat (Collabs) dengan berbagai organisasi kepemudaan seperti Forum GenRe Pesisir Barat Lampung untuk mengedukasi generasi muda.`,
    howItWorks: [
      { step: 1, title: 'Gabung Grup Sobat BS', desc: 'Masuk melalui link grup WhatsApp resmi Belajar Sedekah.' },
      { step: 2, title: 'Daily Reminder', desc: 'Mendapatkan motivasi harian, quotes islami, dan ajakan sedekah subuh.' },
      { step: 3, title: 'Aksi Lapangan', desc: 'Ikut serta terjun langsung dalam aksi Jumber dan bakti sosial.' },
      { step: 4, title: 'Bertumbuh Bersama', desc: 'Membangun kebiasaan sedekah konsisten dan memperkuat ukhuwah.' },
    ],
    stats: {
      booksDistributed: 350,
      locationsServed: 8,
      provinces: 1,
    },
  },
];

export const recipients = [
  {
    name: 'Mbah Suparni (72 thn)',
    university: 'Penerima Santunan Lansia',
    major: 'Bandar Lampung',
    batch: 'Program Jumber Rutin',
    quote: 'Alhamdulillah, terima kasih banyak nak Despa dan adik-adik Belajar Sedekah atas makanan dan bantuannya setiap Jum’at.',
  },
  {
    name: 'Pak Herman (54 thn)',
    university: 'Pedagang Keliling',
    major: 'Pesisir Barat, Lampung',
    batch: 'Paket Bingkisan Lebaran',
    quote: 'Bantuan sembako lebaran ini sangat membantu keluarga kami menyambut Idul Fitri dengan penuh rasa syukur.',
  },
  {
    name: 'Anisa (Sobat BS)',
    university: 'Relawan Pemuda',
    major: 'Universitas Lampung',
    batch: 'Relawan Aktif 2023',
    quote: 'Di Belajar Sedekah saya belajar arti ketulusan. Senang sekali bisa bertumbuh dan berbagi bersama teman-teman yang satu frekuensi.',
  },
];
