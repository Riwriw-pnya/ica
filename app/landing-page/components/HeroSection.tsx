import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center text-center overflow-hidden">
      <Image
        src="/images/cattt.jpg"
        alt="Hero Background"
        fill
        priority
        className="object-cover contrast-120 brightness-50"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 max-w-4xl px-4 text-white pb-55">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide uppercase mb-3 drop-shadow-md">
          Indonesian Cat Association
        </h1>
        <p className="text-lg md:text-xl font-light tracking-wide text-gray-200">
          Indonesian Professional Cat Lover Organization
        </p>
      </div>
    </section>
  );
}