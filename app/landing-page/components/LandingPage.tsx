import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import Leaderboard from "./Leaderboard";
import News from "./News";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Features />

        <Leaderboard />

        <News />
      </main>

      <Footer />
    </>
  );
}