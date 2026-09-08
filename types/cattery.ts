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
  certificateFile?: CatCertificateFile;
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

export interface NotificationItem {
  id: string;
  type: "event" | "pedigree" | "mating" | "general";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  url?: string;
}

export type FemaleCertStatus = "Aktif" | "Perlu perpanjangan" | "Belum cukup umur";

export interface FemaleCat {
  id: number;
  name: string;
  breed: string;
  birthDate: string;
  regCode: string;
  emsCode: string;
  certStatus: FemaleCertStatus;
  certificateFile?: CatCertificateFile;
}

export type OffspringGender = "Jantan" | "Betina";
export type OffspringStatus = "Hidup" | "Mati";

export interface OffspringItem {
  id: number;
  name: string;
  gender: OffspringGender | "";
  color: string;
  birthDate: string;
  birthWeight: string;
  breed: string;
  status: OffspringStatus;
  photoName?: string;
}

export interface CatCertificateFile {
  fileName: string;
  uploadedDate: string;
  sizeLabel: string;
}