import type { ActivityCategory } from "@/types/anggota";

const STYLES: Record<ActivityCategory, { badge: string; dot: string }> = {
    Login: { badge: "bg-[#e8f0fe] text-[#3766c4]", dot: "bg-[#3766c4]" },
    "Perubahan data": { badge: "bg-[#fef3e7] text-[#b5650a]", dot: "bg-[#d97706]" },
    Pengajuan: { badge: "bg-[#e8f5e9] text-[#2e7d32]", dot: "bg-[#2e7d32]" },
    Keamanan: { badge: "bg-[#fdeaea] text-[#b3261e]", dot: "bg-[#b3261e]" },
};

export function ActivityBadge({ category }: { category: ActivityCategory }) {
    const style = STYLES[category];
    return (
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${style.badge}`}>
            {category}
        </span>
    );
}

export function ActivityDot({ category }: { category: ActivityCategory }) {
    const style = STYLES[category];
    return <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${style.dot}`} />;
}