import type {
  RegionalAdminProfile,
  ApplicationQueueItem,
  QueueTypeSummary,
  RegionalActivityItem,
  DashboardSummary,
  RegionalNotificationItem,
  ApplicationDetailItem,
  ApplicationStatus,
} from "@/types/regionalAdmin";

export interface DocumentItem {
  id: string;
  label: string;
  fileType: string;
  sizeLabel: string;
  uploadedDate: string;
  isValid?: boolean | null;
}

export interface ApplicationDetail {
  id: string;
  code: string;
  status: ApplicationStatus;
  region: string;
  applicantType: string;
  applicantName: string;
  submittedDate: string;
  waitingLabel: string;
  applicant: {
    applicantName: string;
    memberCode: string;
    catteryName: string;
    region: string;
    pair: string;
    matingDate: string;
  };
  documents: DocumentItem[];
  history: {
    reportsSubmitted: number;
    approved: number;
    everRevised: number;
    membershipStatus: string;
  };
}

// 1. Profil Admin Regional
export const regionalAdminProfile: RegionalAdminProfile = {
  name: "Dewi Larasati",
  email: "dewi@ica.or.id",
  role: "Regional Admin",
  region: "Bandung",
};

// 2. Ringkasan Dashboard
export const dashboardSummary: DashboardSummary = {
  newCount: 1,
  reviewingCount: 0,
  reviewingAvgDays: 3,
  revisionCount: 1,
  approvedCount: 2,
  approvedMonthLabel: "Sept 2026",
  newMemberRequestCount: 4,
  region: "Bandung",
};

// 3. Ringkasan Jenis Tipe Queue
export const queueTypeSummaries: QueueTypeSummary[] = [
  { label: "Mating Report", count: 5, maxCount: 5 },
  { label: "Pendaftaran Cattery", count: 0, maxCount: 5 },
  { label: "Pendaftaran Member", count: 0, maxCount: 5 },
];

// 4. Aktivitas Regional
export const regionalActivityItems: RegionalActivityItem[] = [
  { id: "act1", icon: "approved", title: "MR-2026-0131 disetujui final — pedigree diterbitkan", actor: "Dewi Larasati", time: "4 Sep 2026 09:14" },
  { id: "act2", icon: "revision", title: "MR-2026-0142 diminta revisi — foto pasangan kurang jelas", actor: "Dewi Larasati", time: "3 Sep 2026 16:40" },
  { id: "act3", icon: "queued", title: "MR-2026-0148 masuk antrean review wilayah Bandung", actor: "Sistem", time: "3 Sep 2026 08:22" },
  { id: "act4", icon: "forwarded", title: "Hasil approval MR-2026-0131 diteruskan ke Super Admin sebagai notifikasi", actor: "Sistem", time: "4 Sep 2026 09:15" },
];

// 5. Notifikasi Regional
export const regionalNotifications: RegionalNotificationItem[] = [
  { id: "rn1", type: "mating", title: "Aplikasi baru masuk antrean", message: "MR-2026-0148 dari Rumah Hana Cattery menunggu review Anda.", time: "10 menit lalu", isRead: false },
  { id: "rn2", type: "general", title: "4 request member baru", message: "Menunggu approval Anda di wilayah Bandung.", time: "1 jam lalu", isRead: false },
  { id: "rn3", type: "pedigree", title: "Pedigree diterbitkan", message: "MR-2026-0131 disetujui final dan pedigree sudah diterbitkan.", time: "Kemarin", isRead: true },
];

// 6. Data Antrean Aplikasi (Application Queue Table - Sesuai Persis Tampilan UI Gambar)
export const applicationQueueItems: ApplicationQueueItem[] = [
  {
    id: "1",
    code: "MR-2026-0142",
    applicantName: "Rumah Hana Cattery",
    applicantType: "Mating Report",
    region: "Bandung",
    waitingLabel: "14 hari",
    status: "Perlu revisi",
    submittedDate: "21 Agu 2026",
  },
  {
    id: "2",
    code: "MR-2026-0144",
    applicantName: "Bandung Paws Cattery",
    applicantType: "Mating Report",
    region: "Bandung",
    waitingLabel: "9 hari",
    status: "Ditolak",
    submittedDate: "26 Agu 2026",
  },
  {
    id: "3",
    code: "MR-2026-0148",
    applicantName: "Rumah Hana Cattery",
    applicantType: "Mating Report",
    region: "Bandung",
    waitingLabel: "3 hari",
    status: "Baru",
    submittedDate: "1 Sep 2026",
  },
  {
    id: "4",
    code: "MR-2026-0131",
    applicantName: "Rumah Hana Cattery",
    applicantType: "Mating Report",
    region: "Bandung",
    waitingLabel: "selesai",
    status: "Disetujui",
    submittedDate: "12 Agu 2026",
  },
  {
    id: "5",
    code: "MR-2026-0128",
    applicantName: "Bandung Paws Cattery",
    applicantType: "Mating Report",
    region: "Bandung",
    waitingLabel: "selesai",
    status: "Disetujui",
    submittedDate: "5 Agu 2026",
  },
];

