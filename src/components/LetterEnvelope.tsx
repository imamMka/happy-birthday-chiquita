import { useState } from "react";
import { Mail, MailOpen, Sparkles, Heart } from "lucide-react";

// Web Audio API magic chime sound synthesis
function playMagicalChime() {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const now = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 987.77, 1046.50]; // C5, E5, G5, B5, C6 (major 7th sweep)

    freqs.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + index * 0.08);

      gain.gain.setValueAtTime(0, now + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.15, now + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.7);
    });
  } catch (e) {
    console.warn("Audio Context not supported or allowed yet:", e);
  }
}

export default function LetterEnvelope() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    playMagicalChime();
    setIsOpen(!isOpen);
  };

  return (
    <div id="letter-envelope-section" className="w-full max-w-lg mx-auto my-12 px-4 relative z-20">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-wider text-rosegold-500 font-semibold px-3 py-1 bg-rosegold-100 rounded-full inline-flex items-center gap-1.5 animate-pulse-slow">
          <Sparkles className="w-3.5 h-3.5" /> Surat Rahasia Spesial
        </span>
        <h3 className="font-serif text-2xl md:text-3xl text-rosegold-900 mt-2 font-medium tracking-tight">
          Sentuhan Surat Cinta & Harapan
        </h3>
        <p className="text-sm text-gray-500 mt-1">Klik amplop di bawah ini untuk membukanya</p>
      </div>

      <div className="relative h-[480px] w-full flex items-center justify-center perspective-1000">
        {/* Envelope Container Wrapper */}
        <div
          onClick={handleOpenLetter}
          className={`relative w-full max-w-[400px] h-[280px] cursor-pointer transition-all duration-700 ease-in-out select-none transform-gpu
            ${isOpen ? 'translate-y-28 shadow-xl' : 'hover:-translate-y-2 hover:shadow-2xl'}
          `}
        >
          {/* Background Envelope Body (Back Panel & Flap) */}
          <div className="absolute inset-0 bg-rosegold-200 rounded-2xl border border-rosegold-300 shadow-inner overflow-hidden">
            {/* Elegant inner lining of envelope (diagonal patterns) */}
            <div className="absolute inset-0 bg-gradient-to-br from-rosegold-100 to-rosegold-300 opacity-60 flex items-center justify-center">
              <span className="font-cursive text-7xl text-rosegold-300 select-none">Chiquita</span>
            </div>
          </div>

          {/* Sliding Letter Sheet inside */}
          <div
            className={`absolute left-4 right-4 bg-[#fdfdfa] rounded-xl shadow-lg border border-yellow-100/50 p-6 transition-all duration-700 ease-in-out origin-bottom overflow-y-auto scrollbar-thin
              ${isOpen
                ? 'h-[400px] -translate-y-56 opacity-100 z-10 pointer-events-auto scale-100'
                : 'h-[180px] -translate-y-2 opacity-30 z-0 pointer-events-none scale-95'
              }
            `}
            onClick={(e) => {
              // Prevent closing when clicking on text area itself
              if (isOpen) e.stopPropagation();
            }}
          >
            {/* Letter Content Custom Style */}
            <div className="font-handwritten text-gray-700 text-sm md:text-base leading-relaxed space-y-4 pt-2">
              <div className="text-right text-xs text-rosegold-600 font-sans tracking-wide">
                Selasa, 23 Juni 2026 ✨
              </div>

              <div className="font-serif text-lg text-rosegold-900 font-semibold border-b border-rosegold-100 pb-2 flex items-center gap-2">
                Happy Birthday, Chiquita Devina Aurellia.
              </div>

              <p className="first-letter:text-4xl first-letter:font-serif first-letter:text-rosegold-500 first-letter:mr-2 first-letter:float-left first-letter:font-bold">
                Udah lama banget ya kita gak saling kabar-kabaran. Jujur, belakangan ini aku sering banget kangen sama kamu, kangen sama semua obrolan dan momen yang pernah kita laluin bareng dulu. Di hari spesial kamu besok, rasanya egois kalau aku cuma diem dan pura-pura lupa, karena biar bagaimanapun rute jalan kita sekarang udah berbeda, kamu tetep punya porsi tersendiri yang gak akan pernah terganti di ingatan aku.
              </p>

              <p>
                Malam ini, aku sengaja bikin website dan rekamin video ini khusus buat kamu. Aku cuma mau bilang makasih banyak ya, Chik. Makasih udah pernah mampir dan jadi bagian paling indah dalam cerita masa lalu aku. Maaf kalau dulu aku masih banyak kurangnya dan belum bisa jagain kamu dengan baik. Aku harap kamu yang sekarang selalu sehat, selalu dikelilingi oleh orang-orang yang tulus menyayangi kamu, dan gak ada lagi air mata kesedihan di mata kamu.
              </p>

              <p className="bg-rosegold-100/40 p-3 rounded-lg border-l-4 border-rosegold-400 italic font-sans text-sm text-gray-600">
                Terlepas dari semua itu, aku tetap berharap yang terbaik buat kamu. Semoga kamu selalu bahagia, dimudahkan dalam setiap urusan, dan cita-cita yang pernah kita diskusikan dulu bisa terwujud satu per satu. Kamu berhak mendapatkan semua kebahagiaan di dunia ini, Chik. Jangan pernah menyerah dan tetaplah bersinar seperti bintang yang kamu kagumi."
              </p>

              <p>
                Selamat ulang tahun ya, Chiquita! Doa terbaikku selalu menyertai setiap langkahmu. Jangan pernah lupa untuk tersenyum, karena senyummu adalah sumber kebahagiaan bagi banyak orang, termasuk aku dulu."
              </p>

              <div className="pt-4 border-t border-rosegold-100 text-right">
                <p className="font-cursive text-3xl text-rosegold-750">Dengan segenap doa tulus,</p>
                <div className="flex justify-end gap-1 items-center mt-1 text-xs font-sans text-gray-500 font-medium">
                  Created with love <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-heartbeat" />
                </div>
              </div>
            </div>
          </div>

          {/* Envelope Front Flaps (Folds Overlay) */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {/* Diagonal left side flap overlay */}
            <div className="absolute bottom-0 left-0 top-0 w-1/2 bg-gradient-to-tr from-rosegold-300 via-rosegold-200 to-transparent rounded-bl-2xl shadow-sm origin-bottom-left"
              style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }} />
            {/* Diagonal right side flap overlay */}
            <div className="absolute bottom-0 right-0 top-0 w-1/2 bg-gradient-to-tl from-rosegold-300 via-rosegold-200 to-transparent rounded-br-2xl shadow-sm origin-bottom-right"
              style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
            {/* Bottom triangular fold */}
            <div className="absolute bottom-0 left-0 right-0 h-4/6 bg-gradient-to-t from-rosegold-250 to-rosegold-150 border-t border-rosegold-100/20 rounded-b-2xl shadow-md"
              style={{ clipPath: 'polygon(0 100%, 50% 30%, 100% 100%)' }} />
          </div>

          {/* Envelope Top Flap (Animating open/close) */}
          <div
            className={`absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-rosegold-300 to-rosegold-200 rounded-t-2xl z-30 transition-all duration-500 ease-in-out origin-top border-b border-rosegold-300/30
              ${isOpen ? '-rotate-x-180 -translate-y-full opacity-40 z-0' : 'rotate-x-0 z-30'}
            `}
            style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
          />

          {/* Physical Wax Seal overlaying front */}
          <div
            className={`absolute left-1/2 top-4/6 -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-700 ease-in-out
              ${isOpen ? 'scale-0 rotate-180 opacity-0' : 'scale-100 hover:scale-110'}
            `}
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rosegold-600 via-rosegold-500 to-rosegold-750 flex items-center justify-center shadow-lg border-4 border-rosegold-300 relative">
              <span className="absolute inset-0.5 rounded-full border border-dashed border-white/40 pointer-events-none" />
              {isOpen ? (
                <MailOpen className="w-6 h-6 text-white" />
              ) : (
                <Mail className="w-6 h-6 text-[#fbe2de] fill-[#e27d72]" />
              )}
            </div>
            {/* Mini Label flag decoration */}
            <span className="absolute top-16 left-1/2 -translate-x-1/2 bg-white text-rosegold-750 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm border border-rosegold-100 whitespace-nowrap tracking-wider">
              TAP UNTUK BUKA
            </span>
          </div>
        </div>
      </div>

      {/* Reset/close Button when open for continuous play */}
      {isOpen && (
        <div className="text-center mt-3 animate-fade-in">
          <button
            onClick={() => { playMagicalChime(); setIsOpen(false); }}
            className="text-xs text-rosegold-600 hover:text-rosegold-900 border border-rosegold-200 hover:bg-rosegold-100 px-3 py-1.5 rounded-full transition-all duration-300"
          >
            Tutup & Lipat Kembali 💌
          </button>
        </div>
      )}
    </div>
  );
}
