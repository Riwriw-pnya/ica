"use client";

import { createContext, useContext, useState, useCallback } from "react";
import Toast, { ToastVariant, ToastTone } from "../components/Toast";

interface ToastItem {
  id: number;
  title: string;
  message: string;
  variant: ToastVariant;
  tone: ToastTone;
}

interface ShowToastOptions {
  variant?: ToastVariant;
  tone?: ToastTone;
  duration?: number;
}

interface ToastContextValue {
  showToast: (title: string, message: string, options?: ShowToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 1;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((title: string, message: string, options?: ShowToastOptions) => {
    const id = nextId++;
    setToasts((prev) => [
      ...prev,
      { id, title, message, variant: options?.variant ?? "outlined", tone: options?.tone ?? "success" },
    ]);
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="pointer-events-none fixed right-4 top-[70px] z-[9999] flex flex-col items-end gap-2">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <Toast
              title={t.title}
              message={t.message}
              variant={t.variant}
              tone={t.tone}
              onClose={() => removeToast(t.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast harus dipakai di dalam ToastProvider");
  return ctx;
}