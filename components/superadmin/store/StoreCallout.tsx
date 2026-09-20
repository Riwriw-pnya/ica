export default function StoreCallout() {
  return (
    <div className="bg-[#F4F8FE] border border-[#E2EEFE] rounded-2xl p-3.5 flex items-center gap-2.5 text-xs text-[#2A52BE]">
      <svg
        className="w-4 h-4 shrink-0 text-[#2A52BE]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
      <p className="leading-relaxed">
        Harga bersifat tampilan saja. Struktur data produk (nama, harga, kategori, foto) sudah disiapkan agar bisa diperluas menjadi transaksional tanpa merombak modul.
      </p>
    </div>
  );
}