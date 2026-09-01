import { EventItem, NewsItem, QuickAccessItem } from "@/types/dashboard_member";

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

export const upcomingEvents: EventItem[] = [
  { id: 1, day: "12", month: "SEP", title: "ICA Regional Cat Show — Bandung", location: "Bandung", href: "/dashboard_member/event/1" },
  { id: 2, day: "04", month: "OKT", title: "ICA Kitten Fest", location: "Jakarta", href: "/dashboard_member/event/2" },
  { id: 3, day: "22", month: "NOV", title: "ICA National Championship", location: "Surabaya", href: "/dashboard_member/event/3" },
];