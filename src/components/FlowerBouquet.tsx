import { useState } from "react";
import { Sparkles, Flower, Heart, Trash2, Check } from "lucide-react";

interface FlowerType {
  id: string;
  name: string;
  meaning: string;
  color: string;
  emoji: string;
  svgColor: string;
  outlineColor: string;
  petalStyles: string;
}

const FLOWERS: FlowerType[] = [
  {
    id: "rose",
    name: "Pink Rose",
    meaning: "Keanggunan, syukur, & kasih sayang tulus",
    color: "from-rose-300 to-rose-400",
    emoji: "🌹",
    svgColor: "#f43f5e",
    outlineColor: "#fda4af",
    petalStyles: "bg-rose-400"
  },
  {
    id: "tulip",
    name: "Soft Tulip",
    meaning: "Penghargaan, awal baru, & kedamaian",
    color: "from-pink-300 to-peach-200",
    emoji: "🌷",
    svgColor: "#ec4899",
    outlineColor: "#fbcfe8",
    petalStyles: "bg-pink-300"
  },
  {
    id: "lily",
    name: "Royal Lily",
    meaning: "Kemurnian hiasan, kemegahan, & kemakmuran",
    color: "from-orange-100 to-amber-200",
    emoji: "💮",
    svgColor: "#fef3c7",
    outlineColor: "#fbbf24",
    petalStyles: "bg-amber-100"
  },
  {
    id: "lavender",
    name: "Lavender",
    meaning: "Ketenangan jiwa, keanggunan, & rasa damai",
    color: "from-purple-300 to-indigo-300",
    emoji: "🪻",
    svgColor: "#a855f7",
    outlineColor: "#d8b4fe",
    petalStyles: "bg-purple-300"
  },
  {
    id: "daisy",
    name: "Golden Daisy",
    meaning: "Keceriaan, loyalitas, & kehangatan abadi",
    color: "from-yellow-200 to-orange-300",
    emoji: "🌼",
    svgColor: "#eab308",
    outlineColor: "#fef08a",
    petalStyles: "bg-yellow-300"
  },
];

// Synth pluck sound generator
function playFlowerPluck(flowerIndex: number) {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    const now = ctx.currentTime;
    // Harmonic scales based on flower indexes
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // pentatonic
    const freq = scale[flowerIndex % scale.length];

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    // Filter to make it warmer & woodwind-like
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(now + 0.6);
  } catch (e) {
    console.warn("Audio Context blocked:", e);
  }
}

