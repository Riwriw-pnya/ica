"use client";

import React from "react";

export default function NotificationsPage() {
  
  // Data dikelompokkan dan disesuaikan kombinasinya (Foto 1 Layout + Foto 2 Data)
  const groupedNotifications = [
    {
      label: "HARI INI",
      items: [
        {
          id: 1,
          title: "MR-2026-0138 perlu revisi",
          desc: "Admin ICA wilayah Bandung meminta sertifikat induk yang lebih jelas.",
          time: "15 menit lalu",
          badge: "Pengajuan",
          badgeColors: "bg-blue-50 text-blue-600",
          iconBg: "bg-blue-50 text-blue-500",
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          action: "Status pengajuan",
          isUnread: true,
        },
        {
          id: 2,
          title: "Pesanan ICA-ST-2026-0902 dikirim",
          desc: "SiCepat REG - resi 0023 8841 7720.",
          time: "2 jam lalu",
          badge: "Pesanan",
          badgeColors: "bg-emerald-50 text-emerald-600",
          iconBg: "bg-emerald-50 text-emerald-500",
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          ),
          action: "Detail pesanan",
          isUnread: true,
        }
      ]
    },
    {
      label: "SEBELUMNYA",
      items: [
        {
          id: 3,
          title: "Vaksin Rabies Kirana belum diberikan",
          desc: "Jadwal disarankan Okt 2026. Booking lewat Mitra Klinik Pelihara.",
          time: "Kemarin · 08:00",
          badge: "Kesehatan",
          badgeColors: "bg-amber-50 text-amber-600",
          iconBg: "bg-amber-50 text-amber-500",
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          ),
          action: "Jadwalkan",
          isUnread: true,
        },
        {
          id: 4,
          title: "Pendaftaran ICA Cat Show Bandung 2026 dibuka",
          desc: "Kuota Cattery tersisa 2 slot.",
          time: "23 Sep 2026",
          badge: "Event",
          badgeColors: "bg-emerald-50 text-emerald-600",
          iconBg: "bg-emerald-50 text-emerald-500",
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          ),
          action: "Detail event",
          isUnread: true,
        },
        {
          id: 5,
          title: "MR-2026-0131 disetujui",
          desc: "Pedigree 5 kitten diterbitkan admin ICA.",
          time: "09 Agu 2026",
          badge: "Pengajuan",
          badgeColors: "bg-blue-50 text-blue-600",
          iconBg: "bg-blue-50 text-blue-500",
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          action: "Lihat pedigree",
          isUnread: false,
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#faf8f5] font-sans pb-24">
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {groupedNotifications.map((group, gIndex) => (
          <div key={gIndex} className="mb-6">
            <h2 className="text-[11px] font-bold text-[#8C8074] uppercase tracking-wider mb-3 ml-1">
              {group.label}
            </h2>
            
            <div className="bg-white rounded-2xl border border-[#F5E6DA] shadow-xs overflow-hidden">
              {group.items.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`p-4 flex gap-3 transition-colors hover:bg-slate-50 ${
                    index < group.items.length - 1 ? 'border-b border-[#F5E6DA]' : ''
                  }`}
                >
                  {/* Icon Box */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
                    {item.icon}
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h3 className={`font-bold text-[13px] leading-snug ${item.isUnread ? 'text-[#1a1513]' : 'text-[#6E6359]'}`}>
                        {item.title}
                      </h3>
                      {/* Red Dot Unread Indicator */}
                      {item.isUnread && (
                        <div className="w-2 h-2 rounded-full bg-[#F05A1B] shrink-0 mt-1"></div>
                      )}
                    </div>
                    
                    <p className="text-[11px] text-[#8c8074] leading-relaxed mb-3 pr-2">
                      {item.desc}
                    </p>
                    
                    {/* Badge & Action Footer */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${item.badgeColors}`}>
                          {item.badge}
                        </span>
                        <span className="text-[10px] text-[#a89c91] font-medium">{item.time}</span>
                      </div>
                      
                      <button className="text-[10px] font-bold text-[#F05A1B] flex items-center gap-0.5 hover:text-[#D95D1E] cursor-pointer">
                        {item.action}
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
      </div>
    </main>
  );
}