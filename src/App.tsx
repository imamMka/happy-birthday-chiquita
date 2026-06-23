import { useState } from "react";
import { Sparkles, Heart, Gift, Music, VolumeX, Volume2, Calendar, Star, ArrowDown } from "lucide-react";
import ConfettiBackground from "./components/ConfettiBackground";
import FlowerBouquet from "./components/FlowerBouquet";
import LetterEnvelope from "./components/LetterEnvelope";
import VideoModal from "./components/VideoModal";

// Client-side piano background synthesizer composition
let synthInterval: any = null;
let audioCtx: AudioContext | null = null;

function stopBackgroundMusic() {
  if (synthInterval) {
    clearInterval(synthInterval);
    synthInterval = null;
  }
}

function startBackgroundMusic() {
  if (synthInterval) return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    audioCtx = new AudioContext();

    // Soft celestial chord progression:
    // Cmaj7 -> Am7 -> Fmaj7 -> Gsus4 (each chord held for 4 beats / 3 seconds)
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
      [220.00, 261.63, 329.63, 392.00], // Am7   (A3, C4, E4, G4)
      [174.61, 218.27, 261.63, 349.23], // Fmaj7 (F3, A3, C4, F4)
      [196.00, 293.66, 349.23, 392.00], // G7sus4 (G3, D4, F4, G4)
    ];

    let chordIdx = 0;

    const playPulse = () => {
      if (!audioCtx) return;
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;
      const notes = chords[chordIdx % chords.length];

      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.frequency.value = freq;
        // smooth triangular woodwind waves
        osc.type = "sine";

        gain.gain.setValueAtTime(0, now);
        // stagger arrivals to sound like natural arpeggio plucking
        const delay = idx * 0.15;
        gain.gain.setValueAtTime(0, now + delay);
        gain.gain.linearRampToValueAtTime(0.08, now + delay + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 2.8);

        // Lowpass filter to ensure deep cozy warm tones
        const filter = audioCtx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, now);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 3);
      });

      chordIdx++;
    };

    // Play instantly and scheduled
    playPulse();
    synthInterval = setInterval(playPulse, 3200);

  } catch (err) {
    console.warn("Synthesizer failed to boot:", err);
  }
}

