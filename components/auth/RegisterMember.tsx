"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterMember() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "Bandung",
    wilayah: "Jawa Barat",
    password: "",
    agree: false,
  });

  const [paymentMethod, setPaymentMethod] = useState<"qris" | "va">("qris");
  const [selectedBank, setSelectedBank] = useState("");
  const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false);

  const bankOptions = [
    "BCA",
    "Mandiri",
    "BNI",
    "BRI",
    "BTN",
    "BSI",
    "CIMB Niaga",
    "Danamon",
    "PermataBank",
    "OCBC",
    "UOB Indonesia",
    "Maybank Indonesia",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push("/anggota");
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#FAFAFA] flex flex-col justify-between relative overflow-x-hidden font-sans">
      
      {/* HEADER BAR MOBILE - TOMBOL KEMBALI KHUSUS MOBILE */}
      <div className="md:hidden w-full flex items-center justify-between p-4 pt-5 z-30">
        <Link
          href="/mobile/register-info?tab=member"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F7F4F1] active:bg-[#E9E2DC] text-[#7A6E65] text-xs font-bold transition-all shadow-2xs"
        >
          <span>←</span>
          <span>Kembali</span>
        </Link>
      </div>

      {/* HEADER BAR DESKTOP - TOMBOL CLOSE (Ke /) */}
      <div className="hidden md:flex w-full justify-end p-6 md:px-12">
        <Link
          href="/"
          className="w-10 h-10 rounded-full bg-white hover:bg-[#F0EBE6] border border-[#E9E2DC] flex items-center justify-center text-[#7A6E65] hover:text-[#231A14] transition-all shadow-sm font-bold"
        >
          ✕
        </Link>
      </div>

      {/* Main Stepper Container */}
      <div className="w-full max-w-4xl mx-auto px-4 pb-12 sm:pb-16 flex-1 flex flex-col items-center">
        
        {/* Stepper Header Indicator */}
        <div className="w-full max-w-md mb-8 sm:mb-10 flex items-center justify-between relative px-2">
          {/* Step 1 */}
          <div
            className={`flex items-center justify-center w-9 h-9 rounded-full shrink-0 font-bold text-xs transition-all duration-300 ${
              step >= 1
                ? "bg-gradient-to-b from-[#FFA766] to-[#EE6B28] text-white shadow-[0_2px_4px_rgba(214,84,20,0.35)]"
                : "bg-white border-2 border-[#E9E2DC] text-[#A39991]"
            }`}
          >
            {step > 1 ? (
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              "1"
            )}
          </div>

          {/* Garis 1-2 */}
          <div className="flex-1 h-[3px] mx-1 bg-[#E9E2DC] relative overflow-hidden rounded-full">
      <div className="w-full max-w-4xl mx-auto px-4 pb-16 flex-1 flex flex-col items-center">
        {/* Stepper Header Indicator */}
        <div className="w-full max-w-2xl mb-10 flex items-start justify-between relative px-2">
          {/* Step 1 */}
          <div className="flex flex-col items-center shrink-0">
            <div
              className={`flex items-center justify-center w-9 h-9 rounded-full font-bold text-xs transition-all duration-300 ${
                step >= 1
                  ? "bg-gradient-to-b from-[#FFA766] to-[#EE6B28] text-white shadow-[0_2px_4px_rgba(214,84,20,0.35)]"
                  : "bg-white border-2 border-[#E9E2DC] text-[#A39991]"
              }`}
            >
              {step > 1 ? (
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                "1"
              )}
            </div>

            <span
              className={`mt-2 text-[10px] font-bold whitespace-nowrap ${
                step >= 1 ? "text-[#EE6B28]" : "text-[#A39991]"
              }`}
            >
              Data diri
            </span>
          </div>

          {/* Garis 1-2 */}
          <div className="flex-1 h-[3px] mx-2 mt-[18px] bg-[#E9E2DC] relative overflow-hidden rounded-full">
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#EE6B28] to-[#FFC299] transition-all duration-300"
              style={{ width: step >= 2 ? "100%" : "0%" }}
            />
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center shrink-0">
            <div
              className={`flex items-center justify-center w-9 h-9 rounded-full font-bold text-xs transition-all duration-300 ${
                step >= 2
                  ? "bg-gradient-to-b from-[#FFA766] to-[#EE6B28] text-white shadow-[0_2px_4px_rgba(214,84,20,0.35)]"
                  : "bg-white border-2 border-[#E9E2DC] text-[#A39991]"
              }`}
            >
              {step > 2 ? (
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                "2"
              )}
            </div>

            <span
              className={`mt-2 text-[10px] font-bold whitespace-nowrap ${
                step >= 2 ? "text-[#EE6B28]" : "text-[#A39991]"
              }`}
            >
              Pembayaran
            </span>
          </div>

          {/* Garis 2-3 */}
          <div className="flex-1 h-[3px] mx-2 mt-[18px] bg-[#E9E2DC] relative overflow-hidden rounded-full">
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#EE6B28] to-[#FFC299] transition-all duration-300"
              style={{ width: step >= 3 ? "100%" : "0%" }}
            />
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center shrink-0">
            <div
              className={`flex items-center justify-center w-9 h-9 rounded-full font-bold text-xs transition-all duration-300 ${
                step >= 3
                  ? "bg-gradient-to-b from-[#FFA766] to-[#EE6B28] text-white shadow-[0_2px_4px_rgba(214,84,20,0.35)]"
                  : "bg-white border-2 border-[#E9E2DC] text-[#A39991]"
              }`}
            >
              3
            </div>

            <span
              className={`mt-2 text-[10px] font-bold whitespace-nowrap ${
                step >= 3 ? "text-[#EE6B28]" : "text-[#A39991]"
              }`}
            >
              Selesai
            </span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="w-full bg-white rounded-3xl shadow-sm border border-[#E9E2DC] p-5 sm:p-8 md:p-10 transition-all">
          {/* STEP 1: DATA DIRI */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#231A14]">Data diri</h2>
                <p className="text-xs text-[#7A6E65] mt-1">Data ini dipakai untuk kartu keanggotaan dan pendaftaran event.</p>
                <h2 className="text-2xl font-black tracking-tight text-[#231A14]">
                  Data diri
                </h2>

                <p className="text-xs text-[#7A6E65] mt-1">
                  Data ini dipakai untuk kartu keanggotaan dan pendaftaran
                  event.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4A3D34]">
                    Nama lengkap
                  </label>

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
                    <label className="text-xs font-semibold text-[#4A3D34]">
                      Email
                    </label>

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
                    <label className="text-xs font-semibold text-[#4A3D34]">
                      Nomor WhatsApp
                    </label>

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
                    <label className="text-xs font-semibold text-[#4A3D34]">
                      Kota
                    </label>

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
                    <label className="text-xs font-semibold text-[#4A3D34]">
                      Wilayah ICA
                    </label>

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
                  <label className="text-xs font-semibold text-[#4A3D34]">
                    Kata sandi
                  </label>

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
                  <label className="text-xs font-semibold text-[#4A3D34]">
                    Foto profil
                  </label>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFF0E6] flex items-center justify-center text-[#EE6B28] shrink-0">
                      👤
                    </div>

                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl border border-[#E9E2DC] text-xs font-semibold text-[#231A14] hover:bg-[#F7F4F1] transition"
                    >
                      Unggah foto
                    </button>

                    <span className="text-[11px] text-[#7A6E65]">
                      Opsional — tanpa foto, sistem memakai inisial.
                    </span>
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

                  <label
                    htmlFor="agree"
                    className="text-xs text-[#7A6E65]"
                  >
                    Saya menyetujui ketentuan keanggotaan dan kebijakan privasi
                    ICA.
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#F0EBE6]">
                <Link
                  href="/auth/login/member"
                  className="text-xs text-[#EE6B28] font-bold hover:underline"
                >
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
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#231A14]">Pembayaran</h2>
                  <p className="text-xs text-[#7A6E65] mt-1">Pilih metode pembayaran untuk iuran keanggotaan tahun pertama.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#EBF3FF] border border-[#D0E2FF] flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    i
                  </div>

                  <p className="text-xs text-[#1E3A8A] leading-relaxed">
                    Payment gateway belum final — tampilan metode dan alur
                    konfirmasi di bawah masih placeholder generik, menunggu
                    keputusan PO.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* QRIS */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                      paymentMethod === "qris"
                        ? "border-[#EE6B28] bg-[#FFF8F5]"
                        : "border-[#E9E2DC] hover:border-gray-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "qris"}
                      onChange={() => setPaymentMethod("qris")}
                      className="mt-1 text-[#EE6B28] focus:ring-[#EE6B28]"
                    />

                    <div className="flex-1">
                      <span className="text-xs font-bold text-[#231A14] block">
                        QRIS
                      </span>

                      <span className="text-[11px] text-[#7A6E65]">
                        Bayar menggunakan aplikasi yang mendukung QRIS.
                      </span>

                      {paymentMethod === "qris" && (
                        <div className="mt-4 rounded-xl border border-[#E9E2DC] bg-white p-4">
                          <div className="flex flex-col items-center text-center">
                            <div className="w-44 h-44 rounded-xl border border-[#E4D8D0] bg-white p-3 flex items-center justify-center">
                              <div className="w-full h-full grid grid-cols-9 grid-rows-9 gap-1">
                                {Array.from({ length: 81 }).map(
                                  (_, index) => (
                                    <div
                                      key={index}
                                      className={`rounded-[1px] ${
                                        (
                                          index * 17 +
                                          index * index +
                                          7
                                        ) %
                                          5 <
                                        2
                                          ? "bg-[#1F1B18]"
                                          : "bg-white"
                                      }`}
                                    />
                                  )
                                )}
                              </div>
                            </div>

                            <p className="mt-3 text-xs font-bold text-[#231A14]">
                              Scan QRIS
                            </p>

                            <p className="mt-1 text-[10px] text-[#8C8074]">
                              Total pembayaran
                            </p>

                            <p className="mt-1 text-sm font-extrabold text-[#EE6B28]">
                              Rp 255.000
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Virtual Account */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                      paymentMethod === "va"
                        ? "border-[#EE6B28] bg-[#FFF8F5]"
                        : "border-[#E9E2DC] hover:border-gray-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "va"}
                      onChange={() => setPaymentMethod("va")}
                      className="mt-1 text-[#EE6B28] focus:ring-[#EE6B28]"
                    />

                    <div className="flex-1">
                      <span className="text-xs font-bold text-[#231A14] block">
                        Virtual Account
                      </span>

                      <span className="text-[11px] text-[#7A6E65]">
                        Pembayaran otomatis terverifikasi.
                      </span>

                      {paymentMethod === "va" && (
                        <div className="mt-4 space-y-3">
                          <div className="relative">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                setIsBankDropdownOpen(
                                  (prev) => !prev
                                );
                              }}
                              className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border bg-white text-left transition-all ${
                                isBankDropdownOpen
                                  ? "border-[#EE6B28] ring-1 ring-[#F9D7C0]"
                                  : "border-[#E9E2DC] hover:border-[#F2C7AB]"
                              }`}
                            >
                              <div>
                                <p className="text-[10px] text-[#8C8074]">
                                  Pilih Bank
                                </p>

                                <p className="mt-0.5 text-xs font-bold text-[#231A14]">
                                  {selectedBank || "Pilih bank"}
                                </p>
                              </div>

                              <svg
                                className={`w-4 h-4 text-[#8C8074] transition-transform ${
                                  isBankDropdownOpen
                                    ? "rotate-180"
                                    : ""
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>

                            {isBankDropdownOpen && (
                              <div className="absolute left-0 right-0 z-30 mt-2 rounded-xl border border-[#EEDFD5] bg-white shadow-lg overflow-hidden">
                                <div className="max-h-64 overflow-y-auto p-1.5">
                                  {bankOptions.map((bank) => {
                                    const active =
                                      selectedBank === bank;

                                    return (
                                      <button
                                        key={bank}
                                        type="button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setSelectedBank(bank);
                                          setIsBankDropdownOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs font-semibold transition-all ${
                                          active
                                            ? "bg-[#FFF7F0] text-[#D96B27]"
                                            : "text-[#574D45] hover:bg-[#FAF7F5]"
                                        }`}
                                      >
                                        <span>{bank}</span>

                                        {active && (
                                          <svg
                                            className="w-4 h-4 text-[#EE6B28]"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2.5}
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M5 12l4 4L19 6"
                                            />
                                          </svg>
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>

                          {selectedBank && (
                            <div className="p-4 rounded-xl bg-white border border-[#EEDFD5]">
                              <p className="text-[10px] text-[#8C8074]">
                                Nomor Virtual Account
                              </p>

                              <p className="mt-1 text-lg font-extrabold tracking-wider text-[#231A14]">
                                8808 2026 0148 9271
                              </p>

                              <p className="mt-1 text-[10px] text-[#8C8074]">
                                {selectedBank}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
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
                <h3 className="text-sm font-bold text-[#231A14]">
                  Ringkasan
                </h3>

                <div className="space-y-2.5 text-xs text-[#7A6E65] border-b border-[#E9E2DC] pb-4">
                  <div className="flex justify-between">
                    <span>Iuran member (1 tahun)</span>
                    <span className="font-semibold text-[#231A14] text-right">
                      Rp 250.000
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Biaya administrasi</span>
                    <span className="font-semibold text-[#231A14] text-right">
                      Rp 5.000
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-xs font-bold text-[#231A14]">
                  <span>Total</span>

                  <span className="text-sm text-[#EE6B28] text-right">
                    Rp 255.000
                  </span>
                </div>

                <p className="text-[10px] text-[#A39991] pt-2">
                  Nomor bersifat contoh untuk keperluan prototype.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: SELESAI */}
          {step === 3 && (
            <div className="text-center py-8 sm:py-12 space-y-6">
              <div className="w-16 h-16 bg-[#E6F4EA] text-[#34A853] rounded-full flex items-center justify-center text-2xl mx-auto shadow-sm">
                ✓
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h2 className="text-xl sm:text-2xl md:text-[28px] font-black tracking-tight text-[#231A14]">Pendaftaran Berhasil!</h2>
                <h2 className="text-2xl md:text-[28px] font-black tracking-tight text-[#231A14]">
                  Pendaftaran Berhasil!
                </h2>

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