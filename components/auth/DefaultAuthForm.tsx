"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/auth/AuthModal";

interface DefaultAuthFormProps {
  mode: "login" | "register";
  type: "member" | "cattery";
}

export default function DefaultAuthForm({ mode, type }: DefaultAuthFormProps) {
  const router = useRouter();
  const isLogin = mode === "login";
  const isMember = type === "member";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showCatteryName = !isLogin && !isMember;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/anggota");
  };

  return (
    <main className="h-screen w-full bg-white flex items-center justify-center relative overflow-hidden">
      <Link
        href="/"
        className="absolute top-6 right-6 z-30 w-10 h-10 rounded-full bg-[#F7F4F1] hover:bg-[#E9E2DC] flex items-center justify-center text-[#7A6E65] hover:text-[#231A14] transition-all duration-150 cursor-pointer shadow-sm"
        title="Kembali ke Beranda"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Link>

      <div className="w-full h-full flex flex-col md:flex-row relative overflow-hidden">
        {/* Left Panel dengan Background Foto Kucing */}
        <div 
          className="w-full md:w-5/12 relative p-8 md:p-14 lg:p-16 flex flex-col justify-between h-full overflow-y-auto bg-cover bg-center"
          style={{ backgroundImage: "url('/images/cattt.jpg')" }}
        >
          {/* Overlay gelap agar teks kontras dan terbaca jelas */}
          <div className="absolute inset-0 bg-black/70 z-0" />

          {/* Konten Atas */}
          <div className="space-y-8 z-10 relative">
            <Link href="/" className="flex items-center gap-4 group cursor-pointer w-fit">
              <Image src="/images/LOGO-ICA.webp" alt="ICA Logo" width={55} height={55} className="object-contain group-hover:scale-105 transition-transform" />
              <div>
                <h3 className="text-xs font-bold text-white tracking-wider uppercase group-hover:text-[#FFC299] transition-colors">
                  Indonesian Cat Association
                </h3>
                <p className="text-[11px] text-gray-300 font-medium">{isMember ? "Member Portal" : "Cattery Portal"}</p>
              </div>
            </Link>

            <div className="space-y-4 max-w-md">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-[1.2]">
                {isMember 
                  ? "Keanggotaan Anda, selalu dalam genggaman." 
                  : "Kelola cattery, pet, dan aplikasi ICA dari satu tempat."}
              </h1>
              <p className="text-xs md:text-sm text-gray-200 leading-relaxed font-normal">
                {isMember 
                  ? "Pantau masa berlaku keanggotaan, daftar event, dan telusuri cattery resmi ICA dari satu akun." 
                  : "Ajukan mating report, pantau status verifikasi, dan simpan data pedigree kucing Anda tanpa email berantai."}
              </p>
            </div>

            {/* Kotak Info khusus Cattery Login (meniru gambar referensi) */}
            {!isMember && isLogin && (
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5 text-white text-xs font-bold">
                  i
                </div>
                <p className="text-xs text-gray-200 leading-relaxed">
                  Verification code diterbitkan manual oleh admin ICA setelah cattery Anda disetujui. Kode bersifat tetap — bukan kode sekali pakai.
                </p>
              </div>
            )}
          </div>

          {/* Konten Bawah */}
          <div className="pt-10 text-[11px] text-gray-300 z-10 relative">© {new Date().getFullYear()} Indonesian Cat Association</div>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-7/12 p-8 md:p-14 lg:p-20 flex flex-col justify-center bg-white h-full overflow-y-auto">
          <div className="max-w-[460px] w-full mx-auto space-y-6 my-auto">
            <div className="space-y-1.5 min-h-[70px]">
              <h2 className="text-2xl md:text-[28px] font-black tracking-tight text-[#231A14]">
                {isLogin 
                  ? (isMember ? "Masuk sebagai Member" : "Masuk ke Cattery Portal") 
                  : `Daftar Akun ${isMember ? "Member" : "Cattery"}`}
              </h2>
              <p className="text-xs md:text-sm text-[#7A6E65]">
                {isLogin 
                  ? (isMember ? "Gunakan email yang terdaftar pada keanggotaan Anda." : "Gunakan email cattery dan verification code dari admin ICA.") 
                  : "Lengkapi data diri Anda untuk membuat akun baru."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className={`grid transition-all duration-200 ease-in-out ${showCatteryName ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden space-y-1.5">
                  <label className="text-xs font-semibold text-[#4A3D34]">Nama Cattery</label>
                  <input type="text" placeholder="Contoh: Fluffy Cattery" className="w-full px-4 py-3 text-xs md:text-sm rounded-xl border border-[#E9E2DC] focus:outline-none focus:border-[#EE6B28] bg-white text-[#231A14]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#4A3D34]">
                  {isLogin && !isMember ? "Email cattery" : "Email"}
                </label>
                <input 
                  type="email" 
                  placeholder={isLogin && !isMember ? "nama@cattery.id" : "nama@email.com"} 
                  className="w-full px-4 py-3 text-xs md:text-sm rounded-xl border border-[#E9E2DC] focus:outline-none focus:border-[#EE6B28] bg-white text-[#231A14]" 
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-[#4A3D34]">
                    {isLogin && !isMember ? "Verification code" : "Kata sandi"}
                  </label>
                  {isLogin && isMember && (
                    <a href="#" className="text-xs text-[#EE6B28] hover:underline font-medium">Lupa kata sandi?</a>
                  )}
                </div>
                <input 
                  type={isLogin && !isMember ? "text" : "password"} 
                  placeholder={isLogin && !isMember ? "ICA-0000-XXX" : "••••••••"} 
                  className="w-full px-4 py-3 text-xs md:text-sm rounded-xl border border-[#E9E2DC] focus:outline-none focus:border-[#EE6B28] bg-white text-[#231A14]" 
                />
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full max-w-[400px] mx-auto block py-3.5 rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white font-bold text-xs md:text-sm hover:-translate-y-0.5 transition">
                  {isLogin ? "Masuk" : "Daftar Sekarang"}
                </button>
              </div>
            </form>

            <div className="text-center space-y-2.5 pt-1">
              <p className="text-xs text-[#7A6E65]">
                {isLogin ? (
                  isMember ? (
                    <>
                      Belum punya akun?{" "}
                      <Link href={`/auth/register/${type}`} className="text-[#EE6B28] font-bold hover:underline">
                        Buat akun {type}
                      </Link>
                    </>
                  ) : (
                    <>
                      Belum punya kode?{" "}
                      <a href="#" className="text-[#EE6B28] font-bold hover:underline">
                        Hubungi admin ICA
                      </a>{" "}
                      untuk penerbitan verification code cattery Anda.
                    </>
                  )
                ) : (
                  <>
                    Sudah punya akun?{" "}
                    <Link href={`/auth/login/${type}`} className="text-[#EE6B28] font-bold hover:underline">
                      Masuk
                    </Link>
                  </>
                )}
              </p>

              <div>
                <button onClick={() => setIsModalOpen(true)} className="text-xs text-[#7A6E65] hover:text-[#EE6B28] font-medium transition cursor-pointer">
                  Ganti tipe akun
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mode={mode} />
    </main>
  );
}