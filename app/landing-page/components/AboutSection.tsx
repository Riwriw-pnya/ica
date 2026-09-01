import Link from "next/link";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-16 max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 space-y-6">
          <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">Tentang Kami</span>
          <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
            Indonesian Cat Association (ICA)
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            adalah organisasi penyayang kucing di Indonesia yang dibentuk pada tanggal 1 April 2003 
            oleh para penyayang dan pemerhati kucing di Indonesia melalui Musyawarah yang diselenggarakan 
            di Jakarta dan dibuka secara resmi oleh Kepala Direktorat Kesehatan Hewan Ditjen Bina Produksi 
            Peternakan, Departemen Pertanian yaitu Bapak Prof. DR. Drh. Budi Triakosa. Munas tersebut dihadiri 
            oleh para pemilik, penyayang dan pemerhati kucing dari kota kota besar yang ada di Indonesia, 
            seperti Bandung, Jakarta, Surabaya dan lain lain.
          </p>
          
          <Link 
            href="/organisasi/profil" 
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#C85A17] hover:text-[#EE6B28] transition relative w-fit py-1"
          >
            <span 
            className="relative">
              Kenali ICA lebih jauh
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#EE6B28] transition-all duration-300 ease-out group-hover:w-full"></span>
            </span>
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="md:col-span-5 flex justify-center">
          <div className="inline-block bg-white p-3 rounded-[32px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-gray-100">
            <div className="relative rounded-[24px] overflow-hidden">
              <Image 
                src="/images/about.webp"
                alt="Tentang ICA" 
                width={500}
                height={400}
                className="w-auto h-auto max-h-[380px] object-contain rounded-[24px]"
                priority
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}