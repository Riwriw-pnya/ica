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
    <div className="min-h-screen bg-[#FAFAF8] text-[#231812] font-sans flex flex-col justify-between">
      
      <Navbar />
      <main className="space-y-20 pb-20">
        
        <section className="w-full pt-2">
          <div className="w-full h-72 md:h-[480px] bg-[#FFF6EC] border-b border-[#E9E2DC] relative shadow-xs">
            
            <Image 
              src="/images/dokumP.jpeg" 
              alt="Dokumentasi Musyawarah / Pengurus Indonesian Cat Association (ICA)"
              fill
              priority
              className="object-cover object-center"
            />
            
            <div className="absolute inset-0 bg-black/10"></div>

            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-30">
              <span className="inline-block bg-[#FDEBD0] border border-[#F99F5D]/40 text-[#C85A17] text-xs font-semibold px-5 py-2 rounded-full uppercase tracking-wider shadow-md">
                Tentang Organisasi
              </span>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 pt-4">
          <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-[2px] bg-[#E9E2DC]"></div>
            <div className="text-center px-2">
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[#231812]">
                Profil dan <span className="text-[#C85A17]">Sejarah</span>
              </h2>
            </div>
            <div className="flex-1 h-[2px] bg-[#E9E2DC]"></div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#E9E2DC] shadow-xs space-y-6 text-sm md:text-base text-gray-700 leading-relaxed">
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

        <section className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-[#E9E2DC] shadow-xs space-y-4">
            <div className="w-12 h-12 bg-[#FFF6EC] rounded-2xl flex items-center justify-center text-[#C85A17]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#231812]">Visi</h3>
            <p className="text-sm text-gray-700 italic leading-relaxed">
              &ldquo;Sebagai Organisasi Penyayang Kucing yang Profesional dan Terkemuka di Indonesia.&rdquo;
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#E9E2DC] shadow-xs space-y-4">
            <div className="w-12 h-12 bg-[#FFF6EC] rounded-2xl flex items-center justify-center text-[#C85A17]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#231812]">Misi</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#EE6B28] font-bold">•</span>
                Mewadahi pelestarian, kesejahteraan, dan pembiakan kucing berstandar nasional maupun internasional.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EE6B28] font-bold">•</span>
                Menjaga dan mempertahankan kemurnian ras kucing di Indonesia.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EE6B28] font-bold">•</span>
                Memberikan edukasi dan pembinaan rutin terkait perawatan serta kesehatan kucing bagi anggota.
              </li>
            </ul>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-[2px] bg-[#E9E2DC]"></div>
            <h3 className="text-xl md:text-2xl font-extrabold text-[#C85A17] text-center px-2">
              Pendiri / Founders of ICA
            </h3>
            <div className="flex-1 h-[2px] bg-[#E9E2DC]"></div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-6">
            {founders.map((founder, index) => (
              <div key={index} className="bg-white p-6 rounded-3xl border border-[#E9E2DC] shadow-xs text-center space-y-3 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)]">
                <div className="w-24 h-24 mx-auto rounded-full bg-[#FFF6EC] border-2 border-[#F99F5D]/30 flex items-center justify-center text-gray-400 text-xs">
                  Foto
                </div>
                <h4 className="font-bold text-sm text-[#231812]">{founder.name}</h4>
                <p className="text-xs text-gray-500">{founder.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-[2px] bg-[#E9E2DC]"></div>
            <h3 className="text-xl md:text-2xl font-extrabold text-[#C85A17] text-center px-2">
              Daftar Ketua Umum / List of ICA Presidents
            </h3>
            <div className="flex-1 h-[2px] bg-[#E9E2DC]"></div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {presidents.map((pres, index) => (
              <div key={index} className="bg-white p-6 rounded-3xl border border-[#E9E2DC] shadow-xs text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-[#FFF6EC] border-2 border-[#F99F5D]/30 flex items-center justify-center text-gray-400 text-xs">
                  Foto
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#231812] mb-2">{pres.name}</h4>
                  <div className="space-y-1">
                    {pres.periods.map((p, idx) => (
                      <span key={idx} className="block text-xs bg-[#FAFAF8] py-1 px-2 rounded-md text-gray-600 border border-gray-100">
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