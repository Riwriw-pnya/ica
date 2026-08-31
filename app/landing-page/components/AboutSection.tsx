import Link from "next/link";

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
          <Link href="#" className="inline-flex items-center text-orange-600 font-medium text-sm hover:underline">
            Kenali ICA lebih jauh &rarr;
          </Link>
        </div>

        <div className="md:col-span-5 bg-[#FFF6ED] rounded-3xl p-6 border border-orange-100 shadow-sm space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center font-extrabold text-orange-600">ICA</div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Indonesian Cat Association</h4>
              <p className="text-xs text-gray-400">Connecting Cat Communities</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <span className="block text-xl font-bold text-orange-600">500+</span>
              <span className="text-[11px] text-gray-400">Member</span>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <span className="block text-xl font-bold text-orange-600">100+</span>
              <span className="text-[11px] text-gray-400">Cattery</span>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <span className="block text-xl font-bold text-orange-600">50+</span>
              <span className="text-[11px] text-gray-400">Event</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}