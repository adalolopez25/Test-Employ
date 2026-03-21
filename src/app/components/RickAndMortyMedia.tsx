"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, X, Volume2, VolumeX, Maximize, AlertCircle } from "lucide-react";

// --- DATOS DE LOS VIDEOS ---
const MEDIA_ITEMS = [
  { 
    id: "0", 
    title: "Official Trailer | Season 7", 
    tag: "Adult Swim Official", 
    src: "/assets/rick_media.mp4" 
  },
  { 
    id: "1", 
    title: "The Anime Series | Look", 
    tag: "Rick and Morty Anime", 
    src: "/assets/anime_teaser.mp4" 
  },
  { 
    id: "2", 
    title: "Official Trailer | Season 6", 
    tag: "Adult Swim Official", 
    src: "/assets/trailer_s6.mp4" 
  },
];

export function RickAndMortyMedia() {
  const [activeVideo, setActiveVideo] = useState<typeof MEDIA_ITEMS[0] | null>(null);

  return (
    <section className="w-full px-4 md:px-8 py-24 mb-20 bg-transparent">
      <div className="max-w-[1400px] mx-auto w-full">
        
        {/* Encabezado Estilo AnimeHero */}
        <div className="mb-14 pl-6 border-l-4 border-blue-600">
          <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[10px] block mb-2">
            Registros Audiovisuales
          </span>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
            Multiverso <span className="text-blue-600 font-black">Media</span>
          </h2>
        </div>
        
        {/* Grid de Videos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {MEDIA_ITEMS.map((item) => (
            <VideoCard 
              key={item.id} 
              {...item} 
              onOpen={() => setActiveVideo(item)} 
            />
          ))}
        </div>
      </div>

      {/* --- MODAL CON REPRODUCTOR CUSTOM AZUL --- */}
      {activeVideo && (
        <VideoModal 
          video={activeVideo} 
          onClose={() => setActiveVideo(null)} 
        />
      )}
    </section>
  );
}

// --- SUB-COMPONENTE: TARJETA CON HOVER PREVIEW ---
function VideoCard({ src, title, tag, onOpen }: { src: string, title: string, tag: string, onOpen: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="group flex flex-col gap-6 cursor-pointer" onClick={onOpen}>
      <div className="relative aspect-video w-full rounded-[3rem] overflow-hidden border border-white/10 bg-white/[0.03] transition-all duration-500 group-hover:border-blue-500/50 shadow-2xl">
        <video 
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
          muted
          loop
          playsInline
          onMouseEnter={() => videoRef.current?.play().catch(() => {})}
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
      <div className="px-2">
        <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">
          {tag}
        </span>
        <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter leading-tight group-hover:text-blue-500 transition-colors duration-300">
          {title}
        </h3>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTE: MODAL REPRODUCTOR AZUL ---
function VideoModal({ video, onClose }: { video: any, onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Forzar carga para evitar el error de "No supported sources"
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [video.src]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
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
      
      <div className="relative w-full max-w-5xl bg-black rounded-[3.5rem] overflow-hidden border border-blue-500/20 shadow-[0_0_100px_rgba(37,99,235,0.2)]">
        
        {hasError ? (
          <div className="aspect-video w-full flex flex-col items-center justify-center text-red-500">
            <AlertCircle size={48} className="mb-4" />
            <p className="font-black uppercase tracking-widest text-sm">Error de decodificación de video</p>
          </div>
        ) : (
          <video 
            ref={videoRef}
            autoPlay
            playsInline
            muted={isMuted}
            onTimeUpdate={handleProgress}
            onError={() => setHasError(true)}
            onClick={togglePlay}
            className="w-full aspect-video object-contain"
          >
            <source src={video.src} type="video/mp4" />
          </video>
        )}

        {/* CONTROLES CUSTOM AZULES */}
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/90 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform">
          
          {/* Progress Bar Interactiva */}
          <div 
            className="w-full h-1.5 bg-white/10 rounded-full mb-6 cursor-pointer group/progress relative"
            onClick={seek}
          >
            <div 
              className="h-full bg-blue-600 shadow-[0_0_15px_#2563eb] transition-all duration-100 relative" 
              style={{ width: `${progress}%` }}
            >
               <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#fff] scale-0 group-hover/progress:scale-100 transition-transform" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <button onClick={togglePlay} className="text-white hover:text-blue-500 transition-all active:scale-90">
                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
              </button>
              
              <button onClick={() => setIsMuted(!isMuted)} className="text-white hover:text-blue-500 transition-colors">
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>

              <div className="hidden md:block">
                <h4 className="text-white font-black italic uppercase text-lg tracking-tighter leading-none">{video.title}</h4>
                <p className="text-blue-500 font-bold text-[10px] uppercase tracking-[0.3em] mt-1">{video.tag}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={onClose} className="bg-white/10 hover:bg-red-500 text-white p-3 rounded-full transition-all border border-white/10">
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}