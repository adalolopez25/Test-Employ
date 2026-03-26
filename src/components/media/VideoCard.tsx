"use client";

import { useRef } from "react";
import { Play } from "lucide-react";
import type { VideoProps } from "@/core/types/Video";

export function VideoCard({ src, title, tag, poster, onOpen }: VideoProps) {

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleHover = (videoEl: HTMLVideoElement | null) => {

    document.querySelectorAll("video").forEach(v => {

      if (v !== videoEl) {
        v.pause();
        v.currentTime = 0;
      }

    });

    videoEl?.play().catch(()=>{});
  };

  return (
    <div
      className="group flex flex-col gap-4 cursor-pointer w-70 shrink-0"
      onClick={onOpen}
    >

      <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden border border-white/10">

        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
          onMouseEnter={() => handleHover(videoRef.current)}
          onMouseLeave={() => {
            if(videoRef.current){
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-blue-600 text-white p-5 rounded-full opacity-0 group-hover:opacity-100 transition">
            <Play size={20}/>
          </div>
        </div>

      </div>

      <div>
        <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em]">
          {tag}
        </span>

        <h3 className="text-2xl font-black italic uppercase text-white">
          {title}
        </h3>
      </div>

    </div>
  );
}