export interface ProductCategory {
  id: string;
  label: string;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  image?: string;
  price: number;
  discountPercent?: number;
  originalPrice?: number;
  rating: number;
  soldLabel: string;
  seller: string;
  location: string;
  categoryId: string;
}