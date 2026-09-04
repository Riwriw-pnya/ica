export interface CatItem {
  id: number;
  name: string;
  gender: "Male" | "Female";
  breed: string;
  regCode: string;
  healthScore: number;
  paidShows: number;
  image?: string;
}