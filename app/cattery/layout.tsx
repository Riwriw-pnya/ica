import Sidebar from "@/components/cattery/Sidebar";
import Header from "@/components/cattery/Header";
import { UserMenuProvider } from "@/context/UserMenuContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { DraftProvider } from "@/context/DraftContext";
import { HeaderActionProvider } from "@/context/HeaderActionContext";
import { ToastProvider } from "@/context/ToastContext"; // <-- 1. Import ToastProvider

export default function CatteryLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider> {/* <-- 2. Bungkus di paling luar (atau di dalam HeaderActionProvider) */}
      <HeaderActionProvider>
        <DraftProvider>
          <UserMenuProvider>
            <SidebarProvider>
              <div className="flex h-screen overflow-hidden bg-[var(--color-ink-50)]">
                <Sidebar />
                <div className="flex min-w-0 flex-1 flex-col">
                  <Header />
                  <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
                </div>
              </div>
            </SidebarProvider>
          </UserMenuProvider>
        </DraftProvider>
      </HeaderActionProvider>
    </ToastProvider>
  );
}