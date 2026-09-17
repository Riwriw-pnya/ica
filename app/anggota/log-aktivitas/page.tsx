"use client";

import { useMemo, useState } from "react";
import { activityLogItems, deviceItems as initialDevices } from "@/data/anggota";
import { useToast } from "@/context/ToastContext";
import ActivityFilterTabs from "./components/ActivityFilterTabs";
import ActivityList from "./components/ActivityList";
import DeviceList from "./components/DeviceList";
import type { DeviceItem } from "@/types/anggota";

export default function LogAktivitasPage() {
    const { showToast } = useToast();
    const [activeFilter, setActiveFilter] = useState<string>("Semua");
    const [devices, setDevices] = useState<DeviceItem[]>(initialDevices);

    const filteredItems = useMemo(() => {
        if (activeFilter === "Semua") return activityLogItems;
        return activityLogItems.filter((item) => item.category === activeFilter);
    }, [activeFilter]);

    const handleLogoutDevice = (device: DeviceItem) => {
        setDevices((prev) => prev.filter((d) => d.id !== device.id));
        showToast(
        `Perangkat ${device.browser} · ${device.os} dikeluarkan dari akun.`,
        "",
        { tone: "error" },
        );
    };

    return (
        <main>
            <div className="mx-auto max-w-[900px] space-y-5">
                <section>
                    <h1 className="font-display text-2xl font-bold text-[#1a1817]">Log aktivitas akun</h1>
                    <p className="mt-1 text-[12px] text-[#5e5852]">
                        Catatan masuk, perubahan data, dan pengajuan pada akun ICA-M-004821.
                    </p>
                </section>

                <ActivityFilterTabs active={activeFilter} onChange={setActiveFilter} />

                <ActivityList items={filteredItems} />

                <DeviceList devices={devices} onLogout={handleLogoutDevice} />
            </div>
        </main>
    );
}