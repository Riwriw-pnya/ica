import { CatteryItem, EventListItem, MembershipHistoryItem, MembershipInfo, NewsItem, QuickAccessItem } from "@/types/dashboard_member";

export const quickAccessItems: QuickAccessItem[] = [
  { id: 1, title: "Daftar event", icon: "calendar", href: "/dashboard_member/event" },
  { id: 2, title: "Cari cattery", icon: "search", href: "/dashboard_member/direktori" },
  { id: 3, title: "Berita ICA", icon: "news", href: "/dashboard_member/berita" },
  { id: 4, title: "Ajukan cattery", icon: "home", href: "/dashboard_member/ajukan" },
];

export const newsItems: NewsItem[] = [
  { id: 1, title: "Pendaftaran keanggotaan periode 2026/2027 resmi dibuka", category: "Pengumuman", date: "24 Agu 2026", href: "/dashboard_member/berita/1", excerpt: "Pendaftaran keanggotaan ICA periode 2026/2027 kini resmi dibuka untuk umum." },
  { id: 2, title: "Hasil ICA National Cat Show Bandung 2026", category: "Event", date: "18 Agu 2026", href: "/dashboard_member/berita/2", excerpt: "Simak hasil lengkap ICA National Cat Show yang diselenggarakan di Bandung." },
  { id: 3, title: "Kartu member kini tersedia dalam format digital", category: "Keanggotaan", date: "9 Agu 2026", href: "/dashboard_member/berita/3", excerpt: "Kini member ICA bisa mengakses kartu keanggotaan dalam bentuk digital." },
  { id: 4, title: "Workshop Keanggotaan ICA", category: "Pengumuman", date: "5 Sep 2026", href: "/dashboard_member/berita/4", excerpt: "Ikuti workshop tentang keanggotaan ICA yang akan diselenggarakan pada tanggal 5 September 2026." },
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
    href: "/dashboard_member/direktori/1",
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
    href: "/dashboard_member/direktori/2",
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
    href: "/dashboard_member/direktori/3",
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
    href: "/dashboard_member/direktori/4",
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
    href: "/dashboard_member/direktori/5",
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
    href: "/dashboard_member/direktori/6",
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
    registerHref: "/dashboard_member/event/1",
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
    registerHref: "/dashboard_member/event/2",
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
    registerHref: "/dashboard_member/event/3",
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
    registerHref: "/dashboard_member/event/4",
  },
];