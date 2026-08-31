import Navbar from "@/app/landing-page/components/Navbar";
import Footer from "@/app/landing-page/components/Footer";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDF8F3] text-gray-800 antialiased">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer/>
    </div>
  );
}