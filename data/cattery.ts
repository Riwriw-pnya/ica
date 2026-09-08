import type { CatItem, CatteryProfile, FemaleCat, MaleCat, NotificationItem, } from "@/types/cattery";

export const catItems: CatItem[] = [
  { id: 1, name: "Bagas of Rumah Hana", gender: "Male", breed: "Persian", regCode: "EMS PER n 22", healthScore: 94, paidShows: 2, qualityBadge: "Excellent", pedigreeStatus: "Terverifikasi", sireName: "Kaisar of Melati", damName: "Ratu Bilqis" },
  { id: 2, name: "Kirana of Rumah Hana", gender: "Female", breed: "Persian", regCode: "EMS PER f 22", healthScore: 91, paidShows: 1, qualityBadge: "Good", pedigreeStatus: "Menunggu verifikasi", sireName: "Kaisar of Melati", damName: "Ratu Bilqis" },
  { id: 3, name: "Nara Kencana", gender: "Female", breed: "Exotic Shorthair", regCode: "EMS EXO d 03", healthScore: 88, paidShows: 2, qualityBadge: "BOB", pedigreeStatus: "Belum diajukan", sireName: "Sultan Eksotis", damName: "Dewi Salju" },
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

export const initialNotifications: NotificationItem[] = [
  { id: "n1", type: "event", title: "Pendaftaran event dibuka", message: "ICA Regional Cat Show — Bandung sudah bisa didaftarkan.", time: "2 jam lalu", isRead: false, url: "/cattery/event" },
  { id: "n2", type: "pedigree", title: "Pedigree disetujui", message: "Pedigree Bagas of Rumah Hana telah diverifikasi Admin ICA.", time: "Kemarin", isRead: false, url: "/cattery/pedigree" },
  { id: "n3", type: "mating", title: "Mating report menunggu review", message: "Laporan Bagas × Nara Kencana sedang diproses.", time: "3 hari lalu", isRead: true, url: "/cattery/mating" },
];

export const maleCats: MaleCat[] = [
  { id: 1, name: "Bagas of Rumah Hana", breed: "Persian", birthDate: "12 Mar 2022", regCode: "ICA-PD-4471", emsCode: "PER n 22", certStatus: "Aktif", certificateFile: { fileName: "sertifikat-bagas.pdf", uploadedDate: "3 Jan 2026", sizeLabel: "1.1 MB" } },
  { id: 2, name: "Rimba Anggara", breed: "Maine Coon", birthDate: "2 Jun 2021", regCode: "ICA-PD-3980", emsCode: "MCO ns 24", certStatus: "Aktif", certificateFile: { fileName: "sertifikat-rimba.pdf", uploadedDate: "15 Nov 2025", sizeLabel: "1.2 MB" } },
  { id: 3, name: "Gala Pradipta", breed: "Persian", birthDate: "8 Sep 2023", regCode: "ICA-PD-5120", emsCode: "PER d 03", certStatus: "Aktif", certificateFile: { fileName: "sertifikat-gala.pdf", uploadedDate: "20 Des 2025", sizeLabel: "980 KB" } },
  { id: 4, name: "Wira Santana", breed: "British Shorthair", birthDate: "19 Jan 2020", regCode: "ICA-PD-2210", emsCode: "BRI a", certStatus: "Perlu perpanjangan" },
];

export const femaleCats: FemaleCat[] = [
  { id: 1, name: "Nara Kencana", breed: "Exotic Shorthair", birthDate: "1 Feb 2022", regCode: "ICA-PD-4950", emsCode: "PER f 22", certStatus: "Aktif", certificateFile: { fileName: "sertifikat-nara.pdf", uploadedDate: "7 Jan 2026", sizeLabel: "1.2 MB" } },
  { id: 2, name: "Sekar Ayu", breed: "Exotic Shorthair", birthDate: "27 Jul 2022", regCode: "ICA-PD-1510", emsCode: "MCO f 03", certStatus: "Aktif", certificateFile: { fileName: "sertifikat-sekar.pdf", uploadedDate: "12 Nov 2025", sizeLabel: "1.0 MB" } },
  { id: 3, name: "Kirana Melati", breed: "Persian", birthDate: "10 Nov 2021", regCode: "ICA-PD-3766", emsCode: "PER g 24", certStatus: "Aktif", certificateFile: { fileName: "sertifikat-kirana.pdf", uploadedDate: "2 Des 2025", sizeLabel: "1.1 MB" } },
  { id: 4, name: "Tirta Wangi", breed: "British Shorthair", birthDate: "9 Feb 2024", regCode: "ICA-PD-5431", emsCode: "BRI c", certStatus: "Belum cukup umur" },
];