export default function FlowerBouquet() {
  const [selectedFlowers, setSelectedFlowers] = useState<Array<FlowerType & { keyId: number }>>([
    { ...FLOWERS[0], keyId: 0 }, // Pink Rose
    { ...FLOWERS[1], keyId: 1 }, // Soft Tulip
    { ...FLOWERS[0], keyId: 2 }, // Pink Rose
    { ...FLOWERS[3], keyId: 3 }, // Lavender
    { ...FLOWERS[2], keyId: 4 }, // Royal Lily
    { ...FLOWERS[1], keyId: 5 }, // Soft Tulip
    { ...FLOWERS[4], keyId: 6 }, // Golden Daisy
    { ...FLOWERS[3], keyId: 7 }, // Lavender
    { ...FLOWERS[0], keyId: 8 }, // Pink Rose
  ]);
  const [composerStep, setComposerStep] = useState<"compose" | "completed">("completed");
  const [greetingText, setGreetingText] = useState("Semoga harimu dihiasi tawa manis seindah kelopak-kelopak bunga ini, Chiquita! ❤️");
  const [keyCounter, setKeyCounter] = useState(9);

  const addFlower = (flower: FlowerType, index: number) => {
    if (selectedFlowers.length >= 12) return; // cap at 12 flowers for layout elegance
    playFlowerPluck(index);
    setSelectedFlowers([...selectedFlowers, { ...flower, keyId: keyCounter }]);
    setKeyCounter(keyCounter + 1);
  };

  const removeFlower = (keyId: number) => {
    setSelectedFlowers(selectedFlowers.filter((f) => f.keyId !== keyId));
  };

  const clearBouquet = () => {
    setSelectedFlowers([]);
    setComposerStep("compose");
  };

  const finalizeBouquet = () => {
    if (selectedFlowers.length === 0) return;
    playFlowerPluck(5); // high note to confirm
    setComposerStep("completed");
  };

  return (
    <div id="flower-bouquet-simulator" className="w-full max-w-4xl mx-auto my-14 px-4 relative z-20">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-wider text-teal-600 font-semibold px-3 py-1 bg-teal-50 rounded-full inline-flex items-center gap-1.5 shadow-sm">
          <Flower className="w-3.5 h-3.5 text-teal-500" /> Hadiah Hand Bouquet Digital
        </span>
        <h3 className="font-serif text-3xl md:text-4xl text-gray-900 mt-2 font-medium tracking-tight">
          Hand Bouquet Cantik Spesial Untukmu
        </h3>
        <p className="text-sm text-gray-500 mt-2 max-w-lg mx-auto">
          Bunga-bunga indah ini dirangkai khusus untuk menemani hari istimewa Chiquita Devina Aurellia. Sentuh bunganya untuk melihat maknanya, atau rakit kembalian sesukamu jika ingin berkreasi!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Interactive Bouquet Visualizer */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-md border border-rosegold-100 flex flex-col justify-between min-h-[460px] relative overflow-hidden">
          
          {/* Ambient grid lines for architectural honesty with a cute grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#faf5f5_1px,transparent_1px),linear-gradient(to_bottom,#faf5f5_1px,transparent_1px)] bg-[size:24px_24px] opacity-60 pointer-events-none" />

          {/* Bouquet Vase Canvas Area */}
          <div className="relative flex-1 flex flex-col items-center justify-end pb-2">
            
            {/* Empty state instruction */}
            {selectedFlowers.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none z-10">
                <div className="w-16 h-16 rounded-full bg-rosegold-50 flex items-center justify-center mb-4 border border-dashed border-rosegold-300 animate-pulse-slow">
                  <Flower className="w-8 h-8 text-rosegold-400" />
                </div>
                <p className="font-serif text-lg text-gray-700">Wadah Vas Bunga Kosong</p>
                <p className="text-xs text-gray-400 mt-1">Tap/pilih jenis bunga di bawah untuk mulai merangkai bucket bunga impian</p>
              </div>
            )}

            {/* Rendered flowers popping beautifully in the Vase */}
            <div className="relative w-full max-w-[280px] h-[300px] flex items-center justify-center z-10">
              {selectedFlowers.map((flower, idx) => {
                // Calculate beautiful spiral/radial distributions so flowers form a gorgeous head
                const total = selectedFlowers.length;
                const angle = (idx / total) * Math.PI * 1.5 - Math.PI * 0.75; // spread in an arc
                const distance = total > 1 ? (35 + (idx % 3) * 20) : 0; // layers
                const offsetX = Math.sin(angle) * distance;
                const offsetY = -Math.cos(angle) * distance - 80;
                
                // Rotation based on angle to make them point outward naturally
                const rotateDeg = angle * (180 / Math.PI) * 0.6;

                return (
                  <div
                    key={flower.keyId}
                    style={{
                      transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotateDeg}deg) scale(1.05)`,
                      transitionDelay: `${idx * 30}ms`
                    }}
                    className="absolute bottom-12 transition-all duration-500 ease-out flex flex-col items-center group cursor-pointer"
                    onClick={() => removeFlower(flower.keyId)}
                  >
                    {/* Flower head layout using SVGs or styling divs */}
                    <div className="relative">
                      {/* Leaf decoration */}
                      <span className="absolute -left-3 top-2 w-4 h-2 bg-emerald-400 rounded-full rotate-45 opacity-70 group-hover:scale-125 transition-transform" />
                      <span className="absolute -right-3 top-2 w-4 h-2 bg-emerald-500 rounded-full -rotate-45 opacity-70 group-hover:scale-125 transition-transform" />
                      
                      {/* Interactive Bloom element */}
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${flower.color} shadow-md flex items-center justify-center text-xl hover:scale-125 transition-transform duration-300 border-2 border-white relative`}>
                        <span className="text-lg relative z-10 select-none">{flower.emoji}</span>
                        {/* Soft pulse aura */}
                        <span className="absolute inset-0 rounded-full bg-white opacity-20 transform scale-75 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    </div>
                    {/* Flower Stem */}
                    <div className="w-1 h-32 bg-emerald-700/80 -mt-1 rounded-full origin-top" />
                    
                    {/* Hover remove label */}
                    <span className="absolute -top-6 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm pointer-events-none">
                      Hapus x
                    </span>
                  </div>
                );
              })}

              {/* Wrapping Ribbon & Bow Layer overlaying the stems */}
              {selectedFlowers.length > 0 && (
                <div className="absolute bottom-16 z-20 flex flex-col items-center animate-bounce-slow">
                  {/* Decorative Satin Ribbon Wrap */}
                  <div className="h-6 w-16 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 rounded-lg shadow-md flex items-center justify-center border border-pink-300">
                    <span className="text-[10px] text-white font-bold tracking-wider">ROSE GOLD</span>
                  </div>
                  {/* Satin Bow Tied Knot */}
                  <div className="relative -mt-1 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-rose-500 border border-white flex items-center justify-center shadow-md">
                      <Heart className="w-3.5 h-3.5 text-white fill-white" />
                    </div>
                    <div className="absolute -left-4 w-5 h-4 bg-pink-500 rounded-full border border-pink-300 -rotate-12" />
                    <div className="absolute -right-4 w-5 h-4 bg-pink-500 rounded-full border border-pink-300 rotate-12" />
                    {/* Hanging Ribbon Tails */}
                    <div className="absolute top-4 -left-2 w-2 h-6 bg-pink-400 rounded-md rotate-12 origin-top-right" />
                    <div className="absolute top-4 -right-2 w-2 h-6 bg-pink-400 rounded-md -rotate-12 origin-top-left" />
                  </div>
                </div>
              )}

              {/* Vintage Glass Jar/Vase */}
              <div className="absolute bottom-0 w-36 h-24 bg-white/20 backdrop-blur-md rounded-b-3xl rounded-t-lg border-2 border-white/60 shadow-[0_10px_25px_-5px_rgba(226,125,114,0.15)] flex flex-col items-center justify-center z-10 overflow-hidden">
                <div className="absolute inset-x-2 bottom-2 top-4 bg-teal-200/20 rounded-b-2xl border-t border-teal-100/30" />
                <div className="w-full text-center relative z-20 font-serif text-[11px] text-rosegold-900 tracking-widest font-semibold uppercase pointer-events-none select-none">
                  FOR CHIQUITA
                </div>
                <div className="text-[9px] text-gray-500 relative z-20 font-mono font-medium mt-0.5 tracking-wider">
                  {selectedFlowers.length} / 12 FLOWERS
                </div>
              </div>

            </div>
          </div>

          {/* Action Row */}
          {selectedFlowers.length > 0 && (
            <div className="border-t border-rosegold-100 pt-4 flex items-center justify-between z-20 relative">
              <button
                onClick={clearBouquet}
                type="button"
                className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100/60 px-3 py-2 rounded-xl transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" /> Ulangi Rangkaian
              </button>

              {composerStep === "compose" ? (
                <button
                  onClick={finalizeBouquet}
                  type="button"
                  className="flex items-center gap-1.5 text-xs text-white font-semibold bg-emerald-500 hover:bg-emerald-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 px-4 py-2 rounded-xl transition-all"
                >
                  <Check className="w-3.5 h-3.5" /> Selesaikan Rangkaian
                </button>
              ) : (
                <button
                  onClick={() => setComposerStep("compose")}
                  type="button"
                  className="text-xs text-rosegold-750 font-semibold bg-rosegold-100 hover:bg-rosegold-200 px-4 py-2 rounded-xl transition-all"
                >
                  Tambah Bunga Lagi 💐
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Interaction Bar & Flower Catalog */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          {composerStep === "compose" ? (
            <div className="space-y-4 bg-[#fdfaf9] rounded-3xl p-6 border border-rosegold-200 shadow-sm flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-lg text-gray-900 font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-rosegold-500" /> Katalog Toko Bunga
                </h4>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                  Sentuh bunga di bawah ini untuk memasukkannya ke dalam vas. Rangkaian ini akan mewakili perasaan & doa tulus Anda untuk hari spesialnya.
                </p>

                {/* Flower Catalog Grid */}
                <div className="space-y-3">
                  {FLOWERS.map((f, index) => (
                    <button
                      key={f.id}
                      onClick={() => addFlower(f, index)}
                      disabled={selectedFlowers.length >= 12}
                      className="w-full flex items-center gap-3.5 p-3 rounded-2xl border border-white hover:border-rosegold-200 bg-white hover:bg-rosegold-50 shadow-sm hover:shadow transition-all duration-300 text-left group"
                    >
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-inner`}>
                        <span className="select-none">{f.emoji}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-sans font-semibold text-gray-800 text-xs md:text-sm flex items-center justify-between">
                          <span>{f.name}</span>
                          <span className="text-[10px] text-rosegold-600 font-serif italic">Tambahkan +</span>
                        </div>
                        <p className="text-[11px] text-gray-500 truncate mt-0.5">{f.meaning}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress counter */}
              <div className="mt-4 pt-4 border-t border-rosegold-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">Kepadatan Bouquet</span>
                <span className="text-xs font-semibold text-rosegold-600 px-2.5 py-0.5 bg-rosegold-100 rounded-full">
                  {selectedFlowers.length} / 12 Bunga dipilih
                </span>
              </div>
            </div>
          ) : (
            /* COMPLETED STATE: Custom Gift Tag Setup */
            <div className="space-y-4 bg-[#fbfdfb] rounded-3xl p-6 border border-teal-100 shadow-sm flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 text-center">
                  <span className="text-xs font-bold text-teal-700 tracking-wider block mb-1">🎁 BUCKET BERHASIL DIRANGKAI</span>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    Bucket bunga cantik siap diantar. Tuliskan pesan ucapan pendek di kartu ucapan gantung untuk menyertainya!
                  </p>
                </div>

                {/* Gift tag message preview box */}
                <div className="bg-[#fcfcf9] border-2 border-dashed border-teal-200 p-4 rounded-2xl shadow-inner relative flex flex-col">
                  {/* Decorative tag hole */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border border-teal-200 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  </div>
                  
                  <div className="font-handwritten text-gray-700 text-xs md:text-sm space-y-2 mt-4 text-center">
                    <span className="text-[10px] uppercase font-sans tracking-widest text-teal-600 font-bold block mb-2">Gift Tag Label</span>
                    <p className="italic">
                      "{greetingText || 'Mengharapkan kebahagiaan tak berujung untuk Chiquita Devina Aurellia...'}"
                    </p>
                    <div className="text-[10px] font-sans text-gray-400 mt-2">
                      - Dari Pengirim Terbaik ❤️
                    </div>
                  </div>
                </div>

                {/* Textbox input */}
                <div>
                  <label htmlFor="tag-message" className="block text-xs font-semibold text-gray-700 mb-1">Ubah Kalimat Kartu Ucapan:</label>
                  <input
                    id="tag-message"
                    type="text"
                    maxLength={100}
                    value={greetingText}
                    onChange={(e) => setGreetingText(e.target.value)}
                    placeholder="Contoh: Semoga selalu tersenyum & penuh berkah! ✨"
                    className="w-full bg-white text-xs border border-gray-200 hover:border-rosegold-300 focus:border-rosegold-500 focus:ring-1 focus:ring-rosegold-500 rounded-xl px-3.5 py-2.5 transition-all text-gray-700"
                  />
                  <span className="text-[9px] text-gray-400 text-right block mt-1">Maksimal 100 karakter</span>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-teal-100">
                <button
                  type="button"
                  onClick={() => setComposerStep("compose")}
                  className="w-full text-center text-xs text-teal-600 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 py-2.5 rounded-xl transition-all font-semibold"
                >
                  Edit Susunan Bunga 🌸
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
