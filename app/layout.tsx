import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ICA",
  description: "Indonesian Cat Association",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="font-sans bg-white antialiased">{children}</body>
    </html>
  );
}
