export interface ArticleItem {
  id: string;
  title: string;
  category: string;
  status: "Aktif" | "Draft" | "Arsip";
  publishedDate?: string;
  savedDate?: string;
  views?: number;
  imagePlaceholder: string;
}

export default function ArticleCard({ item }: { item: ArticleItem }) {
  const isDraft = item.status === "Draft";

  return (
    <div className="bg-white border border-[#EFE9E1] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#D0C5BC] transition">
      {/* Dashed Cover Container */}
      <div className="m-3 p-6 bg-[#F4F0EA] border border-dashed border-[#D0C5BC] rounded-xl flex flex-col items-center justify-center text-[#8C8078] gap-1.5 h-44">
        <svg className="w-7 h-7 text-[#A0948C]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span className="text-xs font-medium text-[#8C8078]">{item.imagePlaceholder}</span>
      </div>

      {/* Content Body */}
      <div className="p-4 pt-1 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Badges */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] text-[11px] font-semibold border border-[#DBEAFE]">
              {item.category === "Regulasi" && "📑"}
              {item.category === "Diklat" && "🏷️"}
              {item.category === "Organisasi" && "🏛️"}
              <span>{item.category}</span>
            </span>

            {item.status === "Aktif" ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Aktif
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full border border-gray-200">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                Draft
              </span>
            )}
          </div>

          <h3 className="text-sm font-bold text-[#231A14] leading-snug line-clamp-2">
            {item.title}
          </h3>

          <p className="text-[11px] text-[#A0948C]">
            {isDraft
              ? `Draft · disimpan ${item.savedDate}`
              : `Terbit ${item.publishedDate} · ${item.views} dibaca`}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-[#F2EFE9] flex items-center gap-2">
          {isDraft ? (
            <>
              <button className="flex-1 px-3 py-2 rounded-xl border border-[#EE6B28] text-[#EE6B28] hover:bg-[#FFF8F3] text-xs font-bold transition cursor-pointer">
                Lanjutkan menulis
              </button>
              <button className="px-3 py-2 rounded-xl border border-[#EFE9E1] text-rose-600 hover:bg-rose-50 text-xs font-bold transition cursor-pointer">
                Hapus
              </button>
            </>
          ) : (
            <>
              <button className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#EFE9E1] hover:bg-[#FAF8F5] text-xs font-bold text-[#231A14] transition cursor-pointer">
                <svg className="w-3.5 h-3.5 text-[#7A6E65]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                Edit
              </button>
              <button className="px-3.5 py-2 rounded-xl border border-[#EFE9E1] hover:bg-[#FAF8F5] text-xs font-bold text-[#7A6E65] transition cursor-pointer">
                Arsipkan
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}