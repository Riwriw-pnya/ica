"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import StoreOrderHistoryMobile from "./StoreOrderHistoryMobile";
import StoreProductDetailMobile from "./StoreProductDetailMobile";
import StoreCartMobile, { CartItem } from "./StoreCartMobile";
import StoreCheckoutMobile from "./StoreCheckoutMobile";
import StorePaymentMobile from "./StorePaymentMobile";
import StoreOrderDetailMobile, { OrderDetailData } from "./StoreOrderDetailMobile";

export interface Product {
  id: string;
  title: string;
  category: "apparel" | "aksesori" | "publikasi" | "perawatan";
  categoryLabel: string;
  price: number;
  stock: number;
  image?: string;
  badge?: "Terlaris" | "Baru" | "Stok terbatas";
}

interface Category {
  id: string;
  label: string;
}

export interface StoreMobileProps {
  products: Product[];
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  totalCartItems: number;
  isCartOpenProp?: boolean;
  setIsCartOpen?: (open: boolean) => void;
  formatRupiah: (val: number) => string;
}

export default function StoreMobile({
  products,
  categories,
  activeCategory,
  setActiveCategory,
  addToCart,
  totalCartItems,
  isCartOpenProp,
  setIsCartOpen: setIsCartOpenExternal,
  formatRupiah,
}: StoreMobileProps) {
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isCartOpenInternal, setIsCartOpenInternal] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);

  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetailData | null>(null);

  // FUNGSI PAKSA BUKA KERANJANG
  const forceOpenCart = () => {
    setSelectedProduct(null);
    setShowHistory(false);
    setIsCheckoutOpen(false);
    setIsPaymentOpen(false);
    setIsOrderDetailOpen(false);
    setIsCartOpenInternal(true);
    if (setIsCartOpenExternal) setIsCartOpenExternal(true);
  };

  const handleCloseCart = () => {
    setIsCartOpenInternal(false);
    if (setIsCartOpenExternal) setIsCartOpenExternal(false);
  };

  // TANGKAP SINKRONISASI PROP PARENT
  useEffect(() => {
    if (isCartOpenProp) {
      forceOpenCart();
    }
  }, [isCartOpenProp]);

  // TANGKAP EVENT DARI HEADER GLOBAL
  useEffect(() => {
    const handleCartEvent = () => {
      forceOpenCart();
    };

    window.addEventListener("open-store-cart", handleCartEvent);
    window.addEventListener("open-mobile-cart", handleCartEvent);

    return () => {
      window.removeEventListener("open-store-cart", handleCartEvent);
      window.removeEventListener("open-mobile-cart", handleCartEvent);
    };
  }, []);

  const isCartOpen = isCartOpenProp || isCartOpenInternal;

  const [paymentData, setPaymentData] = useState<{
    address: { name: string; phone: string; address: string; city: string };
    courierName: string;
    courierPrice: number;
    totalPayable: number;
  }>({
    address: {
      name: "Ayu Prameswari",
      phone: "0812-2045-7781",
      address: "Jl. Cigadung Raya Barat No. 18, Cibeunying Kaler",
      city: "Kota Bandung",
    },
    courierName: "JNE · REG · estimasi 2–3 hari",
    courierPrice: 11000,
    totalPayable: 846000,
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const toteBag = products.find((p) => p.title.toLowerCase().includes("tote"));
    const kaosIca = products.find((p) => p.title.toLowerCase().includes("kaos"));

    return [
      {
        id: toteBag?.id || "1",
        title: toteBag?.title || "Tote Bag Kanvas ICA",
        variant: "Warna: Natural",
        price: toteBag?.price || 95000,
        quantity: 1,
        image: toteBag?.image,
      },
      {
        id: kaosIca?.id || "2",
        title: kaosIca?.title || "Kaos ICA Official 2026",
        variant: "Ukuran: M",
        price: kaosIca?.price || 185000,
        quantity: 4,
        image: kaosIca?.image,
      },
    ];
  });

  const cartBadgeCount =
    totalCartItems || cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleUpdateQuantity = (id: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="block sm:hidden w-full bg-[#F7F5F0] font-sans pb-28 pt-2">
      {/* Katalog Utama */}
      <div className="px-4 space-y-3">
        <p className="text-xs text-[#857B72] leading-relaxed">
          Merchandise, publikasi, dan perlengkapan resmi yang diterbitkan ICA. Pesanan dikemas sekretariat setelah pembayaran terverifikasi.
        </p>

        {/* Filter Kategori */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 pt-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-[#FFF2E8] text-[#D96B27] font-bold border border-[#FADEC9]"
                  : "bg-white text-[#857B72] border border-[#EAE5DF]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-[#857B72]">{products.length} produk</span>
          <button
            type="button"
            onClick={() => setShowHistory(true)}
            className="font-semibold text-[#D96B27] hover:underline cursor-pointer"
          >
            Riwayat pemesanan
          </button>
        </div>

        {/* Grid Produk */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="overflow-hidden rounded-2xl bg-white border border-[#F2ECE6] shadow-xs flex flex-col justify-between cursor-pointer active:scale-98 transition-transform"
            >
              <div className="relative h-36 w-full bg-[#F8F6F2] flex flex-col items-center justify-center overflow-hidden">
                {product.badge && (
                  <span className="absolute top-2.5 left-2.5 rounded-md bg-[#FFF2E8] px-2 py-0.5 text-[10px] font-semibold text-[#D96B27] z-10 border border-[#FADEC9]">
                    {product.badge}
                  </span>
                )}

                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-[#A09387]">
                    <svg
                      className="w-7 h-7 stroke-[1.2]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-[10px]">Foto produk</span>
                  </div>
                )}
              </div>

              <div className="p-3 space-y-1">
                <h3 className="text-xs font-bold text-[#1F1B18] line-clamp-2 leading-snug">
                  {product.title}
                </h3>
                <p className="text-xs font-extrabold text-[#D96B27]">
                  {formatRupiah(product.price)}
                </p>
                <p className="text-[10px] text-[#857B72]">
                  Stok {product.stock}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-pages Overlay */}
      {selectedProduct && (
        <StoreProductDetailMobile
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onOpenCart={forceOpenCart}
          addToCart={addToCart}
          totalCartItems={cartBadgeCount}
          formatRupiah={formatRupiah}
        />
      )}

      {showHistory && (
        <StoreOrderHistoryMobile
          onClose={() => setShowHistory(false)}
          formatRupiah={formatRupiah}
        />
      )}

      {/* SUB-PAGE KERANJANG BELANJA OVERLAY */}
      {isCartOpen && (
        <StoreCartMobile
          cartItems={cartItems}
          onBack={handleCloseCart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onProceedToCheckout={() => {
            handleCloseCart();
            setIsCheckoutOpen(true);
          }}
          formatRupiah={formatRupiah}
        />
      )}

      {/* Checkout */}
      {isCheckoutOpen && (
        <StoreCheckoutMobile
          cartItems={cartItems}
          onBack={() => {
            setIsCheckoutOpen(false);
            forceOpenCart();
          }}
          formatRupiah={formatRupiah}
          onProceedToPayment={(data) => {
            setPaymentData(data);
            setIsCheckoutOpen(false);
            setIsPaymentOpen(true);
          }}
        />
      )}

      {/* Pembayaran */}
      {isPaymentOpen && (
        <StorePaymentMobile
          cartItems={cartItems}
          totalPayable={paymentData.totalPayable}
          courierName={paymentData.courierName}
          courierPrice={paymentData.courierPrice}
          shippingAddress={paymentData.address}
          onBack={() => {
            setIsPaymentOpen(false);
            setIsCheckoutOpen(true);
          }}
          formatRupiah={formatRupiah}
          onSuccessPayment={() => {
            const itemsCount = cartItems.reduce((a, b) => a + b.quantity, 0);
            const firstItemTitle = cartItems[0]?.title || "Produk Store ICA";

            const newOrder: OrderDetailData = {
              orderId: `MRC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
              orderDate: "25 Sep 2026",
              itemsSummary: `${firstItemTitle} · ${itemsCount} barang`,
              paymentMethod: "QRIS",
              totalAmount: paymentData.totalPayable,
              courier: paymentData.courierName,
              shippingAddress: paymentData.address,
            };

            setCompletedOrder(newOrder);
            setCartItems([]);
            setIsPaymentOpen(false);
            setIsOrderDetailOpen(true);
          }}
        />
      )}

      {/* Detail Pesanan Selesai */}
      {isOrderDetailOpen && completedOrder && (
        <StoreOrderDetailMobile
          order={completedOrder}
          onBack={() => setIsOrderDetailOpen(false)}
          formatRupiah={formatRupiah}
        />
      )}
    </div>
  );
}