import Image from "next/image";
import Navbar from "@/app/landing-page/components/Navbar"; 
import Footer from "@/app/landing-page/components/Footer"; 

export default function PengurusPusatPage() {
  const pengurusPusat = [
    { nama: "Russy Idroes", jabatan: "Ketua umum / President", cattery: "Rafflesia", image: "/images/pengurus/russy.png" },
    { nama: "M. Pasca Zakky Muhajir Ridlwan", jabatan: "Wakil ketua umum / Vice-President", cattery: "Lucky Jack", image: "/images/pengurus/pasca.png" },
    { nama: "Linda Paramita", jabatan: "Sekretaris umum / General Secretary", cattery: "-", image: "/images/pengurus/linda.png" },
    { nama: "Hudwiyanti, SE", jabatan: "Bendahara umum / Treasurer", cattery: "Layar", image: "/images/pengurus/hudwiyanti.png" },
    { nama: "Niniek Susanty", jabatan: "Wakil Bendahara umum / Vice-Treasurer", cattery: "Teecee", image: "/images/pengurus/niniek.png" },
    { nama: "dr. Supratikto Sp.OG (K)", jabatan: "Ketua komisi disiplin / Disciplinary Commission", cattery: "Pikijonas", image: "/images/pengurus/supratikto.png" },
    { nama: "drg. Gunawan Firdaus", jabatan: "Ketua komisi kontes / Show Commission", cattery: "Dentica", image: "/images/pengurus/gunawan.png" },
    { nama: "Riski Nanda Aditya", jabatan: "Ketua komisi pembiakan dan registrasi / Breeding & Registration Commission", cattery: "Maubran", image: "/images/pengurus/riski.png" },
    { nama: "Juliana Ratri Purnama", jabatan: "Ketua komisi Pendidikan dan pengembangan / Education and Training commission", cattery: "-", image: "/images/pengurus/juliana.png" },
    { nama: "drh.Iswan Haryanto M.Si", jabatan: "Ketua komisi Kesehatan dan kesejahteraan / Health & Welfare Commission", cattery: "Veterina", image: "/images/pengurus/iswan.png" },
    { nama: "dr. Rifki Yusup", jabatan: "Ketua komisi hubungan masyarakat / Commission for Public Relations", cattery: "Buitenzorg", image: "/images/pengurus/rifki.png" },
    { nama: "Yunita Yasmine P.", jabatan: "Ketua Komisi Juri / Judges Commission", cattery: "Lovers Kiss", image: "/images/pengurus/yunita.png" },
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

        {/* Section Title: Pengurus Pusat */}
        <section className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 sm:gap-8 justify-center">
            <div className="flex-1 h-[1px] bg-[#E2E8F0]"></div>
            <div className="text-center space-y-1">
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                <span className="text-[#2D2421]">Pengurus</span> <span className="text-[#E86826]">Pusat</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#66564B] font-medium">
                Executive and Functionaries Board of ICA Periode / The Period 2024-2027
              </p>
            </div>
            <div className="flex-1 h-[1px] bg-[#E2E8F0]"></div>
          </div>
        </section>

        {/* Grid Pengurus Pusat */}
        <section className="max-w-4xl mx-auto px-6 pt-2 space-y-6">
          
          {/* Baris 1: Ketua Umum & Wakil Ketua Umum */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            {pengurusPusat.slice(0, 2).map((pengurus, index) => (
              <div 
                key={index}
                className="bg-white p-5 rounded-3xl border border-[#FDE4D0] shadow-xs text-center space-y-3 flex flex-col items-center justify-between w-full max-w-xs mx-auto cursor-pointer transition-all duration-300 hover:bg-gradient-to-b hover:from-white hover:to-[#FFF0E5] hover:border-[#FA9856]/70 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#F99F5D]/30 shrink-0 bg-[#FFF3EA] flex items-center justify-center transition-colors duration-300">
                  {pengurus.image ? (
                    <Image src={pengurus.image} alt="foto" fill className="object-cover" />
                  ) : (
                    <span className="text-xs text-[#E86826] font-bold">foto</span>
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm text-[#E86826]">
                    {pengurus.nama}
                  </h3>
                  <p className="text-xs text-[#66564B] font-medium leading-tight">
                    {pengurus.jabatan}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Baris 2: Sekretaris Umum & Bendahara Umum */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            {pengurusPusat.slice(2, 4).map((pengurus, index) => (
              <div 
                key={index + 2}
                className="bg-white p-5 rounded-3xl border border-[#FDE4D0] shadow-xs text-center space-y-3 flex flex-col items-center justify-between w-full max-w-xs mx-auto cursor-pointer transition-all duration-300 hover:bg-gradient-to-b hover:from-white hover:to-[#FFF0E5] hover:border-[#FA9856]/70 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#F99F5D]/30 shrink-0 bg-[#FFF3EA] flex items-center justify-center transition-colors duration-300">
                  {pengurus.image ? (
                    <Image src={pengurus.image} alt="foto" fill className="object-cover" />
                  ) : (
                    <span className="text-xs text-[#E86826] font-bold">foto</span>
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm text-[#E86826]">
                    {pengurus.nama}
                  </h3>
                  <p className="text-xs text-[#66564B] font-medium leading-tight">
                    {pengurus.jabatan}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Baris 3: Wakil Bendahara Umum */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            <div className="hidden sm:block"></div>
            <div className="bg-white p-5 rounded-3xl border border-[#FDE4D0] shadow-xs text-center space-y-3 flex flex-col items-center justify-between w-full max-w-xs mx-auto cursor-pointer transition-all duration-300 hover:bg-gradient-to-b hover:from-white hover:to-[#FFF0E5] hover:border-[#FA9856]/70 hover:shadow-md hover:-translate-y-0.5">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#F99F5D]/30 shrink-0 bg-[#FFF3EA] flex items-center justify-center transition-colors duration-300">
                {pengurusPusat[4].image ? (
                  <Image src={pengurusPusat[4].image} alt="foto" fill className="object-cover" />
                ) : (
                  <span className="text-xs text-[#E86826] font-bold">foto</span>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm text-[#E86826]">
                  {pengurusPusat[4].nama}
                </h3>
                <p className="text-xs text-[#66564B] font-medium leading-tight">
                  {pengurusPusat[4].jabatan}
                </p>
              </div>
            </div>
          </div>

          {/* Baris 4: Komisi Kesehatan, Kontes, Pembiakan */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pengurusPusat.slice(5, 8).map((pengurus, index) => (
              <div 
                key={index + 5}
                className="bg-white p-5 rounded-3xl border border-[#FDE4D0] shadow-xs text-center space-y-3 flex flex-col items-center justify-between w-full max-w-xs mx-auto cursor-pointer transition-all duration-300 hover:bg-gradient-to-b hover:from-white hover:to-[#FFF0E5] hover:border-[#FA9856]/70 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#F99F5D]/30 shrink-0 bg-[#FFF3EA] flex items-center justify-center transition-colors duration-300">
                  {pengurus.image ? (
                    <Image src={pengurus.image} alt="foto" fill className="object-cover" />
                  ) : (
                    <span className="text-xs text-[#E86826] font-bold">foto</span>
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm text-[#E86826]">
                    {pengurus.nama}
                  </h3>
                  <p className="text-xs text-[#66564B] font-medium leading-tight">
                    {pengurus.jabatan}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Baris 5: Komisi Pendidikan, Disiplin, Humas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pengurusPusat.slice(8, 11).map((pengurus, index) => (
              <div 
                key={index + 8}
                className="bg-white p-5 rounded-3xl border border-[#FDE4D0] shadow-xs text-center space-y-3 flex flex-col items-center justify-between w-full max-w-xs mx-auto cursor-pointer transition-all duration-300 hover:bg-gradient-to-b hover:from-white hover:to-[#FFF0E5] hover:border-[#FA9856]/70 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#F99F5D]/30 shrink-0 bg-[#FFF3EA] flex items-center justify-center transition-colors duration-300">
                  {pengurus.image ? (
                    <Image src={pengurus.image} alt="foto" fill className="object-cover" />
                  ) : (
                    <span className="text-xs text-[#E86826] font-bold">foto</span>
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm text-[#E86826]">
                    {pengurus.nama}
                  </h3>
                  <p className="text-xs text-[#66564B] font-medium leading-tight">
                    {pengurus.jabatan}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Baris 6: Ketua Komisi Juri */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="hidden sm:block"></div>
            <div className="bg-white p-5 rounded-3xl border border-[#FDE4D0] shadow-xs text-center space-y-3 flex flex-col items-center justify-between w-full max-w-xs mx-auto cursor-pointer transition-all duration-300 hover:bg-gradient-to-b hover:from-white hover:to-[#FFF0E5] hover:border-[#FA9856]/70 hover:shadow-md hover:-translate-y-0.5">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#F99F5D]/30 shrink-0 bg-[#FFF3EA] flex items-center justify-center transition-colors duration-300">
                {pengurusPusat[11].image ? (
                  <Image src={pengurusPusat[11].image} alt="foto" fill className="object-cover" />
                ) : (
                  <span className="text-xs text-[#E86826] font-bold">foto</span>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm text-[#E86826]">
                  {pengurusPusat[11].nama}
                </h3>
                <p className="text-xs text-[#66564B] font-medium leading-tight">
                  {pengurusPusat[11].jabatan}
                </p>
              </div>
            </div>
            <div className="hidden sm:block"></div>
          </div>

        </section>

        {/* Tabel Struktur Kepengurusan */}
        <section className="max-w-4xl mx-auto px-6 pt-6">
          <div className="bg-[#FFF9F5] border border-[#FDE4D0] rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-[#4A3D34]">
                <span>Tampilkan</span>
                <select className="border border-[#E2E8F0] rounded-lg px-3 py-1 bg-white focus:outline-none focus:border-[#E86826]">
                  <option value={12}>12</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span>entri</span>
              </div>

              <div className="relative w-full sm:w-64">
                <input 
                  type="text" 
                  placeholder="Cari nama / jabatan / cattery..."
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
                        Nama <span>↑↓</span>
                      </div>
                    </th>
                    <th className="py-4 px-6">
                      <div className="flex items-center gap-1 cursor-pointer">
                        Jabatan <span>↑↓</span>
                      </div>
                    </th>
                    <th className="py-4 px-6">
                      <div className="flex items-center gap-1 cursor-pointer">
                        Nama Cattery <span>↑↓</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FDE4D0] text-[#4A3D34]">
                  {pengurusPusat.map((item, index) => (
                    <tr key={index} className="hover:bg-[#FFF9F5] transition-colors">
                      <td className="py-4 px-6 font-bold">{item.nama}</td>
                      <td className="py-4 px-6">{item.jabatan}</td>
                      <td className="py-4 px-6">
                        {item.cattery !== "-" ? (
                          <span className="inline-block bg-[#FFF0E5] text-[#E86826] font-bold text-xs px-3 py-1 rounded-full border border-[#FDE4D0]">
                            {item.cattery}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#7C6A5D]">
              <span>Menampilkan 1 sampai 12 dari 12 entri</span>
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