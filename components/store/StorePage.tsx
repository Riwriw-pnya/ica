"use client";

import { useState, useMemo, useEffect } from "react";
import StorePaymentDesktop from "./desktop/StorePaymentDesktop";

import StoreMobile from "./mobile/StoreMobile";

import StoreCatalogDesktop from "./desktop/CatalogDesktop";
import StoreProductDetailDesktop from "./desktop/ProductDetailDesktop";
import StoreCartDesktop from "./desktop/CartDesktop";
import StoreOrderHistoryDesktop from "./desktop/OrderHistory";
import StoreToastDesktop from "./desktop/Toast";

import StoreCheckoutDesktop from "./desktop/StoreCheckoutDesktop";
import StoreCheckoutMobile from "./mobile/StoreCheckoutMobile";

export interface Product {
  id: string;
  title: string;
  category: "apparel" | "aksesori" | "publikasi" | "perawatan";
  categoryLabel: string;
  price: number;
  stock: number;
  image?: string;
  badge?: "Terlaris" | "Baru" | "Stok terbatas";
  description?: string;
}

export interface Category {
  id: string;
  label: string;
}

export interface OrderHistoryItem {
  id: string;
  orderId: string;
  status: "Diproses" | "Dikirim" | "Dalam Perjalanan" | "Sampai Tujuan";
  summary: string;
  date: string;
  paymentMethod: string;
  courierInfo?: string;
  total: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

export const INITIAL_CATEGORIES: Category[] = [
  { id: "semua", label: "Semua" },
  { id: "apparel", label: "Apparel" },
  { id: "aksesori", label: "Aksesori" },
  { id: "publikasi", label: "Publikasi" },
  { id: "perawatan", label: "Perawatan" },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Kaos ICA Official 2026",
    category: "apparel",
    categoryLabel: "Apparel",
    price: 185000,
    stock: 48,
    badge: "Terlaris",
    description:
      "Kaos katun bambu premium dengan sablon logo resmi ICA 2026. Nyaman dipakai sehari-hari atau event.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9RVxIUO5Rb9G1qfWawYCygc5ru_KMrPrnfW1ezYp2Nj4hxUnixmyS7mM&s",
  },
  {
    id: "2",
    title: "Polo Shirt Panitia Cat Show",
    category: "apparel",
    categoryLabel: "Apparel",
    price: 245000,
    stock: 22,
    description:
      "Polo lacoste untuk panitia dan steward event resmi ICA. Warna official orange dan navy.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMTdyhgBoM0uyNqIAI9S_TI68hvitWb0yu2vz8R9WetQ&s=10",
  },
  {
    id: "3",
    title: "Tote Bag Kanvas ICA",
    category: "aksesori",
    categoryLabel: "Aksesori",
    price: 95000,
    stock: 60,
    description:
      "Tote bag bahan kanvas tebal dengan kompartemen luas dan resleting utama.",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80",
  },
  {
    id: "4",
    title: "Lanyard & ID Card Holder",
    category: "aksesori",
    categoryLabel: "Aksesori",
    price: 45000,
    stock: 120,
    description:
      "Tali lanyard bahan tisue cetak 2 sisi dilengkapi holder kulit sintetis.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3URMhgKPZcJb9pYj9BpvOM-M0Y7M-EO3tjLJWvVclXg&s=10",
  },
  {
    id: "5",
    title: "Pin Enamel Paw ICA",
    category: "aksesori",
    categoryLabel: "Aksesori",
    price: 35000,
    stock: 200,
    description:
      "Pin logam enamel berkualitas tinggi berbentuk jejak kaki kucing dengan logo ICA.",
    image: "/images/LOGO-ICA.webp",
  },
  {
    id: "6",
    title: "Buku Panduan Breeding & Pedigree",
    category: "publikasi",
    categoryLabel: "Publikasi",
    price: 120000,
    stock: 35,
    badge: "Baru",
    description:
      "Buku panduan lengkap standar pembiakan dan silsilah ras kucing resmi terbitan ICA.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6oh0fvKgQK2Cw5OZ7pW8ccaxLjRJKWPBxG04G9Sug_A&s=10",
  },
  {
    id: "7",
    title: "Formulir Pedigree Fisik (10 lembar)",
    category: "publikasi",
    categoryLabel: "Publikasi",
    price: 60000,
    stock: 90,
    description:
      "Formulir pendaftaran sertifikat pedigree fisik tercetak di kertas khusus.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQC8Gl5VGcIWtKLbBeKEVlUdP2W8Zia3F9ihoZFUAftw&s=10",
  },
  {
    id: "8",
    title: "Grooming Kit Starter",
    category: "perawatan",
    categoryLabel: "Perawatan",
    price: 320000,
    stock: 12,
    badge: "Stok terbatas",
    description:
      "Paket lengkap alat sisir, pemotong kuku, dan sampo perawatan standar show.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9x33g3q-zDoXztUMnxEuCEr2dvkJElkOu5aK92XmYOA&s=10",
  },
];

