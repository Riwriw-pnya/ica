import Navbar from "@/app/landing-page/components/Navbar"; 
import Footer from "@/app/landing-page/components/Footer"; 

export default function DaftarJuriPage() {
  const daftarJuri = [
    {
      nama: "Mrs. Russy Idroes",
      cat1: "X",
      cat2: "SJ",
      cat3: "SJ",
      cat4: "-",
    },
    {
      nama: "Mr. Herry Marwanto",
      cat1: "X",
      cat2: "SJ",
      cat3: "SJ",
      cat4: "-",
    },
    {
      nama: "Mr. Trilukito Prio Sembadha",
      cat1: "X",
      cat2: "SJ",
      cat3: "-",
      cat4: "SJ",
    },
    {
      nama: "Mrs. Ratih Sri Umiyati",
      cat1: "X",
      cat2: "-",
      cat3: "-",
      cat4: "SJ",
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

        {/* Section Title: Daftar Juri */}
        <section className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 sm:gap-8 justify-center">
            <div className="flex-1 h-[1px] bg-[#E2E8F0]"></div>
            <div className="text-center space-y-1">
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                <span className="text-[#2D2421]">Daftar</span> <span className="text-[#E86826]">Juri</span>
              </h2>
            </div>
            <div className="flex-1 h-[1px] bg-[#E2E8F0]"></div>
          </div>
        </section>

        {/* Subtitle / Judul Tabel */}
        <section className="max-w-5xl mx-auto px-6 pt-2">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#E86826]">
            Daftar Juri FIFe Domisili Indonesia
          </h3>
        </section>

        {/* Tabel Daftar Juri */}
        <section className="max-w-5xl mx-auto px-6">
          <div className="bg-[#FFF9F5] border border-[#FDE4D0] rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-[#4A3D34]">
                <span>Tampilkan</span>
                <select className="border border-[#E2E8F0] rounded-lg px-3 py-1 bg-white focus:outline-none focus:border-[#E86826]">
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span>entri</span>
              </div>

              <div className="relative w-full sm:w-64">
                <input 
                  type="text" 
                  placeholder="Cari juri..."
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
                        Nama Juri <span>↑↓</span>
                      </div>
                    </th>
                    <th className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-1 cursor-pointer">
                        Cat-1 <span>↑↓</span>
                      </div>
                    </th>
                    <th className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-1 cursor-pointer">
                        Cat-2 <span>↑↓</span>
                      </div>
                    </th>
                    <th className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-1 cursor-pointer">
                        Cat-3 <span>↑↓</span>
                      </div>
                    </th>
                    <th className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-1 cursor-pointer">
                        Cat-4 <span>↑↓</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FDE4D0] text-[#4A3D34]">
                  {daftarJuri.map((item, index) => (
                    <tr key={index} className="hover:bg-[#FFF9F5] transition-colors">
                      <td className="py-4 px-6 font-bold">{item.nama}</td>
                      <td className="py-4 px-6 text-center font-medium">{item.cat1}</td>
                      <td className="py-4 px-6 text-center font-medium">{item.cat2}</td>
                      <td className="py-4 px-6 text-center font-medium">{item.cat3}</td>
                      <td className="py-4 px-6 text-center font-medium">{item.cat4}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#7C6A5D]">
              <span>Menampilkan 1 sampai 4 dari 4 entri</span>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50" disabled>
                  &lt;
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#E86826] text-white font-bold">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50" disabled>
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