// 7. Data Detail Aplikasi (Mapping Lengkap untuk ID 1 hingga 5)
export const applicationDetails: Record<string, ApplicationDetail | ApplicationDetailItem> = {
  "1": {
    id: "1",
    code: "MR-2026-0142",
    status: "Perlu revisi",
    region: "Bandung",
    applicantType: "Mating Report",
    applicantName: "Rumah Hana Cattery",
    submittedDate: "21 Agu 2026",
    waitingLabel: "14 hari",
    applicant: {
      applicantName: "Hana Fitriani",
      memberCode: "ICA-2024-0088",
      catteryName: "Rumah Hana Cattery",
      region: "Bandung",
      pair: "Bagas × Nara",
      matingDate: "24 Jun 2026",
    },
    documents: [
      { id: "doc-1", label: "Sertifikat pedigree induk jantan", fileType: "PDF", sizeLabel: "1.2 MB", uploadedDate: "21 Agu 2026", isValid: true },
      { id: "doc-2", label: "Sertifikat pedigree induk betina", fileType: "PDF", sizeLabel: "0.9 MB", uploadedDate: "21 Agu 2026", isValid: true },
      { id: "doc-3", label: "Foto pasangan saat mating", fileType: "JPG", sizeLabel: "2.4 MB", uploadedDate: "21 Agu 2026", isValid: false },
    ],
    history: {
      reportsSubmitted: 7,
      approved: 6,
      everRevised: 1,
      membershipStatus: "Aktif s.d. 31 Des 2026",
    },
  },
  "2": {
    id: "2",
    code: "MR-2026-0144",
    status: "Ditolak",
    region: "Bandung",
    applicantType: "Mating Report",
    applicantName: "Bandung Paws Cattery",
    submittedDate: "26 Agu 2026",
    waitingLabel: "9 hari",
    applicant: {
      applicantName: "Rian Hidayat",
      memberCode: "ICA-2023-0102",
      catteryName: "Bandung Paws Cattery",
      region: "Bandung",
      pair: "Leo (British Shorthair) x Maya (British Shorthair)",
      matingDate: "20 Agu 2026",
    },
    documents: [
      { id: "doc-1", label: "Sertifikat pedigree induk jantan", fileType: "PDF", sizeLabel: "1.5 MB", uploadedDate: "26 Agu 2026", isValid: false },
      { id: "doc-2", label: "Sertifikat pedigree induk betina", fileType: "PDF", sizeLabel: "1.1 MB", uploadedDate: "26 Agu 2026", isValid: false },
    ],
    history: {
      reportsSubmitted: 15,
      approved: 12,
      everRevised: 1,
      membershipStatus: "Aktif (s.d. Oct 2026)",
    },
  },
  "3": {
    id: "3",
    code: "MR-2026-0148",
    status: "Baru",
    region: "Bandung",
    applicantType: "Mating Report",
    applicantName: "Rumah Hana Cattery",
    submittedDate: "1 Sep 2026",
    waitingLabel: "3 hari",
    applicant: {
      applicantName: "Hana Fitriani",
      memberCode: "ICA-2024-0088",
      catteryName: "Rumah Hana Cattery",
      region: "Bandung",
      pair: "Ollie (Persian) x Lily (Persian)",
      matingDate: "28 Agu 2026",
    },
    documents: [
      { id: "doc-1", label: "Sertifikat pedigree induk jantan", fileType: "PDF", sizeLabel: "1.4 MB", uploadedDate: "1 Sep 2026" },
      { id: "doc-2", label: "Sertifikat pedigree induk betina", fileType: "PDF", sizeLabel: "1.0 MB", uploadedDate: "1 Sep 2026" },
      { id: "doc-3", label: "Foto bukti perkawinan/mating", fileType: "JPG", sizeLabel: "3.1 MB", uploadedDate: "1 Sep 2026" },
    ],
    history: {
      reportsSubmitted: 9,
      approved: 6,
      everRevised: 2,
      membershipStatus: "Aktif (s.d. Dec 2026)",
    },
  },
  "4": {
    id: "4",
    code: "MR-2026-0131",
    status: "Disetujui",
    region: "Bandung",
    applicantType: "Mating Report",
    applicantName: "Rumah Hana Cattery",
    submittedDate: "12 Agu 2026",
    waitingLabel: "selesai",
    applicant: {
      applicantName: "Hana Fitriani",
      memberCode: "ICA-2024-0088",
      catteryName: "Rumah Hana Cattery",
      region: "Bandung",
      pair: "Milo (Persian) x Cleo (Persian)",
      matingDate: "02 Agu 2026",
    },
    documents: [
      { id: "doc-1", label: "Sertifikat pedigree induk jantan", fileType: "PDF", sizeLabel: "1.2 MB", uploadedDate: "12 Agu 2026", isValid: true },
      { id: "doc-2", label: "Sertifikat pedigree induk betina", fileType: "PDF", sizeLabel: "950 KB", uploadedDate: "12 Agu 2026", isValid: true },
    ],
    history: {
      reportsSubmitted: 7,
      approved: 6,
      everRevised: 1,
      membershipStatus: "Aktif (s.d. Dec 2026)",
    },
  },
  "5": {
    id: "5",
    code: "MR-2026-0128",
    status: "Disetujui",
    region: "Bandung",
    applicantType: "Mating Report",
    applicantName: "Bandung Paws Cattery",
    submittedDate: "5 Agu 2026",
    waitingLabel: "selesai",
    applicant: {
      applicantName: "Rian Hidayat",
      memberCode: "ICA-2023-0102",
      catteryName: "Bandung Paws Cattery",
      region: "Bandung",
      pair: "Thor (Maine Coon) x Freya (Maine Coon)",
      matingDate: "25 Jul 2026",
    },
    documents: [
      { id: "doc-1", label: "Sertifikat pedigree induk jantan", fileType: "PDF", sizeLabel: "2.1 MB", uploadedDate: "5 Agu 2026", isValid: true },
      { id: "doc-2", label: "Sertifikat pedigree induk betina", fileType: "PDF", sizeLabel: "1.8 MB", uploadedDate: "5 Agu 2026", isValid: true },
    ],
    history: {
      reportsSubmitted: 14,
      approved: 12,
      everRevised: 1,
      membershipStatus: "Aktif (s.d. Oct 2026)",
    },
  },
};

