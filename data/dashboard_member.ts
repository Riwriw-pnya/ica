/*sementara, karena API belum ada*/
import type {
  EventItem,
  NewsItem,
  QuickAccessItem,
} from "@/types/dashboard_member";

export const quickAccessItems: QuickAccessItem[] = [
  {
    id: 1,
    title: "Daftar event",
    icon: "calendar",
  },
  {
    id: 2,
    title: "Cari cattery",
    icon: "search",
  },
  {
    id: 3,
    title: "Berita ICA",
    icon: "news",
  },
  {
    id: 4,
    title: "Ajukan cattery",
    icon: "home",
  },
];

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Pendaftaran keanggotaan periode 2026/2027 resmi dibuka",
    category: "Pengumuman",
    date: "24 Agu 2026",
  },
  {
    id: 2,
    title: "Hasil ICA National Cat Show Bandung 2026",
    category: "Event",
    date: "18 Agu 2026",
  },
  {
    id: 3,
    title: "Kartu member kini tersedia dalam format digital",
    category: "Keanggotaan",
    date: "9 Agu 2026",
  },
];

export const upcomingEvents: EventItem[] = [
  {
    id: 1,
    day: "12",
    month: "SEP",
    title: "ICA Regional Cat Show — Bandung",
    location: "Bandung",
  },
  {
    id: 2,
    day: "04",
    month: "OKT",
    title: "ICA Kitten Fest",
    location: "Jakarta",
  },
  {
    id: 3,
    day: "22",
    month: "NOV",
    title: "ICA National Championship",
    location: "Surabaya",
  },
];