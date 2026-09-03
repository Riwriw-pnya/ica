"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterMemberForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    namaLengkap: "",
    email: "",
    whatsapp: "",
    kota: "",
    wilayahIca: "Jawa Barat",
    password: "",
    agreeTerms: false,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  return (
    <main className="min-h-screen w-full bg-[#F7F7F7] text-[#231A14] py-10 px-4 flex flex-col items-center justify-center relative">
      <Link
        href="/"
        className="absolute top-6 right-6 z-30 w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-[#7A6E65] shadow-xs transition"
        title="Kembali ke Beranda"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Link>

      <div className="w-full max-w-3xl space-y-8 my-auto">
        {/* Stepper Header */}
        <div className="flex items-center justify-between max-w-md mx-auto relative px-6">
          <div className="absolute top-4 left-12 right-12 h-[2px] bg-gray-200 -z-0" />
          <div
            className="absolute top-4 left-12 h-[2px] bg-[#EE6B28] transition-all duration-300 -z-0"
            style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
          />

          {[
            { num: 1, label: "Data Diri" },
            { num: 2, label: "Pembayaran" },
            { num: 3, label: "Selesai" },
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-2 z-10 bg-[#F7F7F7] px-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  step > s.num
                    ? "bg-[#EE6B28] text-white"
                    : step === s.num
                    ? "border-2 border-[#EE6B28] text-[#EE6B28] bg-white shadow-xs"
                    : "border-2 border-gray-300 text-gray-400 bg-white"
                }`}
              >
                {s.num}
              </div>
              <span className={`text-xs font-semibold ${step >= s.num ? "text-[#231A14]" : "text-gray-400"}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Card Body */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-10 space-y-6">
          {step === 1 && (
            <>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-[#231A14]">Data diri</h1>
                <p className="text-xs md:text-sm text-gray-500">
                  Data ini dipakai untuk kartu keanggotaan dan pendaftaran event.
                </p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Nama lengkap</label>
                  <input
                    type="text"
                    placeholder="Sesuai KTP"
                    value={formData.namaLengkap}
                    onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#EE6B28]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Email</label>
                    <input
                      type="email"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#EE6B28]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Nomor WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="08xx xxxx xxxx"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#EE6B28]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Kota</label>
                    <input
                      type="text"
                      placeholder="Bandung"
                      value={formData.kota}
                      onChange={(e) => setFormData({ ...formData, kota: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#EE6B28]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Wilayah ICA</label>
                    <select
                      value={formData.wilayahIca}
                      onChange={(e) => setFormData({ ...formData, wilayahIca: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#EE6B28] bg-white"
                    >
                      <option value="Jawa Barat">Jawa Barat</option>
                      <option value="DKI Jakarta">DKI Jakarta</option>
                      <option value="Jawa Tengah">Jawa Tengah</option>
                      <option value="Jawa Timur">Jawa Timur</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Kata sandi</label>
                  <input
                    type="password"
                    placeholder="Minimal 8 karakter"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#EE6B28]"
                  />
                </div>

                <div className="space-y-2 pt-1">
                  <label className="text-xs font-semibold text-gray-700 block">Foto profil</label>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFF0E6] text-[#EE6B28] flex items-center justify-center overflow-hidden flex-shrink-0">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      )}
                    </div>
                    <label className="cursor-pointer px-4 py-2 rounded-xl border border-dashed border-[#EE6B28]/60 text-[#EE6B28] font-medium text-xs hover:bg-[#FFF0E6]/50 transition">
                      Unggah foto
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                    <span className="text-[11px] text-gray-400">Opsional — tanpa foto, sistem memakai inisial.</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-[#EE6B28] focus:ring-[#EE6B28]"
                  />
                  <label htmlFor="terms" className="text-xs text-gray-600 cursor-pointer">
                    Saya menyetujui ketentuan keanggotaan dan kebijakan privasi ICA.
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-gray-100">
                  <Link
                    href="/auth/login/member"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-gray-200 text-gray-700 font-medium text-xs text-center hover:bg-gray-50"
                  >
                    Sudah punya akun
                  </Link>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF884B] to-[#EE6B28] text-white font-medium text-xs shadow-md shadow-[#EE6B28]/20 hover:opacity-95"
                  >
                    Lanjut ke pembayaran
                  </button>
                </div>
              </form>
            </>
          )}

          {step === 2 && (
            <div className="space-y-6 py-2">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-[#231A14]">Pembayaran</h1>
                <p className="text-xs md:text-sm text-gray-500">Pilih metode pembayaran untuk pendaftaran anggota ICA.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FFF6EC] border border-[#F3D1BD] text-xs text-[#7A6E65] space-y-2">
                <p className="font-semibold text-[#231A14]">Ringkasan Pendaftaran:</p>
                <p>• Biaya Registrasi Keanggotaan ICA: <span className="font-bold text-[#EE6B28]">Rp 150.000</span></p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setStep(1)} className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-700 font-medium text-xs">
                  Kembali
                </button>
                <button type="button" onClick={() => setStep(3)} className="px-6 py-2.5 rounded-full bg-[#EE6B28] text-white font-medium text-xs">
                  Konfirmasi Pembayaran
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#231A14]">Pendaftaran Berhasil!</h2>
              <p className="text-xs md:text-sm text-gray-500 max-w-sm mx-auto">
                Data diri dan status pendaftaran anggota kamu telah diproses.
              </p>
              <button type="button" onClick={() => router.push("/anggota")} className="px-6 py-2.5 rounded-full bg-[#EE6B28] text-white font-medium text-xs">
                Masuk ke Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}