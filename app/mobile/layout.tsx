export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-dvh bg-[#FAF8F5] flex justify-center items-start overflow-x-hidden">
      {/* Kontainer HP Terkunci Maksimal 430px & Aman dari Overflow */}
      <main className="w-full max-w-[430px] min-h-dvh flex flex-col relative bg-[#FAF8F5] shadow-2xs">
        {children}
      </main>
    </div>
  );
}