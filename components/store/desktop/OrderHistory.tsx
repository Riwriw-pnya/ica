"use client";

import type { OrderHistoryItem } from "../StorePage";

interface Props {
  orders: OrderHistoryItem[];
  onBack: () => void;
  formatRupiah: (value: number) => string;
}

export default function StoreOrderHistoryDesktop({
  orders,
  onBack,
  formatRupiah,
}: Props) {
  const getStatusBadgeStyle = (
    status: OrderHistoryItem["status"]
  ) => {
    switch (status) {
      case "Diproses":
        return "bg-[#FFF2E8] text-[#D96B27] border-[#FADEC9]";

      case "Dikirim":
        return "bg-[#EBF5FF] text-[#0066CC] border-[#C2E0FF]";

      case "Dalam Perjalanan":
        return "bg-[#F3E8FF] text-[#7E22CE] border-[#E9D5FF]";

      case "Sampai Tujuan":
        return "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]";

      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D96B27] hover:underline cursor-pointer"
      >
        <svg
          className="w-4 h-4 stroke-[2.5]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>

        <span>Kembali ke store</span>
      </button>

      <div>
        <h1 className="font-display text-[22px] font-bold tracking-tight text-[#1F1B18]">
          Riwayat pesanan
        </h1>

        <p className="mt-1 text-[12px] text-[#857B72]">
          Pesanan produk Store ICA. Status pengiriman diperbarui
          otomatis dari sistem kurir.
        </p>
      </div>

      <div className="space-y-3.5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl border border-[#EEDFD5] p-5 shadow-2xs flex items-center justify-between hover:border-[#FADEC9] transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FFF8EE] border border-[#F7F2EB] flex items-center justify-center text-[#D96B27] shrink-0 mt-0.5">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-bold text-[#1F1B18]">
                    {order.orderId}
                  </span>

                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${getStatusBadgeStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <p className="text-xs font-semibold text-[#574D45]">
                  {order.summary}
                </p>

                <p className="text-[11px] text-[#8C8074]">
                  {order.date} · {order.paymentMethod}
                  {order.courierInfo &&
                    ` · ${order.courierInfo}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm font-extrabold text-[#1F1B18]">
                {formatRupiah(order.total)}
              </span>

              <svg
                className="w-4 h-4 text-[#C8BDB2] group-hover:text-[#D96B27] group-hover:translate-x-0.5 transition-all"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}