export const DUMMY_DESKTOP_ORDERS: OrderHistoryItem[] = [
  {
    id: "1",
    orderId: "MRC-2026-0252",
    status: "Diproses",
    summary: "Tote Bag Kanvas ICA (Natural) · 1 barang",
    date: "25 Sep 2026",
    paymentMethod: "QRIS",
    total: 106000,
  },
  {
    id: "2",
    orderId: "MRC-2026-0247",
    status: "Diproses",
    summary:
      "Kaos ICA Official 2026 (L) · Lanyard & ID Card Holder (Orange) · 2 barang",
    date: "22 Sep 2026",
    paymentMethod: "QRIS",
    total: 248000,
  },
  {
    id: "3",
    orderId: "MRC-2026-0231",
    status: "Dikirim",
    summary: "Kaos ICA Official 2026 (L) · 1 barang",
    date: "05 Sep 2026",
    paymentMethod: "Virtual Account BCA",
    courierInfo: "J&T Express JX2300416875",
    total: 205000,
  },
  {
    id: "4",
    orderId: "MRC-2026-0219",
    status: "Dalam Perjalanan",
    summary: "Grooming Kit Starter (Standar) · 1 barang",
    date: "30 Agu 2026",
    paymentMethod: "GoPay",
    courierInfo: "SiCepat 004221889012",
    total: 342000,
  },
  {
    id: "5",
    orderId: "MRC-2026-0205",
    status: "Sampai Tujuan",
    summary: "Buku Panduan Breeding & Pedigree (Cetak) · 1 barang",
    date: "24 Agu 2026",
    paymentMethod: "Virtual Account Mandiri",
    courierInfo: "AnterAja 10002647716520",
    total: 138000,
  },
];

export function formatRupiah(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState<string>("semua");
  const [cart, setCart] = useState<CartItem[]>([]);

  const [showDesktopCart, setShowDesktopCart] = useState(false);
  const [showDesktopHistory, setShowDesktopHistory] = useState(false);
  const [selectedDesktopProduct, setSelectedDesktopProduct] =
    useState<Product | null>(null);

  const [desktopDetailQty, setDesktopDetailQty] = useState<number>(1);
  const [desktopDetailSize, setDesktopDetailSize] = useState<string>("M");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [showDesktopCheckout, setShowDesktopCheckout] =
  useState(false);

const [showDesktopPayment, setShowDesktopPayment] =
  useState(false);

const [desktopCheckoutData, setDesktopCheckoutData] =
  useState<{
    address: {
      name: string;
      phone: string;
      address: string;
      city: string;
      postalCode?: string;
    };
    courierName: string;
    courierPrice: number;
    totalPayable: number;
  } | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === "semua") return INITIAL_PRODUCTS;

    return INITIAL_PRODUCTS.filter(
      (product) => product.category === activeCategory
    );
  }, [activeCategory]);

  const resetAllDesktopViews = () => {
  setSelectedDesktopProduct(null);
  setShowDesktopHistory(false);
  setShowDesktopCart(false);
  setShowDesktopCheckout(false);
  setShowDesktopPayment(false);
  setDesktopCheckoutData(null);
};

  const handleOpenDesktopCart = () => {
    resetAllDesktopViews();
    setShowDesktopCart(true);
  };

  const handleOpenDesktopDetail = (product: Product) => {
    resetAllDesktopViews();
    setSelectedDesktopProduct(product);
    setDesktopDetailQty(1);
    setDesktopDetailSize("M");
  };

  const handleOpenDesktopHistory = () => {
    resetAllDesktopViews();
    setShowDesktopHistory(true);
  };

  const emitCartCountUpdate = (newCartItems: CartItem[]) => {
    const total = newCartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("cart-count-updated", {
          detail: { count: total },
        })
      );
    }
  };

  useEffect(() => {
    const handleCartEvent = () => {
      handleOpenDesktopCart();
    };

    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("open_cart_on_load") === "true"
    ) {
      sessionStorage.removeItem("open_cart_on_load");
      handleOpenDesktopCart();
    }

    window.addEventListener("open-store-cart", handleCartEvent);

    return () => {
      window.removeEventListener("open-store-cart", handleCartEvent);
    };
  }, []);

  const addProductToCart = (
    product: Product,
    quantity: number,
    size?: string
  ) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id && item.size === size
      );

      let updated: CartItem[];

      if (existingIndex > -1) {
        updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
      } else {
        updated = [
          ...prevCart,
          {
            product,
            quantity,
            size,
          },
        ];
      }

      emitCartCountUpdate(updated);

      return updated;
    });
  };

  const handleAddToCartFromDetail = () => {
    if (!selectedDesktopProduct) return;

    addProductToCart(
      selectedDesktopProduct,
      desktopDetailQty,
      desktopDetailSize
    );

    triggerToast(
      `${selectedDesktopProduct.title} ditambahkan ke keranjang`
    );
  };

  const handleBuyNowFromDetail = () => {
    if (!selectedDesktopProduct) return;

    addProductToCart(
      selectedDesktopProduct,
      desktopDetailQty,
      desktopDetailSize
    );

    handleOpenDesktopCart();
  };

  const updateQuantity = (
    productId: string,
    size?: string,
    delta: number = 1
  ) => {
    setCart((prevCart) => {
      const updated = prevCart
        .map((item) => {
          if (
            item.product.id === productId &&
            item.size === size
          ) {
            const newQty = item.quantity + delta;

            return newQty > 0
              ? { ...item, quantity: newQty }
              : null;
          }

          return item;
        })
        .filter((item): item is CartItem => item !== null);

      emitCartCountUpdate(updated);

      return updated;
    });
  };

  const removeCartItem = (productId: string, size?: string) => {
    setCart((prevCart) => {
      const updated = prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.size === size
          )
      );

      emitCartCountUpdate(updated);

      return updated;
    });
  };

  const totalCartItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const totalCartPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

