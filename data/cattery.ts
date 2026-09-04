import type { CatItem, CatteryProfile, MaleCat, } from "@/types/cattery";

export const catItems: CatItem[] = [
  { id: 1, name: "Bagas of Rumah Hana", gender: "Male", breed: "Persian", regCode: "EMS PER n 22", healthScore: 94, paidShows: 2 },
  { id: 2, name: "Kirana of Rumah Hana", gender: "Female", breed: "Persian", regCode: "EMS PER f 22", healthScore: 91, paidShows: 1 },
  { id: 3, name: "Nara Kencana", gender: "Female", breed: "Exotic Shorthair", regCode: "EMS EXO d 03", healthScore: 88, paidShows: 2 },
  { id: 4, name: "Rimba of Rumah Hana", gender: "Male", breed: "Persian", regCode: "EMS PER a 21", healthScore: 84, paidShows: 1 },
  { id: 5, name: "Sekar Ayu", gender: "Female", breed: "Exotic Shorthair", regCode: "EMS EXO n 24", healthScore: 80, paidShows: 1 },
  { id: 6, name: "Damar of Rumah Hana", gender: "Male", breed: "Persian", regCode: "EMS PER g 24", healthScore: 76, paidShows: 0 },
];

export const catteryProfile: CatteryProfile = {
  name: "Rumah Hana Cattery",
  regNumber: "ICA-CTY-2024-0188",
  region: "Bandung",
  personInCharge: "Hana Prameswari",
};

export const maleCats: MaleCat[] = [
  { id: 1, name: "Bagas of Rumah Hana", breed: "Persian", birthDate: "12 Mar 2022", regCode: "ICA-PD-4471", emsCode: "PER n 22", certStatus: "Aktif" },
  { id: 2, name: "Rimba Anggara", breed: "Maine Coon", birthDate: "2 Jun 2021", regCode: "ICA-PD-3980", emsCode: "MCO ns 24", certStatus: "Aktif" },
  { id: 3, name: "Gala Pradipta", breed: "Persian", birthDate: "8 Sep 2023", regCode: "ICA-PD-5120", emsCode: "PER d 03", certStatus: "Aktif" },
  { id: 4, name: "Wira Santana", breed: "British Shorthair", birthDate: "19 Jan 2020", regCode: "ICA-PD-2210", emsCode: "BRI a", certStatus: "Perlu perpanjangan" },
];