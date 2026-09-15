import Sidebar from "@/components/superadmin/Sidebar";
import Header from "@/components/superadmin/Header";
import { ToastProvider } from "@/context/ToastContext";
import { PaymentProvider } from "@/context/PaymentContext";

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <PaymentProvider>
        <div className="flex h-screen w-screen overflow-hidden bg-[#FAF8F5]">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </div>
      </PaymentProvider>
    </ToastProvider>
  );
}