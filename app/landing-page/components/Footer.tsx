import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0e0d0d] text-white py-10 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-neutral-800">
          
          {/* Brand & Social Media */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/ica-g.webp"
                alt="ICA Logo"
                className="h-14 w-auto object-contain shrink-0"
              />
              <span className="font-extrabold text-sm tracking-wide text-white">
                Indonesian Cat Association
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
              Organisasi resmi pecinta dan pembiak kucing di Indonesia yang terafiliasi secara internasional.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="#"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-orange-600 hover:border-orange-600 transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-orange-600 hover:border-orange-600 transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-orange-600 hover:border-orange-600 transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Kolom 1: Tentang Kami */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-bold text-xs text-white uppercase tracking-wider">Tentang Kami</h5>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li><Link href="#" className="hover:text-orange-400 transition">Profil & Sejarah</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition">Dewan Pengawas</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition">Dewan Pengurus Pusat</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition">Cabang ICA</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition">Daftar Juri</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition">Bank Info</Link></li>
            </ul>
          </div>

          {/* Kolom 2: Informasi */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-bold text-xs text-white uppercase tracking-wider">Informasi</h5>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li><Link href="#" className="hover:text-orange-400 transition">Rules & Form</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition">Breed Standard</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition">Cattery Names</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition">Event</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition">Galeri</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition">Contact</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition">Store</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Afiliasi FIFe */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-bold text-xs text-white uppercase tracking-wider">Afiliasi Internasional</h5>
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5 flex items-center gap-3.5">
              <img
                src="/images/fife.png"
                alt="FIFe Logo"
                className="h-14 w-auto object-contain shrink-0"
              />
              <div>
                <span className="font-bold text-xs text-white block leading-snug">
                  Fédération Internationale Féline
                </span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">
                  Anggota resmi FIFe
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-neutral-500">
          <span>© 2026 Indonesian Cat Association. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-neutral-300 transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-neutral-300 transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}