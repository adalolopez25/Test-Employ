"use client"
import { BannerCarousel } from "@/app/components/HomeBanner";
import { AboutSeries } from "@/app/components/AboutSeries";
import { RickAndMortyMedia } from "@/app/components/RickAndMortyMedia";
import { CharacterRow } from "./components/CharacterRows";
import { useEffect, useState } from "react";
import { CardSkeleton } from "./components/skeletons/CardSkeleton";

export default function HomePage() {
  const [isReady,setIsReady] = useState(false);
  useEffect(() => {
    setIsReady(true);
  },[])

  if(!isReady) {
    return (
      <div className="flex flex-col gap-10 p-10 bg-[#050505]">
        <div className="h-100 w-full bg-slate-900/50 animate-pulse rounded-[3.5rem]" />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }
  

  return (
    <main className="flex flex-col min-h-screen bg-transparent font-sans">
        <BannerCarousel />
        <RickAndMortyMedia />
        <CharacterRow />
        <AboutSeries />
      <footer className="py-20 text-center">
        <p className="text-white/20 text-[9px] font-black uppercase tracking-[1em]">
          Rick And Morty APP
        </p>
      </footer>
    </main>
  );
}
