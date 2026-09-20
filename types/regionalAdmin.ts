export interface RegionalAdminProfile {
    name: string;
    email: string;
    role: string;
    region: string;
}

export type ApplicationQueueStatus = "Baru" | "Sedang direview" | "Disetujui" | "Ditolak";

export interface ApplicationQueueItem {
    id: string;
    reportCode: string;
    applicantName: string;
    applicantType: string;
    region: string;
    waitingLabel: string; // "14 hari" atau "selesai"
    status: ApplicationQueueStatus;
}

export interface QueueTypeSummary {
    label: string;
    count: number;
    maxCount: number; // buat lebar progress bar relatif
}

export interface RegionalActivityItem {
    id: string;
    icon: "approved" | "revision" | "queued" | "forwarded";
    title: string;
    actor: string;
    time: string;
}

export interface DashboardSummary {
    newCount: number;
    reviewingCount: number;
    reviewingAvgDays: number;
    revisionCount: number;
    approvedCount: number;
    approvedMonthLabel: string;
    newMemberRequestCount: number;
    region: string;
}

export interface RegionalNotificationItem {
    id: string;
    type: "event" | "pedigree" | "mating" | "general";
    title: string;
    message: string;
    time: string;
    isRead: boolean;
}