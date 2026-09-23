"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export interface ShareableEvent {
  id: string;
  slug: string;
  title: string;
  activePeriod?: string;
  shareUrl?: string; // Menyimpan URL publik yang terpisah dari domain admin
}

interface ShareEventModalProps {
  event: ShareableEvent | null;
  onClose: () => void;
  onShowToast?: (
    title: string,
    message: string,
    options?: { variant?: "payment" | "outlined"; tone?: "success" | "error" | "info"; duration?: number }
  ) => void;
}

export default function ShareEventModal({
  event,
  onClose,
  onShowToast,
}: ShareEventModalProps) {
  const [copied, setCopied] = useState(false);

  if (!event) return null;

  // Gunakan shareUrl jika dikirim dari parent, atau fallback ke domain default
  const getEventUrl = () => {
    if (event.shareUrl) return event.shareUrl;
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://ica.or.id";
    return `${origin}/event/${event.slug}`;
  };

  const eventUrl = getEventUrl();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(eventUrl);
    setCopied(true);
    if (onShowToast) {
      onShowToast(
        "Link disalin!",
        `Link event "${event.title}" berhasil disalin ke clipboard.`,
        { tone: "success" }
      );
    }
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTo = (platform: string) => {
    const url = encodeURIComponent(eventUrl);
    const text = encodeURIComponent(`Ikuti event ${event.title}! Daftar pendaftaran di sini:`);

    let shareUrl = "";
    switch (platform) {
      case "wa":
        shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
        break;
      case "x":
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case "fb":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(event.title)}&body=${text}%20${url}`;
        break;
      case "ig":
        navigator.clipboard.writeText(eventUrl);
        if (onShowToast) {
          onShowToast(
            "Link disalin ke clipboard!",
            "Buka Instagram untuk menempelkan link ke Story/Bio.",
            { tone: "info" }
          );
        } else {
          alert("Link disalin! Buka Instagram untuk membagikan ke Story / Bio.");
        }
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/40 backdrop-blur-xs p-4 sm:p-6">
      <div className="w-full max-w-[500px] max-h-[calc(100vh-3rem)] flex flex-col rounded-2xl bg-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 my-auto">
        
        {/* Header Modal */}
        <div className="flex items-start justify-between p-5 pb-3 border-b border-gray-100 shrink-0">
          <div>
            <h3 className="text-[17px] font-bold text-gray-900">Share event</h3>
            <p className="text-[12px] text-gray-500 mt-0.5">
              Bagikan link pendaftaran war ticketing ke kanal resmi ICA.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body Modal */}
        <div className="p-5 overflow-y-auto space-y-4 text-left">
          {/* Input Field Link & Button Salin Tautan */}
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/50 p-1.5 pl-3.5">
            <input
              type="text"
              readOnly
              value={eventUrl}
              className="w-full bg-transparent text-[12px] text-gray-700 outline-none truncate"
            />
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 shrink-0 rounded-full border border-[var(--color-brand-orange-700)]/70 bg-white px-3 py-1 text-[11px] font-semibold text-[var(--color-brand-orange-700)] hover:bg-orange-50 transition-all cursor-pointer"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              {copied ? "Tersalin!" : "Salin tautan"}
            </button>
          </div>

          {/* Grid Bagikan Ke Media Sosial */}
          <div>
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              BAGIKAN KE
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
              {[
                { key: "wa", name: "WhatsApp", icon: "WA", color: "text-[var(--color-brand-orange-700)] bg-[var(--color-brand-orange-50)] border-[var(--color-brand-orange-300)]/90" },
                { key: "ig", name: "Instagram", icon: "IG", color: "text-[var(--color-brand-orange-700)] bg-[var(--color-brand-orange-50)] border-[var(--color-brand-orange-300)]/90" },
                { key: "fb", name: "Facebook", icon: "FB", color: "text-[var(--color-brand-orange-700)] bg-[var(--color-brand-orange-50)] border-[var(--color-brand-orange-300)]/90" },
                { key: "telegram", name: "Telegram", icon: "TG", color: "text-[var(--color-brand-orange-700)] bg-[var(--color-brand-orange-50)] border-[var(--color-brand-orange-300)]/90" },
                { key: "x", name: "X / Twitter", icon: "X", color: "text-[var(--color-brand-orange-700)] bg-[var(--color-brand-orange-50)] border-[var(--color-brand-orange-300)]/90" },
                { key: "email", name: "Email anggota", icon: "@", color: "text-[var(--color-brand-orange-700)] bg-[var(--color-brand-orange-50)] border-[var(--color-brand-orange-300)]/90" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleShareTo(item.key)}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 p-2 text-[12px] font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded-md border text-[10px] font-extrabold ${item.color}`}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic QR Code Container */}
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
            <div className="shrink-0 p-1 bg-white rounded-lg border border-gray-100 shadow-2xs">
              <QRCodeSVG value={eventUrl} size={60} level="M" />
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              QR code dipakai untuk poster dan story. Peserta yang memindai langsung masuk ke halaman pendaftaran event.
            </p>
          </div>

          {/* Masa Aktif Link */}
          {event.activePeriod && (
            <p className="text-[11px] text-gray-400 text-center pt-1">
              Link pendaftaran aktif {event.activePeriod}.
            </p>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-100 shrink-0">
          <button
            onClick={onClose}
            className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-[12px] font-semibold text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
          >
            Tutup
          </button>
          <button
            onClick={handleCopyLink}
            className="rounded-full bg-gradient-to-b from-[#FFA066] to-[#EE6B28] px-4 py-1.5 text-[12px] font-bold text-white shadow-md hover:brightness-105 transition-all cursor-pointer"
          >
            {copied ? "Tersalin!" : "Salin tautan"}
          </button>
        </div>

      </div>
    </div>
  );
}