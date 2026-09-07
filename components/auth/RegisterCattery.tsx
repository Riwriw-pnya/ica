"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/auth/AuthModal";

export default function RegisterCattery() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    kodeCattery: "",
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFillDemo = () => {
    setFormData({
      email: "abg@cattery.id",
      kodeCattery: "ICA-8842-BDG",
    });
    setErrorMsg(null);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.email || !formData.kodeCattery) {
      setErrorMsg("Email dan Kode Cattery wajib diisi.");
      return;
    }

    if (formData.kodeCattery === "salah") {
      setErrorMsg("Kode Cattery salah atau belum terdaftar. Silakan cek kembali.");
      return;
    }

    setStep(2);
  };

  return (
    <main className="h-screen w-full bg-white flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* Tombol Close */}
      <Link
        href="/"
        className="absolute top-6 right-6 z-30 w-10 h-10 rounded-full bg-[#F7F4F1] hover:bg-[#E9E2DC] flex items-center justify-center text-[#7A6E65] hover:text-[#231A14] transition-all cursor-pointer shadow-sm font-bold"
      >
        ✕
      </Link>

      <div className="w-full h-full flex flex-col md:flex-row relative overflow-hidden">
        
        {/* SISI KIRI: Banner / Gambar Cattery */}
        <div
          className="w-full md:w-5/12 relative p-8 md:p-12 lg:p-16 flex flex-col justify-between h-full overflow-y-auto bg-cover bg-center text-white"
          style={{ backgroundImage: "url('/images/cattt.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/70 z-0" />
          <div className="z-10 relative space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/LOGO-ICA.webp" alt="ICA Logo" width={45} height={45} className="object-contain" />
              <div>
                <h3 className="text-[11px] font-bold tracking-wider uppercase">Indonesian Cat Association</h3>
                <p className="text-[11px] text-gray-300 font-medium">Cattery Portal</p>
              </div>
            </Link>
            <div className="space-y-3 max-w-md">
              <h1 className="text-2xl md:text-3xl font-black leading-snug">Daftarkan cattery resmi Anda di ICA.</h1>
              <p className="text-xs md:text-sm text-gray-200 leading-relaxed text-justify">Kelola nama cattery, pengajuan pedigree, dan verifikasi resmi dengan mudah.</p>
            </div>
          </div>
          <div className="pt-8 text-[11px] text-gray-300 z-10 relative">© {new Date().getFullYear()} Indonesian Cat Association</div>
        </div>

        {/* SISI KANAN: Form Pendaftaran Cattery */}
        <div className="w-full md:w-7/12 p-8 md:p-16 lg:p-20 flex flex-col justify-between bg-white h-full overflow-y-auto">
          <div className="max-w-[420px] w-full mx-auto space-y-6 my-auto">
            
            {step === 1 && (
              <>
                <div className="space-y-1.5">
                  <h2 className="text-2xl md:text-[28px] font-black tracking-tight text-[#231A14]">
                    Daftar akun Cattery Portal
                  </h2>
                  <p className="text-xs text-[#7A6E65] leading-relaxed text-justify">
                    Masukkan email dan kode cattery yang diterbitkan admin ICA saat cattery Anda disetujui.
                  </p>
                </div>

                <form onSubmit={handleVerify} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#4A3D34]">Email</label>
                    <input
                      type="email"
                      placeholder="abg@cattery.id"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 text-xs rounded-xl border border-[#E9E2DC] focus:outline-none focus:border-[#EE6B28] bg-white text-[#231A14]"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#4A3D34]">Kode cattery</label>
                    <input
                      type="text"
                      placeholder="Masukkan kode cattery..."
                      value={formData.kodeCattery}
                      onChange={(e) => setFormData({ ...formData, kodeCattery: e.target.value })}
                      className={`w-full px-4 py-3 text-xs rounded-xl border bg-white text-[#231A14] focus:outline-none ${
                        errorMsg ? "border-[#EA4335] ring-2 ring-[#EA4335]/20" : "border-[#E9E2DC] focus:border-[#EE6B28]"
                      }`}
                      required
                    />
                    {errorMsg && (
                      <p className="text-[11px] text-[#EA4335] font-medium mt-1">{errorMsg}</p>
                    )}
                  </div>

                  <div className="pt-2 flex justify-center">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white font-bold text-xs md:text-sm hover:-translate-y-0.5 transition cursor-pointer shadow-sm"
                    >
                      Daftar
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === 2 && (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E6F4EA] text-[#137333] flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#231A14]">Pembuatan akun sudah dikirim</h2>
                <p className="text-xs md:text-sm text-[#7A6E65] max-w-sm mx-auto leading-relaxed text-justify">
                  Silakan cek email <span className="font-semibold text-[#231A14]">{formData.email}</span> dan buka tautan pembuatan kata sandi. Dashboard baru dapat diakses setelah kata sandi dibuat.
                </p>

                <div className="pt-4 space-y-3">
                  <button
                    type="button"
                    onClick={() => router.push("/anggota")}
                    className="w-full py-3.5 rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white font-bold text-xs md:text-sm shadow-sm hover:brightness-95 transition cursor-pointer"
                  >
                    Simulasi: buka tautan dari email
                  </button>
                  <Link
                    href="/auth/login/cattery"
                    className="block w-full py-3.5 rounded-full border border-[#E9E2DC] text-[#7A6E65] font-medium text-xs hover:bg-[#F7F4F1] transition cursor-pointer"
                  >
                    Kembali ke halaman masuk
                  </Link>
                </div>
              </div>
            )}

            <div className="text-center space-y-2 pt-4 border-t border-[#F7F4F1]">
              <p className="text-xs text-[#7A6E65]">
                Sudah punya akun?{" "}
                <Link href="/auth/login/cattery" className="text-[#EE6B28] font-bold hover:underline">Masuk</Link>
              </p>
              <div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-xs text-[#7A6E65] hover:text-[#EE6B28] font-medium transition cursor-pointer"
                >
                  Ganti tipe akun
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mode="register" />
    </main>
  );
}