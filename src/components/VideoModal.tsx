import { useEffect, useRef } from "react";
import { X, Volume2, Video, Heart, AlertCircle } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling while the modal is active
      document.body.style.overflow = "hidden";
      // Autoplay fallback play trigger
      if (videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.log("Autoplay was prevented, waiting for user click.", err);
        });
      }
    } else {
      document.body.style.overflow = "unset";
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div id="video-overlay-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 transition-all duration-300">

      {/* Immersive backdrop with sophisticated glassmorphism blur */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer transition-opacity"
      />

      {/* Modal Card layout */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 transform h-auto max-h-[90vh] flex flex-col z-10 animate-float-fast">

        {/* Header decoration */}
        <div className="bg-gradient-to-r from-rosegold-100 to-rosegold-50 px-6 py-4 flex items-center justify-between border-b border-rosegold-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rosegold-200 flex items-center justify-center text-rosegold-750">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-gray-950 text-sm md:text-base">Birthday Video Surprise 💖</h4>
              <p className="text-[10px] text-gray-500 font-medium">Memorable Surprise Video</p>
            </div>
          </div>

          {/* Close trigger button */}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-500 flex items-center justify-center transition-all cursor-pointer shadow-sm hover:rotate-90"
            title="Tutup Video (Close)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Area */}
        <div className="bg-black relative aspect-video flex items-center justify-center overflow-hidden flex-1 min-h-[220px]">

          {/* OPTION 1: HTML5 Video Tag with a beautiful high quality aesthetic particles card
          {/* You can replace the source URL below with your actual host link like Google Drive, Dropbox direct link, or server link */}
          {/* <video
            ref={videoRef}
            src="https://assets.mixkit.co/videos/preview/mixkit-background-of-falling-golden-particles-3057-large.mp4"
            className="w-full h-full object-cover"
            controls
            autoPlay
            loop
            playsInline
          >
            Your browser does not support the video tag.
          </video> */}

          OPTION 2: If the user prefers a Youtube Embed, they can swap to this:
          Uncomment or replace with:
          <iframe
            className="w-full h-full absolute inset-0"
            src="https://www.youtube.com/embed/jQiMR89GzxY?si=zWvL6-Fo6teKDMDD"
            title="Birthday Greeting Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />


          {/* Floaty sound indicator helper bubble */}
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 text-white text-[11px] font-sans pointer-events-none border border-white/10">
            <Volume2 className="w-3.5 h-3.5 text-rosegold-300 animate-pulse" />
            <span>Pastikan volume perangkat Anda aktif! 🔊</span>
          </div>
        </div>

        {/* Modal Info Footer */}
        <div className="p-5 bg-gradient-to-br from-rosegold-50 to-white border-t border-rosegold-100/50 block">

          <div className="flex gap-3 text-xs text-gray-600 leading-relaxed items-start">
            <AlertCircle className="w-4 h-4 text-rosegold-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-gray-900">💡 Catatan Video Ini:</p>
              <p className="text-[11px] text-gray-500">
                Maaf ya kalo videonya kurang bagus, aku record malem-malem pas baru mau tidur setelah melewati hari yang cukup panjang dan melelahkan. Maaf juga kalo videonya kepanjangan, apapun yang aku pikirin aku masukin aja, maaf juga kalo lagu nya cuma 4 menit doang, aku nyari yang 10 menitan ga ada. Thank you!
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-rosegold-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-rosegold-600 font-semibold font-cursive text-lg">
              Happiest birthday Chiquita Aurellia! <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-heartbeat inline" />
            </div>
            <button
              onClick={onClose}
              className="text-xs bg-rosegold-750 hover:bg-rosegold-900 text-white font-medium px-4 py-2 rounded-xl transition-all shadow-md active:scale-95"
            >
              Kembali Ke Halaman Utama
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
