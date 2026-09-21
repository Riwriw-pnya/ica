export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Regional Admin";
  region: string;
  modulePermissions: string;
  status: "Aktif" | "Belum dipakai";
}