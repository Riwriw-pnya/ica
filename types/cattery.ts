export type CatQualityBadge = "Excellent" | "Good" | "BOB";
export type PedigreeStatus = "Terverifikasi" | "Menunggu verifikasi" | "Belum diajukan";
export type VaccinationStatus = "Vaksin lengkap" | "Vaksin sebagian" | "Belum vaksin";
export type PedigreeReviewStatus = "Menunggu review" | "Disetujui" | "Ditolak";
export type EventResultBadge = "Best of Breed" | "Best in Show" | "Nominasi" | "Tanpa gelar";

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

export interface CatProfileDetail extends CatItem {
  registrationNumber: string; 
  birthDate: string; 
  color: string; 
  vaccinationStatus: VaccinationStatus;
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

export interface FemaleCat {
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

/** One ancestor box in a pedigree chart (parent or grandparent). */
export interface PedigreeAncestor {
  id: number;
  name: string;
  emsCode: string;
  registrationNumber: string;
  /** Only set on grandparents, to label which side of the family they're on. */
  lineage?: "sire" | "dam";
}

export interface PedigreeReview {
  reportCode: string; // e.g. "MR-2026-0142"
  submittedDate: string; // e.g. "21 Agu 2026"
  queueNote: string; // e.g. "antrean review admin ICA wilayah Bandung"
  status: PedigreeReviewStatus;
}

export interface PedigreeChart {
  catId: number;
  review?: PedigreeReview;
  sire: PedigreeAncestor;
  dam: PedigreeAncestor;
  sireSire: PedigreeAncestor;
  sireDam: PedigreeAncestor;
  damSire: PedigreeAncestor;
  damDam: PedigreeAncestor;
}

export interface CatEventResult {
  id: string;
  catId: number;
  eventName: string;
  date: string; // e.g. "14 Mar 2026" or a range like "16-17 Agu 2026"
  ring: string; // e.g. "Ring 1"
  category: string; // e.g. "Junior"
  result: EventResultBadge;
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
