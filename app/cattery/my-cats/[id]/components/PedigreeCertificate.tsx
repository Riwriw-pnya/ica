"use client";

import React from "react";

export interface PedigreeCatData {
  catName: string;
  registrationNo: string;
  owner: string;
  breeder: string;
  breed: string;
  gender: string;
  dateOfBirth: string;
  emsCode: string;
  microchipNo: string;
  issuePlaceDate: string;
  // Gen 1 (Parents)
  sire: { name: string; reg: string; ems: string };
  dam: { name: string; reg: string; ems: string };
  // Gen 2 (Grandparents)
  paternalGrandSire: { name: string; reg: string; ems: string };
  paternalGrandDam: { name: string; reg: string; ems: string };
  maternalGrandSire: { name: string; reg: string; ems: string };
  maternalGrandDam: { name: string; reg: string; ems: string };
  // Gen 3 (Great-Grandparents)
  gGrandSire1: { name: string; reg: string; ems: string };
  gGrandDam1: { name: string; reg: string; ems: string };
  gGrandSire2: { name: string; reg: string; ems: string };
  gGrandDam2: { name: string; reg: string; ems: string };
  gGrandSire3: { name: string; reg: string; ems: string };
  gGrandDam3: { name: string; reg: string; ems: string };
  gGrandSire4: { name: string; reg: string; ems: string };
  gGrandDam4: { name: string; reg: string; ems: string };
}

// Data Cadangan Default diselaraskan dengan Kucing ID 1 (Bagas of Rumah Hana) dari cattery.ts
export const DEFAULT_PEDIGREE_DATA: PedigreeCatData = {
  catName: "Bagas of Rumah Hana",
  registrationNo: "ICA-2022-0091",
  owner: "Hana Prameswari",
  breeder: "Rumah Hana Cattery",
  breed: "Persian",
  gender: "Jantan (Male)",
  dateOfBirth: "12 Mar 2022",
  emsCode: "PER n 22",
  microchipNo: "360 0980 0447 0112",
  issuePlaceDate: "Bandung, 12 Mar 2022",
  sire: {
    name: "Kaisar of Melati",
    reg: "ICA-2019-0033",
    ems: "PER n 09",
  },
  dam: {
    name: "Ratu Bilqis",
    reg: "ICA-2019-0040",
    ems: "PER a 10",
  },
  paternalGrandSire: {
    name: "Raja Melati",
    reg: "ICA-2016-0011",
    ems: "PER n 05",
  },
  paternalGrandDam: {
    name: "Cempaka",
    reg: "ICA-2016-0022",
    ems: "PER a 06",
  },
  maternalGrandSire: {
    name: "Sultan Bilqis",
    reg: "ICA-2016-0035",
    ems: "PER n 04",
  },
  maternalGrandDam: {
    name: "Melur",
    reg: "ICA-2016-0041",
    ems: "PER f 05",
  },
  gGrandSire1: { name: "Alma's Dogreses", reg: "REG-012", ems: "PER n" },
  gGrandDam1: { name: "Meely Day", reg: "REG-345", ems: "PER n 09" },
  gGrandSire2: { name: "Frosia Trea", reg: "REG-908", ems: "PER a 06" },
  gGrandDam2: { name: "Cleopatra Romanova", reg: "REG-115", ems: "PER a 10" },
  gGrandSire3: { name: "Sandy B Mix", reg: "REG-552", ems: "PER n 04" },
  gGrandDam3: { name: "Chantallines Sun", reg: "REG-771", ems: "PER f 05" },
  gGrandSire4: { name: "Farah Farecia", reg: "REG-339", ems: "PER n" },
  gGrandDam4: { name: "Robert Divinia", reg: "REG-944", ems: "PER a" },
};

