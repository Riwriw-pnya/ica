"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PengaturanPage() {
  const router = useRouter();

  const [notifAplikasi, setNotifAplikasi] = useState(true);
  const [emailPengumuman, setEmailPengumuman] = useState(true);
  const [pesanWhatsapp, setPesanWhatsapp] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleConfirmPenghapusan = () => {
    setShowConfirmModal(false);
    alert(
      "Permintaan penghapusan akun telah diajukan ke admin ICA wilayah."
    );
  };

  return (
    <>
      <main className="w-full font-sans text-[#1F1B18]">
        <div className="w-full space-y-5">
          {/* HEADER CONTENT */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-[24px] font-semibold leading-tight text-[#1F1B18]">
                Pengaturan akun
              </h1>

              <p className="mt-1 text-sm text-[#857B72]">
                Notifikasi, keamanan, dan data akun
              </p>
            </div>
          </div>

          {/* BANNER INFORMASI */}
          <div className="flex items-start gap-3 rounded-2xl border border-[#EAE4DC] bg-[#F2EDE6] px-5 py-4">
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#8C827A] font-serif text-xs text-[#8C827A]">
              i
            </div>

            <p className="text-sm leading-relaxed text-[#59524C]">
              [PRD TBD] Modul pengaturan akun belum ditetapkan. Nama, email,
              dan nomor WhatsApp masih diubah melalui admin wilayah.
            </p>
          </div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)]">
            {/* LEFT COLUMN */}
            <div className="space-y-5">
              {/* NOTIFIKASI */}
              <section className="rounded-[22px] border border-[#EAE5DF] bg-white p-6 shadow-[0_2px_8px_rgba(54,38,28,0.03)]">
                <div className="mb-5">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8C827A]">
                    NOTIFIKASI
                  </h2>

                  <p className="mt-1 text-xs text-[#A0958B]">
                    Atur jenis informasi yang ingin diterima.
                  </p>
                </div>

                <div className="divide-y divide-[#F5F2ED]">
                  {/* NOTIFIKASI APLIKASI */}
                  <div className="flex items-center justify-between gap-6 py-4 first:pt-0">
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#111111]">
                        Notifikasi aplikasi
                      </h3>

                      <p className="mt-1 text-xs leading-relaxed text-[#8C827A]">
                        Slot kuota event, status pengajuan, masa berlaku.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setNotifAplikasi(!notifAplikasi)}
                      className={`relative h-6 w-12 shrink-0 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                        notifAplikasi ? "bg-[#FA8C42]" : "bg-[#DCD6CE]"
                      }`}
                      aria-label="Toggle notifikasi aplikasi"
                    >
                      <div
                        className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                          notifAplikasi
                            ? "translate-x-6"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* EMAIL PENGUMUMAN */}
                  <div className="flex items-center justify-between gap-6 py-4">
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#111111]">
                        Email pengumuman ICA
                      </h3>

                      <p className="mt-1 text-xs leading-relaxed text-[#8C827A]">
                        Berita resmi dan kalender event.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setEmailPengumuman(!emailPengumuman)
                      }
                      className={`relative h-6 w-12 shrink-0 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                        emailPengumuman
                          ? "bg-[#FA8C42]"
                          : "bg-[#DCD6CE]"
                      }`}
                      aria-label="Toggle email pengumuman ICA"
                    >
                      <div
                        className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                          emailPengumuman
                            ? "translate-x-6"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* WHATSAPP */}
                  <div className="flex items-center justify-between gap-6 py-4 last:pb-0">
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#111111]">
                        Pesan WhatsApp dari admin
                      </h3>

                      <p className="mt-1 text-xs leading-relaxed text-[#8C827A]">
                        Hanya untuk verifikasi dan pengajuan.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPesanWhatsapp(!pesanWhatsapp)}
                      className={`relative h-6 w-12 shrink-0 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                        pesanWhatsapp
                          ? "bg-[#FA8C42]"
                          : "bg-[#DCD6CE]"
                      }`}
                      aria-label="Toggle pesan WhatsApp"
                    >
                      <div
                        className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                          pesanWhatsapp
                            ? "translate-x-6"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </section>

              {/* KEAMANAN */}
              <section className="rounded-[22px] border border-[#EAE5DF] bg-white p-6 shadow-[0_2px_8px_rgba(54,38,28,0.03)]">
                <div className="mb-5">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8C827A]">
                    KEAMANAN
                  </h2>

                  <p className="mt-1 text-xs text-[#A0958B]">
                    Kelola keamanan dan riwayat aktivitas akun.
                  </p>
                </div>

                <div className="divide-y divide-[#F5F2ED]">
                  {/* GANTI KATA SANDI */}
                  <button
                    type="button"
                    onClick={() => alert("Form Ganti Kata Sandi")}
                    className="group flex w-full items-center justify-between gap-4 py-4 text-left first:pt-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF1E7] text-[#C85A17]">
                        <svg
                          className="h-4.5 w-4.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 0121 9z"
                          />
                        </svg>
                      </div>

                      <div>
                        <span className="block text-sm font-bold text-[#111111]">
                          Ganti kata sandi
                        </span>

                        <span className="mt-0.5 block text-xs text-[#8C827A]">
                          Perbarui kata sandi akun Anda.
                        </span>
                      </div>
                    </div>

                    <span className="text-lg font-semibold text-[#A0958B] transition-transform group-hover:translate-x-0.5">
                      ›
                    </span>
                  </button>

                  {/* LOG AKTIVITAS */}
                  <button
                    type="button"
                    onClick={() => router.push("/anggota/log-aktivitas")}
                    className="group flex w-full items-center justify-between gap-4 py-4 text-left last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF1E7] text-[#C85A17]">
                        <svg
                          className="h-4.5 w-4.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>

                      <div>
                        <span className="block text-sm font-bold text-[#111111]">
                          Log aktivitas
                        </span>

                        <span className="mt-0.5 block text-xs text-[#8C827A]">
                          Lihat riwayat masuk dan perubahan akun.
                        </span>
                      </div>
                    </div>

                    <span className="text-lg font-semibold text-[#A0958B] transition-transform group-hover:translate-x-0.5">
                      ›
                    </span>
                  </button>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-5">
              {/* STATUS AKUN */}
              <section className="rounded-[22px] border border-[#EAE5DF] bg-white p-6 shadow-[0_2px_8px_rgba(54,38,28,0.03)]">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8C827A]">
                  AKUN
                </h2>

                <div className="mt-5 rounded-2xl border border-[#EAE5DF] bg-[#FAF8F5] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#8C827A]">
                        Status keanggotaan
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#111111]">
                        Aktif
                      </p>
                    </div>

                    <span className="rounded-full bg-[#EBF7EE] px-3 py-1 text-[10px] font-bold text-[#2E7D32]">
                      Aktif
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-[#8C827A]">
                  Informasi identitas utama akun masih dikelola melalui
                  admin ICA wilayah.
                </p>
              </section>

              {/* HAPUS AKUN */}
              <section className="rounded-[22px] border border-[#EAE5DF] bg-white p-6 shadow-[0_2px_8px_rgba(54,38,28,0.03)]">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8C827A]">
                  DATA AKUN
                </h2>

                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => setShowConfirmModal(true)}
                    className="w-full rounded-full border border-[#F5C2C2] bg-white px-4 py-3 text-sm font-bold text-[#9E2A2A] transition-colors hover:bg-[#FDF2F2]"
                  >
                    Ajukan penghapusan akun
                  </button>

                  <p className="mt-3 text-center text-[10px] font-medium leading-relaxed text-[#8C827A]">
                    Penghapusan akun diverifikasi admin ICA wilayah.
                    Riwayat keanggotaan tetap disimpan organisasi.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL KONFIRMASI PENGHAPUSAN AKUN */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">
          <div
            className="absolute inset-0"
            onClick={() => setShowConfirmModal(false)}
          />

          <div className="relative z-10 w-full max-w-[460px] rounded-[24px] bg-white p-6 shadow-2xl">
            <div className="space-y-2">
              <h3 className="text-lg font-bold leading-snug text-[#111111]">
                Ajukan penghapusan akun?
              </h3>

              <p className="text-sm leading-relaxed text-[#59524C]">
                Penghapusan tidak dilakukan otomatis. Permintaan akan
                diteruskan ke admin ICA wilayah. Riwayat keanggotaan dan
                pedigree tetap tersimpan sebagai arsip organisasi.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="rounded-full border border-[#EAE5DF] bg-white px-5 py-2.5 text-xs font-bold text-[#111111] transition-colors hover:bg-[#F7F4EE]"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleConfirmPenghapusan}
                className="rounded-full bg-[#E05347] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#C84338]"
              >
                Ajukan penghapusan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}