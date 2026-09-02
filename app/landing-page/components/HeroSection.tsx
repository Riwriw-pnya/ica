import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center text-center overflow-hidden">
      <Image
        src="/images/cattt.jpg"
        alt="Hero Background"
        fill
        priority
        className="object-cover contrast-100 brightness-70"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 max-w-4xl px-4 text-white pb-50">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide uppercase mb-2 drop-shadow-md">
          Indonesian Cat Association
        </h1>
        <p className="text-lg md:text-xl font-light tracking-wide text-gray-100">
          Indonesian Professional Cat Lover Organization
        </p>
      </div>
    </section>
  );
}