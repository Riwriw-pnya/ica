import StorePage from "@/components/store/StorePage";

export default function CatteryStorePage() {
  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#2d2825] font-sans">
      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
        <div className="space-y-1">
          <StorePage />;
        </div>
      </main>
    </div>
  )
}