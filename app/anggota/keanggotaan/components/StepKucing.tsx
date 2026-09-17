"use client";

import DashboardIcon from "@/components/anggota/DashboardIcon";

export interface CatBasicInfo {
    name: string;
    breed: string;
    birthDate: string;
    certNumber: string;
}

interface CatFormCardProps {
    title: string;
    subtitle: string;
    info: CatBasicInfo;
    onChange: (patch: Partial<CatBasicInfo>) => void;
    showError: boolean;
}

const BREEDS = ["Persian", "Exotic Shorthair", "Maine Coon", "British Shorthair", "Ragdoll"];

function CatFormCard({ title, subtitle, info, onChange, showError }: CatFormCardProps) {
    const nameInvalid = showError && info.name.trim() === "";
    const birthDateInvalid = showError && info.birthDate === "";
    const certInvalid = showError && info.certNumber.trim() === "";

    return (
        <div className="rounded-2xl border border-[#efe9e2] bg-white p-6 shadow-xs">
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff1e4] text-[#ee6b28]">
                <DashboardIcon name="cat" size={20} />
            </span>
            <div>
                <h3 className="text-[15px] font-bold text-[#1a1817]">{title}</h3>
                <p className="mt-0.5 text-[12px] text-[#8c857b]">{subtitle}</p>
            </div>
            </div>

            <span className="shrink-0 rounded-full bg-[#fff1e4] px-3 py-1 text-[11px] font-semibold text-[#ee6b28]">
            Wajib
            </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
            <label className="block text-xs font-semibold text-[#38332e]">Nama kucing</label>
            <input
                type="text"
                placeholder="Nama sesuai pedigree"
                value={info.name}
                onChange={(e) => onChange({ name: e.target.value })}
                className={`mt-2 w-full rounded-xl border bg-[#fcfbf9] px-4 py-2.5 text-xs text-[#1a1817] placeholder-[#a69e94] transition focus:bg-white focus:outline-hidden focus:ring-1 ${
                nameInvalid
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                    : "border-[#eee8e2] focus:border-[#ee6b28] focus:ring-[#ee6b28]"
                }`}
            />
            </div>

            <div>
            <label className="block text-xs font-semibold text-[#38332e]">Ras</label>
            <div className="relative mt-2">
                <select
                value={info.breed}
                onChange={(e) => onChange({ breed: e.target.value })}
                className="w-full appearance-none rounded-xl border border-[#eee8e2] bg-[#fcfbf9] px-4 py-2.5 text-xs text-[#1a1817] transition focus:border-[#ee6b28] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#ee6b28]"
                >
                {BREEDS.map((breed) => (
                    <option key={breed} value={breed}>{breed}</option>
                ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#1a1817]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 9l6 6 6-6" />
                </svg>
                </div>
            </div>
            </div>

            <div>
            <label className="block text-xs font-semibold text-[#38332e]">Tanggal lahir</label>
            <input
                type="date"
                value={info.birthDate}
                onChange={(e) => onChange({ birthDate: e.target.value })}
                className={`mt-2 w-full rounded-xl border bg-[#fcfbf9] px-4 py-2.5 text-xs text-[#1a1817] transition focus:bg-white focus:outline-hidden focus:ring-1 ${
                birthDateInvalid
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                    : "border-[#eee8e2] focus:border-[#ee6b28] focus:ring-[#ee6b28]"
                }`}
            />
            </div>

            <div>
            <label className="block text-xs font-semibold text-[#38332e]">Nomor sertifikat pedigree</label>
            <input
                type="text"
                placeholder="ICA-PED-0000-000"
                value={info.certNumber}
                onChange={(e) => onChange({ certNumber: e.target.value })}
                className={`mt-2 w-full rounded-xl border bg-[#fcfbf9] px-4 py-2.5 text-xs text-[#1a1817] placeholder-[#a69e94] transition focus:bg-white focus:outline-hidden focus:ring-1 ${
                certInvalid
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                    : "border-[#eee8e2] focus:border-[#ee6b28] focus:ring-[#ee6b28]"
                }`}
            />
            </div>
        </div>
        </div>
    );
    }

    interface StepKucingWajibProps {
    maleCat: CatBasicInfo;
    onMaleCatChange: (patch: Partial<CatBasicInfo>) => void;
    femaleCat: CatBasicInfo;
    onFemaleCatChange: (patch: Partial<CatBasicInfo>) => void;
    onAddOffspring: () => void;
    showError: boolean;
    }

    export default function StepKucingWajib({
    maleCat,
    onMaleCatChange,
    femaleCat,
    onFemaleCatChange,
    onAddOffspring,
    showError,
    }: StepKucingWajibProps) {
    return (
        <div className="space-y-5">
        <CatFormCard
            title="Pejantan (male)"
            subtitle="Wajib · minimal satu pejantan bersertifikat"
            info={maleCat}
            onChange={onMaleCatChange}
            showError={showError}
        />

        <CatFormCard
            title="Induk (female)"
            subtitle="Wajib · minimal satu induk bersertifikat"
            info={femaleCat}
            onChange={onFemaleCatChange}
            showError={showError}
        />

        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-[#ee6b28]/40 bg-[#fff8f2] p-5 sm:flex-row sm:items-center">
            <div>
            <h3 className="text-[14px] font-bold text-[#1a1817]">Keturunan (opsional)</h3>
            <p className="mt-0.5 text-[12px] text-[#8c857b]">
                Data keturunan dapat ditambahkan sekarang atau menyusul lewat Mating Report setelah
                cattery aktif.
            </p>
            </div>

            <button
            type="button"
            onClick={onAddOffspring}
            className="shrink-0 cursor-pointer rounded-full border border-[#ee6b28] bg-white px-5 py-2 text-xs font-bold text-[#ee6b28] transition hover:bg-[#fff1e4] hover:-translate-y-0.5"
            >
            Tambah keturunan
            </button>
        </div>
    </div>
    );
}