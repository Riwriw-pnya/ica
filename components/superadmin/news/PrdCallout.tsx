export default function PrdCallout() {
  return (
    <div className="bg-[#FAF8F5] border border-[#EFE9E1] rounded-2xl p-4 flex items-start gap-3 text-xs text-[#7A6E65]">
      <div className="w-5 h-5 rounded-full border border-[#A0948C] flex items-center justify-center shrink-0 text-[#7A6E65] font-semibold text-[11px] mt-0.5">
        ?
      </div>
      <p className="leading-relaxed">
        <span className="font-semibold text-[#231A14]">[PRD TBD]</span> Perlu konfirmasi apakah &quot;Artikel&quot; dan &quot;News&quot; adalah dua modul terpisah. Saat ini keduanya dikelola sebagai satu modul dengan kategori.
      </p>
    </div>
  );
}