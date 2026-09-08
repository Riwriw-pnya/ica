import type { Product } from "@/types/store";

function formatRupiah(value: number) {
  return `Rp${value.toLocaleString("id-ID")}`;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group cursor-pointer overflow-hidden rounded-xl border border-[var(--color-ink-100)] bg-white transition hover:border-[var(--color-brand-orange-300)] hover:shadow-sm">
      <div className="relative aspect-square bg-[var(--color-background)]">
        {product.image ? (
          <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-[var(--color-ink-100)]">
            <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="9" cy="10" r="2" />
              <path d="M21 16l-5.5-5.5L9 17" />
            </svg>
          </div>
        )}

        {product.discountPercent && (
          <span className="absolute left-2 top-2 rounded-md bg-[var(--color-danger)] px-1.5 py-0.5 text-[10px] font-semibold text-white">
            {product.discountPercent}%
          </span>
        )}
      </div>

      <div className="space-y-1 p-3">
        <p className="line-clamp-2 text-[12px] leading-snug text-[var(--color-ink-900)]">{product.title}</p>

        <div className="flex items-baseline gap-1.5">
          <p className="text-[13px] font-semibold text-[var(--color-ink-900)]">{formatRupiah(product.price)}</p>
          {product.originalPrice && (
            <p className="text-[10px] text-[var(--color-ink-400)] line-through">{formatRupiah(product.originalPrice)}</p>
          )}
        </div>

        <div className="flex items-center gap-1 text-[10px] text-[var(--color-ink-700)]">
          <svg className="h-3 w-3 fill-[var(--color-warning)] text-[var(--color-warning)]" viewBox="0 0 20 20">
            <path d="M10 1l2.6 5.9L19 8l-4.7 4.2L15.5 19 10 15.6 4.5 19l1.2-6.8L1 8l6.4-1.1z" />
          </svg>
          <span>{product.rating.toFixed(1)}</span>
          <span className="text-[var(--color-ink-400)]">· {product.soldLabel}</span>
        </div>

        <p className="truncate text-[10px] text-[var(--color-ink-400)]">{product.location}</p>
      </div>
    </div>
  );
}