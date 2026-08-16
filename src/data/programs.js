export const programs = [
  {
    id: 'beasiswa-pandawa',
    title: 'Beasiswa Pendidikan Belajar Sedekah',
    subtitle: 'Bantuan Biaya Pendidikan & Pendampingan Karakter',
    icon: 'graduation',
    color: '#73a932',
    accentColor: '#8dc63f',
    shortDescription: 'Beasiswa khusus bagi mahasiswa & pelajar berprestasi dari keluarga prasejahtera, berfokus mencetak generasi mandiri, cerdas, dan berintegritas.',
    fullDescription: `Program Beasiswa Belajar Sedekah merupakan inisiatif kepedulian yang digagas oleh Despa Putri Lestari sejak tahun 2020 untuk membantu anak-anak dan generasi muda yang memiliki keterbatasan ekonomi agar tetap dapat melanjutkan studi dan meraih cita-cita.

Program ini telah mendampingi puluhan penerima manfaat melalui bantuan biaya pendidikan, sarana penunjang belajar, pembinaan soft skills, serta mentoring berkala bersama relawan Komunitas Belajar Sedekah.`,
    eligibility: [
      'Mahasiswa / Pelajar aktif dari keluarga berpenghasilan rendah / dhuafa',
      'Memiliki komitmen belajar tinggi dan prestasi akademik/non-akademik',
      'Tidak sedang menerima beasiswa penuh dari institusi lain',
      'Memiliki integritas, akhlak mulia, dan berjiwa sosial',
      'Siap berpartisipasi dalam program pengabdian masyarakat Belajar Sedekah',
    ],
    timeline: [
      { month: 'Maret', activity: 'Sosialisasi & pembukaan pendaftaran online' },
      { month: 'April', activity: 'Seleksi berkas & verifikasi faktual lapangan' },
      { month: 'Mei', activity: 'Wawancara calon penerima beasiswa' },
      { month: 'Juni', activity: 'Pengumuman resmi Penerima Beasiswa' },
      { month: 'Juli', activity: 'Pencairan beasiswa tahap 1 & Orientasi pembinaan' },
    ],
    stats: {
      totalRecipients: 35,
      totalFunding: 'Rp 180.000.000+',
      yearsRunning: 6,
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
    fullDescription: `Drop Books adalah gerakan literasi berkelanjutan dari Komunitas Belajar Sedekah (@belajarsedekah.id) untuk mengatasi ketimpangan akses bahan bacaan bagi anak-anak di pelosok Indonesia.

Diinisiasi bersama gerakan kerelawanan Despa Putri Lestari, kami menggalang donasi buku layak baca (ensiklopedia, cerita edukatif, sains dasar, dan buku pelajaran), menyortir kualitasnya, lalu mengirimkannya langsung ke taman bacaan masyarakat (TBM) dan sekolah pelosok di berbagai provinsi.`,
    howItWorks: [
      { step: 1, title: 'Penggalangan & Donasi', desc: 'Menerima donasi buku dari masyarakat luas dan donatur.' },
      { step: 2, title: 'Kurasi & Sortir Kualitas', desc: 'Memilah buku sesuai usia pembaca dan memastikan kondisi fisik prima.' },
      { step: 3, title: 'Distribusi Tepat Sasaran', desc: 'Mengirimkan paket buku ke pengelola TBM / sekolah yang telah diverifikasi.' },
      { step: 4, title: 'Pendampingan & Evaluasi', desc: 'Memantau perkembangan literasi dan pemanfaatan perpustakaan secara berkala.' },
    ],
    stats: {
      booksDistributed: 5000,
      locationsServed: 18,
      provinces: 6,
    },
  },
];

export const recipients = [
  {
    name: 'Tri Setyo Dermawan',
    university: 'UIN Sunan Kalijaga',
    major: 'Teknik Informatika',
    batch: 'Batch 2020',
    quote: 'Beasiswa dari Komunitas Belajar Sedekah meringankan beban orang tua saya dan memotivasi saya untuk terus berkontribusi bagi masyarakat.',
  },
  {
    name: 'Rahmat Hidayatullah',
    university: 'UIN Sunan Kalijaga',
    major: 'Ilmu Komputer',
    batch: 'Batch 2021',
    quote: 'Terima kasih kepada Kak Despa dan tim Belajar Sedekah. Bantuan ini menjadi jembatan bagi saya menyelesaikan skripsi tepat waktu.',
  },
  {
    name: 'Nur Aisyah',
    university: 'UIN Sunan Kalijaga',
    major: 'Pendidikan Matematika',
    batch: 'Batch 2022',
    quote: 'Program mentoring dan kekeluargaan di Belajar Sedekah membentuk karakter dan rasa peduli saya kepada sesama.',
  },
  {
    name: 'Faisal Ahmad',
    university: 'UIN Sunan Kalijaga',
    major: 'Teknik Industri',
    batch: 'Batch 2023',
    quote: 'Menjadi bagian dari keluarga besar Belajar Sedekah adalah berkah besar. Terima kasih para donatur dermawan!',
  },
];
