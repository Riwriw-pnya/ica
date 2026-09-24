import Sidebar from "@/components/cattery/Sidebar";
import Header from "@/components/cattery/Header";
import BottomNav from "@/components/cattery/BottomNav";
import { UserMenuProvider } from "@/context/UserMenuContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { DraftProvider } from "@/context/DraftContext";
import { HeaderActionProvider } from "@/context/HeaderActionContext";
import { ToastProvider } from "@/context/ToastContext";

export default function CatteryLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <HeaderActionProvider>
        <DraftProvider>
          <UserMenuProvider>
            <SidebarProvider>
              <div className="flex h-screen overflow-hidden bg-[var(--color-ink-50)]">
                <Sidebar />
                <div className="flex min-w-0 flex-1 flex-col">
                  <Header />
                  {/* Tambahkan pb-16 lg:pb-0 di sini agar bagian bawah halaman mobile tidak tertutup BottomNav */}
                  <div className="min-h-0 flex-1 overflow-y-auto pb-16 lg:pb-0">{children}</div>
                  {/* Bottom Navigation khusus Mobile */}
                  <BottomNav />
                </div>
              </div>
            </SidebarProvider>
          </UserMenuProvider>
        </DraftProvider>
      </HeaderActionProvider>
    </ToastProvider>
  );
}