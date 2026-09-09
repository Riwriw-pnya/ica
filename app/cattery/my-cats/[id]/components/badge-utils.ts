import type {
  CatQualityBadge,
  EventResultBadge,
  PedigreeStatus,
  VaccinationStatus,
} from "@/types/cattery";

export function qualityBadgeLabel(badge: CatQualityBadge) {
  return badge === "BOB" ? "BoB" : badge;
}

export function qualityBadgeTone(badge: CatQualityBadge) {
  return badge === "Good" ? ("blue" as const) : ("orange" as const);
}

export function pedigreeStatusLabel(status: PedigreeStatus) {
  switch (status) {
    case "Terverifikasi":
      return "Pedigree terverifikasi";
    case "Menunggu verifikasi":
      return "Pedigree diproses";
    case "Belum diajukan":
      return "Pedigree belum diajukan";
  }
}

export function pedigreeStatusTone(status: PedigreeStatus) {
  switch (status) {
    case "Terverifikasi":
      return "green" as const;
    case "Menunggu verifikasi":
      return "blue" as const;
    case "Belum diajukan":
      return "grey" as const;
  }
}

export function vaccinationTone(status: VaccinationStatus) {
  switch (status) {
    case "Vaksin lengkap":
      return "green" as const;
    case "Vaksin sebagian":
      return "orange" as const;
    case "Belum vaksin":
      return "red" as const;
  }
}

export function eventResultTone(result: EventResultBadge) {
  return result === "Tanpa gelar" ? ("grey" as const) : ("green" as const);
}
