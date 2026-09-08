"use client";

import { useState } from "react";

interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
  date: string;
  description: string;
}

const VIDEO_DATA: VideoItem[] = [
  {
    id: "v1",
    youtubeId: "yOF-xfA8IXE", 
    title: "Kolaborasi Trans7 Club Corner & ICA: Seni Merawat Kucing",
    category: "Liputan Media",
    date: "18 Oktober 2021",
    description:
      "Bincang-bincang edukatif bersama Indonesian Cat Association di Trans7 seputar tips, perawatan, dan kesehatan kucing kesayangan.",
  },
  {
    id: "v2",
    youtubeId: "gbkmjHBq2QM",
    title: "Virtual Propaganda Cat Show ICA Lampung 2024",
    category: "Event Highlight",
    date: "09 Juni 2024",
    description:
      "Keseruan pameran dan kontes kucing virtual yang diselenggarakan oleh Perda ICA Lampung.",
  },
  {
    id: "v3",
    youtubeId: "dQw4w9WgXcQ",
    title: "Edukasi Standar Ras Kucing & Tata Cara Cattery ICA",
    category: "Edukasi",
    date: "12 Januari 2025",
    description:
      "Panduan lengkap mengenal standar ras resmi dan cara mendaftarkan cattery di Indonesian Cat Association.",
  },
];

export default function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(VIDEO_DATA[0]);

  return (
    <section className="bg-[#FAF4F0] py-16 md:py-24 px-4 md:px-6 border-y border-[#E9E2DC]">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#EE6B28]/10 text-[#EE6B28] text-xs font-bold tracking-widest uppercase">
            Media & Liputan
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#231A14] tracking-tight">
            Indonesian Cat Association <span className="text-[#EE6B28]">Channel</span>
          </h2>
          <p className="text-xs md:text-sm text-[#7A6E65]">
            Tonton dokumentasi kegiatan, liputan media nasional, dan panduan edukasi perawatan kucing resmi dari ICA.
          </p>
        </div>

        {/* Video Player Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Video Display (2 Kolom di Desktop) */}
          <div className="lg:col-span-2 bg-white p-4 md:p-5 rounded-2xl border border-[#E9E2DC] shadow-xs space-y-4">
            {/* Embed Iframe Responsive */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black shadow-inner">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=0`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Main Video Info */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#FFF0E6] text-[#EE6B28] text-[11px] font-bold rounded-full uppercase tracking-wider">
                  {activeVideo.category}
                </span>
                <span className="text-xs text-[#A89F95] font-medium">
                  {activeVideo.date}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#231A14] leading-snug">
                {activeVideo.title}
              </h3>
              <p className="text-xs md:text-sm text-[#7A6E65] leading-relaxed">
                {activeVideo.description}
              </p>
            </div>
          </div>

          {/* Playlist / Video Lainnya (1 Kolom di Desktop) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#231A14] uppercase tracking-wider flex items-center gap-2">
              <svg className="w-4 h-4 text-[#EE6B28]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
              </svg>
              Daftar Video Lainnya
            </h3>

            <div className="space-y-3">
              {VIDEO_DATA.map((video) => {
                const isActive = video.id === activeVideo.id;

                return (
                  <button
                    key={video.id}
                    onClick={() => setActiveVideo(video)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex gap-3 items-center group ${
                      isActive
                        ? "bg-white border-[#EE6B28] shadow-md ring-1 ring-[#EE6B28]"
                        : "bg-white/60 border-[#E9E2DC] hover:bg-white hover:border-[#EE6B28]/50"
                    }`}
                  >
                    {/* Mini Thumbnail Placeholder / Play Icon */}
                    <div className={`relative w-24 h-16 rounded-xl shrink-0 overflow-hidden flex items-center justify-center ${
                      isActive ? "bg-[#EE6B28]" : "bg-[#231A14]"
                    }`}>
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          isActive ? "bg-[#EE6B28] text-white" : "bg-white/90 text-[#231A14]"
                        }`}>
                          <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Mini Info */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#EE6B28] uppercase">
                        {video.category}
                      </span>
                      <h4 className={`text-xs font-bold line-clamp-2 mt-0.5 ${
                        isActive ? "text-[#EE6B28]" : "text-[#231A14]"
                      }`}>
                        {video.title}
                      </h4>
                      <p className="text-[10px] text-[#A89F95] mt-1">
                        {video.date}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* CTA Subscribe YouTube */}
            <a
              href="https://www.youtube.com/@indonesiancatassociation"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full py-3 px-4 bg-[#231A14] hover:bg-black text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>Subscribe YouTube ICA Official</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}