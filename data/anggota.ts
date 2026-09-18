import {
  CatteryItem,
  EventListItem,
  LeaderboardEntry,
  MembershipHistoryItem,
  MembershipInfo,
  NewsItem,
  QuickAccessItem,
  ActivityLogItem, 
  DeviceItem
} from "@/types/anggota";
import { NotificationItem } from "@/types/cattery";

export const quickAccessItems: QuickAccessItem[] = [
  { id: 1, title: "Daftar event", icon: "calendar", href: "/anggota/event" },
  { id: 2, title: "Cari cattery", icon: "search", href: "/anggota/direktori" },
  { id: 3, title: "Berita ICA", icon: "news", href: "/anggota/berita" },
  {
    id: 4,
    title: "Ajukan cattery",
    icon: "home",
    href: "/anggota/keanggotaan/ajukan-cattery",
  },
];

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "INTERNATIONAL WINNER RULES",
    category: "Regulasi",
    date: "16 Jan 2026",
    href: "https://ica.or.id/international-winner-rules/",
    excerpt:
      "Ketentuan mendapatkan gelar / title “International Winner (IW)” Gelar ini diberikan kepada kucing dari varietas dan ras-ras yang telah diakui penuh (Fully Recognised) di Federation.",
  },
  {
    id: 2,
    title: "Propaganda Cat show, Fun Cat Show & Lomba Kucing Sehat Indonesian Cat Association",
    category: "Event & Show",
    date: "05 Jul 2023",
    href: "https://ica.or.id/propaganda-cat-show-fun-cat-show-lomba-kucing-sehat-indonesian-cat-association/",
    excerpt:
      "Propaganda Cat Show Bertujuan hanya untuk mempropagandakan kegiatan perkucingan, dimana peserta show tidak dapat mengejar perolehan sertifikat show, tetapi untuk Propaganda ICA, masih bermanfaat buat",
  },
  {
    id: 3,
    title: "NATIONAL WINNER RULES",
    category: "Regulasi",
    date: "01 Mar 2023",
    href: "https://ica.or.id/national-winner-rules/",
    excerpt:
      "Ketentuan mendapatkan gelar / title “National Winner (NW)” Gelar ini diberikan kepada kucing dari varietas dan ras-ras yang telah diakui penuh (Fully Recognised) di Federation",
  },
  {
    id: 4,
    title: "188 Kucing Lucu mengikuti ICA-FIFe International Cat Show di Jakarta",
    category: "Event & Show",
    date: "02 Sep 2022",
    href: "https://ica.or.id/188-kucing-lucu-mengikuti-ica-fife-international-cat-show-di-jakarta/",
    excerpt:
      "Foto : Juri ICA-FIFe International Cat Show ke-206 dan ke-207 (dari kiri ke kanan): Pia Nyrup dari Denmark, Magdalena Kudra dari Polandia, dan Aina Hauge",
  },
  {
    id: 5,
    title: "Pengobatan dan Pencegahan Terhadap Toxoplasma Gondii",
    category: "Kesehatan",
    date: "29 Jun 2022",
    href: "https://ica.or.id/pengobatan-dan-pencegahan-terhadap-toxoplasma-gondii/",
    excerpt:
      "Pengobatan Pengobatan yang tersedia pada hewan dan manusia saat ini belum fully memberikan hasil yang memuaskan. Pengobatan hanya efektif apabila Toxoplasma Gondii terdapat pada fase",
  },
  {
    id: 6,
    title: "Perlukah Menyikat Bulu Kucing Secara Teratur?",
    category: "Perawatan",
    date: "24 Jun 2022",
    href: "https://ica.or.id/perlukah-menyikat-bulu-kucing-secara-teratur/",
    excerpt:
      "Meskipun kucing terkenal sebagai hewan yang selalu merawat diri, namun sebagai pemilik hewan peliharaan, Anda masih tetap harus menyisir atau menyikat bulu kucing. Sebab, terkadang",
  },
];

