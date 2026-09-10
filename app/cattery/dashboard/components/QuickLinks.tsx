"use client";

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
          <div className="w-11 h-11 rounded-xl bg-[#fff5ec] flex items-center justify-center shrink-0 bg-gradient-to-b from-white to-[#fff5ec] border border-[var(--color-brand-orange-300)]/50">
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
          <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-white to-[#fff5ec] flex items-center justify-center shrink-0 border border-[var(--color-brand-orange-300)]/50">
            <svg className="w-5 h-5 text-[#f05a1b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5c-3.866 0-7 2.239-7 5 0 1.933 1.523 3.616 3.82 4.414-.148.868-.535 2.126-1.82 3.086 2.383 0 4.138-1.258 5-2.5 1 .833 2.5 1 3.5 1 3.866 0 7-2.239 7-5s-3.134-5-7-5z" />
              <circle cx="9" cy="9.5" r="1" fill="currentColor" />
              <circle cx="15" cy="9.5" r="1" fill="currentColor" />
            </svg>
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