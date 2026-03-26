"use client";

import { useState } from "react";
import type { MediaItem } from "@/core/types/MEDIA_ITEMS";

import { MEDIA_ITEMS as Trailers } from "@/core/constants/trailers";

import { VideoCarousel } from "./VideoCarousel";
import { VideoModal } from "./VideoModal";

export function RickAndMortyMedia() {

  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);

  return (
    <section className="w-full px-4 md:px-8 py-24 mb-20">

      <div className="max-w-350 mx-auto w-full">

        <div className="mb-14 pl-6 border-l-4 border-blue-600">
          <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[10px] block mb-2">
            Trailers
          </span>

          <h2 className="text-5xl md:text-5xl font-black italic uppercase tracking-tighter text-white leading-none">
            Últimos <span className="text-blue-600">Videos</span>
          </h2>
        </div>

        <VideoCarousel
          videos={Trailers}
          onSelect={setActiveVideo}
          disableControls={!!activeVideo}
        />

      </div>

      {activeVideo && (
        <VideoModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}

    </section>
  );
}