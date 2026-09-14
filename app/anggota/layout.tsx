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
        {/*
          PERUBAHAN UTAMA:
          Ganti bg-[var(--color-sidebar)] menjadi bg-[#faf8f5] di kontainer utama atau area konten
        */}
        <div className="flex h-screen overflow-hidden bg-[#faf8f5] relative">
          
          {/* Sidebar (Disembunyikan di HP, tampil di layar lg ke atas) */}
          <div className="hidden lg:block bg-[var(--color-sidebar)]">
            <Sidebar />
          </div>

          <div className="flex min-w-0 flex-1 flex-col h-full">
            <Header />
            {/* Area Konten Utama dengan Latar Krem */}
            <main className="min-h-0 flex-1 overflow-y-auto bg-[#faf8f5] p-6 lg:p-8 pb-20 lg:pb-8">
              {children}
            </main>
          </div>

          {/* Bottom Navigation khusus Mobile */}
          <div className="lg:hidden">
            <BottomNav />
          </div>

        </div>
      </SidebarProvider>
    </UserMenuProvider>
  );
}