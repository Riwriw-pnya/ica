import Link from "next/link";

export default function LeaderboardSection() {
  const topThree = [
    { rank: 2, name: "Royal Paws Indonesia", location: "Jakarta Selatan", score: "95", letter: "R" },
    { rank: 1, name: "Paw Paradise Cattery", location: "Bandung, Jawa Barat", score: "98", letter: "P" },
    { rank: 3, name: "Meow House Cattery", location: "Surabaya, Jawa Timur", score: "92", letter: "M" },
  ];

  const restList = [
    { rank: "04", letter: "W", name: "Whiskers Family", location: "Bekasi, Jawa Barat", score: "89" },
    { rank: "05", letter: "G", name: "Golden Cat Cattery", location: "Yogyakarta", score: "87" },
    { rank: "06", letter: "N", name: "Nusantara Cats", location: "Malang, Jawa Timur", score: "85" },
  ];

  const renderPodiumBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex flex-col items-center gap-1">
          {/* Medali Emas SVG */}
          <svg
            className="w-8 h-8 text-amber-500 filter drop-shadow-[0_2px_5px_rgba(245,158,11,0.5)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="9" r="5" strokeWidth="1.8" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 13.5L7 21l5-2.5L17 21l-2-7.5" />
          </svg>
          <span className="font-extrabold text-amber-600 text-2xl">1</span>
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="flex flex-col items-center gap-1">
          {/* Medali Perak SVG */}
          <svg
            className="w-7 h-7 text-slate-400 drop-shadow-sm"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="9" r="5" strokeWidth="1.8" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 13.5L7 21l5-2.5L17 21l-2-7.5" />
          </svg>
          <span className="font-extrabold text-slate-500 text-xl">2</span>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center gap-1">
        {/* Medali Perunggu SVG */}
        <svg
          className="w-7 h-7 text-amber-800/80 drop-shadow-sm"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="12" cy="9" r="5" strokeWidth="1.8" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 13.5L7 21l5-2.5L17 21l-2-7.5" />
        </svg>
        <span className="font-extrabold text-amber-800 text-xl">3</span>
      </div>
    );
  };

  return (
    <section className="w-full bg-white border-y border-[#F3D1BD]/70 py-16 ">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#C85A17] uppercase bg-[#FDEEE3] px-3.5 py-1 rounded-full border border-[#F3D1BD]">
              {/* Star Icon SVG */}
              <svg className="w-3.5 h-3.5 text-[#C85A17]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              ICA Cattery Ranking
            </span>
            <h2 className="text-3xl font-extrabold text-[#231812] mt-2">Leaderboard Cattery</h2>
            <p className="text-xs text-[#6E625A] mt-1">
              Lihat cattery dengan performa terbaik berdasarkan penilaian dan aktivitas ICA.
            </p>
          </div>
        </div>

        {/* Podium Top 3 */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 items-end mb-10 max-w-2xl mx-auto">
          {topThree.map((item) => {
            const isFirst = item.rank === 1;
            const isSecond = item.rank === 2;
            const isThird = item.rank === 3;

            return (
              <div
                key={item.rank}
                className={`flex flex-col items-center ${
                  isFirst ? "-order-none mb-0" : isSecond ? "-order-1" : "order-1"
                }`}
              >
                {/* Avatar Wrapper with Crown Overlay for #1 */}
                <div className="relative mb-2">
                  {isFirst && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                      {/* Crown SVG Warna Emas */}
                      <svg
                        className="w-7 h-7 text-amber-400 filter drop-shadow-sm"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                      </svg>
                    </div>
                  )}

                  {/* Avatar Circle Gradient & Stroke */}
                  <div
                    className={`rounded-full flex items-center justify-center font-extrabold transition ${
                      isFirst
                        ? "w-16 h-16 text-xl text-amber-700 bg-gradient-to-tr from-amber-200 via-yellow-100 to-amber-300 border-2 border-amber-400 ring-4 ring-amber-100/80 shadow-md"
                        : isSecond
                        ? "w-14 h-14 text-base text-slate-700 bg-gradient-to-tr from-slate-200 via-slate-100 to-slate-300 border-2 border-slate-400 ring-4 ring-slate-100 shadow-sm"
                        : "w-14 h-14 text-base text-amber-900 bg-gradient-to-tr from-amber-200/60 via-amber-100/70 to-amber-300/60 border-2 border-amber-700/60 ring-4 ring-amber-900/10 shadow-sm"
                    }`}
                  >
                    {item.letter}
                  </div>
                </div>

                <h4 className="font-bold text-xs md:text-sm text-[#231812] text-center line-clamp-1">
                  {item.name}
                </h4>
                <p className="text-[10px] text-[#6E625A] text-center mb-1 line-clamp-1">
                  {item.location}
                </p>

                {/* Score */}
                <div className="inline-flex items-center gap-1 text-xs font-extrabold text-[#C85A17] mb-3">
                  <span>{item.score}</span>
                  <span className="text-[10px] text-[#6E625A] font-normal">/100</span>
                </div>

                {/* Podium Pillar Gradient & Stroke */}
                <div
                  className={`w-full rounded-t-2xl flex items-center justify-center shadow-sm transition ${
                    isFirst
                      ? "h-36 border-t-4 border-amber-400 border-x border-b border-amber-200/80 bg-gradient-to-b from-amber-100/70 via-[#FFFDFB] to-amber-100/30"
                      : isSecond
                      ? "h-28 border-t-4 border-slate-400 border-x border-b border-slate-200/80 bg-gradient-to-b from-slate-200/60 via-[#FFFDFB] to-slate-100/40"
                      : "h-24 border-t-4 border-amber-700/60 border-x border-b border-amber-900/15 bg-gradient-to-b from-amber-200/40 via-[#FFFDFB] to-amber-100/30"
                  }`}
                >
                  {renderPodiumBadge(item.rank)}
                </div>
              </div>
            );
          })}
        </div>

        {/* List Rank 4-6 */}
        <div className="bg-[#FFFDFB] rounded-2xl shadow-sm border border-[#F3D1BD] divide-y divide-[#F3D1BD]/50 max-w-4xl mx-auto overflow-hidden">
          {restList.map((item) => (
            <div
              key={item.rank}
              className="p-4 flex items-center justify-between hover:bg-[#FDEEE3]/30 transition group"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs font-extrabold text-[#6E625A] w-6">{item.rank}</span>
                <div className="w-9 h-9 rounded-full bg-[#FDEEE3] border border-[#F3D1BD] text-[#C85A17] font-bold text-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                  {item.letter}
                </div>
                <div>
                  <h5 className="font-bold text-xs md:text-sm text-[#231812] group-hover:text-[#C85A17] transition">
                    {item.name}
                  </h5>
                  <p className="text-[10px] text-[#6E625A]">{item.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#C85A17]">
                {/* Paw Print SVG Icon */}
                <svg className="w-3.5 h-3.5 text-[#EE6B28]" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="7" cy="8.5" r="2.5" />
                  <circle cx="17" cy="8.5" r="2.5" />
                  <circle cx="11.5" cy="5.5" r="2.5" />
                  <path d="M12 11.5c-3 0-6.5 2-6.5 5 0 2 2 3.5 6.5 3.5s6.5-1.5 6.5-3.5c0-3-3.5-5-6.5-5z" />
                </svg>
                <span>{item.score}</span>
                <span className="text-[10px] text-[#6E625A] font-normal">/100</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}