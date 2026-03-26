"use client";

import { useState, useRef, useEffect } from "react";
import type { MediaItem } from "@/core/types/MEDIA_ITEMS";
import type { VideoProps } from "@/core/types/Video";

import { MEDIA_ITEMS as Trailers } from "@/core/constants/trailers";
import {
  Play,
  Pause,
  X,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function RickAndMortyMedia() {
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);
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
    <section className="w-full px-4 md:px-8 py-24 mb-20 bg-transparent">
      <div className="max-w-350 mx-auto w-full">
        {/* Header */}
        <div className="mb-14 pl-6 border-l-4 border-blue-600">
          <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[10px] block mb-2">
            Trailers
          </span>
          <h2 className="text-5xl md:text-5xl font-black italic uppercase tracking-tighter text-white leading-none">
            Últimos <span className="text-blue-600 font-black">Videos</span>
          </h2>
        </div>

        {/* Carrusel */}
        <div className="relative flex items-center">
          {!activeVideo && (
            <>
              <button
                onClick={() => scroll("left")}
                className="absolute -left-8 z-20 bg-black/40 hover:bg-blue-600 text-white p-3 rounded-full transition-all shadow-lg"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="absolute -right-8 z-20 bg-black/40 hover:bg-blue-600 text-white p-3 rounded-full transition-all shadow-lg"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-8 py-2"
          >
            {Trailers.map((item) => (
              <VideoCard
                key={item.id}
                {...item}
                onOpen={() => setActiveVideo(item)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </section>
  );
}

function VideoCard({ src, title, tag, poster, onOpen }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleHover = (videoEl: HTMLVideoElement | null) => {
    document.querySelectorAll("video").forEach((v) => {
      if (v !== videoEl) {
        v.pause();
        v.currentTime = 0;
      }
    });
    videoEl?.play().catch(() => {});
  };

  return (
    <div
      className="group flex flex-col gap-4 cursor-pointer w-70 shrink-0"
      onClick={onOpen}
    >
      <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden border border-white/10 bg-white/3 transition-all duration-500 group-hover:border-blue-500/50 shadow-2xl">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
          muted
          loop
          playsInline
          preload="none"
          onMouseEnter={() => handleHover(videoRef.current)}
          onMouseLeave={() => {
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-blue-600 text-white p-5 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
            <Play size={20} fill="currentColor" />
          </div>
        </div>
      </div>
      <div>
        <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1 block">
          {tag}
        </span>
        <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter leading-tight group-hover:text-blue-500 transition-colors duration-300">
          {title}
        </h3>
      </div>
    </div>
  );
}

function VideoModal({ video, onClose }: { video: any; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMute = !isMuted;
      setIsMuted(nextMute);
      videoRef.current.muted = nextMute;
      if (!nextMute && volume === 0) {
        setVolume(0.5);
        videoRef.current.volume = 0.5;
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed inset-0 z- flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-2xl">
      {/* BOTÓN CERRAR - Fuera del contenedor del video para máxima visibilidad */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="fixed top-10 right-10 z- bg-blue-600 hover:bg-red-500 text-white p-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-white/20 hover:scale-110 active:scale-90"
      >
        <X size={32} strokeWidth={3} />
      </button>

      {/* Overlay para cerrar al hacer clic fuera */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Contenedor del Reproductor */}
      <div 
        className="relative w-full max-w-5xl bg-black rounded-[2.5rem] overflow-hidden border border-blue-500/30 shadow-[0_0_50px_rgba(0,0,0,0.5)] group z-50"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={isMuted}
            onTimeUpdate={() => {
              if (videoRef.current) {
                setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
              }
            }}
            onClick={togglePlay}
            className="w-full h-full object-contain bg-black cursor-pointer"
          >
            <source src={video.src} type="video/webm" />
          </video>
        </div>

        {/* Barra de Controles */}
        <div className={`absolute bottom-0 left-0 w-full p-8 bg-linear-to-t from-black via-black/80 to-transparent transition-transform duration-500 ${showControls ? 'translate-y-0' : 'translate-y-full'} pointer-events-auto`}>
          <div className="w-full h-1.5 bg-white/10 rounded-full mb-6 overflow-hidden">
            <div className="h-full bg-blue-600" style={{ width: `${progress}%` }} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <button onClick={togglePlay} className="text-white hover:text-blue-500 scale-125 transition-all">
                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
              </button>

              <div className="flex items-center gap-4">
                <button onClick={toggleMute} className="text-white hover:text-blue-500 transition-colors">
                  {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  onClick={(e) => e.stopPropagation()}
                  className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="hidden sm:block border-l border-white/10 pl-8">
                <h4 className="text-white font-black text-lg uppercase tracking-tighter leading-none">{video.title}</h4>
                <p className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em] mt-1">{video.tag}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}