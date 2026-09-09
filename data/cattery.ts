import type {
  CatEventResult,
  CatItem,
  CatProfileDetail,
  CatteryProfile,
  MaleCat,
  NotificationItem,
  PedigreeChart,
  FemaleCat,
  OffspringItem,
} from "@/types/cattery";

export const catItems: CatItem[] = [
  { id: 1, name: "Bagas of Rumah Hana", gender: "Male", breed: "Persian", regCode: "EMS PER n 22", healthScore: 94, paidShows: 2, qualityBadge: "Excellent", pedigreeStatus: "Terverifikasi", sireName: "Kaisar of Melati", damName: "Ratu Bilqis" },
  { id: 2, name: "Kirana of Rumah Hana", gender: "Female", breed: "Persian", regCode: "EMS PER f 22", healthScore: 91, paidShows: 1, qualityBadge: "Good", pedigreeStatus: "Menunggu verifikasi", sireName: "Kaisar of Melati", damName: "Ratu Bilqis" },
  { id: 3, name: "Nara Kencana", gender: "Female", breed: "Exotic Shorthair", regCode: "EMS EXO d 03", healthScore: 88, paidShows: 2, qualityBadge: "BOB", pedigreeStatus: "Menunggu verifikasi", sireName: "Bimasena of Arta", damName: "Kencana Wungu" },
  { id: 4, name: "Rimba of Rumah Hana", gender: "Male", breed: "Persian", regCode: "EMS PER a 21", healthScore: 84, paidShows: 1, qualityBadge: "Good", pedigreeStatus: "Terverifikasi", sireName: "Kaisar of Melati", damName: "Intan Permata" },
  { id: 5, name: "Sekar Ayu", gender: "Female", breed: "Exotic Shorthair", regCode: "EMS EXO n 24", healthScore: 80, paidShows: 1, pedigreeStatus: "Belum diajukan", sireName: "Sultan Eksotis", damName: "Dewi Salju" },
  { id: 6, name: "Damar of Rumah Hana", gender: "Male", breed: "Persian", regCode: "EMS PER g 24", healthScore: 76, paidShows: 0, qualityBadge: "Excellent", pedigreeStatus: "Terverifikasi", sireName: "Kaisar of Melati", damName: "Ratu Bilqis" },
];

export const catteryProfile: CatteryProfile = {
  name: "Rumah Hana Cattery",
  regNumber: "ICA-CTY-2024-0188",
  region: "Bandung",
  personInCharge: "Hana Prameswari",
};

export const maleCats: MaleCat[] = [
  { id: 1, name: "Bagas of Rumah Hana", breed: "Persian", birthDate: "12 Mar 2022", regCode: "ICA-PD-4471", emsCode: "PER n 22", certStatus: "Aktif",
    certificateFile: { fileName: "d1-berkas.pdf", uploadedDate: "3 Jan 2026", sizeLabel: "1.2 MB" } },
  { id: 2, name: "Rimba Anggara", breed: "Maine Coon", birthDate: "2 Jun 2021", regCode: "ICA-PD-3980", emsCode: "MCO ns 24", certStatus: "Aktif",
    certificateFile: { fileName: "d1-berkas.pdf", uploadedDate: "15 Nov 2025", sizeLabel: "1.2 MB" } },
  { id: 3, name: "Gala Pradipta", breed: "Persian", birthDate: "8 Sep 2023", regCode: "ICA-PD-5120", emsCode: "PER d 03", certStatus: "Aktif",
    certificateFile: { fileName: "d1-berkas.pdf", uploadedDate: "20 Des 2025", sizeLabel: "1.2 MB" } },
  { id: 4, name: "Wira Santana", breed: "British Shorthair", birthDate: "19 Jan 2020", regCode: "ICA-PD-2210", emsCode: "BRI a", certStatus: "Perlu perpanjangan" },
];

export const femaleCats: FemaleCat[] = [
  { id: 1, name: "Nara Kencana", breed: "Exotic Shorthair", birthDate: "1 Feb 2022", regCode: "ICA-PD-4950", emsCode: "PER f 22", certStatus: "Aktif",
    certificateFile: { fileName: "d2-berkas.pdf", uploadedDate: "7 Jan 2026", sizeLabel: "1.2 MB" } },
  { id: 2, name: "Sekar Ayu", breed: "Exotic Shorthair", birthDate: "27 Jul 2022", regCode: "ICA-PD-1510", emsCode: "MCO f 03", certStatus: "Aktif",
    certificateFile: { fileName: "d2-berkas.pdf", uploadedDate: "12 Nov 2025", sizeLabel: "1.2 MB" } },
  { id: 3, name: "Kirana Melati", breed: "Persian", birthDate: "10 Nov 2021", regCode: "ICA-PD-3766", emsCode: "PER g 24", certStatus: "Aktif",
    certificateFile: { fileName: "d2-berkas.pdf", uploadedDate: "2 Des 2025", sizeLabel: "1.2 MB" } },
  { id: 4, name: "Tirta Wangi", breed: "British Shorthair", birthDate: "9 Feb 2024", regCode: "ICA-PD-5431", emsCode: "BRI c", certStatus: "Perlu perpanjangan" },
];

