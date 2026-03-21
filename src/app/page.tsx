import { BannerCarousel } from "@/app/components/HomeBanner";
import { AboutSeries } from "@/app/components/AboutSeries";
import { RickAndMortyMedia } from "@/app/components/RickAndMortyMedia";
import { GlobalStats } from "@/app/components/GlobalStats";
import { CharacterRow } from "./components/CharacterRows";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-transparent font-sans">
      <BannerCarousel />
      <RickAndMortyMedia />
      <CharacterRow/>
      <AboutSeries />
      
      <footer className="py-20 text-center">
        <p className="text-white/20 text-[9px] font-black uppercase tracking-[1em]">
          AnimeHero System Terminal
        </p>
      </footer>
    </main>
  );
}