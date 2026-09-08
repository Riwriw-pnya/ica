"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/auth/AuthModal";

// Daftar Kode Cattery yang sudah terdaftar di database ICA (Simulasi Data)
const REGISTERED_CATTERY_CODES = [
  "ICA-8842-BDG",
  "ICA-1234-JKT",
  "ICA-5678-SUB",
  "ICA-9999-SBY",
];

export default function RegisterCattery() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    kodeCattery: "",
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // State Toast Notification & Progress Bar
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);
  const [progress, setProgress] = useState(100);

  // Timer animasi Progress Bar Toast
  useEffect(() => {
    if (!toast) return;
    setProgress(100);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          setToast(null);
          return 0;
        }
        return prev - 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [toast]);

  const handleFillDemo = () => {
    setFormData({
      email: "abg@cattery.id",
      kodeCattery: "ICA-8842-BDG",
    });
    setErrorMsg(null);
    setToast(null);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setToast(null);

    const emailTrimmed = formData.email.trim();
    const codeTrimmed = formData.kodeCattery.trim().toUpperCase();

    if (!emailTrimmed || !codeTrimmed) {
      const msg = "Email dan Kode Cattery wajib diisi.";
      setErrorMsg(msg);
      setToast({
        title: "Pendaftaran Gagal",
        message: msg,
      });
      return;
    }

    // Cek apakah Kode Cattery terdaftar di list
    const isCodeValid = REGISTERED_CATTERY_CODES.includes(codeTrimmed);

    if (!isCodeValid) {
      const errorText = "Kode Cattery tidak ditemukan atau belum terdaftar di sistem ICA.";
      setErrorMsg(errorText);
      setToast({
        title: "Kode Tidak Ditemukan",
        message: errorText,
      });
      return;
    }

    // Jika berhasil
    setStep(2);
  };

  return (
    <main className="h-screen w-full bg-white flex items-center justify-center relative overflow-hidden font-sans">
      {/* Toast Error Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-[9999] bg-white border border-[#F0E6E6] shadow-xl rounded-xl p-4 max-w-sm w-full overflow-hidden flex items-start gap-3 border-l-4 border-l-[#EA4335] transition-all animate-bounce-once">
          <div className="w-5 h-5 rounded-full bg-[#FCE8E6] text-[#EA4335] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            !
          </div>
          <div className="flex-1 pr-2">
            <h4 className="text-xs font-bold text-[#231A14]">{toast.title}</h4>
            <p className="text-[11px] text-[#7A6E65] mt-0.5 leading-tight">{toast.message}</p>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-[#A39991] hover:text-[#231A14] text-xs font-bold cursor-pointer"
          >
            ✕
          </button>

          {/* Toast Progress Bar */}
          <div
            className="absolute bottom-0 left-0 h-[3px] bg-[#EA4335] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

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
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errorMsg) setErrorMsg(null);
                      }}
                      className="w-full px-4 py-3 text-xs rounded-xl border border-[#E9E2DC] focus:outline-none focus:border-[#EE6B28] bg-white text-[#231A14]"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#4A3D34]">Kode cattery</label>
                    <input
                      type="text"
                      placeholder="Masukkan kode cattery (Contoh: ICA-8842-BDG)"
                      value={formData.kodeCattery}
                      onChange={(e) => {
                        setFormData({ ...formData, kodeCattery: e.target.value });
                        if (errorMsg) setErrorMsg(null);
                      }}
                      className={`w-full px-4 py-3 text-xs rounded-xl border bg-white text-[#231A14] focus:outline-none uppercase ${
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
                    onClick={() => router.push("/cattery")}
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

            {/* Footer Demo Helper */}
            <div className="text-center space-y-2 pt-4 border-t border-[#F7F4F1]">
              <p className="text-xs text-[#7A6E65]">
                Sudah punya akun?{" "}
                <Link href="/auth/login/cattery" className="text-[#EE6B28] font-bold hover:underline">
                  Masuk
                </Link>
              </p>
              <p className="text-[11px] text-[#A39991]">
                Demo Kode Valid: <span className="font-mono text-[#231A14]">ICA-8842-BDG</span>{" "}
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-[#EE6B28] hover:underline font-semibold ml-1 cursor-pointer"
                >
                  (Isi Otomatis)
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mode="register" />
    </main>
  );
}