export const initialNotifications: NotificationItem[] = [
  { id: "n1", type: "event", title: "Pendaftaran event dibuka", message: "ICA Regional Cat Show — Bandung sudah bisa didaftarkan.", time: "2 jam lalu", isRead: false, url: "/cattery/event" },
  { id: "n2", type: "pedigree", title: "Pedigree disetujui", message: "Pedigree Bagas of Rumah Hana telah diverifikasi Admin ICA.", time: "Kemarin", isRead: false, url: "/cattery/pedigree" },
  { id: "n3", type: "mating", title: "Mating report menunggu review", message: "Laporan Bagas × Nara Kencana sedang diproses.", time: "3 hari lalu", isRead: true, url: "/cattery/mating" },
];

/**
 * Detail-page-only fields, keyed by the same id used in catItems.
 * Semua 6 kucing sudah ada entrinya biar /cattery/my-cats/[id] jalan untuk semua id.
 */
export const catProfileDetails: CatProfileDetail[] = [
  {
    ...catItems[0], // Bagas of Rumah Hana
    registrationNumber: "ICA-2022-0091",
    birthDate: "12 Mar 2022",
    color: "Golden Chinchilla",
    vaccinationStatus: "Vaksin lengkap",
  },
  {
    ...catItems[1], // Kirana of Rumah Hana
    registrationNumber: "ICA-2022-0092",
    birthDate: "12 Mar 2022",
    color: "Blue Point",
    vaccinationStatus: "Vaksin lengkap",
  },
  {
    ...catItems[2], // Nara Kencana
    registrationNumber: "ICA-2024-0210",
    birthDate: "21 Jan 2024",
    color: "Red Bicolour",
    vaccinationStatus: "Vaksin lengkap",
  },
  {
    ...catItems[3], // Rimba of Rumah Hana
    registrationNumber: "ICA-2021-0077",
    birthDate: "5 Feb 2021",
    color: "Silver Tabby",
    vaccinationStatus: "Vaksin sebagian",
  },
  {
    ...catItems[4], // Sekar Ayu
    registrationNumber: "ICA-2024-0301",
    birthDate: "3 Mei 2024",
    color: "Cream Tabby",
    vaccinationStatus: "Vaksin sebagian",
  },
  {
    ...catItems[5], // Damar of Rumah Hana
    registrationNumber: "ICA-2024-0410",
    birthDate: "2 Jul 2024",
    color: "Golden Chinchilla",
    vaccinationStatus: "Belum vaksin",
  },
];

/**
 * Kaisar of Melati x Ratu Bilqis adalah induk dari Bagas, Kirana & Damar,
 * jadi mereka berbagi objek sire/dam/kakek-nenek yang sama di bawah ini.
 */
const kaisarMelati = { id: 111, name: "Kaisar of Melati", emsCode: "EMS PER n 09", registrationNumber: "ICA-2019-0033" };
const ratuBilqis = { id: 112, name: "Ratu Bilqis", emsCode: "EMS PER a 10", registrationNumber: "ICA-2019-0040" };
const rajaMelati = { id: 211, name: "Raja Melati", emsCode: "EMS PER n 05", registrationNumber: "ICA-2016-0011", lineage: "sire" as const };
const cempaka = { id: 212, name: "Cempaka", emsCode: "EMS PER a 06", registrationNumber: "ICA-2016-0022", lineage: "sire" as const };
const sultanBilqis = { id: 213, name: "Sultan Bilqis", emsCode: "EMS PER n 04", registrationNumber: "ICA-2016-0035", lineage: "dam" as const };
const melur = { id: 214, name: "Melur", emsCode: "EMS PER f 05", registrationNumber: "ICA-2016-0041", lineage: "dam" as const };

