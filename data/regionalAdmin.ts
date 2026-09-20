import type {
    RegionalAdminProfile,
    ApplicationQueueItem,
    QueueTypeSummary,
    RegionalActivityItem,
    DashboardSummary,
    RegionalNotificationItem,
} from "@/types/regionalAdmin";

export const regionalAdminProfile: RegionalAdminProfile = {
    name: "Dewi Larasati",
    email: "dewi@ica.or.id",
    role: "Regional Admin",
    region: "Bandung",
};

export const dashboardSummary: DashboardSummary = {
    newCount: 2,
    reviewingCount: 1,
    reviewingAvgDays: 3,
    revisionCount: 0,
    approvedCount: 2,
    approvedMonthLabel: "Sept 2026",
    newMemberRequestCount: 4,
    region: "Bandung",
};

export const applicationQueueItems: ApplicationQueueItem[] = [
    { id: "q1", reportCode: "MR-2026-0142", applicantName: "Rumah Hana Cattery", applicantType: "Mating Report", region: "Bandung", waitingLabel: "14 hari", status: "Sedang direview" },
    { id: "q2", reportCode: "MR-2026-0144", applicantName: "Bandung Paws Cattery", applicantType: "Mating Report", region: "Bandung", waitingLabel: "9 hari", status: "Baru" },
    { id: "q3", reportCode: "MR-2026-0148", applicantName: "Rumah Hana Cattery", applicantType: "Mating Report", region: "Bandung", waitingLabel: "3 hari", status: "Baru" },
    { id: "q4", reportCode: "MR-2026-0131", applicantName: "Rumah Hana Cattery", applicantType: "Mating Report", region: "Bandung", waitingLabel: "selesai", status: "Disetujui" },
    { id: "q5", reportCode: "MR-2026-0128", applicantName: "Bandung Paws Cattery", applicantType: "Mating Report", region: "Bandung", waitingLabel: "selesai", status: "Disetujui" },
];

export const queueTypeSummaries: QueueTypeSummary[] = [
    { label: "Mating Report", count: 5, maxCount: 5 },
    { label: "Pendaftaran Cattery", count: 0, maxCount: 5 },
    { label: "Pendaftaran Member", count: 0, maxCount: 5 },
];

export const regionalActivityItems: RegionalActivityItem[] = [
    { id: "act1", icon: "approved", title: "MR-2026-0131 disetujui final — pedigree diterbitkan", actor: "Dewi Larasati", time: "4 Sep 2026 09:14" },
    { id: "act2", icon: "revision", title: "MR-2026-0148 diminta revisi — foto pasangan kurang jelas", actor: "Dewi Larasati", time: "3 Sep 2026 16:40" },
    { id: "act3", icon: "queued", title: "MR-2026-0144 masuk antrean review wilayah Bandung", actor: "Sistem", time: "3 Sep 2026 08:22" },
    { id: "act4", icon: "forwarded", title: "Hasil approval MR-2026-0131 diteruskan ke Super Admin sebagai notifikasi", actor: "Sistem", time: "4 Sep 2026 09:15" },
];

export const regionalNotifications: RegionalNotificationItem[] = [
  { id: "rn1", type: "mating", title: "Aplikasi baru masuk antrean", message: "MR-2026-0148 dari Rumah Hana Cattery menunggu review Anda.", time: "10 menit lalu", isRead: false },
  { id: "rn2", type: "general", title: "4 request member baru", message: "Menunggu approval Anda di wilayah Bandung.", time: "1 jam lalu", isRead: false },
  { id: "rn3", type: "pedigree", title: "Pedigree diterbitkan", message: "MR-2026-0131 disetujui final dan pedigree sudah diterbitkan.", time: "Kemarin", isRead: true },
];