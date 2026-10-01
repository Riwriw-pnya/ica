"use client";

interface Props {
  message: string;
  onClose: () => void;
  onViewCart: () => void;
}

export default function StoreToastDesktop({
  message,
  onClose,
  onViewCart,
}: Props) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out">
      <div className="bg-[#1F1B18] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#38302B] flex items-center gap-3 min-w-[320px] max-w-[440px]">
        <div className="w-6 h-6 rounded-full bg-[#16A34A] flex items-center justify-center shrink-0">
          <svg
            className="w-3.5 h-3.5 text-white stroke-[3]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <p className="text-xs font-medium text-white truncate flex-1">
          {message}
        </p>

        <button
          type="button"
          onClick={() => {
            onClose();
            onViewCart();
          }}
          className="text-xs font-bold text-[#D96B27] hover:text-[#f05a1b] hover:underline cursor-pointer shrink-0 transition-colors"
        >
          Lihat
        </button>
      </div>
    </div>
  );
}