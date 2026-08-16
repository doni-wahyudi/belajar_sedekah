export const programs = [
  {
    id: 'beasiswa-pandawa',
    title: 'Beasiswa Pandawa',
    subtitle: 'Bantuan Biaya Pendidikan & Pendampingan Akademik',
    icon: 'graduation',
    color: '#73a932',
    accentColor: '#8dc63f',
    shortDescription: 'Beasiswa khusus bagi mahasiswa berprestasi dari keluarga prasejahtera, berfokus mencetak sarjana mandiri dan berintegritas.',
    fullDescription: `Beasiswa Pandawa merupakan program unggulan dari Komunitas Belajar Sedekah yang bertujuan untuk membantu mahasiswa UIN Sunan Kalijaga Yogyakarta yang memiliki keterbatasan ekonomi namun memiliki tekad dan potensi akademik tinggi.

Program ini telah berjalan konsisten sejak tahun 2017 dan telah melahirkan puluhan alumni yang kini telah berkarier di berbagai sektor teknologi dan industri. Beasiswa mencakup bantuan Uang Kuliah Tunggal (UKT), tunjangan biaya hidup bulanan, serta program pembinaan kepemimpinan dan mentoring berkala.`,
    eligibility: [
      'Mahasiswa aktif UIN Sunan Kalijaga Yogyakarta',
      'Berasal dari keluarga berpenghasilan rendah / kurang mampu',
      'Memiliki Indeks Prestasi Kumulatif (IPK) minimal 3.00',
      'Tidak sedang menerima beasiswa dari institusi lain',
      'Memiliki komitmen sosial dan siap mengikuti pembinaan komunitas',
    ],
    timeline: [
      { month: 'Maret', activity: 'Sosialisasi & pembukaan pendaftaran online' },
      { month: 'April', activity: 'Seleksi berkas & verifikasi faktual lapangan' },
      { month: 'Mei', activity: 'Wawancara calon penerima beasiswa' },
      { month: 'Juni', activity: 'Pengumuman resmi Penerima Beasiswa Pandawa' },
      { month: 'Juli', activity: 'Pencairan beasiswa tahap 1 & Orientasi pembinaan' },
    ],
    stats: {
      totalRecipients: 28,
      totalFunding: 'Rp 150.000.000+',
      yearsRunning: 9,
    },
  },
  {
    id: 'drop-books',
    title: 'Drop Books Indonesia',
    subtitle: 'Membuka Jendela Dunia untuk Pelosok Nusantara',
    icon: 'books',
    color: '#0284c7',
    accentColor: '#38bdf8',
    shortDescription: 'Penyaluran buku-buku bacaan berkualitas dan edukatif untuk taman baca, perpustakaan desa, dan sekolah di daerah pelosok.',
    fullDescription: `Drop Books adalah gerakan literasi berkelanjutan dari Komunitas Belajar Sedekah untuk mengatasi ketimpangan akses bahan bacaan bagi anak-anak di daerah pelosok Indonesia.

Kami menggalang donasi buku layak baca (ensiklopedia, cerita edukatif, sains dasar, dan buku pelajaran), menyortir kualitasnya, lalu mengirimkannya langsung ke taman bacaan masyarakat (TBM) dan sekolah-sekolah di pelosok daerah seperti Kalimantan Barat, NTT, Sulawesi, dan Jawa Barat.`,
    howItWorks: [
      { step: 1, title: 'Penggalangan & Donasi', desc: 'Menerima donasi buku dari masyarakat dan donatur korporat.' },
      { step: 2, title: 'Kurasi & Sortir Kualitas', desc: 'Memilah buku sesuai usia pembaca dan memastikan kondisi fisik prima.' },
      { step: 3, title: 'Distribusi Tepat Sasaran', desc: 'Mengirimkan paket buku ke pengelola TBM / sekolah yang telah diverifikasi.' },
      { step: 4, title: 'Pendampingan & Evaluasi', desc: 'Memantau perkembangan literasi dan pemanfaatan perpustakaan secara berkala.' },
    ],
    stats: {
      booksDistributed: 5000,
      locationsServed: 15,
      provinces: 5,
    },
  },
];

export const recipients = [
  {
    name: 'Tri Setyo Dermawan',
    program: 'Teknik Informatika 2014',
    status: 'Alumni',
    batch: 1,
  },
  {
    name: 'Iqbal Adi Nurmansyah',
    program: 'Teknik Informatika 2014',
    status: 'Alumni',
    batch: 1,
  },
  {
    name: 'Riko Putro Nugroho',
    program: 'Teknik Informatika 2015',
    status: 'Alumni',
    batch: 2,
  },
  {
    name: 'Rizki Zidanul Farhan',
    program: 'Teknik Informatika 2015',
    status: 'Alumni',
    batch: 2,
  },
  {
    name: "Khurin 'Ien Mukhoyyaroh",
    program: 'Teknik Informatika 2016',
    status: 'Alumni',
    batch: 3,
  },
  {
    name: 'Ahmad Fauzi Rahman',
    program: 'Teknik Informatika 2017',
    status: 'Alumni',
    batch: 4,
  },
  {
    name: 'Siti Nurhaliza',
    program: 'Teknik Informatika 2018',
    status: 'Alumni',
    batch: 5,
  },
  {
    name: 'Muhammad Irfan',
    program: 'Teknik Informatika 2020',
    status: 'Aktif',
    batch: 7,
  },
  {
    name: 'Dewi Safitri',
    program: 'Teknik Informatika 2021',
    status: 'Aktif',
    batch: 8,
  },
  {
    name: 'Budi Santoso',
    program: 'Teknik Informatika 2022',
    status: 'Aktif',
    batch: 9,
  },
];
