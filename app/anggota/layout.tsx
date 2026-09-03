import Sidebar from "@/components/anggota/Sidebar";
import Header from "@/components/anggota/Header";
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
        <div className="flex h-screen overflow-hidden bg-[var(--color-sidebar)]">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <Header />
            <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
          </div>
        </div>
      </SidebarProvider>
    </UserMenuProvider>
  );
}