export default function App() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      stopBackgroundMusic();
      setIsMusicPlaying(false);
    } else {
      startBackgroundMusic();
      setIsMusicPlaying(true);
    }
  };

  return (
    <div className="relative min-h-screen text-gray-800 selection:bg-rosegold-200 selection:text-rosegold-900 pb-20 overflow-hidden">

      {/* 1. Immersive Canvas Background Effects */}
      <ConfettiBackground />

      {/* Floating Sparkles & Ambient Accents */}
      <div className="absolute top-24 left-10 pointer-events-none text-rosegold-300 animate-float-slow">
        <Star className="w-5 h-5 fill-current" />
      </div>
      <div className="absolute top-48 right-12 pointer-events-none text-rose-300 animate-float-medium">
        <Star className="w-4 h-4 fill-current" />
      </div>
      <div className="absolute bottom-60 left-12 pointer-events-none text-teal-200 animate-float-fast">
        <Heart className="w-6 h-6 fill-current" />
      </div>

      {/* Top Floating Utility Control Bar */}
      <header className="fixed top-0 inset-x-0 h-16 bg-white/40 backdrop-blur-md z-40 border-b border-rosegold-150/40 flex items-center justify-between px-6">
        <div className="flex items-center gap-1.5">
          <Heart className="w-4.5 h-4.5 text-rosegold-500 fill-rosegold-400 animate-heartbeat" />
          <span className="font-serif text-sm font-semibold tracking-wider text-rosegold-900">
            CHIQUITA'S CELEBRATION
          </span>
        </div>

        {/* Ambient music synthesizer toggle */}
        <button
          onClick={toggleMusic}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 active:scale-95 shadow-sm border cursor-pointer
            ${isMusicPlaying
              ? 'bg-rosegold-500 hover:bg-rosegold-600 text-white border-rosegold-400'
              : 'bg-white hover:bg-rosegold-50 text-gray-600 border-gray-200'
            }
          `}
        >
          {isMusicPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-white animate-bounce" />
              <span>Matikan Musik 🎵</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-gray-400" />
              <span>Putar Musik Latar 🎵</span>
            </>
          )}
        </button>
      </header>

      {/* Primary Landing Hero Section */}
      <main className="relative pt-28 px-4 max-w-5xl mx-auto flex flex-col items-center z-20">

        {/* Animated Celebration Badge Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rosegold-100 rounded-full text-xs text-rosegold-750 font-semibold tracking-wide shadow-sm mb-6 animate-pulse-slow">
          <Calendar className="w-3.5 h-3.5 text-rosegold-500" />
          <span>Selasa, 23 Juni 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-rosegold-500" />
          <span>A Happy Cancer Day 💎</span>
        </div>

        {/* Giant Elegant Center Title */}
        <div className="text-center space-y-4 max-w-4xl">
          <p className="text-sm tracking-widest font-sans uppercase font-bold text-gray-400">
            ✨ PRESENTING THE SPECIAL CELEBRATION ✨
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-br from-rosegold-900 via-rosegold-600 to-rosegold-750">
            Happy Birthday <br />
            <span className="text-rosegold-900 relative inline-block mt-2">
              Chiquita Devina Aurellia
              {/* Decorative underline brush effect underneath the name */}
              <span className="absolute -bottom-2.5 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rosegold-400 to-transparent rounded-full" />
            </span>
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mt-4 font-normal">
            "Semoga hari-hari indahmu senantiasa berlimpah kebahagiaan, tawa yang berseri-seri, dan kedamaian hidup yang meneduhkan."
          </p>
        </div>

        {/* Little decorative scroll helper arrow */}
        <div className="flex flex-col items-center gap-2 my-10 animate-fade-in text-rosegold-400">
          <span className="text-[10px] uppercase tracking-widest font-bold">Rangkai & Buka Kejutan</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>

        {/* 2. Interactive Digital Flower Bouquet Simulation */}
        <div className="w-full border-y border-rosegold-100 py-10 bg-gradient-to-b from-transparent via-[#fdf9f8] to-transparent rounded-3xl">
          <FlowerBouquet />
        </div>

        {/* 3. Letter with Vintage Sealed Envelope Component */}
        <div className="w-full py-8">
          <LetterEnvelope />
        </div>

        {/* 4. Play Button Section ("Coba klik") */}
        <div className="w-full py-12 flex flex-col items-center justify-center text-center">

          <div className="max-w-md bg-white/70 border border-rosegold-200 shadow-xl rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
            {/* Glossy radial spotlight backgrounds */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-rosegold-200/40 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-100/35 rounded-full blur-2xl pointer-events-none" />

            <div className="w-14 h-14 bg-gradient-to-tr from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-md rotate-6">
              <Gift className="w-6 h-6 animate-pulse" />
            </div>

            <h3 className="font-serif text-2xl text-gray-900 font-bold mb-2">🎁 Satu Kejutan Terakhir</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-6">
              Tetesan doa, kenangan indah, dan perayaan tulus disusun khusus untukmu. Tekan tombol megah di bawah ini untuk melihat video kejutan ulang tahun yang manis!
            </p>

            {/* Glowing Interactive Pulse Button "Coba klik" */}
            <button
              onClick={() => setIsVideoOpen(true)}
              type="button"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-rosegold-500 via-rose-500 to-rosegold-750 text-white font-sans font-bold text-sm tracking-wider uppercase rounded-full shadow-[0_4px_20px_rgba(226,125,114,0.4)] hover:shadow-[0_8px_30px_rgba(226,125,114,0.6)] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden active:translate-y-0"
              id="birthday-surprise-trigger-button"
            >
              {/* Shimmer light bar across button */}
              <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

              <Sparkles className="w-4 h-4 mr-2 text-yellow-200 animate-spin" />
              <span>Coba klik</span>
              <Sparkles className="w-4 h-4 ml-2 text-yellow-200 animate-pulse" />
            </button>

          </div>
        </div>

      </main>

      {/* 5. Video Modal popup container */}
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />

      {/* Beautiful human footer overlay */}
      <footer className="mt-16 border-t border-rosegold-150/40 text-center py-8 relative z-20 text-xs text-gray-400">
        <p className="font-serif">Happy Celebration &bull; Built For Chiquita Devina Aurellia</p>
        <p className="text-[10px] mt-1 text-gray-300 font-sans">© 2026 All virtual rights of love & flowers reserved.</p>
      </footer>

    </div>
  );
}
