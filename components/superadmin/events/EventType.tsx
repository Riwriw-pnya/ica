"use client";

import React, { useState } from "react";

export default function EventTypeSection() {
  const [selectedType, setSelectedType] = useState("catshow");

  return (
    <div className="bg-white border border-[#EFE9E1] rounded-3xl p-6 space-y-5 shadow-xs">
      <div>
        <h2 className="text-base font-bold text-[#231A14]">Jenis event ICA</h2>
        <p className="text-xs text-[#8C8078] mt-0.5">
          Jenis event menentukan badge yang diterbitkan otomatis ke profil peserta di Member dan Cattery Portal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { id: "diklat-cattery", title: "Diklat Cattery", desc: "Badge otomatis di profil peserta · akumulatif" },
          { id: "diklat-grooming", title: "Diklat Grooming", desc: "Badge otomatis di profil peserta · akumulatif" },
          { id: "catshow", title: "Cat Show", desc: "Penilaian juri · memakai pengaturan benching" },
          { id: "propaganda", title: "Propaganda", desc: "Sosialisasi publik · tidak menerbitkan badge" },
        ].map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedType(item.id)}
            className={`border rounded-2xl p-4 cursor-pointer transition space-y-2 ${
              selectedType === item.id
                ? "border-[#EE6B28] bg-[#FFF6EE]"
                : "border-[#EFE9E1] hover:border-[#D0C5BC] bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#231A14]">{item.title}</span>
              <input
                type="radio"
                checked={selectedType === item.id}
                onChange={() => setSelectedType(item.id)}
                className="accent-[#EE6B28]"
              />
            </div>
            <p className="text-[11px] text-[#8C8078] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#FAF8F5] border border-[#EFE9E1] rounded-2xl p-3 text-xs text-[#7A6E65]">
        💡 Jenis Cat Show tidak menerbitkan badge. Keikutsertaan tetap tercatat di riwayat event peserta.
      </div>
    </div>
  );
}