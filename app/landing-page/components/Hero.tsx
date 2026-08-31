import Link from "next/link";
import {
  HeartHandshake,
  Cat,
  UsersRound,
} from "lucide-react";

const features = [
  {
    icon: HeartHandshake,
    text: (
      <>
        Menjadi salah satu wadah
        <br />
        bagi penyayang, pemerhati
        <br />
        dan pemilik kucing yang
        <br />
        berada di Indonesia
      </>
    ),
  },
  {
    icon: Cat,
    text: (
      <>
        Menjaga / Mempertahankan
        <br />
        Kemurnian Kucing Ras yang
        <br />
        berada di Indonesia.
      </>
    ),
  },
  {
    icon: UsersRound,
    text: (
      <>
        Melakukan Pembinaan
        <br />
        kepada anggotanya dalam
        <br />
        hal perawatan dan
        <br />
        pemeliharaan kucing.
      </>
    ),
  },
];

export default function Hero() {
  return (
    <section className="ica-hero">

      {/* BACKGROUND */}
      <div className="ica-hero-overlay" />

      <div className="ica-hero-content">

        <h1>
          INDONESIAN CAT ASSOCIATION
        </h1>

        <p>
          Indonesian Professional Cat Lover Organization
        </p>

      </div>

      {/* FEATURE CARDS */}
      <div className="ica-feature-wrapper">

        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              className="ica-feature-card"
              key={index}
            >

              <div className="ica-feature-icon">
                <Icon size={42} strokeWidth={1.8} />
              </div>

              <p>
                {feature.text}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
}