"use client";

import Link from "next/link";
import { useState } from "react";
import StepKucingWajib, { CatBasicInfo } from "../components/StepKucing";
import StepDokumen, { DocItem } from "../components/StepDokumen";
import { useToast } from "@/context/ToastContext";

const STEPS = ["Data Cattery", "Kucing Wajib", "Dokumen", "Review & Kirim"];

export default function AjukanCatteryPage() {
  const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);

  /* State Step 1 */
  const [formData, setFormData] = useState({
    namaCattery: "",
    prefixPedigree: "",
    tahunBeroperasi: "2024",
    wilayahIca: "Jawa Barat",
    alamatLokasi: "",
  });

   /* State Step 2 */
  const [maleCat, setMaleCat] = useState<CatBasicInfo>({
    name: "",
    breed: "Persian",
    birthDate: "",
    certNumber: "",
  });
  const [femaleCat, setFemaleCat] = useState<CatBasicInfo>({
    name: "",
    breed: "Persian",
    birthDate: "",
    certNumber: "",
  });

  const isStep2Valid =
    maleCat.name.trim() !== "" && maleCat.birthDate !== "" && maleCat.certNumber.trim() !== "" &&
    femaleCat.name.trim() !== "" && femaleCat.birthDate !== "" && femaleCat.certNumber.trim() !== "";

  const handleNextStep2 = () => {
    if (!isStep2Valid) {
      setShowError(true);
      showToast("Data kucing belum lengkap", "Lengkapi nama, tanggal lahir, dan nomor sertifikat pejantan & induk.", { tone: "error" });
      return;
    }
    setShowError(false);
    setCurrentStep(3);
  };

  const handleAddOffspring = () => {
    showToast("Formulir keturunan ditambahkan — placeholder prototype.", "");
  };

  /* State Step 3: Dokumen Pendukung */
  const [documents, setDocuments] = useState<DocItem[]>([
    { id: "ktp", title: "KTP pemilik cattery", required: true },
    { id: "sertifikat_pejantan", title: "Sertifikat pedigree pejantan", required: true },
    { id: "sertifikat_induk", title: "Sertifikat pedigree induk", required: true },
    { id: "foto_lokasi", title: "Foto lokasi cattery", required: true },
    { id: "bukti_pembayaran", title: "Bukti pembayaran pendaftaran", required: false },
  ]);

  const [showError, setShowError] = useState(false);

  /* Handler Step 3 Upload & Remove */
  const handleUploadDoc = (id: string, fileName: string, fileSize: string) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, fileName, fileSize } : doc))
    );
  };

  const handleRemoveDoc = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, fileName: undefined, fileSize: undefined } : doc
      )
    );
  };

  /* Validation Handler Step 3 (Klik Lanjut) */
  const handleNextStep3 = () => {
    const missingDocs = documents.filter((doc) => doc.required && !doc.fileName);

    if (missingDocs.length > 0) {
      setShowError(true);
      showToast(
        "Dokumen belum lengkap",
        "Unggah semua berkas wajib sebelum melanjutkan ke tahap review.",
        { tone: "error" }
      );
      return;
    }

    setShowError(false);
    setCurrentStep(4);
  };

  const isStep1Valid = formData.namaCattery.trim() !== "" && formData.prefixPedigree.trim() !== "";

  const handleNext = () => {
    if (currentStep === 1 && !isStep1Valid) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setCurrentStep((s) => Math.min(STEPS.length, s + 1));
  };

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Link Kembali */}
      <div>
        <Link
          href="/anggota/keanggotaan"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#db874b] hover:underline"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Kembali ke keanggotaan
        </Link>
      </div>

      {/* Header Judul & Deskripsi */}
      <div>
        <h1 className="font-display text-2xl font-bold text-[#1a1817]">
          Pengajuan status cattery
        </h1>
        <p className="mt-1 text-[13px] text-[#5e5852]">
          Data member Anda terbawa otomatis. Pengajuan diverifikasi admin wilayah Jawa Barat.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="relative my-8 flex items-center justify-between px-16">
        <div className="absolute left-20 right-20 top-4 -z-0 h-[1.5px] bg-[#e8e2da]" />

        {STEPS.map((label, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum === currentStep;
          const isDone = stepNum < currentStep;

          return (
            <div key={label} className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shadow-xs ${
                  isDone
                    ? "bg-[#ee6b28] text-white"
                    : isActive
                      ? "bg-white text-[#ee6b28] ring-2 ring-[#ee6b28] ring-offset-2 ring-offset-[#f7f5f0]"
                      : "border border-[#d6cfc7] bg-white text-[#8c857b]"
                }`}
              >
                {isDone ? "✓" : stepNum}
              </div>
              <span className={`text-xs font-medium ${isActive || isDone ? "font-bold text-[#1a1817]" : "text-[#8c857b]"}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main Form Card - Step 1 */}
      {currentStep === 1 && (
        <div className="rounded-2xl border border-[#efe9e2] bg-white p-7 shadow-xs">
          <div>
            <h2 className="text-base font-bold text-[#1a1817]">Data cattery</h2>
            <p className="mt-0.5 text-xs text-[#8c857b]">
              Nama dan prefix cattery akan tercetak pada sertifikat pedigree keturunan Anda.
            </p>
          </div>

          <div className="mt-6 space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-[#38332e]">Nama cattery</label>
                <input
                  type="text"
                  placeholder="Contoh: Auroria Cattery"
                  value={formData.namaCattery}
                  onChange={(e) => setFormData({ ...formData, namaCattery: e.target.value })}
                  className={`mt-2 w-full rounded-xl border bg-[#fcfbf9] px-4 py-2.5 text-xs text-[#1a1817] placeholder-[#a69e94] transition focus:bg-white focus:outline-hidden focus:ring-1 ${
                    showError && !formData.namaCattery.trim()
                      ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                      : "border-[#eee8e2] focus:border-[#ee6b28] focus:ring-[#ee6b28]"
                  }`}
                />
                <p className="mt-1.5 text-[11px] text-[#8c857b]">
                  Ketersediaan nama diperiksa admin saat review.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#38332e]">Prefix pedigree</label>
                <input
                  type="text"
                  placeholder="Maks. 12 karakter"
                  value={formData.prefixPedigree}
                  onChange={(e) => setFormData({ ...formData, prefixPedigree: e.target.value })}
                  className={`mt-2 w-full rounded-xl border bg-[#fcfbf9] px-4 py-2.5 text-xs text-[#1a1817] placeholder-[#a69e94] transition focus:bg-white focus:outline-hidden focus:ring-1 ${
                    showError && !formData.prefixPedigree.trim()
                      ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                      : "border-[#eee8e2] focus:border-[#ee6b28] focus:ring-[#ee6b28]"
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-[#38332e]">Tahun mulai beroperasi</label>
                <input
                  type="text"
                  value={formData.tahunBeroperasi}
                  onChange={(e) => setFormData({ ...formData, tahunBeroperasi: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#eee8e2] bg-[#fcfbf9] px-4 py-2.5 text-xs text-[#1a1817] transition focus:border-[#ee6b28] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#ee6b28]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#38332e]">Wilayah ICA</label>
                <div className="relative mt-2">
                  <select
                    value={formData.wilayahIca}
                    onChange={(e) => setFormData({ ...formData, wilayahIca: e.target.value })}
                    className="w-full appearance-none rounded-xl border border-[#eee8e2] bg-[#fcfbf9] px-4 py-2.5 text-xs text-[#1a1817] transition focus:border-[#ee6b28] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#ee6b28]"
                  >
                    <option value="Jawa Barat">Jawa Barat</option>
                    <option value="DKI Jakarta">DKI Jakarta</option>
                    <option value="Jawa Tengah">Jawa Tengah</option>
                    <option value="Jawa Timur">Jawa Timur</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#1a1817]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#38332e]">Alamat lokasi cattery</label>
              <textarea
                rows={3}
                placeholder="Jalan, kelurahan, kecamatan, kota, kode pos"
                value={formData.alamatLokasi}
                onChange={(e) => setFormData({ ...formData, alamatLokasi: e.target.value })}
                className="mt-2 w-full rounded-xl border border-[#eee8e2] bg-[#fcfbf9] px-4 py-2.5 text-xs text-[#1a1817] placeholder-[#a69e94] transition focus:border-[#ee6b28] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#ee6b28]"
              />
            </div>

            <div className="flex items-center gap-2.5 rounded-xl bg-[#f7f5f0] p-3.5 text-xs text-[#5e5852]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-[#8c857b]">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>
                Nama pemilik, email, dan nomor WhatsApp diambil dari profil member Ayu Prameswari (ICA-M-004821).
              </span>
            </div>
          </div>

          <div className="mt-8 border-t border-[#f0eae1] pt-5 flex items-center justify-end gap-3">
            <Link
              href="/anggota/keanggotaan"
              className="rounded-full border border-[#e5ded6] bg-white px-6 py-2.5 text-xs font-semibold text-[#38332e] hover:bg-[#fcfbf9] transition"
            >
              Batal
            </Link>
            <button
              type="button"
              onClick={handleNext}
              className="rounded-full bg-gradient-to-r from-[#ff9b53] to-[#ee6b28] px-6 py-2.5 text-xs font-bold text-white shadow-[0_4px_14px_rgba(238,107,40,0.3)] hover:brightness-95 active:scale-95 transition cursor-pointer"
            >
              Lanjut ke data kucing
            </button>
          </div>
        </div>
      )}

       {/*Form Kucing - Step 2 */}
      {currentStep === 2 && (
        <div className="space-y-5">
          <StepKucingWajib
            maleCat={maleCat}
            onMaleCatChange={(patch) => setMaleCat((prev) => ({ ...prev, ...patch }))}
            femaleCat={femaleCat}
            onFemaleCatChange={(patch) => setFemaleCat((prev) => ({ ...prev, ...patch }))}
            onAddOffspring={handleAddOffspring}
            showError={showError}
          />

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="rounded-full border border-[#e5ded6] bg-white px-6 py-2.5 text-xs font-semibold text-[#38332e] hover:bg-[#fcfbf9] transition"
            >
              Kembali
            </button>
            <button
              type="button"
              onClick={handleNextStep2}
              className="rounded-full bg-gradient-to-r from-[#ff9b53] to-[#ee6b28] px-6 py-2.5 text-xs font-bold text-white shadow-[0_4px_14px_rgba(238,107,40,0.3)] hover:brightness-95 active:scale-95 transition cursor-pointer"
            >
              Lanjut ke dokumen
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Dokumen */}
      {currentStep === 3 && (
        <div className="space-y-5">
          <StepDokumen
            documents={documents}
            onUpload={handleUploadDoc}
            onRemove={handleRemoveDoc}
            showError={showError}
          />

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="rounded-full border border-[#e5ded6] bg-white px-6 py-2.5 text-xs font-semibold text-[#38332e] hover:bg-[#fcfbf9] transition cursor-pointer"
            >
              Kembali
            </button>
            <button
              type="button"
              onClick={handleNextStep3}
              className="rounded-full bg-gradient-to-r from-[#ff9b53] to-[#ee6b28] px-6 py-2.5 text-xs font-bold text-white shadow-[0_4px_14px_rgba(238,107,40,0.3)] hover:brightness-95 active:scale-95 transition cursor-pointer"
            >
              Lanjut ke review
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Review & Kirim */}
      {currentStep === 4 && (
        <div className="rounded-2xl border border-[#efe9e2] bg-white p-7 text-center shadow-xs">
          <h3 className="text-sm font-bold text-[#1a1817]">Review &amp; Kirim Pengajuan</h3>
          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className="mt-4 rounded-full border border-[#e5ded6] bg-white px-6 py-2.5 text-xs font-semibold text-[#38332e] hover:bg-[#fcfbf9] transition"
          >
            Kembali ke dokumen
          </button>
        </div>
      )}
    </div>
  );
}