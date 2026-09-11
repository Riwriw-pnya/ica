"use client";

import DashboardIcon from "@/components/anggota/DashboardIcon";
import React from "react";

export default function QuickLinks() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <a href="/cattery/profil" className="bg-white rounded-2xl p-4 border border-[#eedfd5] shadow-xs flex items-center justify-between hover:border-[#f05a1b]/40 hover:bg-gradient-to-l hover:from-white hover:to-[#FFF0E5] hover:border-[#FA9856]/70 hover:shadow-md hover:-translate-y-0.5 transition-all">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#fff5ec] flex items-center justify-center shrink-0 bg-gradient-to-b from-white to-[#fff5ec] border border-[var(--color-brand-orange-300)]/50">
            <svg className="w-5 h-5 text-[#f05a1b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#1a1513] group-hover:text-[#f05a1b] transition">Profil Cattery</h3>
            <p className="text-xs text-[#8c8074]">Data, alamat, kontak & foto</p>
          </div>
        </div>
        <svg className="w-4 h-4 text-[#a89c91] group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </a>

      <a href="/cattery/documents" className="bg-white rounded-2xl p-4 border border-[#eedfd5] shadow-xs flex items-center justify-between hover:border-[#f05a1b]/40 hover:bg-gradient-to-l hover:from-white hover:to-[#FFF0E5] hover:border-[#FA9856]/70 hover:shadow-md hover:-translate-y-0.5 transition-all">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-b from-white to-[#fff5ec] border border-[var(--color-brand-orange-300)]/50">
            <svg className="w-5 h-5 text-[#f05a1b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#1a1513] group-hover:text-[#f05a1b] transition">Documents</h3>
            <p className="text-xs text-[#8c8074]">Sertifikat & berkas pengajuan</p>
          </div>
        </div>
        <svg className="w-4 h-4 text-[#a89c91] group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </a>

      <a href="/cattery/my-cats" className="bg-white rounded-2xl p-4 border border-[#eedfd5] shadow-xs flex items-center justify-between hover:border-[#f05a1b]/40 hover:bg-gradient-to-l hover:from-white hover:to-[#FFF0E5] hover:border-[#FA9856]/70 hover:shadow-md hover:-translate-y-0.5 transition-all">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl text-[#f05a1b] bg-gradient-to-b from-white to-[#fff5ec] flex items-center justify-center shrink-0 border border-[var(--color-brand-orange-300)]/50">
            <DashboardIcon name="cat" size={22} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#1a1513] group-hover:text-[#f05a1b] transition">My Cats</h3>
            <p className="text-xs text-[#8c8074]">11 kucing terdaftar</p>
          </div>
        </div>
        <svg className="w-4 h-4 text-[#a89c91] group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </section>
  );
}