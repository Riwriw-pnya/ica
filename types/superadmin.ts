export type CatteryAdminStatus = "Aktif" | "Kedaluwarsa";
export type MatingReportAdminStatus = "Baru" | "Sedang direview" | "Disetujui" | "Ditolak";

export interface CatteryAdminItem {
    id: string;
    catteryCode: string;
    name: string;
    ownerName: string;
    region: string;
    catCount: number;
    reportCount: number;
    status: CatteryAdminStatus;
    registeredDate: string;
    maleCount: number;
    femaleCount: number;
}

export interface MatingReportAdminItem {
    id: string;
    reportCode: string;
    applicantName: string;
    applicantType: "Mating Report" | "Pengajuan Cattery";
    region: string;
    waitingDays: number;
    status: MatingReportAdminStatus;
}

export type PedigreeAdminStatus = "Aktif" | "Draft" | "Menunggu";

export interface CatAdminItem {
    id: string;
    regNo: string;
    name: string;
    breed: string;
    emsCode: string;
    ownerName: string;
    catteryName: string;
    healthScore: number;
    pedigreeStatus: PedigreeAdminStatus;
}