const handleOpenDesktopCheckout = () => {
  setSelectedDesktopProduct(null);
  setShowDesktopHistory(false);
  setShowDesktopCart(false);
  setShowDesktopPayment(false);
  setShowDesktopCheckout(true);
};

const handleProceedToDesktopPayment = (data: {
  address: {
    name: string;
    phone: string;
    address: string;
    city: string;
    postalCode?: string;
  };
  courierName: string;
  courierPrice: number;
  totalPayable: number;
}) => {
  setDesktopCheckoutData(data);
  setShowDesktopCheckout(false);
  setShowDesktopPayment(true);
};



  return (
    <>
      <div className="hidden sm:block mx-auto max-w-[1200px] space-y-6 pb-12 relative">
        {selectedDesktopProduct ? (
  <StoreProductDetailDesktop
    product={selectedDesktopProduct}
    quantity={desktopDetailQty}
    size={desktopDetailSize}
    setQuantity={setDesktopDetailQty}
    setSize={setDesktopDetailSize}
    onBack={resetAllDesktopViews}
    onAddToCart={handleAddToCartFromDetail}
    onBuyNow={handleBuyNowFromDetail}
    formatRupiah={formatRupiah}
  />
) : showDesktopPayment && desktopCheckoutData ? (
  <StorePaymentDesktop
    cartItems={cart}
    totalPayable={desktopCheckoutData.totalPayable}
    courierName={desktopCheckoutData.courierName}
    courierPrice={desktopCheckoutData.courierPrice}
    shippingAddress={desktopCheckoutData.address}
    onBack={() => {
      setShowDesktopPayment(false);
      setShowDesktopCheckout(true);
    }}
    formatRupiah={formatRupiah}
    onSuccessPayment={() => {
      triggerToast("Pembayaran berhasil!");

      setShowDesktopPayment(false);
      setShowDesktopCheckout(false);
      setShowDesktopCart(false);
      setDesktopCheckoutData(null);
      setCart([]);
    }}
  />
) : showDesktopCheckout ? (
  <StoreCheckoutDesktop
    cartItems={cart}
    onBack={() => {
      setShowDesktopCheckout(false);
      setShowDesktopCart(true);
    }}
    formatRupiah={formatRupiah}
    onProceedToPayment={handleProceedToDesktopPayment}
  />
) : showDesktopCart ? (
  <StoreCartDesktop
    cart={cart}
    totalCartItems={totalCartItems}
    totalCartPrice={totalCartPrice}
    onBack={resetAllDesktopViews}
    onUpdateQuantity={updateQuantity}
    onRemoveItem={removeCartItem}
    formatRupiah={formatRupiah}
    onProceedToCheckout={handleOpenDesktopCheckout}
  />
) : showDesktopHistory ? (
  <StoreOrderHistoryDesktop
    orders={DUMMY_DESKTOP_ORDERS}
    onBack={resetAllDesktopViews}
    formatRupiah={formatRupiah}
  />
) : (
  <StoreCatalogDesktop
    products={filteredProducts}
    categories={INITIAL_CATEGORIES}
    activeCategory={activeCategory}
    setActiveCategory={setActiveCategory}
    onOpenProduct={handleOpenDesktopDetail}
    onOpenHistory={handleOpenDesktopHistory}
    formatRupiah={formatRupiah}
  />
)}
{toastMessage && (
          <StoreToastDesktop
            message={toastMessage}
            onClose={() => setToastMessage(null)}
            onViewCart={handleOpenDesktopCart}
          />
        )}
      </div>

      <StoreMobile
      products={filteredProducts}
      categories={INITIAL_CATEGORIES}
      activeCategory={activeCategory}
      setActiveCategory={setActiveCategory}
      cart={cart}
      addToCart={(product, quantity, size) => {
        addProductToCart(product, quantity || 1, size);
      }}
      updateQuantity={updateQuantity}
      removeCartItem={removeCartItem}
      totalCartItems={totalCartItems}
      formatRupiah={formatRupiah}
    />
    </>
  );
}