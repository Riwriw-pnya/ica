"use client";

import { useState } from "react";
import Link from "next/link";
import AccountTypeModal from "./AccountTypeModal";

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "register">("login");

  const openModal = (mode: "login" | "register") => {
    setModalMode(mode);
    setModalOpen(true);
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">

          {/* Logo + Nama */}
          <Link href="/" className="navbar-brand">
            <div className="navbar-logo">
              ICA
            </div>

            <span>
              Indonesian Cat Association
            </span>
          </Link>

          {/* Menu */}
          <nav className="navbar-menu">
            <Link href="#tentang">
              Tentang
            </Link>

            <Link href="#berita">
              Berita
            </Link>

            <Link href="#event">
              Event
            </Link>

            <Link href="#cattery">
              Direktori Cattery
            </Link>
          </nav>

          {/* Action */}
          <div className="navbar-actions">

            <button
              type="button"
              className="navbar-login"
              onClick={() => openModal("login")}
            >
              Masuk
            </button>

            <button
              type="button"
              className="navbar-register"
              onClick={() => openModal("register")}
            >
              Daftar
            </button>

          </div>
        </div>
      </header>

      <AccountTypeModal
        isOpen={modalOpen}
        mode={modalMode}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}