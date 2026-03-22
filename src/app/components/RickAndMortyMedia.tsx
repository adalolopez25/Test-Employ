"use client";

import { useState, useRef } from "react";
import {
  Play,
  Pause,
  X,
  Volume2,
  VolumeX,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// --- DATOS DE LOS VIDEOS ---
const MEDIA_ITEMS = [
  {
    id: "0",
    title: "Official Trailer | Season 1",
    tag: "Adult Swim Official",
    src: "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Videos/season/season1.mp4",
  },
  {
    id: "1",
    title: "Official Trailer | Season 2",
    tag: "Adult Swim Official",
    src: "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Videos/season/season2.mp4",
  },
  {
    id: "3",
    title: "Official Trailer | Season 3",
    tag: "Adult Swim Official",
    src: "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Videos/season/season3.mp4",
  },
  {
    id: "4",
    title: "Official Trailer | Season 4",
    tag: "Adult Swim Official",
    src: "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Videos/season/season4.mp4",
  },
  {
    id: "5",
    title: "Official Trailer | Season 5",
    tag: "Adult Swim Official",
    src: "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Videos/season/season5.mp4",
  },
  {
    id: "6",
    title: "Official Trailer | Season 6",
    tag: "Adult Swim Official",
    src: "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Videos/season/season6.mp4",
  },
  {
    id: "7",
    title: "Official Trailer | Season 7",
    tag: "Adult Swim Official",
    src: "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Videos/season/season7.mp4",
  },
  {
    id: "8",
    title: "Season 6 Behind the Scenes",
    tag: "Adult Swim Official",
    src: "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Videos/season/behindScenes.mp4",
  },
  {
    id: "9",
    title: "Season 7 Sneak Peek",
    tag: "Adult Swim Official",
    src: "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Videos/season/Peek.mp4",
  },
  {
    id: "10",
    title: "The Anime Series | Extras",
    tag: "Rick and Morty Anime",
    src: "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Videos/season/extras.mp4",
  },
];

export function RickAndMortyMedia() {
  const [activeVideo, setActiveVideo] = useState<(typeof MEDIA_ITEMS)[0] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full px-4 md:px-8 py-24 mb-20 bg-transparent">
      <div className="max-w-[1400px] mx-auto w-full">
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
          <button
            onClick={() => scroll("left")}
            className="absolute -left-8 top-15 z-20 bg-black/40 hover:bg-blue-600 text-white p-3 rounded-full transition-all shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-8 py-2"
          >
            {MEDIA_ITEMS.map((item) => (
              <VideoCard key={item.id} {...item} onOpen={() => setActiveVideo(item)} />
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-15 top-15 z-20 bg-black/40 hover:bg-blue-600 text-white p-3 rounded-full transition-all shadow-lg"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Modal */}
      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
    </section>
  );
}

// --- Video Card ---
function VideoCard({ src, title, tag, onOpen }: { src: string; title: string; tag: string; onOpen: () => void; }) {
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
    <div className="group flex flex-col gap-4 cursor-pointer w-[280px] flex-shrink-0" onClick={onOpen}>
      <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.03] transition-all duration-500 group-hover:border-blue-500/50 shadow-2xl">
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
          muted
          loop
          playsInline
          preload="metadata"
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
        <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1 block">{tag}</span>
        <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter leading-tight group-hover:text-blue-500 transition-colors duration-300">{title}</h3>
      </div>
    </div>
  );
}

// --- Video Modal ---
function VideoModal({ video, onClose }: { video: any; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleProgress = () => {
    if (videoRef.current && videoRef.current.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-black rounded-[3rem] overflow-hidden border border-blue-500/20 shadow-[0_0_100px_rgba(37,99,235,0.2)]">
        {hasError ? (
          <div className="aspect-video w-full flex flex-col items-center justify-center text-red-500">
            <AlertCircle size={48} className="mb-4" />
            <p className="font-black uppercase tracking-widest text-sm">Error de decodificación de video</p>
          </div>
        ) : (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted={isMuted}
              onTimeUpdate={handleProgress}
              onError={() => setHasError(true)}
              onWaiting={() => setIsBuffering(true)}
              onCanPlay={() => setIsBuffering(false)}
              onClick={togglePlay}
              className="w-full aspect-video object-contain"
            >
              <source src={video.src} type="video/mp4" />
            </video>
            {isBuffering && (
              <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold bg-black/40">
                Cargando...
              </div>
            )}
          </div>
        )}

        {/* CONTROLES */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button onClick={togglePlay} className="text-white hover:text-blue-500">
                {isPlaying ? <Pause size={28} /> : <Play size={28} />}
              </button>
              <button onClick={() => setIsMuted(!isMuted)} className="text-white hover:text-blue-500">
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
              <div className="hidden md:block">
                <h4 className="text-white font-black italic uppercase text-lg tracking-tighter">{video.title}</h4>
                <p className="text-blue-500 font-bold text-[10px] uppercase tracking-[0.3em]">{video.tag}</p>
              </div>
            </div>
            <button onClick={onClose} className="bg-white/10 hover:bg-red-500 text-white p-3 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="w-full h-1.5 bg-white/10 rounded-full mt-4 cursor-pointer" onClick={seek}>
            <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}