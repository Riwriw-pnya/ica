import Sidebar from "@/components/dashboard_member/Sidebar";
import Header from "@/components/dashboard_member/Header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-[var(--color-sidebar)]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <div className="min-h-0 flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}