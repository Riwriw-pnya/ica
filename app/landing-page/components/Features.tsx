import {
  ShieldCheck,
  Users,
  Trophy,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Keanggotaan resmi",
    description:
      "Kartu member digital dengan masa berlaku yang jelas dan pengingat perpanjangan otomatis.",
  },
  {
    icon: Users,
    title: "Direktori cattery",
    description:
      "Cari cattery terdaftar berdasarkan wilayah, ras, dan skor cattery — lengkap dengan kontak WhatsApp.",
  },
  {
    icon: Trophy,
    title: "Event & leaderboard",
    description:
      "Ikuti cat show ICA dan pantau peringkat kucing sepanjang musim kompetisi.",
  },
];

export default function Features() {
  return (
    <section className="features" id="cattery">
      <div className="features-container">

        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div className="feature-card" key={feature.title}>

              <div className="feature-icon">
                <Icon size={21} strokeWidth={1.8} />
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

            </div>
          );
        })}

      </div>
    </section>
  );
}