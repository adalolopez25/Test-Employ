'use client';

import { useState } from "react";

export function AboutSeries() {
  const seriesData = {
    title: "Rick & Morty",
    subtitle: "Multiverse",
    description: `Explora cada rincón de la serie. Desde la Ciudadela hasta las dimensiones más remotas, 
      esta plataforma organiza los registros de todas las temporadas existentes.`,
    seasons: [
      { season: 1, episodes: 11 },
      { season: 2, episodes: 10 },
      { season: 3, episodes: 10 },
      { season: 4, episodes: 10 },
      { season: 5, episodes: 10 },
      { season: 6, episodes: 10 },
      { season: 7, episodes: 10 },
    ],
  };

  const [openSeason, setOpenSeason] = useState<number | null>(null);

  const toggleSeason = (seasonNumber: number) => {
    setOpenSeason(openSeason === seasonNumber ? null : seasonNumber);
  };

  const totalSeasons = seriesData.seasons.length;
  const totalEpisodes = seriesData.seasons.reduce((sum, s) => sum + s.episodes, 0);

  return (
    <section className="w-full px-4 md:px-8 py-12 bg-transparent">
      <div className="max-w-300 mx-auto flex flex-col lg:flex-row gap-8">

        <div className="flex-2 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col justify-center">
          
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tight text-white mb-4 leading-tight">
            {seriesData.title} <br />
            <span className="text-blue-600">{seriesData.subtitle}</span>
          </h2>
          <p className="text-white/60 text-md md:text-lg leading-relaxed max-w-xl font-medium">
            {seriesData.description}
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-4 max-h-150 overflow-y-auto">

          {/* Totales */}
          <div className="flex justify-between mb-4 gap-2">
            <div className="flex-1 bg-blue-600/10 border border-blue-500/20 rounded-2xl p-4 text-center">
              <span className="text-blue-400 text-[10px] uppercase tracking-widest mb-1 block">Temporadas</span>
              <span className="text-3xl md:text-4xl font-black italic text-white">{totalSeasons}</span>
            </div>
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <span className="text-white/30 text-[10px] uppercase tracking-widest mb-1 block">Episodios</span>
              <span className="text-3xl md:text-4xl font-black italic text-white">{totalEpisodes}</span>
            </div>
          </div>

          {seriesData.seasons.map((s) => {
            const isOpen = openSeason === s.season;
            return (
              <div key={s.season} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleSeason(s.season)}
                  className="w-full text-left px-4 py-3 flex justify-between items-center text-white font-bold hover:bg-blue-600/20 transition-colors"
                >
                  <span>Temporada {s.season}</span>
                  <span>{isOpen ? "▲" : "▼"}</span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500`}
                  style={{ maxHeight: isOpen ? `${s.episodes * 2.5}rem` : "0" }}
                >
                  <ul className="px-6 py-2 text-white/70 text-sm">
                    {Array.from({ length: s.episodes }, (_, i) => (
                      <li key={i} className="py-1 border-b border-white/10 last:border-none">
                        Capítulo {i + 1}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}