export const pedigreeCharts: PedigreeChart[] = [
  {
    catId: 1, // Bagas of Rumah Hana — sudah terverifikasi, tidak ada banner review
    sire: kaisarMelati,
    dam: ratuBilqis,
    sireSire: rajaMelati,
    sireDam: cempaka,
    damSire: sultanBilqis,
    damDam: melur,
  },
  {
    catId: 2, // Kirana of Rumah Hana — masih menunggu review
    review: {
      reportCode: "MR-2026-0098",
      submittedDate: "5 Agu 2026",
      queueNote: "antrean review admin ICA wilayah Bandung",
      status: "Menunggu review",
    },
    sire: kaisarMelati,
    dam: ratuBilqis,
    sireSire: rajaMelati,
    sireDam: cempaka,
    damSire: sultanBilqis,
    damDam: melur,
  },
  {
    catId: 3, // Nara Kencana
    review: {
      reportCode: "MR-2026-0142",
      submittedDate: "21 Agu 2026",
      queueNote: "antrean review admin ICA wilayah Bandung",
      status: "Menunggu review",
    },
    sire: { id: 101, name: "Bimasena of Arta", emsCode: "EMS EXO d 03", registrationNumber: "ICA-2021-0455" },
    dam: { id: 102, name: "Kencana Wungu", emsCode: "EMS EXO f 03", registrationNumber: "ICA-2021-0480" },
    sireSire: { id: 201, name: "Arta Jaya", emsCode: "EMS EXO d 02", registrationNumber: "ICA-2018-0112", lineage: "sire" },
    sireDam: { id: 202, name: "Puspa of Arta", emsCode: "EMS EXO f 02", registrationNumber: "ICA-2018-0130", lineage: "sire" },
    damSire: { id: 203, name: "Sadewa of Wungu", emsCode: "EMS EXO n 03", registrationNumber: "ICA-2018-0177", lineage: "dam" },
    damDam: { id: 204, name: "Larasati", emsCode: "EMS EXO f 03", registrationNumber: "ICA-2018-0190", lineage: "dam" },
  },
  {
    catId: 4, // Rimba of Rumah Hana — terverifikasi
    sire: kaisarMelati,
    dam: { id: 113, name: "Intan Permata", emsCode: "EMS PER f 12", registrationNumber: "ICA-2019-0055" },
    sireSire: rajaMelati,
    sireDam: cempaka,
    damSire: { id: 215, name: "Baskara Permata", emsCode: "EMS PER n 07", registrationNumber: "ICA-2016-0060", lineage: "dam" },
    damDam: { id: 216, name: "Intan Kusuma", emsCode: "EMS PER f 08", registrationNumber: "ICA-2016-0072", lineage: "dam" },
  },
  // catId 5 (Sekar Ayu) sengaja tidak punya entri — pedigreeStatus-nya "Belum diajukan",
  // jadi PedigreeChart akan otomatis menampilkan state "Silsilah belum tersedia".
  {
    catId: 6, // Damar of Rumah Hana — terverifikasi, littermate Bagas & Kirana
    sire: kaisarMelati,
    dam: ratuBilqis,
    sireSire: rajaMelati,
    sireDam: cempaka,
    damSire: sultanBilqis,
    damDam: melur,
  },
];

export const catEventResults: CatEventResult[] = [
  { id: "ev1-1", catId: 1, eventName: "ICA National Cat Show Bandung 2026", date: "16-17 Agu 2026", ring: "Ring 2", category: "Adult", result: "Best of Breed" },
  { id: "ev1-2", catId: 1, eventName: "ICA Regional Cat Show 2025", date: "10 Nov 2025", ring: "Ring 3", category: "Adult", result: "Best in Show" },

  { id: "ev2-1", catId: 2, eventName: "ICA Kitten Fest 2026", date: "14 Mar 2026", ring: "Ring 2", category: "Junior", result: "Tanpa gelar" },

  { id: "ev3-1", catId: 3, eventName: "ICA Kitten Fest 2026", date: "14 Mar 2026", ring: "Ring 1", category: "Junior", result: "Best of Breed" },
  { id: "ev3-2", catId: 3, eventName: "ICA National Cat Show Bandung 2026", date: "16-17 Agu 2026", ring: "Ring 4", category: "Adult", result: "Tanpa gelar" },

  { id: "ev4-1", catId: 4, eventName: "ICA Regional Cat Show 2025", date: "10 Nov 2025", ring: "Ring 1", category: "Adult", result: "Tanpa gelar" },

  // catId 5 (Sekar Ayu) sengaja tidak punya event — EventHistoryList akan
  // otomatis menampilkan state "Kucing ini belum pernah mengikuti event."

  { id: "ev6-1", catId: 6, eventName: "ICA Kitten Fest 2026", date: "14 Mar 2026", ring: "Ring 1", category: "Junior", result: "Nominasi" },
];

import { ApplicationItem } from "@/types/cattery";

export const mockApplications: ApplicationItem[] = [
  {
    id: "1",
    code: "MR-2026-0142",
    title: "Bagas × Nara",
    subtitle: "Dikirim 21 Agu 2026 · 4 kitten · 6 dokumen",
    status: "review",
    statusLabel: "Sedang direview",
    currentStep: 2,
    timeline: [
      {
        title: "Report dikirim ke admin wilayah Bandung",
        date: "21 Agu 2026",
        actor: "Rumah Hana Cattery",
      },
      {
        title: "Masuk antrean review admin",
        date: "21 Agu 2026",
        actor: "Sistem",
      },
    ],
  },
  {
    id: "2",
    code: "MR-2026-0138",
    title: "Rimba × Sekar",
    subtitle: "Dikirim 12 Agu 2026 · 3 kitten · 5 dokumen",
    status: "revision",
    statusLabel: "Perlu revisi",
    currentStep: 3,
  },
  {
    id: "3",
    code: "MR-2026-0131",
    title: "Bagas × Kirana",
    subtitle: "Dikirim 02 Agu 2026 · 5 kitten · 6 dokumen",
    status: "approved",
    statusLabel: "Disetujui",
    currentStep: 4,
  },
  {
    id: "4",
    code: "CTY-2026-0071",
    title: "Pengajuan cattery — Rumah Hana",
    subtitle: "Dikirim 18 Jul 2026 · 4 dokumen",
    status: "approved",
    statusLabel: "Disetujui",
    currentStep: 4,
  },
];