export const catteryItems: CatteryItem[] = [
  {
    id: 1,
    name: "Auroria Cattery",
    status: "Terverifikasi",
    region: "Jawa Barat",
    breeds: ["Persian", "Exotic Shorthair"],
    score: 92,
    whatsapp: "0812-8890-1122",
    address: "Jl. Cimanuk No. 24, Citarum, Bandung Wetan, Kota Bandung 40115",
    href: "/anggota/direktori/1",
  },
  {
    id: 2,
    name: "Bintang Kecil Cattery",
    status: "Terverifikasi",
    region: "DKI Jakarta",
    breeds: ["Maine Coon"],
    score: 88,
    whatsapp: "0813-2233-4455",
    address: "Jl. Kemang Raya No. 10, Kemang, Jakarta Selatan 12730",
    href: "/anggota/direktori/2",
  },
  {
    id: 3,
    name: "Cendana Cats",
    status: "Terverifikasi",
    region: "Jawa Timur",
    breeds: ["British Shorthair"],
    score: 85,
    whatsapp: "0857-6677-8899",
    address: "Jl. Darmo Permai No. 5, Surabaya 60226",
    href: "/anggota/direktori/3",
  },
  {
    id: 4,
    name: "Meong Manis Cattery",
    status: "Dalam review",
    region: "Jawa Barat",
    breeds: ["Persian"],
    score: 74,
    whatsapp: "0821-3344-5566",
    address: "Jl. Setiabudi No. 88, Bandung 40154",
    href: "/anggota/direktori/4",
  },
  {
    id: 5,
    name: "Nusantara Feline",
    status: "Terverifikasi",
    region: "Bali",
    breeds: ["Exotic Shorthair", "Maine Coon"],
    score: 90,
    whatsapp: "0819-9988-7766",
    address: "Jl. Sunset Road No. 45, Kuta, Badung, Bali 80361",
    href: "/anggota/direktori/5",
  },
  {
    id: 6,
    name: "Puri Kucing Cattery",
    status: "Dalam review",
    region: "Sumatera Utara",
    breeds: ["British Shorthair", "Persian"],
    score: 70,
    whatsapp: "0852-1122-3344",
    address: "Jl. Gatot Subroto No. 12, Medan 20115",
    href: "/anggota/direktori/6",
  },
];

export const membershipInfo: MembershipInfo = {
  name: "Ayu Prameswari",
  memberId: "ICA-M-004821",
  region: "Jawa Barat",
  status: "Aktif",
  startDate: "2025-09-01",
  endDate: "2026-08-31",
};

export const membershipHistory: MembershipHistoryItem[] = [
  { id: 1, title: "Perpanjangan keanggotaan 2025/2026 disetujui", date: "01 Sep 2025" },
  { id: 2, title: "Pembayaran iuran diterima", date: "29 Agu 2025" },
  { id: 3, title: "Pendaftaran member baru", date: "12 Agu 2024" },
];

export const eventListItems: EventListItem[] = [
  {
    id: 1,
    day: "12",
    month: "SEP",
    title: "ICA Regional Cat Show — Bandung",
    location: "Bandung",
    scope: "Regional",
    quota: 120,
    status: "Pendaftaran dibuka",
    registerHref: "/anggota/event/1",
  },
  {
    id: 2,
    day: "04",
    month: "OKT",
    title: "ICA Kitten Fest",
    location: "Jakarta",
    scope: "Regional",
    quota: 80,
    status: "Segera dibuka",
    registerHref: "/anggota/event/2",
  },
  {
    id: 3,
    day: "22",
    month: "NOV",
    title: "ICA National Championship",
    location: "Surabaya",
    scope: "Nasional",
    quota: 240,
    status: "Segera dibuka",
    registerHref: "/anggota/event/3",
  },
  {
    id: 4,
    day: "13",
    month: "DES",
    title: "ICA Year-End Exhibition",
    location: "Medan",
    scope: "Eksibisi",
    quota: 100,
    status: "Draft jadwal",
    registerHref: "/anggota/event/4",
  },
];

