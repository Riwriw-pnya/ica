"use client";

import React from "react";

export default function SettingsPage() {
    return (
        <div className="min-h-[70vh] bg-[#F8F6F2] p-4 sm:p-8 flex items-center justify-center">
        {/* Box Container Placeholder dengan Border Dashed */}
        <div className="w-full max-w-md rounded-3xl border-2 border-dashed border-[#EEDFD5] bg-white p-8 text-center shadow-2xs space-y-4">
            {/* Lingkaran Ilustrasi / Icon Placeholder */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF2E8] text-[#F05A1B]">
            <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
            </div>

            {/* Text Keterangan */}
            <div className="space-y-2">
            <h1 className="font-bold text-base text-[#1A1513]">
                Settings belum diremake
            </h1>
            <p className="text-xs text-[#8C8074] leading-relaxed px-2">
                Menu ini menunggu screenshot versi web-nya. Kontennya akan diremake
                persis seperti acuan, bukan dikarang.
            </p>
            </div>
        </div>
        </div>
    );
}