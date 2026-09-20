import Sidebar from "@/components/regionaladmin/Sidebar";
import Header from "@/components/regionaladmin/Header";
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
            <div className="flex h-screen overflow-hidden bg-[#faf8f5] relative">
            {/* Sidebar */}
            <div className="hidden lg:block bg-[var(--color-sidebar)]">
                <Sidebar />
            </div>

            <div className="flex min-w-0 flex-1 flex-col h-full">
                <Header />
                {/* Area Konten Utama */}
                <main className="min-h-0 flex-1 overflow-y-auto bg-[#faf8f5] p-6 lg:p-8 pb-20 lg:pb-8">
                {children}
                </main>
            </div>
            </div>
        </SidebarProvider>
        </UserMenuProvider>
    );
}