import Link from "next/link";

const topThree = [
  {
    rank: 2,
    name: "Royal Paws Indonesia",
    location: "Jakarta Selatan",
    score: 95,
  },
  {
    rank: 1,
    name: "Paw Paradise Cattery",
    location: "Bandung, Jawa Barat",
    score: 98,
  },
  {
    rank: 3,
    name: "Meow House Cattery",
    location: "Surabaya, Jawa Timur",
    score: 92,
  },
];

const rankings = [
  {
    rank: 4,
    name: "Whiskers Family",
    location: "Bekasi, Jawa Barat",
    score: 89,
  },
  {
    rank: 5,
    name: "Golden Cat Cattery",
    location: "Yogyakarta",
    score: 87,
  },
  {
    rank: 6,
    name: "Nusantara Cats",
    location: "Malang, Jawa Timur",
    score: 85,
  },
];

export default function Leaderboard() {
  return (
    <section className="leaderboard">
      <div className="leaderboard-container">

        {/* HEADER */}
        <div className="leaderboard-heading">
          <div>
            <span>ICA Cattery Ranking</span>

            <h2>
              Leaderboard Cattery
            </h2>

            <p>
              Lihat cattery dengan performa terbaik
              berdasarkan penilaian dan aktivitas ICA.
            </p>
          </div>

          <Link
            href="/cattery"
            className="leaderboard-more"
          >
            Lihat semua →
          </Link>
        </div>


        {/* PODIUM */}
        <div className="podium">

          {topThree.map((item) => (
            <div
              key={item.rank}
              className={`podium-item podium-${item.rank}`}
            >

              {/* Medal */}
              <div className="podium-medal">
                {item.rank === 1 && "🏆"}
                {item.rank === 2 && "🥈"}
                {item.rank === 3 && "🥉"}
              </div>


              {/* Avatar */}
              <div className="podium-avatar">
                {item.name.charAt(0)}
              </div>


              {/* Name */}
              <h3>
                {item.name}
              </h3>

              <p>
                {item.location}
              </p>


              {/* Score */}
              <strong>
                {item.score}
                <small>/100</small>
              </strong>


              {/* Podium */}
              <div className="podium-block">
                <span>
                  {item.rank}
                </span>
              </div>

            </div>
          ))}

        </div>


        {/* OTHER RANKINGS */}
        <div className="ranking-list">

          {rankings.map((item) => (
            <div
              className="ranking-item"
              key={item.rank}
            >

              <div className="ranking-number">
                {String(item.rank).padStart(2, "0")}
              </div>

              <div className="ranking-avatar">
                {item.name.charAt(0)}
              </div>

              <div className="ranking-info">
                <h3>
                  {item.name}
                </h3>

                <p>
                  {item.location}
                </p>
              </div>

              <div className="ranking-score">
                <strong>
                  {item.score}
                </strong>

                <span>
                  /100
                </span>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}