"use client";

import React from "react";

interface EventDetailDropdownProps {
  eventId: string;
  onCheckout: () => void;
}

export default function EventDetailDropdown({
  eventId,
  onCheckout,
}: EventDetailDropdownProps) {
  // Event 1: ICA Cat Show Bandung 2026
  if (eventId === "1") {
    return (
      <div className="mt-4 pt-4 border-t border-[#F5EBE2] space-y-5 animate-fadeIn">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="block text-[#8C8074] font-semibold text-[10px] uppercase tracking-wider">
              Tanggal
            </span>
            <span className="font-bold text-[#1A1513] mt-0.5 block">
              18–19 Okt 2026
            </span>
          </div>
          <div>
            <span className="block text-[#8C8074] font-semibold text-[10px] uppercase tracking-wider">
              Lokasi
            </span>
            <span className="font-bold text-[#1A1513] mt-0.5 block">
              Trans Convention Center, Bandung
            </span>
          </div>
          <div>
            <span className="block text-[#8C8074] font-semibold text-[10px] uppercase tracking-wider">
              Harga per slot
            </span>
            <span className="font-bold text-[#1A1513] mt-0.5 block">
              Rp 150.000
            </span>
          </div>
          <div>
            <span className="block text-[#8C8074] font-semibold text-[10px] uppercase tracking-wider">
              Batas bayar
            </span>
            <span className="font-bold text-[#1A1513] mt-0.5 block">
              10:00 setelah checkout
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-[#1A1513] mb-2.5">
            Kuota per kategori peserta
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Umum */}
            <div className="p-3 rounded-xl bg-[#FAF7F5] border border-[#EEDFD5]">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-xs text-[#1A1513]">Umum</span>
                <span className="text-[10px] font-bold text-[#28844B] bg-[#EAF6ED] px-2 py-0.5 rounded-md">
                  15 slot tersisa
                </span>
              </div>
              <div className="w-full bg-[#EEDFD5] h-1.5 rounded-full overflow-hidden my-2">
                <div
                  className="bg-[#28844B] h-full rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
              <p className="text-[10px] text-[#8C8074]">Non-member, bayar penuh</p>
            </div>

            {/* Member */}
            <div className="p-3 rounded-xl bg-[#FAF7F5] border border-[#EEDFD5]">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-xs text-[#1A1513]">Member</span>
                <span className="text-[10px] font-bold text-[#28844B] bg-[#EAF6ED] px-2 py-0.5 rounded-md">
                  8 slot tersisa
                </span>
              </div>
              <div className="w-full bg-[#EEDFD5] h-1.5 rounded-full overflow-hidden my-2">
                <div
                  className="bg-[#28844B] h-full rounded-full"
                  style={{ width: "50%" }}
                />
              </div>
              <p className="text-[10px] text-[#8C8074]">Butuh keanggotaan aktif</p>
            </div>

            {/* Cattery */}
            <div className="p-3 rounded-xl bg-[#FFF8F5] border border-[#FCE3D2]">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-xs text-[#1A1513]">Cattery</span>
                <span className="text-[10px] font-bold text-[#C26D0A] bg-[#FFF4E5] px-2 py-0.5 rounded-md">
                  2 slot tersisa
                </span>
              </div>
              <div className="w-full bg-[#FCE3D2] h-1.5 rounded-full overflow-hidden my-2">
                <div
                  className="bg-[#C26D0A] h-full rounded-full"
                  style={{ width: "20%" }}
                />
              </div>
              <p className="text-[10px] text-[#8C8074]">
                Kategori akun Anda · bisa dibeli
              </p>
            </div>

            {/* Sponsor */}
            <div className="p-3 rounded-xl bg-[#FAF7F5] border border-[#EEDFD5]">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-xs text-[#1A1513]">
                  Sponsor (Cattery)
                </span>
                <span className="text-[10px] font-bold text-[#28844B] bg-[#EAF6ED] px-2 py-0.5 rounded-md">
                  5 slot tersisa
                </span>
              </div>
              <div className="w-full bg-[#EEDFD5] h-1.5 rounded-full overflow-hidden my-2">
                <div
                  className="bg-[#28844B] h-full rounded-full"
                  style={{ width: "30%" }}
                />
              </div>
              <p className="text-[10px] text-[#8C8074]">
                Alur assignment belum final
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={onCheckout}
            className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-6 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 transition-all"
          >
            Lanjut ke Checkout Ticket
          </button>
          <span className="text-xs text-[#8C8074]">
            Slot ditahan begitu Anda masuk checkout.
          </span>
        </div>
      </div>
    );
  }

  // Event 2: ICA Kitten Fest Jakarta (Kuota Cattery Penuh)
  if (eventId === "2") {
    return (
      <div className="mt-4 pt-4 border-t border-[#F5EBE2] space-y-5 animate-fadeIn">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="block text-[#8C8074] font-semibold text-[10px] uppercase tracking-wider">
              Tanggal
            </span>
            <span className="font-bold text-[#1A1513] mt-0.5 block">
              4 Nov 2026
            </span>
          </div>
          <div>
            <span className="block text-[#8C8074] font-semibold text-[10px] uppercase tracking-wider">
              Lokasi
            </span>
            <span className="font-bold text-[#1A1513] mt-0.5 block">
              Kuningan City Hall, Jakarta
            </span>
          </div>
          <div>
            <span className="block text-[#8C8074] font-semibold text-[10px] uppercase tracking-wider">
              Harga per slot
            </span>
            <span className="font-bold text-[#1A1513] mt-0.5 block">
              Rp 120.000
            </span>
          </div>
          <div>
            <span className="block text-[#8C8074] font-semibold text-[10px] uppercase tracking-wider">
              Batas bayar
            </span>
            <span className="font-bold text-[#1A1513] mt-0.5 block">
              08:00 setelah checkout
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-[#1A1513] mb-2.5">
            Kuota per kategori peserta
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Umum */}
            <div className="p-3 rounded-xl bg-[#FAF7F5] border border-[#EEDFD5]">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-xs text-[#1A1513]">Umum</span>
                <span className="text-[10px] font-bold text-[#28844B] bg-[#EAF6ED] px-2 py-0.5 rounded-md">
                  12 slot tersisa
                </span>
              </div>
              <div className="w-full bg-[#EEDFD5] h-1.5 rounded-full overflow-hidden my-2">
                <div
                  className="bg-[#C26D0A] h-full rounded-full"
                  style={{ width: "60%" }}
                />
              </div>
              <p className="text-[10px] text-[#8C8074]">Non-member, bayar penuh</p>
            </div>

            {/* Member */}
            <div className="p-3 rounded-xl bg-[#FAF7F5] border border-[#EEDFD5]">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-xs text-[#1A1513]">Member</span>
                <span className="text-[10px] font-bold text-[#28844B] bg-[#EAF6ED] px-2 py-0.5 rounded-md">
                  4 slot tersisa
                </span>
              </div>
              <div className="w-full bg-[#EEDFD5] h-1.5 rounded-full overflow-hidden my-2">
                <div
                  className="bg-[#C26D0A] h-full rounded-full"
                  style={{ width: "30%" }}
                />
              </div>
              <p className="text-[10px] text-[#8C8074]">Butuh keanggotaan aktif</p>
            </div>

            {/* Cattery (Kuota Penuh) */}
            <div className="p-3 rounded-xl bg-[#FFF5F5] border border-[#FCD2D2]">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-xs text-[#1A1513]">Cattery</span>
                <span className="text-[10px] font-bold text-[#DC2626] bg-[#FEE2E2] px-2 py-0.5 rounded-md">
                  Kuota penuh
                </span>
              </div>
              <div className="w-full bg-[#FEE2E2] h-1.5 rounded-full overflow-hidden my-2">
                <div
                  className="bg-[#DC2626] h-full rounded-full"
                  style={{ width: "100%" }}
                />
              </div>
              <p className="text-[10px] text-[#8C8074]">
                Kategori akun Anda · bisa dibeli
              </p>
            </div>

            {/* Sponsor */}
            <div className="p-3 rounded-xl bg-[#FAF7F5] border border-[#EEDFD5]">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-xs text-[#1A1513]">
                  Sponsor (Cattery)
                </span>
                <span className="text-[10px] font-bold text-[#28844B] bg-[#EAF6ED] px-2 py-0.5 rounded-md">
                  2 slot tersisa
                </span>
              </div>
              <div className="w-full bg-[#EEDFD5] h-1.5 rounded-full overflow-hidden my-2">
                <div
                  className="bg-[#28844B] h-full rounded-full"
                  style={{ width: "80%" }}
                />
              </div>
              <p className="text-[10px] text-[#8C8074]">
                Alur assignment belum final
              </p>
            </div>
          </div>
        </div>

        {/* Notice Box Kuota Penuh */}
        <div className="p-3.5 rounded-xl bg-[#FFF2F2] border border-[#FCD2D2] text-xs text-[#B91C1C] leading-relaxed">
          Maaf, kuota kategori Cattery untuk event ini baru saja penuh. Slot bisa
          terbuka lagi kalau ada peserta yang gagal membayar sebelum batas waktu —
          pantau halaman ini.
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            disabled
            className="rounded-full bg-[#EEDFD5] px-6 py-2.5 text-xs font-bold text-[#8C8074] cursor-not-allowed"
          >
            Lanjut ke Checkout Ticket
          </button>
          <span className="text-xs text-[#8C8074]">
            Slot ditahan begitu Anda masuk checkout.
          </span>
        </div>
      </div>
    );
  }

  // Event 3: Diklat Breeder Pemula - Batch 4
  return (
    <div className="mt-4 pt-4 border-t border-[#F5EBE2] space-y-5 animate-fadeIn">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="block text-[#8C8074] font-semibold text-[10px] uppercase tracking-wider">
            Tanggal
          </span>
          <span className="font-bold text-[#1A1513] mt-0.5 block">
            12–14 Des 2026
          </span>
        </div>
        <div>
          <span className="block text-[#8C8074] font-semibold text-[10px] uppercase tracking-wider">
            Lokasi
          </span>
          <span className="font-bold text-[#1A1513] mt-0.5 block">
            Daring · Zoom
          </span>
        </div>
        <div>
          <span className="block text-[#8C8074] font-semibold text-[10px] uppercase tracking-wider">
            Harga per slot
          </span>
          <span className="font-bold text-[#1A1513] mt-0.5 block">
            Rp 250.000
          </span>
        </div>
        <div>
          <span className="block text-[#8C8074] font-semibold text-[10px] uppercase tracking-wider">
            Batas bayar
          </span>
          <span className="font-bold text-[#1A1513] mt-0.5 block">
            15:00 setelah checkout
          </span>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-[#1A1513] mb-2.5">
          Kuota per kategori peserta
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Umum */}
          <div className="p-3 rounded-xl bg-[#FAF7F5] border border-[#EEDFD5]">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-xs text-[#1A1513]">Umum</span>
              <span className="text-[10px] font-bold text-[#28844B] bg-[#EAF6ED] px-2 py-0.5 rounded-md">
                40 slot tersisa
              </span>
            </div>
            <div className="w-full bg-[#EEDFD5] h-1.5 rounded-full overflow-hidden my-2">
              <div
                className="bg-[#28844B] h-full rounded-full"
                style={{ width: "80%" }}
              />
            </div>
            <p className="text-[10px] text-[#8C8074]">Non-member, bayar penuh</p>
          </div>

          {/* Member */}
          <div className="p-3 rounded-xl bg-[#FAF7F5] border border-[#EEDFD5]">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-xs text-[#1A1513]">Member</span>
              <span className="text-[10px] font-bold text-[#28844B] bg-[#EAF6ED] px-2 py-0.5 rounded-md">
                30 slot tersisa
              </span>
            </div>
            <div className="w-full bg-[#EEDFD5] h-1.5 rounded-full overflow-hidden my-2">
              <div
                className="bg-[#28844B] h-full rounded-full"
                style={{ width: "60%" }}
              />
            </div>
            <p className="text-[10px] text-[#8C8074]">Butuh keanggotaan aktif</p>
          </div>

          {/* Cattery */}
          <div className="p-3 rounded-xl bg-[#FFF8F5] border border-[#FCE3D2]">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-xs text-[#1A1513]">Cattery</span>
              <span className="text-[10px] font-bold text-[#28844B] bg-[#EAF6ED] px-2 py-0.5 rounded-md">
                20 slot tersisa
              </span>
            </div>
            <div className="w-full bg-[#FCE3D2] h-1.5 rounded-full overflow-hidden my-2">
              <div
                className="bg-[#28844B] h-full rounded-full"
                style={{ width: "50%" }}
              />
            </div>
            <p className="text-[10px] text-[#8C8074]">
              Kategori akun Anda · bisa dibeli
            </p>
          </div>

          {/* Sponsor (Kuota Penuh) */}
          <div className="p-3 rounded-xl bg-[#FFF5F5] border border-[#FCD2D2]">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-xs text-[#1A1513]">
                Sponsor (Cattery)
              </span>
              <span className="text-[10px] font-bold text-[#DC2626] bg-[#FEE2E2] px-2 py-0.5 rounded-md">
                Kuota penuh
              </span>
            </div>
            <div className="w-full bg-[#FEE2E2] h-1.5 rounded-full overflow-hidden my-2">
              <div
                className="bg-[#DC2626] h-full rounded-full"
                style={{ width: "100%" }}
              />
            </div>
            <p className="text-[10px] text-[#8C8074]">
              Alur assignment belum final
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="button"
          onClick={onCheckout}
          className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-6 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 transition-all"
        >
          Lanjut ke Checkout Ticket
        </button>
        <span className="text-xs text-[#8C8074]">
          Slot ditahan begitu Anda masuk checkout.
        </span>
      </div>
    </div>
  );
}   