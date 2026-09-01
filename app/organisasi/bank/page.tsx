import Image from "next/image";
import Navbar from "@/app/landing-page/components/Navbar"; 
import Footer from "@/app/landing-page/components/Footer"; 

export default function BankPage() {
  return (
    <div className="min-h-screen bg-white text-[#231812] font-sans flex flex-col justify-between">
      <Navbar />

      <main className="space-y-8 pb-24 pt-8">
        
        {/* Section Title: Rekening Bank ICA Pusat */}
        <section className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 sm:gap-8 justify-center">
            <div className="flex-1 h-[1px] bg-[#E2E8F0]"></div>
            <div className="text-center space-y-1">
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                <span className="text-[#2D2421]">Rekening Bank</span> <span className="text-[#E86826]">ICA Pusat</span>
              </h2>
            </div>
            <div className="flex-1 h-[1px] bg-[#E2E8F0]"></div>
          </div>
        </section>

        {/* Deskripsi & Card Informasi Rekening */}
        <section className="max-w-xl mx-auto px-6 text-center space-y-6">
          <p className="text-sm sm:text-base text-[#66564B] font-medium">
            Berikut ini merupakan informasi bank ICA Pusat
          </p>

          <div className="bg-[#FFF9F5] border border-[#FDE4D0] rounded-3xl p-8 md:p-10 space-y-6 shadow-xs transition-all duration-300 hover:shadow-md hover:border-[#FA9856]/70">
            
            {/* Logo Bank Mandiri */}
            <div className="flex justify-center">
              <div className="relative w-40 h-12">
                <Image 
                  src="/images/mandiri.png" 
                  alt="Bank Mandiri" 
                  fill 
                  className="object-contain" 
                />
              </div>
            </div>

            {/* Nomor Rekening & Nama Pemilik */}
            <div className="space-y-2 pt-2">
              <p className="text-xl sm:text-2xl font-black tracking-wider text-[#2D2421]">
                1010-0138-60638
              </p>
              <p className="text-sm sm:text-base font-bold text-[#E86826]">
                Indonesian Cat Association
              </p>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}