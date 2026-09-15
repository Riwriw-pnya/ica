import type { CatteryAdminItem, MatingReportAdminItem, PaymentTransaction, CatAdminItem } from "@/types/superadmin";

export const catteryAdminItems: CatteryAdminItem[] = [
  {
    id: "1",
    catteryCode: "ICA-CTY-2024-0188",
    name: "Rumah Hana Cattery",
    ownerName: "Hana Maheswari",
    region: "Bandung",
    catCount: 11,
    reportCount: 7,
    status: "Aktif",
    registeredDate: "18 Mar 2024",
    maleCount: 4,
    femaleCount: 7,
  },
  {
    id: "2",
    catteryCode: "ICA-CTY-2023-0121",
    name: "Bandung Paws Cattery",
    ownerName: "Reza Aditya",
    region: "Bandung",
    catCount: 8,
    reportCount: 5,
    status: "Aktif",
    registeredDate: "2 Jun 2023",
    maleCount: 3,
    femaleCount: 5,
  },
  {
    id: "3",
    catteryCode: "ICA-CTY-2022-0064",
    name: "Sumatra Cats",
    ownerName: "Tirta Wijaya",
    region: "Medan",
    catCount: 6,
    reportCount: 4,
    status: "Aktif",
    registeredDate: "11 Jan 2022",
    maleCount: 2,
    femaleCount: 4,
  },
  {
    id: "4",
    catteryCode: "ICA-CTY-2021-0033",
    name: "Jogja Ras Cattery",
    ownerName: "Bagus Prakoso",
    region: "Surabaya",
    catCount: 4,
    reportCount: 9,
    status: "Kedaluwarsa",
    registeredDate: "5 Sep 2021",
    maleCount: 1,
    femaleCount: 3,
  },
];

export const matingReportsByCatteryId: Record<string, MatingReportAdminItem[]> = {
  "1": [
    {
      id: "r1",
      reportCode: "MR-2026-0142",
      applicantName: "Rumah Hana Cattery",
      applicantType: "Mating Report",
      region: "Bandung",
      waitingDays: 14,
      status: "Sedang direview",
    },
    {
      id: "r2",
      reportCode: "MR-2026-0148",
      applicantName: "Rumah Hana Cattery",
      applicantType: "Mating Report",
      region: "Bandung",
      waitingDays: 3,
      status: "Baru",
    },
  ],
};


export const catAdminItems: CatAdminItem[] = [
  { id: "1", regNo: "ICA-2024-0871-01", name: "Bagas", breed: "Persian", emsCode: "PER n 22", ownerName: "Hana Maheswari", catteryName: "Rumah Hana Cattery", healthScore: 92, pedigreeStatus: "Aktif" },
  { id: "2", regNo: "ICA-2024-0871-04", name: "Nara", breed: "Persian", emsCode: "PER f 03", ownerName: "Hana Maheswari", catteryName: "Rumah Hana Cattery", healthScore: 88, pedigreeStatus: "Aktif" },
  { id: "3", regNo: "ICA-2023-0455-02", name: "Kimo", breed: "Exotic Shorthair", emsCode: "EXO n 24", ownerName: "Reza Aditya", catteryName: "Bandung Paws Cattery", healthScore: 90, pedigreeStatus: "Aktif" },
  { id: "4", regNo: "ICA-2023-0455-05", name: "Sasa", breed: "Maine Coon", emsCode: "MCO ns 22", ownerName: "Reza Aditya", catteryName: "Bandung Paws Cattery", healthScore: 85, pedigreeStatus: "Aktif" },
  { id: "5", regNo: "ICA-2022-0130-01", name: "Rico", breed: "Maine Coon", emsCode: "MCO n 09 22", ownerName: "Tirta Wijaya", catteryName: "Sumatra Cats", healthScore: 81, pedigreeStatus: "Aktif" },
  { id: "6", regNo: "ICA-2021-0092-03", name: "Aksa", breed: "British Shorthair", emsCode: "BRI a", ownerName: "Bagus Prakoso", catteryName: "Jogja Ras Cattery", healthScore: 78, pedigreeStatus: "Draft" },
];

export const paymentTransactions: PaymentTransaction[] = [
  { id: "t1", invoice: "INV-2026-1842", payerName: "wter", description: "Iuran tahunan", paymentType: "Iuran tahunan", amount: 34234, method: "Virtual Account · BCA", paidDate: "09 Sep 2026", status: "Disetujui" },
  { id: "t2", invoice: "INV-2026-1841", payerName: "Hana Maheswari", description: "Iuran tahunan 2026", paymentType: "Iuran tahunan", amount: 350000, method: "Transfer BCA", paidDate: "2 Sep 2026", status: "Disetujui" },
  { id: "t3", invoice: "INV-2026-1840", payerName: "Dimas Prayoga", description: "Registrasi cattery", paymentType: "Registrasi cattery", amount: 750000, method: "Transfer Mandiri", paidDate: "2 Sep 2026", status: "Menunggu verifikasi" },
  { id: "t4", invoice: "INV-2026-1836", payerName: "Reza Aditya", description: "Tiket ICA Cat Show Bandung", paymentType: "Tiket event", amount: 150000, method: "QRIS", paidDate: "1 Sep 2026", status: "Disetujui" },
  { id: "t5", invoice: "INV-2026-1829", payerName: "Tirta Wijaya", description: "Iuran tahunan 2026", paymentType: "Iuran tahunan", amount: 350000, method: "Transfer BNI", paidDate: "30 Agu 2026", status: "Disetujui" },
];

export const paymentSummary = {
  lunasLabel: "Lunas Sept 2026",
  lunasAmount: 41700000,
  lunasTransactionCount: 132,
  pendingCount: 14,
  ticketsSold: 86,
  ticketEventName: "ICA Cat Show Bandung 2026",
};