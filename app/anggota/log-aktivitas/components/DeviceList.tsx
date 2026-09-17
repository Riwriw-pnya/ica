"use client";

import type { DeviceItem } from "@/types/anggota";

interface DeviceListProps {
    devices: DeviceItem[];
    onLogout: (device: DeviceItem) => void;
}

export default function DeviceList({ devices, onLogout }: DeviceListProps) {
    return (
        <div className="rounded-2xl border border-[#efe9e2] bg-white p-5 sm:p-6">
            <h3 className="text-[15px] font-bold text-[#1a1817]">Perangkat yang masuk</h3>
            <p className="mt-0.5 text-[12px] text-[#8c857b]">Keluarkan perangkat yang tidak Anda kenali.</p>

            <div className="mt-4 divide-y divide-[#f0eae1]">
                {devices.map((device) => (
                    <div key={device.id} className="flex items-center justify-between gap-4 py-3.5">
                        <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f7f5f0] text-[#8c857b]">
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <rect x="3" y="4" width="18" height="12" rx="2" />
                            <path strokeLinecap="round" d="M8 20h8M12 16v4" />
                            </svg>
                        </span>
                        <div>
                            <p className="text-[13px] font-semibold text-[#1a1817]">
                            {device.browser} · {device.os}
                            </p>
                            <p className="mt-0.5 text-[11px] text-[#8c857b]">
                            {device.location} · {device.lastActive}
                            </p>
                        </div>
                    </div>

                    {device.isCurrent ? (
                        <span className="shrink-0 rounded-full bg-[#e8f5e9] px-3 py-1 text-[11px] font-semibold text-[#2e7d32]">
                            Perangkat ini
                        </span>
                    ) : (
                        <div className="flex shrink-0 items-center gap-2">
                            <span className="rounded-full bg-[#f7f5f0] px-3 py-1 text-[11px] font-medium text-[#8c857b]">
                            Tidak aktif
                            </span>
                            <button
                            onClick={() => onLogout(device)}
                            className="rounded-full border border-[#e8b4a8] px-3.5 py-1 text-[11px] font-semibold text-[#c1401f] transition hover:bg-[#fdf0ee]"
                            >
                            Keluarkan
                            </button>
                        </div>
                    )}
                </div>
                ))}
            </div>
        </div>
    );
}