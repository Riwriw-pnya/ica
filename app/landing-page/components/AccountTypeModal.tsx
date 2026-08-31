"use client";

import { useState } from "react";
import { UserRound, House, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";

type AccountTypeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "register";
};

export default function AccountTypeModal({
  isOpen,
  onClose,
  mode,
}: AccountTypeModalProps) {
  const router = useRouter();

  const [accountType, setAccountType] = useState<"member" | "cattery">(
    "member"
  );

  if (!isOpen) return null;

  const handleContinue = () => {
    if (mode === "login") {
      if (accountType === "member") {
        router.push("/login/member");
      } else {
        router.push("/login/cattery");
      }
    } else {
      if (accountType === "member") {
        router.push("/register/member");
      } else {
        router.push("/register/cattery");
      }
    }
  };

  return (
    <div className="account-modal-overlay">
      <div className="account-modal">

        {/* HEADER */}
        <div className="account-modal-header">
          <div>
            <h2>Pilih tipe akun</h2>

            <p>
              Akses dan menu yang Anda lihat menyesuaikan tipe akun ini.
            </p>
          </div>

          <button
            type="button"
            className="account-modal-close"
            onClick={onClose}
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>


        {/* ACCOUNT OPTIONS */}
        <div className="account-options">

          {/* MEMBER */}
          <button
            type="button"
            className={`account-option ${
              accountType === "member" ? "selected" : ""
            }`}
            onClick={() => setAccountType("member")}
          >
            <div className="account-option-top">

              <div className="account-option-icon">
                <UserRound size={23} />
              </div>

              <div
                className={`account-radio ${
                  accountType === "member" ? "checked" : ""
                }`}
              >
                {accountType === "member" && <Check size={14} />}
              </div>

            </div>

            <div className="account-option-content">
              <h3>
                {mode === "login" ? "Login as Member" : "Daftar sebagai Member"}
              </h3>

              <p>
                Keanggotaan pribadi: berita, direktori cattery,
                event, dan status member.
              </p>
            </div>
          </button>


          {/* CATTERY */}
          <button
            type="button"
            className={`account-option ${
              accountType === "cattery" ? "selected" : ""
            }`}
            onClick={() => setAccountType("cattery")}
          >
            <div className="account-option-top">

              <div className="account-option-icon">
                <House size={23} />
              </div>

              <div
                className={`account-radio ${
                  accountType === "cattery" ? "checked" : ""
                }`}
              >
                {accountType === "cattery" && <Check size={14} />}
              </div>

            </div>

            <div className="account-option-content">
              <h3>
                {mode === "login" ? "Login as Cattery" : "Daftar sebagai Cattery"}
              </h3>

              <p>
                Kelola cattery: data kucing, mating report,
                dan pengajuan ke admin ICA.
              </p>
            </div>
          </button>

        </div>


        {/* FOOTER */}
        <div className="account-modal-footer">

          <span>
            {mode === "login"
              ? accountType === "member"
                ? "Anda akan masuk ke Member Portal."
                : "Anda akan masuk ke Cattery Portal."
              : accountType === "member"
                ? "Anda akan mendaftar sebagai Member."
                : "Anda akan mendaftar sebagai Cattery."}
          </span>

          <div className="account-modal-actions">

            <button
              type="button"
              className="account-cancel"
              onClick={onClose}
            >
              Batal
            </button>

            <button
              type="button"
              className="account-continue"
              onClick={handleContinue}
            >
              Lanjutkan
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}