import Navbar from "@/app/landing-page/components/Navbar"; 
import Footer from "@/app/landing-page/components/Footer"; 

export default function PengurusCabangPage() {
  const pengurusCabang = [
    {
      cabang: "Aceh",
      kacab: "dr. Natalina Christanto",
      sekcab: "Julian Sabri, S.AP",
      email: "Aceh@ica.or.id",
      periode: "2024 - 2027",
    },
    {
      cabang: "Balikpapan",
      kacab: "Yunnas Habibilah",
      sekcab: "Ilham Akbar F.",
      email: "Balikpapan@ica.or.id",
      periode: "2021-2024",
    },
    {
      cabang: "Bandung",
      kacab: "Untung Iswanto",
      sekcab: "Novalinda Marisa",
      email: "Bandung@ica.or.id",
      periode: "2025-2027",
    },
    {
      cabang: "Banjarmasin",
      kacab: "Fanli Yudi A.",
      sekcab: "Ajeng Rahmaningtyas F.",
      email: "Banjarmasin@ica.or.id",
      periode: "2021-2024",
    },
    {
      cabang: "Banyuwangi-Jember",
      kacab: "Vandhi Utama",
      sekcab: "Adolf Ferdiyanto",
      email: "Banyuwangi@ica.or.id",
      periode: "2024-2027",
    },
    {
      cabang: "Batam",
      kacab: "Esther Irena D.",
      sekcab: "Yuki Handara Putri",
      email: "Batam@ica.or.id",
      periode: "2024-2027",
    },
    {
      cabang: "Cirebon",
      kacab: "Tohari Patrio N.",
      sekcab: "Ema Mariasari",
      email: "Cirebon@ica.or.id",
      periode: "2024-2027",
    },
    {
      cabang: "Denpasar",
      kacab: "Drh. Reny Septyawati",
      sekcab: "Ciptaning Probo Sukanti",
      email: "Denpasar@ica.or.id",
      periode: "2024-2027",
    },
    {
      cabang: "Dumai",
      kacab: "Fadhli Arifin",
      sekcab: "Ecy Novemirata",
      email: "Dumai@ica.or.id",
      periode: "2022 - 2025",
    },
    {
      cabang: "Gresik",
      kacab: "Muhammad Farikhin",
      sekcab: "Ina Fardiyahti, SE",
      email: "Gresik@ica.or.id",
      periode: "2024-2027",
    },
    {
      cabang: "Jakarta",
      kacab: "Yasier Anwar",
      sekcab: "Nurina Hapsari",
      email: "Jakarta@ica.or.id",
      periode: "2022 - 2025",
    },
    {
      cabang: "Jambi",
      kacab: "Dindo Ariyando",
      sekcab: "Ratih Wulandari",
      email: "Jambi@ica.or.id",
      periode: "2024-2027",
    },
    {
      cabang: "Jogja",
      kacab: "Helga Triasfida",
      sekcab: "Hendra Dwi Saputra",
      email: "Jogja@ica.or.id",
      periode: "2024-2027",
    },
    {
      cabang: "Lampung",
      kacab: "Wawan Marlando, SH",
      sekcab: "Asyifa Adinda Putri",
      email: "Lampung@ica.or.id",
      periode: "2023-2026",
    },
    {
      cabang: "Makassar",
      kacab: "Muh. Farihin Said",
      sekcab: "Nurul Azizah A. Sunnari",
      email: "makasar@ica.or.id",
      periode: "2024-2027",
    },
    {
      cabang: "Malang",
      kacab: "Whysnu Priyohadi W.",
      sekcab: "Wahyudi Nurul A.",
      email: "Malang@ica.or.id",
      periode: "2024-2027",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#231812] font-sans flex flex-col justify-between">
      <Navbar />

      <main className="space-y-5 pb-24 pt-8">
        
        {/* Badge Tentang Organisasi */}
        <section className="max-w-6xl mx-auto px-7 text-center">
          <span className="inline-block px-5 py-1.5 rounded-full bg-[#FFEEDD] border border-[#FDE4D0] text-[#D96B27] font-bold text-xs md:text-sm tracking-wider uppercase shadow-xs">
            Tentang Organisasi
          </span>
        </section>

        {/* Section Title: Pengurus Cabang */}
        <section className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 sm:gap-8 justify-center">
            <div className="flex-1 h-[1px] bg-[#E2E8F0]"></div>
            <div className="text-center space-y-1">
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                <span className="text-[#2D2421]">Pengurus</span> <span className="text-[#E86826]">Cabang</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#66564B] font-medium">
                Branch Board of ICA
              </p>
            </div>
            <div className="flex-1 h-[1px] bg-[#E2E8F0]"></div>
          </div>
        </section>

        {/* Tabel Pengurus Cabang */}
        <section className="max-w-5xl mx-auto px-6 pt-2">
          <div className="bg-[#FFF9F5] border border-[#FDE4D0] rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-[#4A3D34]">
                <span>Tampilkan</span>
                <select className="border border-[#E2E8F0] rounded-lg px-3 py-1 bg-white focus:outline-none focus:border-[#E86826]">
                  <option value={16}>16</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span>entri</span>
              </div>

              <div className="relative w-full sm:w-64">
                <input 
                  type="text" 
                  placeholder="Cari cabang / pengurus..."
                  className="w-full bg-white border border-[#E2E8F0] rounded-full pl-9 pr-4 py-2 text-xs md:text-sm focus:outline-none focus:border-[#E86826]"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#FDE4D0] bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-gradient-to-r from-[#FF9853] to-[#FF7A28] text-white font-bold text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-6">
                      <div className="flex items-center gap-1 cursor-pointer">
                        Cabang <span>↑↓</span>
                      </div>
                    </th>
                    <th className="py-4 px-6">
                      <div className="flex items-center gap-1 cursor-pointer">
                        Pengurus <span>↑↓</span>
                      </div>
                    </th>
                    <th className="py-4 px-6">
                      <div className="flex items-center gap-1 cursor-pointer">
                        Email <span>↑↓</span>
                      </div>
                    </th>
                    <th className="py-4 px-6">
                      <div className="flex items-center gap-1 cursor-pointer">
                        Periode <span>↑↓</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FDE4D0] text-[#4A3D34]">
                  {pengurusCabang.map((item, index) => (
                    <>
                      {/* Baris 1: Cabang, Kacab, Email, Periode */}
                      <tr key={`${index}-1`} className="hover:bg-[#FFF9F5] transition-colors">
                        <td className="py-4 px-6 font-bold align-middle" rowSpan={2}>
                          {item.cabang}
                        </td>
                        <td className="py-3 px-6 border-b border-[#FDE4D0]/50">
                          <span className="text-[#66564B] text-xs font-semibold mr-2">1. Kacab :</span>
                          <span className="font-bold text-[#2D2421]">{item.kacab}</span>
                        </td>
                        <td className="py-4 px-6 align-middle" rowSpan={2}>
                          <span className="text-[#E86826] font-semibold">
                            {item.email}
                          </span>
                        </td>
                        <td className="py-4 px-6 align-middle font-medium" rowSpan={2}>
                          {item.periode}
                        </td>
                      </tr>
                      {/* Baris 2: Sekcab */}
                      <tr key={`${index}-2`} className="hover:bg-[#FFF9F5] transition-colors">
                        <td className="py-3 px-6">
                          <span className="text-[#66564B] text-xs font-semibold mr-2">2. Sekcab :</span>
                          <span className="font-bold text-[#2D2421]">{item.sekcab}</span>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#7C6A5D]">
              <span>Menampilkan 1 sampai 16 dari 16 entri</span>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50">
                  &lt;
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#E86826] text-white font-bold">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-[#4A3D34] hover:bg-gray-50">
                  &gt;
                </button>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}