export interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
}

export interface EventItem {
  id: number;
  day: string;
  month: string;
  title: string;
  location: string;
}

export interface QuickAccessItem {
  id: number;
  title: string;
  icon: string;
}