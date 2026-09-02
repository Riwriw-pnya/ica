"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthModal from "./auth/AuthModal";

export default function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);

  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/landing-page") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const openAuthModal = (mode: "login" | "register") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#F3D1BD]/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          
          <div className="flex items-center gap-8">
            <Link 
              href="/landing-page" 
              onClick={handleLogoClick}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Image
                src="/images/LOGO-ICA.webp"
                alt="ICA Logo"
                width={42}
                height={42}
                className="object-contain"
              />
            </Link>

            {/* Menu Navigasi */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#231812]">
              
              <div 
                className="relative group py-2"
                onMouseEnter={() => setIsCompanyOpen(true)}
                onMouseLeave={() => {
                  setIsCompanyOpen(false);
                  setActiveSubDropdown(null);
                }}
              >
                <button className="flex items-center gap-1 hover:text-[#C85A17] transition cursor-pointer relative py-1">
                  <span className="relative">
                    Company
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#EE6B28] transition-all duration-300 ease-out group-hover:w-full"></span>
                  </span>
                  <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isCompanyOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isCompanyOpen && (
                  <div className="absolute top-full left-0 w-56 bg-white border border-[#E9E2DC] rounded-2xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    
                    <div 
                      className="relative px-4 py-2 text-xs font-medium text-[#4A3D34] hover:bg-[#FFF6EC] hover:text-[#C85A17] transition cursor-pointer flex items-center justify-between"
                      onMouseEnter={() => setActiveSubDropdown("organisasi")}
                      onMouseLeave={() => setActiveSubDropdown(null)}
                    >
                      <span>Organisasi</span>
                      <svg className="w-3 h-3 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>

                      {activeSubDropdown === "organisasi" && (
                        <div className="absolute left-full top-0 w-48 bg-white border border-[#E9E2DC] rounded-2xl shadow-xl py-2 ml-1">
                          <Link href="/organisasi/profil" className="block px-4 py-2 text-xs text-[#4A3D34] hover:bg-[#FFF6EC] hover:text-[#C85A17]">Profil & Sejarah</Link>
                          <Link href="/organisasi/pengawas" className="block px-4 py-2 text-xs text-[#4A3D34] hover:bg-[#FFF6EC] hover:text-[#C85A17]">Dewan Pengawas</Link>
                          <Link href="/organisasi/pusat" className="block px-4 py-2 text-xs text-[#4A3D34] hover:bg-[#FFF6EC] hover:text-[#C85A17]">Pengurus Pusat</Link>
                          <Link href="/organisasi/cabang" className="block px-4 py-2 text-xs text-[#4A3D34] hover:bg-[#FFF6EC] hover:text-[#C85A17]">Cabang ICA</Link>
                          <Link href="/organisasi/juri" className="block px-4 py-2 text-xs text-[#4A3D34] hover:bg-[#FFF6EC] hover:text-[#C85A17]">Daftar Juri</Link>
                          <Link href="/organisasi/bank" className="block px-4 py-2 text-xs text-[#4A3D34] hover:bg-[#FFF6EC] hover:text-[#C85A17]">Bank Info</Link>
                          <Link href="https://srv101.niagahoster.com:2096/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-xs text-[#4A3D34] hover:bg-[#FFF6EC] hover:text-[#C85A17]">Mail Hosting</Link>
                        </div>
                      )}
                    </div>

                    <div 
                      className="relative px-4 py-2 text-xs font-medium text-[#4A3D34] hover:bg-[#FFF6EC] hover:text-[#C85A17] transition cursor-pointer flex items-center justify-between"
                      onMouseEnter={() => setActiveSubDropdown("cats-title")}
                      onMouseLeave={() => setActiveSubDropdown(null)}
                    >
                      <span>Cats Title</span>
                      <svg className="w-3 h-3 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>

                      {activeSubDropdown === "cats-title" && (
                        <div className="absolute left-full top-0 w-60 bg-white border border-[#E9E2DC] rounded-2xl shadow-xl py-2 ml-1">
                          <Link href="#" className="block px-4 py-2 text-xs text-[#4A3D34] hover:bg-[#FFF6EC] hover:text-[#C85A17]">Cat Title Status</Link>
                          <Link href="#" className="block px-4 py-2 text-xs text-[#4A3D34] hover:bg-[#FFF6EC] hover:text-[#C85A17]">Peserta World Winner Show</Link>
                        </div>
                      )}
                    </div>

                    <Link href="/rules" className="block px-4 py-2 text-xs font-medium text-[#4A3D34] hover:bg-[#FFF6EC] hover:text-[#C85A17] transition">Rules and Form</Link>
                    <Link href="/news" className="block px-4 py-2 text-xs font-medium text-[#4A3D34] hover:bg-[#FFF6EC] hover:text-[#C85A17] transition">News</Link>
                    <Link href="/event" className="block px-4 py-2 text-xs font-medium text-[#4A3D34] hover:bg-[#FFF6EC] hover:text-[#C85A17] transition">Event</Link>
                  </div>
                )}
              </div>

              <Link href="https://fifeweb.org/cats/breeds/" target="_blank" rel="noopener noreferrer" className="group relative py-2 text-gray-600 hover:text-[#C85A17] transition">
                <span className="relative">
                  Breed Standard
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#EE6B28] transition-all duration-300 ease-out group-hover:w-full"></span>
                </span>
              </Link>

              <Link href="/catteryN" className="group relative py-2 text-gray-600 hover:text-[#C85A17] transition">
                <span className="relative">
                  Cattery Names
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#EE6B28] transition-all duration-300 ease-out group-hover:w-full"></span>
                </span>
              </Link>

              <Link href="/contact" className="group relative py-2 text-gray-600 hover:text-[#C85A17] transition">
                <span className="relative">
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#EE6B28] transition-all duration-300 ease-out group-hover:w-full"></span>
                </span>
              </Link>

              <Link href="/galeri" className="group relative py-2 text-gray-600 hover:text-[#C85A17] transition">
                <span className="relative">
                  Galeri
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#EE6B28] transition-all duration-300 ease-out group-hover:w-full"></span>
                </span>
              </Link>

              <Link href="/store" className="group relative py-2 text-gray-600 hover:text-[#C85A17] transition">
                <span className="relative">
                  Store
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#EE6B28] transition-all duration-300 ease-out group-hover:w-full"></span>
                </span>
              </Link>

            </nav>
          </div>

          <div className="flex items-center gap-3 text-sm font-semibold">
            <button onClick={() => openAuthModal("login")} className="text-[#C85A17] hover:text-[#EE6B28] px-3 py-2 transition cursor-pointer">
              Masuk
            </button>
            
            <button 
              onClick={() => openAuthModal("register")} 
              className="px-6 py-3.5 rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white font-bold text-xs 
              shadow-[0_4px_12px_rgba(238,107,40,0.25)] 
              border-t border-[#FFE5D4]
              hover:-translate-y-0.5 hover:brightness-95 
              active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] 
              transition-all duration-150 cursor-pointer"
            >
              Daftar
            </button>
          </div>

        </div>
      </header>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} mode={authMode} />
    </>
  );
}

