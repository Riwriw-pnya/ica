export interface NewsItem {
  id: number;
  title: string;
  excerpt?: string;
  category: string;
  date: string;
  href: string;
}

export interface EventItem {
  id: number;
  day: string;
  month: string;
  title: string;
  location: string;
  href: string;
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