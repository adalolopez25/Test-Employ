"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MediaItem } from "@/core/types/MEDIA_ITEMS";

import { VideoCard } from "./VideoCard";

interface Props {
  videos: MediaItem[]
  onSelect: (video: MediaItem) => void
  disableControls?: boolean
}

export function VideoCarousel({ videos, onSelect, disableControls }: Props) {

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {

    if (!scrollRef.current) return;

    const scrollAmount = scrollRef.current.clientWidth * 0.8;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  return (
    <div className="relative flex items-center">

      {!disableControls && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute -left-8 z-20 bg-black/40 hover:bg-blue-600 text-white p-3 rounded-full"
          >
            <ChevronLeft size={24}/>
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-8 z-20 bg-black/40 hover:bg-blue-600 text-white p-3 rounded-full"
          >
            <ChevronRight size={24}/>
          </button>
        </>
      )}

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-8 py-2"
      >
        {videos.map(video => (
          <VideoCard
            key={video.id}
            {...video}
            onOpen={() => onSelect(video)}
          />
        ))}
      </div>

    </div>
  );
}