export default function PedigreeCertificate({
  data = DEFAULT_PEDIGREE_DATA,
}: {
  data?: PedigreeCatData;
}) {
  return (
    <div
      id="pedigree-certificate-area"
      className="relative w-[800px] h-[1131px] mx-auto select-none bg-white shadow-2xl overflow-hidden font-sans text-[#1F1B18]"
    >
      {/* 1. GAMBAR TEMPLATE KOSONG */}
      <img
        src="/images/template/template-pedigreeICA.png"
        alt="Template Pedigree ICA"
        className="absolute inset-0 w-full h-full object-contain z-0 pointer-events-none"
      />

      {/* 2. OVERLAY TEKS DATA DINAMIS */}
      <div className="absolute inset-0 z-10 font-sans">
        
        {/* NAMA KUCING & REGISTRATION NO */}
        <div className="absolute top-[185px] left-[76px] w-[500px]">
          <h1 className="text-[17px] font-black text-[#1F1B18] tracking-tight leading-tight truncate">
            {data.catName}
          </h1>
        </div>

        <div className="absolute top-[185px] right-[76px] text-right">
          <span className="text-[15px] font-extrabold text-[#1F1B18] tracking-wide">
            {data.registrationNo}
          </span>
        </div>

        {/* OWNER & BREEDER */}
        <div className="absolute top-[245px] left-[76px] w-[330px]">
          <p className="font-extrabold text-[#1F1B18] text-[13px] truncate">
            {data.owner}
          </p>
        </div>

        <div className="absolute top-[245px] left-[416px] w-[300px]">
          <p className="font-extrabold text-[#1F1B18] text-[13px] truncate">
            {data.breeder}
          </p>
        </div>

        {/* KETERANGAN KUCING (BREED, GENDER, DOB, EMS) */}
        <div className="absolute top-[295px] left-[76px] w-[160px]">
          <p className="font-extrabold text-[#1F1B18] text-[12px] truncate">
            {data.breed}
          </p>
        </div>

        <div className="absolute top-[295px] left-[243px] w-[150px]">
          <p className="font-extrabold text-[#1F1B18] text-[12px] truncate">
            {data.gender}
          </p>
        </div>

        <div className="absolute top-[295px] left-[408px] w-[165px]">
          <p className="font-extrabold text-[#1F1B18] text-[12px] truncate">
            {data.dateOfBirth}
          </p>
        </div>

        <div className="absolute top-[295px] left-[573px] w-[150px]">
          <p className="font-extrabold text-[#1F1B18] text-[12px] truncate">
            {data.emsCode}
          </p>
        </div>

        {/* ==================================================== */}
        {/* GENERASI 1 (PARENTS)                                 */}
        {/* ==================================================== */}
        {/* SIRE (AYAH) */}
        <div className="absolute top-[476px] left-[108px] w-[200px] space-y-0.5">
          <p className="font-extrabold text-[11px] text-[#1F1B18] leading-normal">
            {data.sire.name}
          </p>
          <p className="text-[9px] font-medium leading-normal text-[#70665D]">
            {data.sire.reg} &nbsp; {data.sire.ems}
          </p>
        </div>

        {/* DAM (IBU) */}
        <div className="absolute top-[696px] left-[108px] w-[200px] space-y-0.5">
          <p className="font-extrabold text-[11px] text-[#1F1B18] leading-normal">
            {data.dam.name}
          </p>
          <p className="text-[9px] font-medium leading-normal text-[#70665D]">
            {data.dam.reg} &nbsp; {data.dam.ems}
          </p>
        </div>

        {/* ==================================================== */}
        {/* GENERASI 2 (GRANDPARENTS)                            */}
        {/* ==================================================== */}
        {/* PATERNAL GRANDSIRE */}
        <div className="absolute top-[420px] left-[321px] w-[190px] space-y-0.5">
          <p className="font-extrabold text-[10px] text-[#1F1B18] leading-tight truncate">
            {data.paternalGrandSire.name}
          </p>
          <p className="text-[8px] text-[#70665D]">
            {data.paternalGrandSire.reg} &nbsp; {data.paternalGrandSire.ems}
          </p>
        </div>

        {/* PATERNAL GRANDDAM */}
        <div className="absolute top-[533px] left-[321px] w-[190px] space-y-0.5">
          <p className="font-extrabold text-[10px] text-[#1F1B18] leading-tight truncate">
            {data.paternalGrandDam.name}
          </p>
          <p className="text-[8px] text-[#70665D]">
            {data.paternalGrandDam.reg} &nbsp; {data.paternalGrandDam.ems}
          </p>
        </div>

        {/* MATERNAL GRANDSIRE */}
        <div className="absolute top-[640px] left-[321px] w-[190px] space-y-0.5">
          <p className="font-extrabold text-[10px] text-[#1F1B18] leading-tight truncate">
            {data.maternalGrandSire.name}
          </p>
          <p className="text-[8px] text-[#70665D]">
            {data.maternalGrandSire.reg} &nbsp; {data.maternalGrandSire.ems}
          </p>
        </div>

        {/* MATERNAL GRANDDAM */}
        <div className="absolute top-[753px] left-[321px] w-[190px] space-y-0.5">
          <p className="font-extrabold text-[10px] text-[#1F1B18] leading-tight truncate">
            {data.maternalGrandDam.name}
          </p>
          <p className="text-[8px] text-[#70665D]">
            {data.maternalGrandDam.reg} &nbsp; {data.maternalGrandDam.ems}
          </p>
        </div>

        {/* ==================================================== */}
        {/* GENERASI 3 (GREAT-GRANDPARENTS)                      */}
        {/* ==================================================== */}
        {/* G.GRANDSIRE 1 */}
        <div className="absolute top-[393px] right-[104px] w-[160px] space-y-0.5">
          <p className="font-extrabold text-[9px] text-[#1F1B18] leading-tight truncate">
            {data.gGrandSire1.name}
          </p>
          <p className="text-[8px] text-[#70665D]">
            {data.gGrandSire1.reg} &nbsp; {data.gGrandSire1.ems}
          </p>
        </div>

        {/* G.GRANDDAM 1 */}
        <div className="absolute top-[448px] right-[104px] w-[160px] space-y-0.5">
          <p className="font-extrabold text-[9px] text-[#1F1B18] leading-tight truncate">
            {data.gGrandDam1.name}
          </p>
          <p className="text-[8px] text-[#70665D]">
            {data.gGrandDam1.reg} &nbsp; {data.gGrandDam1.ems}
          </p>
        </div>

        {/* G.GRANDSIRE 2 */}
        <div className="absolute top-[503px] right-[104px] w-[160px] space-y-0.5">
          <p className="font-extrabold text-[9px] text-[#1F1B18] leading-tight truncate">
            {data.gGrandSire2.name}
          </p>
          <p className="text-[8px] text-[#70665D]">
            {data.gGrandSire2.reg} &nbsp; {data.gGrandSire2.ems}
          </p>
        </div>

        {/* G.GRANDDAM 2 */}
        <div className="absolute top-[558px] right-[104px] w-[160px] space-y-0.5">
          <p className="font-extrabold text-[9px] text-[#1F1B18] leading-tight truncate">
            {data.gGrandDam2.name}
          </p>
          <p className="text-[8px] text-[#70665D]">
            {data.gGrandDam2.reg} &nbsp; {data.gGrandDam2.ems}
          </p>
        </div>

        {/* G.GRANDSIRE 3 */}
        <div className="absolute bottom-[494px] right-[104px] w-[160px] space-y-0.5">
          <p className="font-extrabold text-[9px] text-[#1F1B18] leading-tight truncate">
            {data.gGrandSire3.name}
          </p>
          <p className="text-[8px] text-[#70665D]">
            {data.gGrandSire3.reg} &nbsp; {data.gGrandSire3.ems}
          </p>
        </div>

        {/* G.GRANDDAM 3 */}
        <div className="absolute bottom-[438px] right-[104px] w-[160px] space-y-0.5">
          <p className="font-extrabold text-[9px] text-[#1F1B18] leading-tight truncate">
            {data.gGrandDam3.name}
          </p>
          <p className="text-[8px] text-[#70665D]">
            {data.gGrandDam3.reg} &nbsp; {data.gGrandDam3.ems}
          </p>
        </div>

        {/* G.GRANDSIRE 4 */}
        <div className="absolute bottom-[383px] right-[104px] w-[160px] space-y-0.5">
          <p className="font-extrabold text-[9px] text-[#1F1B18] leading-tight truncate">
            {data.gGrandSire4.name}
          </p>
          <p className="text-[8px] text-[#70665D]">
            {data.gGrandSire4.reg} &nbsp; {data.gGrandSire4.ems}
          </p>
        </div>

        {/* G.GRANDDAM 4 */}
        <div className="absolute bottom-[328px] right-[104px] w-[160px] space-y-0.5">
          <p className="font-extrabold text-[9px] text-[#1F1B18] leading-tight truncate">
            {data.gGrandDam4.name}
          </p>
          <p className="text-[8px] text-[#70665D]">
            {data.gGrandDam4.reg} &nbsp; {data.gGrandDam4.ems}
          </p>
        </div>

        {/* ==================================================== */}
        {/* FOOTER INFO: MICROCHIP & TANGGAL TERBIT              */}
        {/* ==================================================== */}
        {/* MICROCHIP NO */}
        <div className="absolute bottom-[220px] left-[107px]">
          <span className="text-[11px] font-black text-[#1F1B18] tracking-wider">
            {data.microchipNo}
          </span>
        </div>

        {/* TEMPAT & TANGGAL TERBIT */}
        <div className="absolute bottom-[217px] right-[76px] text-right">
          <span className="text-[12px] font-extrabold text-[#1F1B18]">
            {data.issuePlaceDate}
          </span>
        </div>

      </div>
    </div>
  );
}