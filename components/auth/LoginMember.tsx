"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginMember() {
  const router = useRouter();

  // Mode Tampilan: "login" atau "logs"
  const [viewState, setViewState] = useState<"login" | "logs">("login");

  // State Input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // State Validasi Error Per Field
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

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

  // Data Simulasi Log Aktivitas
  const [activities] = useState([
    {
      title: "Member berhasil login",
      status: "Berhasil",
      statusType: "success",
      detail: "member@ica.id · Chrome · Windows 11 · Bandung",
      time: "09:14",
      date: "01 Sep 2026",
    },
    {
      title: "Percobaan login gagal",
      status: "Gagal",
      statusType: "error",
      detail: "member@ica.id · Kata sandi salah · Percobaan ke-2",
      time: "09:12",
      date: "01 Sep 2026",
    },
    {
      title: "Pembaruan Profil Anggota",
      status: "Terverifikasi",
      statusType: "success",
      detail: "Data alamat & sertifikat kucing berhasil diperbarui",
      time: "16:05",
      date: "31 Agu 2026",
    },
  ]);

  // Handler Tombol Demo Cepat
  const handleFillDemo = () => {
    setEmail("member@ica.id");
    setPassword("password123");
    setEmailError(null);
    setPasswordError(null);
  };

  // Handler Submit Form Login (Demo & Validasi)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    setToast(null);

    let hasError = false;

    // Validasi Email
    if (!email.trim()) {
      setEmailError("Email wajib diisi.");
      hasError = true;
    } else if (!email.includes("@")) {
      setEmailError("Format email tidak valid.");
      hasError = true;
    }

    // Validasi Password
    if (!password) {
      setPasswordError("Kata sandi wajib diisi.");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Kata sandi minimal 6 karakter.");
      hasError = true;
    }

    if (hasError) {
      setToast({
        title: "Gagal Masuk",
        message: "Silakan periksa kembali data email dan kata sandi Anda.",
      });
      return;
    }

    setIsLoading(true);

    // Toast Berhasil & Redirect Demo
    setToast({
      title: "Login Berhasil!",
      message: "Mengalihkan Anda ke Dashboard Member...",
    });

    setTimeout(() => {
      router.push("/anggota");
    }, 1200);
  };

  return (
    <main className="h-screen w-full bg-white flex items-center justify-center relative overflow-hidden font-sans">
      {/* Toast Notification (Top Right) */}
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

      {/* Tombol Tutup / Kembali ke Home */}
      <Link
        href="/"
        className="absolute top-6 right-6 z-30 w-10 h-10 rounded-full bg-[#F7F4F1] hover:bg-[#E9E2DC] flex items-center justify-center text-[#7A6E65] hover:text-[#231A14] transition-all cursor-pointer shadow-sm font-bold"
      >
        ✕
      </Link>

      <div className="w-full h-full flex flex-col md:flex-row relative overflow-hidden">
        {/* Panel Kiri (Banner Background) */}
        <div
          className="w-full md:w-5/12 relative p-8 md:p-12 lg:p-16 flex flex-col justify-between h-full overflow-y-auto bg-cover bg-center text-white"
          style={{ backgroundImage: "url('/images/cattt.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/70 z-0" />
          <div className="z-10 relative space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/LOGO-ICA.webp"
                alt="ICA Logo"
                width={45}
                height={45}
                className="object-contain"
              />
              <div>
                <h3 className="text-[11px] font-bold tracking-wider uppercase">
                  Indonesian Cat Association
                </h3>
                <p className="text-[11px] text-gray-300 font-medium">Member Portal</p>
              </div>
            </Link>
            <div className="space-y-3 max-w-md">
              <h1 className="text-2xl md:text-3xl font-black leading-snug">
                Keanggotaan Anda, selalu dalam genggaman.
              </h1>
              <p className="text-xs md:text-sm text-gray-200 leading-relaxed">
                Pantau masa berlaku keanggotaan, pendaftaran event pedigree, dan kelola profil pecinta kucing resmi ICA dalam satu akses.
              </p>
            </div>
          </div>
          <div className="pt-8 text-[11px] text-gray-300 z-10 relative">
            © {new Date().getFullYear()} Indonesian Cat Association
          </div>
        </div>

        {/* Panel Kanan (Form & Log Aktivitas) */}
        <div className="w-full md:w-7/12 p-8 md:p-16 lg:p-20 flex flex-col justify-between bg-white h-full overflow-hidden">
          <div className="max-w-[420px] w-full mx-auto my-auto space-y-6">
            {viewState === "login" ? (
              /* --- VIEW 1: FORM LOGIN --- */
              <>
                <div className="space-y-1">
                  <h2 className="text-2xl md:text-[28px] font-bold tracking-tight text-[#231A14]">
                    Masuk ke Member Portal
                  </h2>
                  <p className="text-xs text-[#7A6E65]">
                    Gunakan email dan kata sandi akun anggota Anda.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Field Email dengan Ring Fill */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#4A3D34]">
                      Email Anggota
                    </label>
                    <input
                      type="email"
                      value={email}
                      disabled={isLoading}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError(null);
                      }}
                      placeholder="nama@email.com"
                      className={`w-full px-4 py-3 text-xs rounded-xl border bg-white text-[#231A14] outline-none transition-all disabled:bg-gray-50 ${
                        emailError
                          ? "border-[#EA4335] ring-4 ring-[#EA4335]/20 focus:ring-4 focus:ring-[#EA4335]/20"
                          : "border-[#E9E2DC] focus:border-[#EE6B28] focus:ring-4 focus:ring-[#EE6B28]/20"
                      }`}
                    />
                    {emailError && (
                      <div className="flex items-center gap-1.5 text-[11px] text-[#EA4335] font-medium pt-0.5">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#EA4335] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                          !
                        </span>
                        <span>{emailError}</span>
                      </div>
                    )}
                  </div>

                  {/* Field Password dengan Ring Fill */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-[#4A3D34]">
                        Kata Sandi
                      </label>
                      <a
                        href="#"
                        className="text-xs text-[#EE6B28] hover:underline font-medium"
                      >
                        Lupa password?
                      </a>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        disabled={isLoading}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (passwordError) setPasswordError(null);
                        }}
                        placeholder="••••••••"
                        className={`w-full px-4 py-3 text-xs rounded-xl border bg-white text-[#231A14] pr-16 outline-none transition-all disabled:bg-gray-50 ${
                          passwordError
                            ? "border-[#EA4335] ring-4 ring-[#EA4335]/20 focus:ring-4 focus:ring-[#EA4335]/20"
                            : "border-[#E9E2DC] focus:border-[#EE6B28] focus:ring-4 focus:ring-[#EE6B28]/20"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#7A6E65] hover:text-[#231A14] transition-colors cursor-pointer"
                      >
                        {showPassword ? "Sembunyikan" : "Lihat"}
                      </button>
                    </div>
                    {passwordError && (
                      <div className="flex items-center gap-1.5 text-[11px] text-[#EA4335] font-medium pt-0.5">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#EA4335] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                          !
                        </span>
                        <span>{passwordError}</span>
                      </div>
                    )}
                  </div>

                  {/* Tombol Submit Login */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white font-bold text-xs md:text-sm hover:-translate-y-0.5 transition-transform duration-150 cursor-pointer shadow-sm mt-2 disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Memeriksa...</span>
                      </>
                    ) : (
                      "Masuk"
                    )}
                  </button>
                </form>

                <div className="text-center pt-2 space-y-2">
                  <p className="text-xs text-[#7A6E65]">
                    Belum punya akun anggota?{" "}
                    <Link
                      href="/auth/register/member"
                      className="text-[#EE6B28] font-bold hover:underline"
                    >
                      Daftar di sini
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              /* --- VIEW 2: LOG AKTIVITAS --- */
              <div className="space-y-4">
                <div>
                  <button
                    type="button"
                    onClick={() => setViewState("login")}
                    className="text-xs text-[#EE6B28] font-semibold hover:underline flex items-center gap-1 mb-2 cursor-pointer"
                  >
                    ‹ Kembali ke halaman masuk
                  </button>
                  <h2 className="text-2xl font-bold text-[#231A14]">Log Aktivitas</h2>
                  <p className="text-xs text-[#7A6E65] mt-1">
                    Catatan keamanan dan riwayat akses akun anggota Anda.
                  </p>
                </div>

                <div className="border border-[#E2DDD7] rounded-2xl p-4 bg-white max-h-[350px] overflow-y-auto space-y-4 pr-3 scrollbar-thin scrollbar-thumb-[#D0C8C0]">
                  {activities.map((act, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start justify-between gap-3 text-xs ${
                        idx !== activities.length - 1 ? "border-b border-[#F2ECE6] pb-3" : ""
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                            act.statusType === "success"
                              ? "bg-[#34A853]"
                              : act.statusType === "error"
                              ? "bg-[#EA4335]"
                              : "bg-[#FBBC05]"
                          }`}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#231A14]">{act.title}</span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                                act.statusType === "success"
                                  ? "bg-[#E6F4EA] text-[#137333]"
                                  : act.statusType === "error"
                                  ? "bg-[#FCE8E6] text-[#C5221F]"
                                  : "bg-[#FEF7E0] text-[#B06000]"
                              }`}
                            >
                              {act.status}
                            </span>
                          </div>
                          {act.detail && (
                            <p className="text-[11px] text-[#7A6E65] mt-1 leading-snug">
                              {act.detail}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#A39991] text-right shrink-0">
                        <div>{act.time}</div>
                        <div>{act.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Switcher & Demo Info (Hanya muncul saat di halaman login) */}
          <div className="w-full text-center space-y-1.5 pt-6 border-t border-[#F5F0EB]">
            {viewState === "login" && (
              <div className="flex items-center justify-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setViewState("logs")}
                  className="text-xs font-semibold text-[#EE6B28] hover:underline cursor-pointer"
                >
                  Log Aktivitas
                </button>
              </div>
            )}
            <p className="text-[11px] text-[#A39991]">
              Demo: member@ica.id / password123{" "}
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
    </main>
  );
}