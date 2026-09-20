"use client";

import React from "react";

export default function EventDetailSection() {
  return (
    <div className="bg-white border border-[#EFE9E1] rounded-3xl p-6 space-y-5 shadow-xs">
      <div>
        <h2 className="text-base font-bold text-[#231A14]">Detail event</h2>
        <p className="text-xs text-[#8C8078] mt-0.5">
          Data ini tampil di agenda event Member dan Cattery Portal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#231A14] mb-1.5">
            Nama event <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            defaultValue="ICA Cat Show Bandung 2026"
            className="w-full px-3.5 py-2.5 text-xs border border-[#EFE9E1] rounded-xl focus:outline-none focus:border-[#EE6B28] text-[#231A14] bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#231A14] mb-1.5">Wilayah</label>
          <div className="relative">
            <select className="w-full px-3.5 py-2.5 text-xs border border-[#EFE9E1] rounded-xl focus:outline-none focus:border-[#EE6B28] text-[#231A14] bg-white appearance-none cursor-pointer">
              <option selected>Bandung</option>
              <option>Jakarta</option>
              <option>Surabaya</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#8C8078]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#231A14] mb-1.5">Tanggal mulai</label>
          <div className="relative">
            <input
              type="text"
              defaultValue="10/18/2026"
              className="w-full px-3.5 py-2.5 text-xs border border-[#EFE9E1] rounded-xl focus:outline-none focus:border-[#EE6B28] text-[#231A14] bg-white"
            />
            <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8078] pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#231A14] mb-1.5">Tanggal selesai</label>
          <div className="relative">
            <input
              type="text"
              defaultValue="10/19/2026"
              className="w-full px-3.5 py-2.5 text-xs border border-[#EFE9E1] rounded-xl focus:outline-none focus:border-[#EE6B28] text-[#231A14] bg-white"
            />
            <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8078] pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#231A14] mb-1.5">Lokasi</label>
          <input
            type="text"
            defaultValue="Trans Convention Center"
            className="w-full px-3.5 py-2.5 text-xs border border-[#EFE9E1] rounded-xl focus:outline-none focus:border-[#EE6B28] text-[#231A14] bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#231A14] mb-1.5">Harga tiket per slot</label>
          <input
            type="text"
            defaultValue="Rp 150.000"
            className="w-full px-3.5 py-2.5 text-xs border border-[#EFE9E1] rounded-xl focus:outline-none focus:border-[#EE6B28] text-[#231A14] bg-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#231A14] mb-1.5">Banner event</label>
        <div className="w-full h-36 bg-[#F5F2ED] border border-dashed border-[#D0C5BC] rounded-2xl flex items-center justify-center text-[#8C8078]">
          <span className="text-xs font-medium text-[#7A6E65]">Banner event · 1600×600</span>
        </div>
      </div>
    </div>
  );
}