"use client";

import Navbar from "@/app/landing-page/components/Navbar";
import Footer from "@/app/landing-page/components/Footer";
import Image from "next/image";

export default function ContactPage() {
  const cleanWhatsapp = "6281280543524";

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#231A14] flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Konten Utama */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 space-y-12 w-full">
        
        {/* Header Title dengan Garis Kiri-Kanan */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-[1px] bg-[#E9E2DC]"></div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#231A14] tracking-tight text-center">
              Contact <span className="text-[#EE6B28]">Us</span>
            </h1>
            <div className="flex-1 h-[1px] bg-[#E9E2DC]"></div>
          </div>
          <p className="text-xs sm:text-sm text-[#7A6E65] text-center max-w-lg mx-auto">
            Hubungi pengurus atau kunjungi sekretariat Indonesian Cat Association (ICA Pusat).
          </p>
        </div>

        {/* Section 1: Admin Sekretariat */}
        <section className="space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#EE6B28] text-center">
            Admin Sekretariat
          </h2>

          <div className="max-w-sm mx-auto bg-white rounded-2xl border border-[#E9E2DC] p-6 shadow-xs text-center space-y-4">
            <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden bg-[#FFF6EC] border border-[#F3D1BD]/50 relative flex items-center justify-center">
              
              <Image
                src="/images/edward.webp" 
                alt="Edward - Admin Sekretariat"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#231A14]">Edward</h3>
              <p className="text-xs text-[#7A6E65] mt-0.5">Admin Sekretariat</p>
            </div>
          </div>
        </section>

        {/* Divider Tipis */}
        <div className="max-w-xl mx-auto h-[1px] bg-[#E9E2DC]"></div>

        {/* Section 2: Sekretariat & ICA Pusat */}
        <section className="space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#EE6B28] text-center">
            Sekretariat
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            
            {/* Informasi Kontak ICA Pusat */}
            <div className="bg-white rounded-2xl border border-[#E9E2DC] p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs">
              <div>
                <h3 className="text-lg font-extrabold text-[#EE6B28] mb-4">ICA Pusat</h3>
                
                <ul className="space-y-4 text-xs sm:text-sm text-[#231A14]">
                  {/* WhatsApp */}
                  <li>
                    <a
                      href={`https://wa.me/${cleanWhatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 hover:text-[#EE6B28] transition group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 1117 0z" />
                        </svg>
                      </div>
                      <span className="font-semibold">+62 812 8054 3524</span>
                    </a>
                  </li>

                  {/* Email Pengurus Pusat */}
                  <li>
                    <a
                      href="mailto:pp@ica.or.id"
                      className="flex items-center gap-3 hover:text-[#EE6B28] transition"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#FFF6EC] text-[#EE6B28] flex items-center justify-center border border-[#F3D1BD]/50 shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-semibold block">pp@ica.or.id</span>
                        <span className="text-[11px] text-[#7A6E65]">Pengurus Pusat</span>
                      </div>
                    </a>
                  </li>

                  {/* Email Sekretariat */}
                  <li>
                    <a
                      href="mailto:sekretariat@ica.or.id"
                      className="flex items-center gap-3 hover:text-[#EE6B28] transition"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#FFF6EC] text-[#EE6B28] flex items-center justify-center border border-[#F3D1BD]/50 shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-semibold block">sekretariat@ica.or.id</span>
                        <span className="text-[11px] text-[#7A6E65]">Sekretariat</span>
                      </div>
                    </a>
                  </li>

                  {/* Alamat */}
                  <li className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF6EC] text-[#EE6B28] flex items-center justify-center border border-[#F3D1BD]/50 shrink-0 mt-0.5">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="leading-relaxed text-[#7A6E65]">
                      Grand ITC Permata Hijau 1st Floor Block B.6 Unit 6-7 Jl. Arteri Permata Hijau – Jakarta Selatan 12210
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Peta / Google Maps Embed */}
            <div className="bg-white rounded-2xl border border-[#E9E2DC] p-4 flex flex-col justify-between shadow-xs overflow-hidden">
              <div className="relative w-full h-72 lg:h-full min-h-[280px] rounded-xl overflow-hidden border border-[#E9E2DC]">
                <iframe
                  title="ICA Pusat Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2796122687593!2d106.7845!3d-6.225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTMnMzQuOCJTIDEwNsKwNDcnMDQuMiJF!5e0!3m2!1sen!2sid!4v1600000000000!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                ></iframe>
              </div>
              <div className="mt-3 text-right">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EE6B28] hover:underline"
                >
                  Open in Maps ↗
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* Section 3: Informasi Rekening Bank Mandiri */}
        <section className="pt-4">
          <div className="max-w-xl mx-auto bg-white rounded-2xl border border-[#E9E2DC] p-6 sm:p-8 text-center space-y-4 shadow-xs">
            
            <div className="flex justify-center">
              <img
                src="/images/mandiri.png"
                alt="Logo Bank Mandiri"
                className="h-10 sm:h-12 object-contain"
              />
            </div>

            <div className="space-y-1 pt-2">
              <p className="text-xl sm:text-2xl font-extrabold tracking-wider text-[#231A14]">
                1010-0138-60638
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#7A6E65] uppercase tracking-wide">
                Indonesian Cat Association
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}