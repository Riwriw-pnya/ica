"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepKucingWajib, { CatBasicInfo } from "./StepKucing";
import StepDokumen, { DocItem } from "./StepDokumen";
import StepReview from "./StepReview";
import { useToast } from "@/context/ToastContext";

interface AjukanCatteryMobileProps {
  onBack: () => void;
  onSubmitSuccess?: () => void;
}

const STEPS = ["Data Cattery", "Kucing Wajib", "Dokumen", "Review & Kirim"];

export default function AjukanCatteryMobile({
  onBack,
  onSubmitSuccess,
}: AjukanCatteryMobileProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    namaCattery: "",
    prefixPedigree: "",
    tahunBeroperasi: "2024",
    wilayahIca: "Jawa Barat",
    alamatLokasi: "",
  });

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

  const [documents, setDocuments] = useState<DocItem[]>([
    {
      id: "ktp",
      title: "KTP pemilik cattery",
      required: true,
    },
    {
      id: "sertifikat_pejantan",
      title: "Sertifikat pedigree pejantan",
      required: true,
    },
    {
      id: "sertifikat_induk",
      title: "Sertifikat pedigree induk",
      required: true,
    },
    {
      id: "foto_lokasi",
      title: "Foto lokasi cattery",
      required: true,
    },
    {
      id: "bukti_pembayaran",
      title: "Bukti pembayaran pendaftaran",
      required: false,
    },
  ]);

  const isStep1Valid =
    formData.namaCattery.trim() !== "" &&
    formData.prefixPedigree.trim() !== "";

  const handleNextStep1 = () => {
    if (!isStep1Valid) {
      setShowError(true);

      showToast(
        "Data cattery belum lengkap",
        "Harap isi Nama Cattery dan Prefix Pedigree.",
        { tone: "error" }
      );

      return;
    }

    setShowError(false);
    setCurrentStep(2);
  };

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

      showToast(
        "Data kucing belum lengkap",
        "Lengkapi nama, tanggal lahir, dan nomor sertifikat pejantan & induk.",
        { tone: "error" }
      );

      return;
    }

    setShowError(false);
    setCurrentStep(3);
  };

  const handleAddOffspring = () => {
    showToast(
      "Formulir keturunan ditambahkan",
      "Placeholder untuk versi prototype.",
      { tone: "info" }
    );
  };

  const handleUploadDoc = (
    id: string,
    fileName: string,
    fileSize: string
  ) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              fileName,
              fileSize,
            }
          : doc
      )
    );
  };

  const handleRemoveDoc = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              fileName: undefined,
              fileSize: undefined,
            }
          : doc
      )
    );
  };

  const handleNextStep3 = () => {
    const missingDocs = documents.filter(
      (doc) => doc.required && !doc.fileName
    );

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

      console.log("Payload siap dikirim ke Back-End:", payload);

      showToast(
        "Pengajuan berhasil!",
        "Pengajuan cattery Anda telah terkirim dan sedang ditinjau.",
        { tone: "success" }
      );

      if (onSubmitSuccess) {
        onSubmitSuccess();
      } else {
        router.push("/anggota/keanggotaan/pengajuan-terkirim");
      }
    } catch (error) {
      showToast(
        "Gagal mengirim pengajuan",
        "Terjadi kesalahan pada server. Coba lagi nanti.",
        { tone: "error" }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setShowError(false);
      setCurrentStep((prev) => prev - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[#F7F5F0] font-sans">
      {/* Header */}
      <div
        className="shrink-0 border-b border-[#EAE5DF]/60 bg-[#F7F5F0] px-4 pb-3 shadow-2xs"
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 16px)",
        }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrevious}
            className="-ml-1 rounded-full p-1.5 text-[#D96B27] transition-colors hover:bg-[#EAE5DF]/50 active:scale-95"
            aria-label="Kembali"
          >
            <svg
              className="h-5 w-5 stroke-[2.5]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div>
            <h1 className="text-base font-bold leading-tight text-[#1F1B18]">
              Pengajuan status cattery
            </h1>

            <p className="text-[11px] text-[#857B72]">
              Direview admin ICA wilayah Jawa Barat
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="space-y-4 p-4 pb-32">
          {/* Vertical Stepper */}
          <div className="overflow-hidden rounded-2xl border border-[#EAE5DF] bg-white shadow-sm">
            <div className="border-b border-[#EAE5DF] px-4 pb-2.5 pt-3">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xs font-bold text-[#1F1B18]">
                  {STEPS[currentStep - 1]}
                </h2>

                <span className="shrink-0 text-[10px] font-medium text-[#8F847B]">
                  Step {currentStep} dari {STEPS.length}
                </span>
              </div>

              <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#E9E2DC]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#FFB47D] via-[#EE6B28] to-[#D96B27] transition-all duration-300"
                  style={{
                    width: `${(currentStep / STEPS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="px-4 py-2.5">
              <div className="relative">
                <div
                  className="absolute left-[10px] top-2.5 w-px bg-[#E7E0DA]"
                  style={{
                    height: `${(STEPS.length - 1) * 31}px`,
                  }}
                />

                <div className="space-y-0">
                  {STEPS.map((step, index) => {
                    const stepNumber = index + 1;
                    const isCurrent = stepNumber === currentStep;
                    const isCompleted = stepNumber < currentStep;

                    return (
                      <div
                        key={step}
                        className="relative flex h-[31px] items-center gap-3"
                      >
                        <div
                          className={`relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                            isCompleted || isCurrent
                              ? "border-[#EE6B28] bg-[#EE6B28] text-white shadow-[2px_2px_5px_rgba(194,91,35,0.2),-1px_-1px_3px_rgba(255,255,255,0.9)]"
                              : "border-[#E2DCD6] bg-[#FAF8F6] text-[#8E847B] shadow-[2px_2px_4px_rgba(150,135,125,0.12),-1px_-1px_3px_rgba(255,255,255,0.95)]"
                          }`}
                        >
                          <div
                            className={`absolute inset-[2.5px] rounded-full ${
                              isCompleted || isCurrent
                                ? "bg-gradient-to-br from-[#FFB47D] via-[#EE6B28] to-[#D45F20]"
                                : "bg-gradient-to-br from-white via-[#F7F3F0] to-[#EAE3DE]"
                            }`}
                          />

                          <span className="relative z-10 text-[8px] font-extrabold">
                            {isCompleted ? "✓" : stepNumber}
                          </span>
                        </div>

                        <span
                          className={`text-[11px] transition-colors ${
                            isCurrent
                              ? "font-bold text-[#1F1B18]"
                              : isCompleted
                                ? "font-semibold text-[#5E5149]"
                                : "font-medium text-[#8E847B]"
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="rounded-2xl border border-[#EFE9E2] bg-white p-4 shadow-sm">
              <div>
                <h2 className="text-sm font-bold text-[#1A1817]">
                  Data cattery
                </h2>

                <p className="mt-1 text-[11px] leading-relaxed text-[#8C857B]">
                  Nama dan prefix cattery akan tercetak pada sertifikat
                  pedigree keturunan Anda.
                </p>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#38332E]">
                    Nama cattery
                  </label>

                  <input
                    type="text"
                    placeholder="Contoh: Auroria Cattery"
                    value={formData.namaCattery}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        namaCattery: e.target.value,
                      })
                    }
                    className={`mt-1.5 w-full rounded-xl border bg-[#FCFBF9] px-3.5 py-2.5 text-[11px] text-[#1A1817] placeholder-[#A69E94] transition focus:bg-white focus:outline-hidden focus:ring-1 ${
                      showError && !formData.namaCattery.trim()
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                        : "border-[#EEE8E2] focus:border-[#EE6B28] focus:ring-[#EE6B28]"
                    }`}
                  />

                  <p className="mt-1.5 text-[10px] leading-relaxed text-[#8C857B]">
                    Ketersediaan nama diperiksa admin saat review.
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#38332E]">
                    Prefix pedigree
                  </label>

                  <input
                    type="text"
                    placeholder="Maks. 12 karakter"
                    value={formData.prefixPedigree}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        prefixPedigree: e.target.value,
                      })
                    }
                    className={`mt-1.5 w-full rounded-xl border bg-[#FCFBF9] px-3.5 py-2.5 text-[11px] text-[#1A1817] placeholder-[#A69E94] transition focus:bg-white focus:outline-hidden focus:ring-1 ${
                      showError && !formData.prefixPedigree.trim()
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                        : "border-[#EEE8E2] focus:border-[#EE6B28] focus:ring-[#EE6B28]"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#38332E]">
                    Tahun mulai beroperasi
                  </label>

                  <input
                    type="text"
                    value={formData.tahunBeroperasi}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tahunBeroperasi: e.target.value,
                      })
                    }
                    className="mt-1.5 w-full rounded-xl border border-[#EEE8E2] bg-[#FCFBF9] px-3.5 py-2.5 text-[11px] text-[#1A1817] transition focus:border-[#EE6B28] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#EE6B28]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#38332E]">
                    Wilayah ICA
                  </label>

                  <div className="relative mt-1.5">
                    <select
                      value={formData.wilayahIca}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          wilayahIca: e.target.value,
                        })
                      }
                      className="w-full appearance-none rounded-xl border border-[#EEE8E2] bg-[#FCFBF9] px-3.5 py-2.5 text-[11px] text-[#1A1817] transition focus:border-[#EE6B28] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#EE6B28]"
                    >
                      <option value="Jawa Barat">Jawa Barat</option>
                      <option value="DKI Jakarta">DKI Jakarta</option>
                      <option value="Jawa Tengah">Jawa Tengah</option>
                      <option value="Jawa Timur">Jawa Timur</option>
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#1A1817]">
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#38332E]">
                    Alamat lokasi cattery
                  </label>

                  <textarea
                    rows={3}
                    placeholder="Jalan, kelurahan, kecamatan, kota, kode pos"
                    value={formData.alamatLokasi}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        alamatLokasi: e.target.value,
                      })
                    }
                    className="mt-1.5 w-full rounded-xl border border-[#EEE8E2] bg-[#FCFBF9] px-3.5 py-2.5 text-[11px] text-[#1A1817] placeholder-[#A69E94] transition focus:border-[#EE6B28] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#EE6B28]"
                  />
                </div>

                <div className="flex items-start gap-2.5 rounded-xl bg-[#F7F5F0] p-3 text-[10px] leading-relaxed text-[#5E5852]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mt-0.5 shrink-0 text-[#8C857B]"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>

                  <span>
                    Nama pemilik, email, dan nomor WhatsApp diambil dari
                    profil member Ayu Prameswari (ICA-M-004821).
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <StepKucingWajib
              maleCat={maleCat}
              onMaleCatChange={(patch) =>
                setMaleCat((prev) => ({
                  ...prev,
                  ...patch,
                }))
              }
              femaleCat={femaleCat}
              onFemaleCatChange={(patch) =>
                setFemaleCat((prev) => ({
                  ...prev,
                  ...patch,
                }))
              }
              onAddOffspring={handleAddOffspring}
              showError={showError}
            />
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <StepDokumen
              documents={documents}
              onUpload={handleUploadDoc}
              onRemove={handleRemoveDoc}
              showError={showError}
            />
          )}

          {/* STEP 4 */}
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
      </div>

      {currentStep < 4 && (
  <div
    className="shrink-0 border-t border-[#EAE5DF] bg-[#F7F5F0]/95 px-4 pt-3 backdrop-blur-md"
    style={{
      paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
    }}
  >
    <div className="flex gap-2">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={isSubmitting}
        className="flex-1 rounded-full border border-[#E5DED6] bg-white py-3.5 text-xs font-semibold text-[#38332E] transition hover:bg-[#FCFBF9] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {currentStep === 1 ? "Batal" : "Kembali"}
      </button>

      {currentStep === 1 && (
        <button
          type="button"
          onClick={handleNextStep1}
          className="flex-1 rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] py-3.5 text-xs font-bold text-white shadow-[0_4px_14px_rgba(238,107,40,0.3)] transition hover:brightness-95 active:scale-[0.98]"
        >
          Lanjut
        </button>
      )}

      {currentStep === 2 && (
        <button
          type="button"
          onClick={handleNextStep2}
          className="flex-1 rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] py-3.5 text-xs font-bold text-white shadow-[0_4px_14px_rgba(238,107,40,0.3)] transition hover:brightness-95 active:scale-[0.98]"
        >
          Lanjut
        </button>
      )}

      {currentStep === 3 && (
        <button
          type="button"
          onClick={handleNextStep3}
          className="flex-1 rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] py-3.5 text-xs font-bold text-white shadow-[0_4px_14px_rgba(238,107,40,0.3)] transition hover:brightness-95 active:scale-[0.98]"
        >
          Lanjut
        </button>
      )}
    </div>
  </div>
)}
    </div>
  );
}