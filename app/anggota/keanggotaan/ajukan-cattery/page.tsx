"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StepKucingWajib, { CatBasicInfo } from "../components/StepKucing";
import StepDokumen, { DocItem } from "../components/StepDokumen";
import StepReview from "../components/StepReview";
import { useToast } from "@/context/ToastContext";

const STEPS = ["Data Cattery", "Kucing Wajib", "Dokumen", "Review & Kirim"];

export default function AjukanCatteryPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* State Step 1: Data Cattery */
  const [formData, setFormData] = useState({
    namaCattery: "",
    prefixPedigree: "",
    tahunBeroperasi: "2024",
    wilayahIca: "Jawa Barat",
    alamatLokasi: "",
  });

  /* State Step 2: Data Kucing Wajib */
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

  /* State Step 3: Dokumen Pendukung */
  const [documents, setDocuments] = useState<DocItem[]>([
    { id: "ktp", title: "KTP pemilik cattery", required: true },
    { id: "sertifikat_pejantan", title: "Sertifikat pedigree pejantan", required: true },
    { id: "sertifikat_induk", title: "Sertifikat pedigree induk", required: true },
    { id: "foto_lokasi", title: "Foto lokasi cattery", required: true },
    { id: "bukti_pembayaran", title: "Bukti pembayaran pendaftaran", required: false },
  ]);

  /* Validasi Step 1 */
  const isStep1Valid = formData.namaCattery.trim() !== "" && formData.prefixPedigree.trim() !== "";

  const handleNextStep1 = () => {
    if (!isStep1Valid) {
      setShowError(true);
      showToast("Data cattery belum lengkap", "Harap isi Nama Cattery dan Prefix Pedigree.", { tone: "error" });
      return;
    }
    setShowError(false);
    setCurrentStep(2);
  };

  /* Validasi Step 2 */
  const isStep2Valid =
    maleCat.name.trim() !== "" &&
    maleCat.birthDate !== "" &&
    maleCat.certNumber.trim() !== "" &&
    femaleCat.name.trim() !== "" &&
    femaleCat.birthDate !== "" &&
    femaleCat.certNumber.trim() !== "";

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
    showToast("Formulir keturunan ditambahkan", "Placeholder untuk versi prototype.", { tone: "info" });
  };

  /* Handler Upload Dokumen */
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

  /* Validasi Step 3 */
  const handleNextStep3 = () => {
    const missingDocs = documents.filter((doc) => doc.required && !doc.fileName);

    if (missingDocs.length > 0) {
      setShowError(true);
      showToast("Dokumen belum lengkap", "Unggah semua berkas wajib sebelum melanjutkan ke tahap review.", { tone: "error" });
      return;
    }

    setShowError(false);
    setCurrentStep(4);
  };

  /* Handler Final Submit (Siap Back-End API Integration) */
  const handleSubmitSuccess = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        cattery: formData,
        cats: {
          male: maleCat,
          female: femaleCat,
        },
        documents: documents.map((d) => ({
          id: d.id,
          title: d.title,
          fileName: d.fileName,
        })),
      };

      // Contoh integrasi API (Uncomment saat Back-End sudah siap)
      /*
      const response = await fetch("/api/cattery/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Gagal mengirim pengajuan");
      */

      console.log("Payload siap dikirim ke Back-End:", payload);

      showToast("Pengajuan berhasil!", "Pengajuan cattery Anda telah terkirim dan sedang ditinjau.", { tone: "success" });
      
      // Redirect ke halaman keanggotaan
      router.push("/anggota/keanggotaan/pengajuan-terkirim");
    } catch (error) {
      showToast("Gagal mengirim pengajuan", "Terjadi kesalahan pada server. Coba lagi nanti.", { tone: "error" });
    } finally {
      setIsSubmitting(false);
    }
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

      {/* Header Judul */}
      <div>
        <h1 className="font-display text-2xl font-bold text-[#1a1817]">
          Pengajuan status cattery
        </h1>
        <p className="mt-1 text-[13px] text-[#5e5852]">
          Data member Anda terbawa otomatis. Pengajuan diverifikasi admin wilayah Jawa Barat.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="relative my-8 px-16">
        {/* Inner Track Container untuk mengunci posisi tepat di pusat bulatan 1 s/d 4 */}
        <div className="absolute inset-x-16 top-4 -z-0 h-[2px] -translate-y-1/2 px-4">
          {/* Base Background Line */}
          <div className="h-full w-full bg-[#e8e2da]" />

          {/* Active Gradient Line (Tergantung Step Aktif) */}
          <div
            className="absolute top-0 left-4 h-full bg-gradient-to-r from-[#ff9b53] to-[#ee6b28] transition-all duration-300"
            style={{
              width: `calc(${((currentStep - 1) / (STEPS.length - 1)) * 100}% - 32px)`,
            }}
          />
        </div>

        {/* Bulatan & Label Step */}
        <div className="relative z-10 flex justify-between">
          {STEPS.map((label, idx) => {
            const stepNum = idx + 1;
            const isActive = stepNum === currentStep;
            const isDone = stepNum < currentStep;

            return (
              <div key={label} className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    isDone
                      ? "bg-gradient-to-b from-[#FFC299] to-[#EE6B28] border-t border-[#FFE5D4] text-white shadow-xs"
                      : isActive
                        ? "bg-white text-[#ee6b28] ring-1 ring-[#FFC299] ring-offset-2 ring-offset-[#f7af8b]/30"
                        : "border border-[#d6cfc7] bg-white text-[#8c857b]"
                  }`}
                >
                  {isDone ? "✓" : stepNum}
                </div>
                <span
                  className={`text-xs font-medium ${
                    isActive || isDone ? "font-bold text-[#1a1817]" : "text-[#8c857b]"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: Data Cattery */}
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
              className="rounded-full border border-[#e5ded6] hover:shadow-[0_4px_14px_rgba(238,107,40,0.1)] hover:-translate-y-0.5 bg-white px-6 py-2.5 text-xs font-semibold text-[#38332e] hover:bg-[#fcfbf9] transition cursor-pointer"
            >
              Batal
            </Link>
            <button
              type="button"
              onClick={handleNextStep1}
              className="rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-6 py-2.5 text-xs font-bold text-white shadow-[0_4px_14px_rgba(238,107,40,0.3)] hover:brightness-95 active:scale-95 transition cursor-pointer
                          active:scale-95 border-t border-[#FFE5D4] hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-all duration-150">
              Lanjut ke data kucing
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Form Kucing */}
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
              className="rounded-full border border-[#e5ded6] hover:shadow-[0_4px_14px_rgba(238,107,40,0.1  )] hover:-translate-y-0.5 bg-white px-6 py-2.5 text-xs font-semibold text-[#38332e] hover:bg-[#fcfbf9] transition cursor-pointer"
            >
              Kembali
            </button>
            <button 
              type="button"
              onClick={handleNextStep2}
              className="rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-6 py-2.5 text-xs font-bold text-white shadow-[0_4px_14px_rgba(238,107,40,0.3)] hover:brightness-95 transition cursor-pointer
                          active:scale-95 border-t border-[#FFE5D4] hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-all duration-150">
              Lanjut ke dokumen
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Dokumen Pendukung */}
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
              className="rounded-full border border-[#e5ded6] hover:shadow-[0_4px_14px_rgba(238,107,40,0.1)] hover:-translate-y-0.5 bg-white px-6 py-2.5 text-xs font-semibold text-[#38332e] hover:bg-[#fcfbf9] transition cursor-pointer">
              Kembali
            </button>
            <button
              type="button"
              onClick={handleNextStep3}
              className="rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-6 py-2.5 text-xs font-bold text-white shadow-[0_4px_14px_rgba(238,107,40,0.3)] hover:brightness-95 active:scale-95 transition cursor-pointer
                          active:scale-95 border-t border-[#FFE5D4] hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-all duration-150">
              Lanjut ke review
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Review & Kirim */}
      {currentStep === 4 && (
        <StepReview
          catteryData={{
            ...formData,
            pemilik: "Ayu Prameswari",
            kontak: "081234567890",
          }}
          maleCat={maleCat}
          femaleCat={femaleCat}
          documents={documents}
          isSubmitting={isSubmitting}
          onNavigateToStep={(step) => setCurrentStep(step)}
          onSubmitSuccess={handleSubmitSuccess}
        />
      )}
    </div>
  );
}