import { MemberItem, MemberRequestItem } from "@/types/regionalAdmin";

export const memberStats = {
  activeMembers: 2,
  expiredMembers: 0,
  pendingRequests: 5,
};

export const activeMembersList: MemberItem[] = [
  {
    id: "1",
    memberCode: "ICA-2024-0871",
    name: "Hana Maheswari",
    email: "hana@rumahhana.id",
    region: "Bandung",
    catteryName: "Rumah Hana Cattery",
    catsCount: 11,
    status: "Aktif",
  },
  {
    id: "2",
    memberCode: "ICA-2023-0455",
    name: "Reza Aditya",
    email: "reza@bandungpaws.id",
    region: "Bandung",
    catteryName: "Bandung Paws Cattery",
    catsCount: 8,
    status: "Aktif",
  },
];

export const newMemberRequests: MemberRequestItem[] = [
  {
    id: "req-1",
    initials: "AP",
    name: "Anindya Prameswari",
    region: "Bandung",
    submissionDate: "14 Sep 2026",
    notes: "iuran lunas Rp 350.000",
  },
  {
    id: "req-2",
    initials: "RW",
    name: "Raka Wibisono",
    region: "Bandung",
    submissionDate: "14 Sep 2026",
    notes: "menunggu verifikasi KTP",
  },
  {
    id: "req-3",
    initials: "SH",
    name: "Salma Hanifah",
    region: "Cimahi",
    submissionDate: "15 Sep 2026",
    notes: "iuran lunas Rp 350.000",
  },
  {
    id: "req-4",
    initials: "BA",
    name: "Bagus Adiputra",
    region: "Bandung",
    submissionDate: "16 Sep 2026",
    notes: "pemilik cattery baru",
  },
  {
    id: "req-5",
    initials: "NK",
    name: "Nadia Kusuma",
    region: "Sumedang",
    submissionDate: "16 Sep 2026",
    notes: "iuran lunas Rp 350.000",
  },
];