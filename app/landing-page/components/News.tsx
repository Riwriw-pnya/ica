const news = [
  {
    category: "Pengumuman",
    date: "24 Agu 2026",
    title: "Pendaftaran keanggotaan periode 2026/2027 resmi dibuka",
  },
  {
    category: "Event",
    date: "18 Agu 2026",
    title: "Hasil ICA National Cat Show Bandung 2026",
  },
  {
    category: "Keanggotaan",
    date: "9 Agu 2026",
    title: "Kartu member kini tersedia dalam format digital",
  },
];

export default function News() {
  return (
    <section className="news" id="berita">

      <div className="news-container">

        <div className="section-header">
          <h2>Berita terbaru</h2>

          <a href="#">
            Lihat semua →
          </a>
        </div>

        <div className="news-grid">

          {news.map((item) => (
            <article className="news-card" key={item.title}>

              <div className="news-image">
                <span>⌑</span>
              </div>

              <div className="news-content">

                <span className="news-meta">
                  {item.category} · {item.date}
                </span>

                <h3>
                  {item.title}
                </h3>

              </div>

            </article>
          ))}

        </div>

      </div>

    </section>
  );
}