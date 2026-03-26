import { useState, useRef, useEffect } from "react";
import type { MediaItem } from "@/core/types/MEDIA_ITEMS";
import { Play, Pause, X, Volume2, VolumeX } from "lucide-react";

type VideoModalProps = {
  video: MediaItem;
  onClose: () => void;
};

export function VideoModal({ video, onClose }: VideoModalProps) {
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
      {/* botón cerrar */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="fixed top-10 right-10 z- bg-blue-600 hover:bg-red-500 text-white p-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-white/20 hover:scale-110 active:scale-90"
      >
        <X size={32} strokeWidth={3} />
      </button>

      {/* overlay cerrar */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* reproductor */}
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
                setProgress(
                  (videoRef.current.currentTime /
                    videoRef.current.duration) *
                    100
                );
              }
            }}
            onClick={togglePlay}
            className="w-full h-full object-contain bg-black cursor-pointer"
          >
            <source src={video.src} type="video/webm" />
          </video>
        </div>

        {/* controles */}
        <div
          className={`absolute bottom-0 left-0 w-full p-8 bg-linear-to-t from-black via-black/80 to-transparent transition-transform duration-500 ${
            showControls ? "translate-y-0" : "translate-y-full"
          } pointer-events-auto`}
        >
          <div className="w-full h-1.5 bg-white/10 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-blue-600"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <button
                onClick={togglePlay}
                className="text-white hover:text-blue-500 scale-125 transition-all"
              >
                {isPlaying ? (
                  <Pause size={28} fill="currentColor" />
                ) : (
                  <Play size={28} fill="currentColor" />
                )}
              </button>

              <div className="flex items-center gap-4">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-blue-500 transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX size={24} />
                  ) : (
                    <Volume2 size={24} />
                  )}
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
                <h4 className="text-white font-black text-lg uppercase tracking-tighter leading-none">
                  {video.title}
                </h4>
                <p className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em] mt-1">
                  {video.tag}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}