export const leaderboardEntries: LeaderboardEntry[] = [
  { id: 1, rank: 1, catName: "Auroria Kimi", breed: "Persian", category: "Adult", cattery: "Auroria Cattery", points: 1480 },
  { id: 2, rank: 2, catName: "Bintang Nova", breed: "Maine Coon", category: "Adult", cattery: "Bintang Kecil", points: 1395 },
  { id: 3, rank: 3, catName: "Cendana Momo", breed: "British Shorthair", category: "Kitten", cattery: "Cendana Cats", points: 1310 },
  { id: 4, rank: 4, catName: "Elang Suki", breed: "Ragdoll", category: "Adult", cattery: "Elang Ragdoll", points: 1244 },
  { id: 5, rank: 5, catName: "Fortuna Rio", breed: "Bengal", category: "Household Pet", cattery: "Fortuna Cattery", points: 1180 },
  { id: 6, rank: 6, catName: "Meong Manis Luna", breed: "Persian", category: "Kitten", cattery: "Meong Manis Cattery", points: 1120 },
  { id: 7, rank: 7, catName: "Nusantara Coco", breed: "Exotic Shorthair", category: "Household Pet", cattery: "Nusantara Feline", points: 1065 },
];

export const initialNotifications: NotificationItem[] = [
  { id: "n1", type: "general", title: "Keanggotaan akan berakhir", message: "Masa berlaku keanggotaan Anda tersisa 14 hari lagi.", time: "10 menit lalu", isRead: false, url: "/anggota/keanggotaan" },
  { id: "n2", type: "event", title: "Pendaftaran event dibuka", message: "ICA Regional Cat Show — Bandung sudah bisa didaftarkan.", time: "2 jam lalu", isRead: false, url: "/anggota/event" },
  { id: "n3", type: "pedigree", title: "Pedigree disetujui", message: "Pedigree Bagas of Rumah Hana telah diverifikasi Admin ICA.", time: "Kemarin", isRead: true, url: "/anggota/keanggotaan" },
];

export const activityLogItems: ActivityLogItem[] = [
  {
    id: "a1",
    title: "Masuk ke Member Portal",
    category: "Login",
    description: "Chrome · Windows 11 · Bandung · IP 114.79.••.••",
    time: "09:14",
    date: "01 Sep 2026",
  },
  {
    id: "a2",
    title: "Pengajuan status cattery dikirim",
    category: "Pengajuan",
    description: "Nomor pengajuan ICA-CTY-2026-0517 · admin wilayah Jawa Barat",
    time: "16:40",
    date: "31 Agu 2026",
  },
  {
    id: "a3",
    title: "Nomor WhatsApp diperbarui",
    category: "Perubahan data",
    description: "0812-••••-1122 diganti menjadi 0813-••••-4455",
    time: "11:02",
    date: "28 Agu 2026",
  },
  {
    id: "a4",
    title: "Kata sandi sementara diterbitkan admin",
    category: "Keamanan",
    description: "Tiket ICA-PWD-2026-0148 · diverifikasi Admin Jawa Barat",
    time: "22:10",
    date: "27 Agu 2026",
  },
  {
    id: "a5",
    title: "Percobaan masuk gagal",
    category: "Keamanan",
    description: "Kata sandi salah · Safari · iPhone · IP 36.72.••.••",
    time: "21:33",
    date: "27 Agu 2026",
  },
  {
    id: "a6",
    title: "Masuk ke Member Portal",
    category: "Login",
    description: "Chrome · Android · Jakarta Selatan",
    time: "07:55",
    date: "24 Agu 2026",
  },
  {
    id: "a7",
    title: "Foto profil diperbarui",
    category: "Perubahan data",
    description: "Diunggah dari perangkat Windows 11",
    time: "13:26",
    date: "20 Agu 2026",
  },
  {
    id: "a8",
    title: "Perpanjangan keanggotaan disetujui",
    category: "Pengajuan",
    description: "Periode 2025/2026 · pembayaran terverifikasi",
    time: "08:20",
    date: "01 Sep 2025",
  },
];

export const deviceItems: DeviceItem[] = [
  { id: "d1", browser: "Chrome", os: "Windows 11", location: "Bandung, Jawa Barat", lastActive: "Aktif sekarang", isCurrent: true },
  { id: "d2", browser: "Safari", os: "iPhone 13", location: "Bandung, Jawa Barat", lastActive: "2 jam lalu", isCurrent: false },
  { id: "d3", browser: "Chrome", os: "Android", location: "Jakarta Selatan", lastActive: "3 hari lalu", isCurrent: false },
];