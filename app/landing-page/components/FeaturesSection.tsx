export default function FeaturesSection() {
  const topFeatures = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      desc: "Menjadi salah satu wadah bagi penyayang, pemerhati dan pemilik kucing yang berada di Indonesia.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      desc: "Menjaga / Mempertahankan Kemurnian Kucing Ras yang berada di Indonesia.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      desc: "Melakukan Pembinaan kepada anggotanya dalam hal perawatan dan pemeliharaan kucing.",
    },
  ];

  const bottomFeatures = [
    {
      title: "Keanggotaan resmi",
      desc: "Kartu member digital dengan masa berlaku yang jelas dan pengingat perpanjangan otomatis.",
      iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    },
    {
      title: "Cattery Names",
      desc: "Cari cattery terdaftar berdasarkan wilayah, ras, dan skor cattery — lengkap dengan kontak WhatsApp.",
      iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
    {
      title: "Event & leaderboard",
      desc: "Ikuti cat show ICA dan pantau peringkat kucing sepanjang musim kompetisi.",
      iconPath: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    },
  ];

  return (
    <section className="w-full">
      {/* Kartu Atas (Margin Bottom diperbesar dari mb-20 menjadi mb-36) */}
      <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-20 mb-36">
        <div className="grid md:grid-cols-3 gap-6">
          {topFeatures.map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 shadow-xl text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6 shadow-md">
                {item.icon}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Kartu Bawah */}
      <div className="w-full bg-white border-y border-orange-200/70 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {bottomFeatures.map((item, idx) => (
              <div key={idx} className="bg-[#FFFDFB] border border-orange-100/80 rounded-2xl p-6 shadow-sm hover:border-orange-300 transition">
                <div className="w-10 h-10 bg-orange-100/70 rounded-lg flex items-center justify-center text-orange-600 mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.iconPath} />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}