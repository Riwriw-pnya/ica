import { ActivityBadge, ActivityDot } from "./ActivityBadge";
import type { ActivityLogItem } from "@/types/anggota";

export default function ActivityList({ items }: { items: ActivityLogItem[] }) {
    if (items.length === 0) {
        return (
        <div className="rounded-2xl border border-[#efe9e2] bg-white p-8 text-center">
            <p className="text-[12px] text-[#8c857b]">Tidak ada aktivitas pada kategori ini.</p>
        </div>
        );
    }

    return (
        <div className="rounded-2xl border border-[#efe9e2] bg-white">
            <div className="divide-y divide-[#f0eae1]">
                {items.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-4 p-4 sm:p-5">
                    <div className="flex items-start gap-2.5">
                        <ActivityDot category={item.category} />
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-[13px] font-bold text-[#1a1817]">{item.title}</h3>
                                <ActivityBadge category={item.category} />
                            </div>
                            <p className="mt-0.5 text-[11px] text-[#8c857b]">{item.description}</p>
                        </div>
                    </div>

                    <div className="shrink-0 text-right">
                        <p className="text-[12px] font-semibold text-[#1a1817]">{item.time}</p>
                        <p className="text-[11px] text-[#a39c94]">{item.date}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}