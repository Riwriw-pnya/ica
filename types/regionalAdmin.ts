export interface RegionalAdminProfile {
    name: string;
    email: string;
    role: string;
    region: string;
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

export type ApplicationStatus = "Baru" | "Sedang direview" | "Perlu revisi" | "Disetujui" | "Ditolak";

export interface ApplicationQueueItem {
  id: string;
  code: string; // "MR-2026-0142"
  applicantName: string;
  applicantType: "Mating Report" | "Pengajuan Cattery" | "Pendaftaran Member";
  region: string;
  waitingLabel: string; // "14 hari" atau "selesai"
  status: ApplicationStatus;
  submittedDate: string; // "21 Agu 2026"
}

export interface ApplicationDocument {
  id: string;
  label: string;
  fileType: "PDF" | "JPG";
  sizeLabel: string;
  uploadedDate: string;
  isValid: boolean | null; // null = belum ditandai
}

export interface ApplicantInfo {
  applicantName: string;
  memberCode: string;
  catteryName: string;
  region: string;
  pair: string; // "Bagas × Nara"
  matingDate: string;
}

export interface ApplicantHistory {
  reportsSubmitted: number;
  approved: number;
  everRevised: number;
  membershipStatus: string; // "Aktif s.d. 31 Des 2026"
}

export interface ApplicationDetailItem extends ApplicationQueueItem {
  applicant: ApplicantInfo;
  documents: ApplicationDocument[];
  history: ApplicantHistory;
  internalNote?: string;
}

export interface MemberItem {
  id: string;
  memberCode: string;
  name: string;
  email: string;
  region: string;
  catteryName: string;
  catsCount: number;
  status: "Aktif" | "Kedaluwarsa";
}

export interface MemberRequestItem {
  id: string;
  initials: string;
  name: string;
  region: string;
  submissionDate: string;
  notes: string;
}