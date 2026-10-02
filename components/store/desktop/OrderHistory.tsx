"use client";

export interface OrderHistoryItem {
  id: string;
  orderId: string;
  status: "Diproses" | "Dikirim" | "Dalam Perjalanan" | "Sampai Tujuan";
  summary: string;
  date: string;
  paymentMethod: string;
  courierInfo?: string;
  total: number;
  productImage?: string;
}

interface Props {
  orders: OrderHistoryItem[];
  onBack: () => void;
  onOpenDetail: (order: OrderHistoryItem) => void;
  formatRupiah: (value: number) => string;
}

export default function StoreOrderHistoryDesktop({
  orders,
  onBack,
  onOpenDetail,
  formatRupiah,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#1A1513]">
            Riwayat Pesanan
          </h1>
          <p className="mt-1 text-xs text-[#8A7E78]">
            Lihat daftar pesanan yang pernah kamu lakukan.
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer rounded-xl border border-[#EEDFD5] bg-white px-4 py-2 text-xs font-bold text-[#5E514A] transition-all hover:bg-[#FAF7F5]"
        >
          Kembali
        </button>
      </div>

      {/* Order List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <button
            key={order.id}
            type="button"
            onClick={() => onOpenDetail(order)}
            className="group flex w-full cursor-pointer items-center justify-between rounded-2xl border border-[#EEDFD5] bg-white p-5 text-left shadow-2xs transition-all hover:border-[#FADEC9] hover:shadow-sm"
          >
            <div className="flex min-w-0 flex-1 items-center gap-4">
              {/* Product preview */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#F0E7E2] bg-[#FAF7F5]">
                {order.productImage ? (
                  <img
                    src={order.productImage}
                    alt={order.summary}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-[10px] font-semibold text-[#B4A9A3]">
                    ICA
                  </div>
                )}
              </div>

              {/* Order info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-[#1A1513]">
                    {order.orderId}
                  </p>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                      order.status === "Sampai Tujuan"
                        ? "bg-[#EAF7EE] text-[#31834A]"
                        : order.status === "Dikirim" ||
                            order.status === "Dalam Perjalanan"
                          ? "bg-[#FFF4E8] text-[#D66A20]"
                          : "bg-[#F3F0EE] text-[#756962]"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <p className="mt-1 truncate text-xs text-[#6F625C]">
                  {order.summary}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#9A8D86]">
                  <span>{order.date}</span>
                  <span>•</span>
                  <span>{order.paymentMethod}</span>

                  {order.courierInfo && (
                    <>
                      <span>•</span>
                      <span>{order.courierInfo}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Total + arrow */}
            <div className="ml-4 flex shrink-0 items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] text-[#9A8D86]">Total</p>

                <p className="mt-0.5 text-sm font-bold text-[#1A1513]">
                  {formatRupiah(order.total)}
                </p>
              </div>

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="text-[#B7AAA3] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#EE6B28]"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}