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

export interface CatteryProfile {
  name: string;
  regNumber: string;
  region: string;
  personInCharge: string;
}

export interface MaleCat {
  id: number;
  name: string;
  breed: string;
  birthDate: string;
  regCode: string;
  emsCode: string;
  certStatus: "Aktif" | "Perlu perpanjangan";
}

export type MatingReportStatus = "Draft" | "Menunggu review" | "Disetujui" | "Ditolak";

export interface MatingReport {
  id: number;
  maleName: string;
  femaleName: string;
  matingDate: string;
  status: MatingReportStatus;
  updatedAt: string;
}

export type CatQualityBadge = "Excellent" | "Good" | "BOB";
export type PedigreeStatus = "Terverifikasi" | "Menunggu verifikasi" | "Belum diajukan";

export interface CatItem {
  id: number;
  name: string;
  gender: "Male" | "Female";
  breed: string;
  regCode: string;
  healthScore: number;
  paidShows: number;
  image?: string;
  qualityBadge?: CatQualityBadge;
  pedigreeStatus: PedigreeStatus;
  sireName?: string;
  damName?: string;
}