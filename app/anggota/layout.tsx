import Sidebar from "@/components/anggota/Sidebar";
import Header from "@/components/anggota/Header";
import BottomNav from "@/components/anggota/BottomNav"; 
import { UserMenuProvider } from "@/context/UserMenuContext";
import { SidebarProvider } from "@/context/SidebarContext";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserMenuProvider>
      <SidebarProvider>
        {/* Kontainer utama: 
            - Di Desktop (lg:), flex-row dengan Sidebar di kiri.
            - Di HP, flex-col dengan ruang bawah (pb-20) untuk BottomNav */}
        <div className="flex h-screen overflow-hidden bg-[var(--color-sidebar)] relative">
          
          {/* Sidebar bawaan Anda (Disembunyikan di HP, tampil di layar lg ke atas) */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          <div className="flex min-w-0 flex-1 flex-col h-full">
            <Header />
            {/* pb-20 di mobile agar konten bagian bawah tidak tertutup menu bar bawah */}
            <div className="min-h-0 flex-1 overflow-y-auto pb-20 lg:pb-0">
              {children}
            </div>
          </div>

          {/* Bottom Navigation khusus Mobile (Hanya tampil di HP, tersembunyi di layar lg ke atas) */}
          <div className="lg:hidden">
            <BottomNav />
          </div>

        </div>
      </SidebarProvider>
    </UserMenuProvider>
  );
}