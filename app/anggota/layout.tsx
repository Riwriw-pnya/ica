import Sidebar from "@/components/anggota/Sidebar";
import Header from "@/components/anggota/Header";
import BottomNav from "@/components/anggota/BottomNav"; 
import { UserMenuProvider } from "@/context/UserMenuContext";
import { SidebarProvider } from "@/context/SidebarContext";

export default function AnggotaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserMenuProvider>
      <SidebarProvider>
        <div className="flex h-screen overflow-hidden bg-[#faf8f5] relative">
          
          {/* Sidebar (Desktop) */}
          <div className="hidden lg:block bg-[var(--color-sidebar)]">
            <Sidebar />
          </div>

          <div className="flex min-w-0 flex-1 flex-col h-full">
            <Header />

            {/* Area Konten Utama */}
            {/* overflow-x-hidden mengunci halaman agar tidak bocor ke samping saat swipe carousel */}
            <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-[#faf8f5] px-4 py-4 sm:px-6 lg:p-8 pb-24 lg:pb-8">
              {children}
            </main>
          </div>

          {/* Bottom Navigation (Mobile) */}
          <div className="lg:hidden">
            <BottomNav />
          </div>

        </div>
      </SidebarProvider>
    </UserMenuProvider>
  );
}