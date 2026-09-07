"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterMember() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form & Payment States
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "Bandung",
    wilayah: "Jawa Barat",
    password: "",
    agree: false,
  });

  const [paymentMethod, setPaymentMethod] = useState("transfer");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else router.push("/anggota");
  };

  return (
    <main className="min-h-screen w-full bg-[#FAFAFA] flex flex-col justify-between relative overflow-x-hidden font-sans">
      {/* Top Bar / Close Button */}
      <div className="w-full flex justify-end p-6 md:px-12">
        <Link
          href="/"
          className="w-10 h-10 rounded-full bg-white hover:bg-[#F0EBE6] border border-[#E9E2DC] flex items-center justify-center text-[#7A6E65] hover:text-[#231A14] transition-all shadow-sm font-bold"
        >
          ✕
        </Link>
      </div>

      {/* Main Stepper Container */}
      <div className="w-full max-w-4xl mx-auto px-4 pb-16 flex-1 flex flex-col items-center">
        
        {/* Stepper Header Indicator - Segmented Layout */}
        <div className="w-full max-w-md mb-10 flex items-start justify-between relative px-2">
          {/* Step 1 */}
          <div className="flex flex-col items-center z-10 w-20">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
              step > 1 
                ? "bg-[#EE6B28] text-white shadow-sm shadow-[#EE6B28]/30" 
                : "bg-white border-2 border-[#EE6B28] text-[#EE6B28]"
            }`}>
              {step > 1 ? "✓" : "1"}
            </div>
            <span className={`text-xs mt-2 text-center ${step === 1 ? "font-bold text-[#231A14]" : "font-semibold text-[#7A6E65]"}`}>
              Data Diri
            </span>
          </div>

          {/* Garis Penghubung 1-2 */}
          <div className="flex-1 h-[3px] bg-[#E9E2DC] relative mt-4 overflow-hidden">
            <div 
              className="absolute inset-0 bg-[#EE6B28] transition-all duration-300"
              style={{ width: step >= 2 ? "100%" : "0%" }}
            />
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center z-10 w-20">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
              step > 2 
                ? "bg-[#EE6B28] text-white shadow-sm shadow-[#EE6B28]/30" 
                : step === 2
                ? "bg-white border-2 border-[#EE6B28] text-[#EE6B28]"
                : "bg-white border-2 border-[#E9E2DC] text-[#A39991]"
            }`}>
              {step > 2 ? "✓" : "2"}
            </div>
            <span className={`text-xs mt-2 text-center ${step === 2 ? "font-bold text-[#231A14]" : "font-semibold text-[#7A6E65]"}`}>
              Pembayaran
            </span>
          </div>

          {/* Garis Penghubung 2-3 */}
          <div className="flex-1 h-[3px] bg-[#E9E2DC] relative mt-4 overflow-hidden">
            <div 
              className="absolute inset-0 bg-[#EE6B28] transition-all duration-300"
              style={{ width: step >= 3 ? "100%" : "0%" }}
            />
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center z-10 w-20">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
              step === 3 
                ? "bg-white border-2 border-[#EE6B28] text-[#EE6B28]" 
                : "bg-white border-2 border-[#E9E2DC] text-[#A39991]"
            }`}>
              3
            </div>
            <span className={`text-xs mt-2 text-center ${step === 3 ? "font-bold text-[#231A14]" : "font-semibold text-[#7A6E65]"}`}>
              Selesai
            </span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="w-full bg-white rounded-3xl shadow-sm border border-[#E9E2DC] p-6 md:p-10 transition-all">
          {/* STEP 1: DATA DIRI */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-[#231A14]">Data diri</h2>
                <p className="text-xs text-[#7A6E65] mt-1">Data ini dipakai untuk kartu keanggotaan dan pendaftaran event.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4A3D34]">Nama lengkap</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Sesuai KTP"
                    className="w-full px-4 py-3 text-xs rounded-xl border border-[#E9E2DC] focus:outline-none focus:border-[#EE6B28] bg-white text-[#231A14]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#4A3D34]">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@email.com"
                      className="w-full px-4 py-3 text-xs rounded-xl border border-[#E9E2DC] focus:outline-none focus:border-[#EE6B28] bg-white text-[#231A14]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#4A3D34]">Nomor WhatsApp</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="08xx xxxx xxxx"
                      className="w-full px-4 py-3 text-xs rounded-xl border border-[#E9E2DC] focus:outline-none focus:border-[#EE6B28] bg-white text-[#231A14]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#4A3D34]">Kota</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Bandung"
                      className="w-full px-4 py-3 text-xs rounded-xl border border-[#E9E2DC] focus:outline-none focus:border-[#EE6B28] bg-white text-[#231A14]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#4A3D34]">Wilayah ICA</label>
                    <select
                      name="wilayah"
                      value={formData.wilayah}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-xs rounded-xl border border-[#E9E2DC] focus:outline-none focus:border-[#EE6B28] bg-white text-[#231A14]"
                    >
                      <option value="Jawa Barat">Jawa Barat</option>
                      <option value="DKI Jakarta">DKI Jakarta</option>
                      <option value="Jawa Timur">Jawa Timur</option>
                      <option value="Jawa Tengah">Jawa Tengah</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4A3D34]">Kata sandi</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimal 8 karakter"
                    className="w-full px-4 py-3 text-xs rounded-xl border border-[#E9E2DC] focus:outline-none focus:border-[#EE6B28] bg-white text-[#231A14]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4A3D34]">Foto profil</label>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFF0E6] flex items-center justify-center text-[#EE6B28] shrink-0">
                      👤
                    </div>
                    <button type="button" className="px-4 py-2 rounded-xl border border-[#E9E2DC] text-xs font-semibold text-[#231A14] hover:bg-[#F7F4F1] transition">
                      Unggah foto
                    </button>
                    <span className="text-[11px] text-[#7A6E65]">Opsional — tanpa foto, sistem memakai inisial.</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    name="agree"
                    id="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-[#E9E2DC] text-[#EE6B28] focus:ring-[#EE6B28]"
                  />
                  <label htmlFor="agree" className="text-xs text-[#7A6E65]">
                    Saya menyetujui ketentuan keanggotaan dan kebijakan privasi ICA.
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#F0EBE6]">
                <Link href="/auth/login/member" className="text-xs text-[#EE6B28] font-bold hover:underline">
                  Sudah punya akun
                </Link>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white font-bold text-xs md:text-sm hover:-translate-y-0.5 transition cursor-pointer shadow-sm"
                >
                  Lanjut ke pembayaran
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PEMBAYARAN */}
          {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-[#231A14]">Pembayaran</h2>
                  <p className="text-xs text-[#7A6E65] mt-1">Pilih metode pembayaran untuk iuran keanggotaan tahun pertama.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#EBF3FF] border border-[#D0E2FF] flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">i</div>
                  <p className="text-xs text-[#1E3A8A] leading-relaxed">
                    Payment gateway belum final — tampilan metode dan alur konfirmasi di bawah masih placeholder generik, menunggu keputusan PO.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Option 1: Transfer Bank */}
                  <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${paymentMethod === "transfer" ? "border-[#EE6B28] bg-[#FFF8F5]" : "border-[#E9E2DC] hover:border-gray-300 bg-white"}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "transfer"}
                      onChange={() => setPaymentMethod("transfer")}
                      className="mt-1 text-[#EE6B28] focus:ring-[#EE6B28]"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#231A14] block">Transfer Bank</span>
                      <span className="text-[11px] text-[#7A6E65]">Konfirmasi manual oleh admin ICA</span>
                    </div>
                  </label>

                  {/* Option 2: Virtual Account */}
                  <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${paymentMethod === "va" ? "border-[#EE6B28] bg-[#FFF8F5]" : "border-[#E9E2DC] hover:border-gray-300 bg-white"}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "va"}
                      onChange={() => setPaymentMethod("va")}
                      className="mt-1 text-[#EE6B28] focus:ring-[#EE6B28]"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#231A14] block">Virtual Account</span>
                      <span className="text-[11px] text-[#7A6E65]">Pembayaran otomatis terverifikasi</span>
                    </div>
                  </label>

                  {/* Option 3: E-Wallet */}
                  <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${paymentMethod === "ewallet" ? "border-[#EE6B28] bg-[#FFF8F5]" : "border-[#E9E2DC] hover:border-gray-300 bg-white"}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "ewallet"}
                      onChange={() => setPaymentMethod("ewallet")}
                      className="mt-1 text-[#EE6B28] focus:ring-[#EE6B28]"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#231A14] block">E-Wallet</span>
                      <span className="text-[11px] text-[#7A6E65]">Placeholder — penyedia belum ditentukan</span>
                    </div>
                  </label>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#F0EBE6]">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3.5 rounded-full border border-[#E9E2DC] text-xs font-bold text-[#7A6E65] hover:bg-[#F7F4F1] transition cursor-pointer"
                  >
                    Kembali
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3.5 rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white font-bold text-xs md:text-sm hover:-translate-y-0.5 transition cursor-pointer shadow-sm"
                  >
                    Bayar & selesaikan
                  </button>
                </div>
              </div>

              {/* Right Column: Ringkasan Pembayaran */}
              <div className="lg:col-span-5 bg-[#F9F7F5] p-6 rounded-2xl border border-[#E9E2DC] space-y-4 h-fit">
                <h3 className="text-sm font-bold text-[#231A14]">Ringkasan</h3>
                <div className="space-y-2.5 text-xs text-[#7A6E65] border-b border-[#E9E2DC] pb-4">
                  <div className="flex justify-between">
                    <span>Iuran member (1 tahun)</span>
                    <span className="font-semibold text-[#231A14] text-right">Rp 250.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya administrasi</span>
                    <span className="font-semibold text-[#231A14] text-right">Rp 5.000</span>
                  </div>
                </div>
                <div className="flex justify-between text-xs font-bold text-[#231A14]">
                  <span>Total</span>
                  <span className="text-sm text-[#EE6B28] text-right">Rp 255.000</span>
                </div>
                <p className="text-[10px] text-[#A39991] pt-2">Nomor bersifat contoh untuk keperluan prototype.</p>
              </div>
            </div>
          )}

          {/* STEP 3: SELESAI */}
          {step === 3 && (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 bg-[#E6F4EA] text-[#34A853] rounded-full flex items-center justify-center text-2xl mx-auto shadow-sm">
                ✓
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h2 className="text-2xl md:text-[28px] font-black tracking-tight text-[#231A14]">Pendaftaran Berhasil!</h2>
                <p className="text-xs text-[#7A6E65] leading-relaxed">
                  Data diri dan status pendaftaran anggota kamu telah diproses.
                </p>
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => router.push("/anggota")}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white font-bold text-xs md:text-sm hover:-translate-y-0.5 transition cursor-pointer shadow-sm"
                >
                  Masuk ke Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}