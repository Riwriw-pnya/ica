export interface NewsItem {
  id: number;
  title: string;
  excerpt?: string;
  category: string;
  date: string;
  href: string;
  image?: string; // path lokal ("/images/news/xxx.jpg") atau URL penuh
}

export interface QuickAccessItem {
  id: number;
  title: string;
  icon: string;
  href: string;
}

export interface CatteryItem {
  id: number;
  name: string;
  status: "Terverifikasi" | "Dalam review";
  region: string;
  breeds: string[];
  score: number;
  whatsapp: string;
  address: string;
  href: string;
}

export interface MembershipInfo {
  name: string;
  memberId: string;
  region: string;
  status: "Aktif" | "Kedaluwarsa" | "Menunggu pembayaran";
  startDate: string;
  endDate: string;
}

export interface MembershipHistoryItem {
  id: number;
  title: string;
  date: string;
}

export type EventStatus = "Pendaftaran dibuka" | "Segera dibuka" | "Draft jadwal";

export interface EventListItem {
  id: number;
  day: string;
  month: string;
  title: string;
  location: string;
  scope: string;
  quota: number;
  status: EventStatus;
  registerHref: string;
}

export type LeaderboardCategory = "Kitten" | "Adult" | "Household Pet";

export interface LeaderboardEntry {
  id: number;
  rank: number;
  catName: string;
  breed: string;
  category: LeaderboardCategory;
  cattery: string;
  points: number;
}