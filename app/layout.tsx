import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ICA Superadmin",
  description: "Indonesian Cat Association Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}