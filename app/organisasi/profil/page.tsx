import Image from "next/image";
import Navbar from "@/app/landing-page/components/Navbar"; 
import Footer from "@/app/landing-page/components/Footer"; 

export default function ProfilePage() {
  const founders = [
    { name: "Russy Idroes, S.Kom, MM", role: "Founder" },
    { name: "Suharno Eliandi, SE Ak, MSc., CA", role: "Founder" },
    { name: "DR. Drh. M. Munawaroh, MM", role: "Founder" },
    { name: "Trilukito P.S (alm)", role: "Founder" },
    { name: "Ermita Hadi", role: "Founder" },
    { name: "Herry Marwanto", role: "Founder" },
    { name: "Ratih S.Umiyati", role: "Founder" },
    { name: "Henny Retnowati", role: "Founder" },
    { name: "H. Herry Mulyadi", role: "Founder" },
    { name: "Betty Setiawati", role: "Founder" },
    { name: "Rita Irianti", role: "Founder" },
    { name: "Lanny", role: "Founder" },
    { name: "Pipit Wulandari", role: "Founder" },
  ];

  const presidents = [
    { 
      name: "DR. Drh. M. Munawaroh, MM.", 
      periods: ["Periode 2003 – 2006", "Periode 2006 – 2009", "Periode 2009 – 2014"] 
    },
    { 
      name: "Russy Idroes, S.Kom, MM.", 
      periods: ["Periode 2014 – 2017", "Periode 2024 – Sekarang"] 
    },
    { 
      name: "Amsul Nababan (Alm)", 
      periods: ["Periode 2017 – 2020", "Periode 2020 – 2023"] 
    },
    { 
      name: "Natalia Christanto", 
      periods: ["Periode 2023 – 2024"] 
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#231812] font-sans flex flex-col justify-between">
      
      <Navbar />
      
      <main className="space-y-16 pb-24 pt-0">
        
        {/* Bagian Hero */}
        <section className="w-full mt-0 pt-0">
          <div className="w-full h-72 md:h-[480px] bg-[#FFF6EC] border-b border-[#E9E2DC] relative shadow-xs">
            <Image 
              src="/images/dokumP.jpeg" 
              alt="Dokumentasi Musyawarah / Pengurus Indonesian Cat Association (ICA)"
              fill
              priority
              className="object-cover object-center brightness-70"
            />
            
            <div className="absolute inset-0 bg-black/10"></div>

            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-30">
              <span className="inline-block bg-[#FFEEDD] border border-[#FDE4D0] text-[#D96B27] text-xs font-bold px-5 py-2 rounded-full uppercase tracking-wider shadow-sm">
                Tentang Organisasi
              </span>
            </div>
          </div>
        </section>

        {/* Title Section */}
        <section className="max-w-4xl mx-auto px-6 pt-2">
          <div className="flex items-center gap-4 sm:gap-8 justify-center">
            <div className="flex-1 h-[1px] bg-[#E2E8F0]"></div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#2D2421] tracking-tight text-center">
              Profil dan <span className="text-[#E86826]">Sejarah</span>
            </h2>
            <div className="flex-1 h-[1px] bg-[#E2E8F0]"></div>
          </div>
        </section>

        {/* Sejarah Text Container */}
        <section className="max-w-4xl mx-auto px-6">
          <div className="bg-[#FFF9F5] p-8 md:p-12 rounded-3xl border border-[#FDE4D0] shadow-xs space-y-6 text-sm md:text-base text-[#4A3D34] leading-relaxed">
            <p>
              <strong>Indonesian Cat Association (ICA)</strong> adalah organisasi penyayang kucing di Indonesia yang dibentuk pada tanggal <strong>1 April 2003</strong> oleh para penyayang dan pemerhati kucing di Indonesia melalui Musyawarah yang diselenggarakan di Jakarta dan dibuka secara resmi oleh Kepala Direktorat Kesehatan Hewan Ditjen Bina Produksi Peternakan, 
              Departemen Pertanian yaitu Bapak Prof. DR. Drh. Budi Triakosa. Munas tersebut dihadiri oleh para pemilik, penyayang dan pemerhati kucing dari kota kota besar yang ada di Indonesia, seperti Bandung, Jakarta, Surabaya dan lain lain.
            </p>

            <p>
              ICA dibentuk dengan tujuan agar para penyayang kucing di Indonesia mempunyai wadah yang dapat memberikan pelayanan dan pembinaan kepada para anggota secara profesional dan transparan dalam koridor keorganisasian yang sehat.
              <br /><br />
              Melalui Surat Keputusan Direktur Jenderal Bina Produksi Peternakan, Departemen Pertanian No. <strong>82/KPTS/OT.160/F/09.04</strong> tanggal 24 September 2004, <strong>ICA resmi ditunjuk oleh Pemerintah Republik Indonesia sebagai Organisasi atau Wadah bagi Pemilik, Pemerhati dan Penyayang Kucing di Indonesia.</strong>
            </p>

            <p>
              ICA berupaya agar diakui secara International adalah dengan bergabungnya pada salah satu organisasi perkucingan dunia, dalam upaya tersebut ICA berusaha bergabung dengan FIFe (Federation International Feline) dan melalui General Assembly FIFe yang dilaksanakan di Malmo – Sweeden tanggal 25 – 28 Mei 2005, ICA diterima sebagai member Under Patrogange FIFe dengan Mentor Federation Feline Helvetique (FFH) yaitu salah satu anggota organisasi kucing dibawah naungan FIFe yang berada di Swiss.
            </p>

            <p>
              Setelah 2 tahun berjalan dan berusaha memenuhi segala persyaratan / peraturan dan mendapatkan berbagai pengawasan / bimbingan untuk menjadi member FIFe, maka ICA berhasil dan mendapat pengakuan resmi dan diterima sebagai Full Member FIFe, melalui keputusan General Assembly FIFe yang dilaksanakan di Albufeira – Portugal pada tanggal 24 – 25 Mei 2007.
            </p>

            <p>
              Selain itu ICA sudah berbadan hukum dengan <strong>SK Kementerian Hukum dan HAM Nomor. AHU-0002378.AH.01.07 tahun 2018</strong> tentang pengesahan Pendirian Badan Hukum Perkumpulan Pencinta Kucing Indonesia (ICA) tanggal 23 Februari 2018. Sehingga ICA sudah resmi diakui oleh Negara Indonesia.
            </p>

            <p>
              Perkembangan berbagai organisasi penyayang kucing telah berkembang dengan pesat, untuk itu Dirjen Peternakan dan Kesehatan Hewan akan membuat kebijakan baru terkait organisasi penyayang hewan peliharaan di Indonesia. Maka telah dikeluarkan Keputusan Dirjen Peternakan dan Kesehatan Hewan No: 3693/Kpts/HK.160/F/04/2018 tanggal 18 April 2018 tentang Pencabutan.
            </p>

            <p>
              Walaupun Keputusan Penunjukan Asosiasi Penyayang Kucing di Indonesia (Indonesian Cat Association) sebagai Organisasi Penyayang Kucing di Indonesia telah dicabut, tapi dalam Penetapan butir kedua Keputusan Dirjen Peternakan dan Kesehatan Hewan No: 3693/Kpts/HK.160/F/04/2018 tersebut disampaikan bahwa ICA tetap dapat melakukan kegiatan sesuai dengan ketentuan peraturan perundang-undangan.
            </p>

            <p>
              Keputusan ini sama sekali tidak berpengaruh kepada penerbitan Sertifikat Pedigree kucing-kucing yang terdaftar di ICA, karena ICA mendapat lisensi penerbitan Sertifikat Pedigree dari Federation International Feline (FIFe), sehingga penerbitan Sertifikat Pedigree dapat tetap dilakukan sesuai peraturan yang berlaku.
            </p>

            <p>
              <strong>Sejak diterimanya ICA sebagai Full Member FIFe, sertifikat pedigree yang dikeluarkan oleh ICA telah diakui oleh seluruh Negara-negara anggota FIFe di seluruh dunia.</strong>
            </p>
          </div>
        </section>

        {/* Bagian Visi & Misi */}
        <section className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-[#FDE4D0] shadow-xs space-y-4">
            <div className="w-12 h-12 bg-[#FFF3EA] rounded-2xl flex items-center justify-center text-[#E86826]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-extrabold text-[#2D2421]">VISI</h3>
            <p className="text-sm text-[#7C6A5D] italic leading-relaxed">
              &ldquo;Sebagai Organisasi Penyayang Kucing yang Profesional dan Terkemuka di Indonesia.&rdquo;
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#FDE4D0] shadow-xs space-y-4">
            <div className="w-12 h-12 bg-[#FFF3EA] rounded-2xl flex items-center justify-center text-[#E86826]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-extrabold text-[#2D2421]">MISI</h3>
            <ol className="space-y-3 text-sm text-[#7C6A5D] list-decimal pl-4">
              <li className="leading-relaxed">
                Menjadi salah satu wadah bagi penyayang, pemerhati dan pemilik kucing yang berada di Indonesia dalam rangka melestarikan, mensejahterakan dan mengembangbiakan kucing yang di akui secara National maupun International.
              </li>
              <li className="leading-relaxed">
                Menjaga / Mempertahankan Kemurnian Kucing Ras yang berada di Indonesia.
              </li>
              <li className="leading-relaxed">
                Melakukan Pembinaan kepada anggotanya dalam hal perawatan dan pemeliharaan kucing.
              </li>
            </ol>
          </div>
        </section>

        {/* Bagian Kegiatan-kegiatan ICA */}
        <section className="max-w-4xl mx-auto px-6">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#FDE4D0] shadow-xs space-y-6">
            <h3 className="text-xl md:text-2xl font-extrabold text-[#2D2421] leading-snug">
              Kegiatan – kegiatan yang dilaksanakan ICA untuk mencapai maksud dan tujuan organisasi, antara lain:
            </h3>
            <ol className="space-y-4 text-sm md:text-base text-[#7C6A5D] list-decimal pl-5 leading-relaxed">
              <li>
                Menggiatkan dan menghimpun anggota penyayang dan pecinta kucing di Indonesia sebanyak – banyaknya.
              </li>
              <li>
                Meningkatkan pengetahuan anggota tentang tata cara perawatan, kesehatan, pengembangbiakan dan genetika kucing melalui pendidikan dan pelatihan (diklat).
              </li>
              <li>
                Melindungi dan menjaga kemurnian kucing ras melalui penerbitan silsilah (pedigree) kucing, serta pengawasan dan pembinaan terhadap pengembangbiakan kucing (cattery).
              </li>
              <li>
                Membina hubungan dan kerjasama dalam arti kata seluas – luasnya dengan instansi – instansi pemerintah maupun swasta yang terkait, dalam rangka pengembangan dan pembinaan terhadap organisasi dan anggota ICA.
              </li>
              <li>
                Memberikan pembinaan dan pengetahuan kepada anggota dan masyarakat luas tentang dunia kucing melalui kontes kucing maupun kegiatan ilmiah berupa seminar, lokakarya, sarasehan dan bentuk kegiatan lainnya.
              </li>
            </ol>
          </div>
        </section>

        {/* Header Founders */}
        <section className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 sm:gap-8 justify-center">
            <div className="flex-1 h-[1px] bg-[#E2E8F0]"></div>
            <h3 className="text-xl md:text-2xl font-black text-[#E86826] text-center whitespace-nowrap">
              Pendiri / Founders of ICA
            </h3>
            <div className="flex-1 h-[1px] bg-[#E2E8F0]"></div>
          </div>
        </section>

        {/* Founders Grid */}
        <section className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-6">
            {founders.map((founder, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-3xl border border-[#FDE4D0] shadow-xs text-center space-y-3 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)]"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-[#FFF3EA] border-2 border-[#F99F5D]/30 flex items-center justify-center text-gray-400 text-xs shrink-0">
                  Foto
                </div>
                <h4 className="font-bold text-sm text-[#4A3D34]">{founder.name}</h4>
                <p className="text-xs text-gray-500">{founder.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Header Presidents */}
        <section className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 sm:gap-8 justify-center">
            <div className="flex-1 h-[1px] bg-[#E2E8F0]"></div>
            <h3 className="text-xl md:text-2xl font-black text-[#E86826] text-center whitespace-nowrap">
              Daftar Ketua Umum / List of ICA Presidents
            </h3>
            <div className="flex-1 h-[1px] bg-[#E2E8F0]"></div>
          </div>
        </section>

        {/* Presidents Grid */}
        <section className="max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {presidents.map((pres, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-3xl border border-[#FDE4D0] shadow-xs text-center space-y-4"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-[#FFF3EA] border-2 border-[#F99F5D]/30 flex items-center justify-center text-gray-400 text-xs shrink-0">
                  Foto
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#4A3D34] mb-2">{pres.name}</h4>
                  <div className="space-y-1">
                    {pres.periods.map((p, idx) => (
                      <span key={idx} className="block text-xs bg-gray-100 py-1 px-2 rounded-md text-gray-600 font-medium border border-gray-200">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />

    </div>
  );
}