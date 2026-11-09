import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Volume2,
  VolumeX,
  Music,
  ChevronDown
} from 'lucide-react';

export const RECITERS = [
  { id: 'alafasy', name: 'مشاري راشد العفاسي', folder: 'Alafasy_128kbps' },
  { id: 'husary', name: 'محمود خليل الحصري', folder: 'Husary_128kbps' },
  { id: 'minshawy', name: 'محمد صديق المنشاوي', folder: 'Minshawy_Murattal_128kbps' },
  { id: 'abdulbasit', name: 'عبد الباسط عبد الصمد', folder: 'Abdul_Basit_Murattal_192kbps' }
];

export default function AudioPlayer() {
  const [currentAyah, setCurrentAyah] = useState(83);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isLoopAyah, setIsLoopAyah] = useState(false);
  const [selectedReciter, setSelectedReciter] = useState(RECITERS[0]);
  const [isReciterMenuOpen, setIsReciterMenuOpen] = useState(false);

  const audioRef = useRef(null);

  // رابط الآية من موقع EveryAyah
  const getAyahUrl = (ayahNum, reciter) => {
    const pad = ayahNum.toString().padStart(3, '0');
    return `https://everyayah.com/data/${reciter.folder}/018${pad}.mp3`;
  };

  // تشغيل آية معينة
  const playAyah = (ayahNum, reciter = selectedReciter) => {
    if (ayahNum > 110) {
      setIsPlayingAudio(false);
      setCurrentAyah(83);
      return;
    }

    setCurrentAyah(ayahNum);
    if (audioRef.current) {
      const url = getAyahUrl(ayahNum, reciter);
      audioRef.current.src = url;
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch((err) => {
        console.warn('Audio playback error:', err);
        setIsPlayingAudio(false);
      });
    }
  };

  // عند انتهاء الآية الحالية، الانتقال التلقائي للآية التالية حتى النهاية (110)
  const handleEnded = () => {
    if (isLoopAyah) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      return;
    }

    if (currentAyah < 110) {
      const nextAyah = currentAyah + 1;
      playAyah(nextAyah, selectedReciter);
    } else {
      setIsPlayingAudio(false);
      setCurrentAyah(83);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="relative flex items-center justify-center gap-2 sm:gap-2.5 bg-[#260a3b]/95 border border-pink-500/40 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 shadow-md">
      <audio
        ref={audioRef}
        preload="auto"
        onEnded={handleEnded}
      />

      {/* زر التشغيل والإيقاف */}
      <button
        onClick={() => {
          if (!audioRef.current) return;
          if (isPlayingAudio) {
            audioRef.current.pause();
            setIsPlayingAudio(false);
          } else {
            if (!audioRef.current.src || audioRef.current.src === window.location.href) {
              playAyah(currentAyah);
            } else {
              audioRef.current.play().then(() => {
                setIsPlayingAudio(true);
              }).catch(() => {
                playAyah(currentAyah);
              });
            }
          }
        }}
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${
          isPlayingAudio
            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_12px_rgba(236,72,153,0.8)] animate-pulse'
            : 'bg-purple-900/80 text-pink-200 hover:bg-pink-600 hover:text-white'
        }`}
        title={isPlayingAudio ? 'إيقاف التلاوة' : 'تشغيل التلاوة المتواصلة'}
      >
        {isPlayingAudio ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current translate-x-[-1px]" />}
      </button>

      {/* السابق والتالي */}
      <button
        onClick={() => currentAyah > 83 && playAyah(currentAyah - 1)}
        disabled={currentAyah <= 83}
        className="text-purple-300 hover:text-pink-300 disabled:opacity-30 p-1"
        title="الآية السابقة"
      >
        <SkipForward className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => currentAyah < 110 && playAyah(currentAyah + 1)}
        disabled={currentAyah >= 110}
        className="text-purple-300 hover:text-pink-300 disabled:opacity-30 p-1"
        title="الآية التالية"
      >
        <SkipBack className="w-3.5 h-3.5" />
      </button>

      {/* رقم الآية الحالية */}
      <div className="flex items-center gap-1">
        <span className="text-xs sm:text-sm font-bold text-pink-200 flex items-center gap-1 whitespace-nowrap">
          <Music className="w-3.5 h-3.5 text-pink-400 hidden xs:inline" />
          آية {currentAyah}
        </span>
      </div>

      {/* تكرار نفس الآية */}
      <button
        onClick={() => setIsLoopAyah(!isLoopAyah)}
        className={`p-1 sm:p-1.5 rounded-full text-xs transition-all ${
          isLoopAyah ? 'bg-pink-500/30 text-pink-300' : 'text-purple-300/60 hover:text-pink-300'
        }`}
        title="تكرار الآية"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>

      {/* اختيار القارئ */}
      <button
        onClick={() => setIsReciterMenuOpen(!isReciterMenuOpen)}
        className="px-2 py-0.5 sm:py-1 rounded-lg bg-white/5 hover:bg-pink-500/20 text-purple-200 text-[11px] sm:text-xs font-bold flex items-center gap-1 whitespace-nowrap"
      >
        <span>{selectedReciter.name.split(' ')[0]}</span>
        <ChevronDown className="w-3 h-3 text-pink-400" />
      </button>

      {/* كتم / فتح الصوت */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="text-purple-300 hover:text-pink-300 p-1 hidden sm:block"
        title={isMuted ? 'إلغاء الكتم' : 'كتم الصوت'}
      >
        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      </button>

      {/* قائمة القراء المنسدلة */}
      {isReciterMenuOpen && (
        <div className="absolute top-full mt-2 left-0 sm:left-auto right-0 sm:right-auto z-50 w-64 sm:w-72 bg-[#220934] border border-pink-500/40 rounded-2xl shadow-2xl p-3 text-right">
          <div className="flex justify-between items-center pb-2 mb-2 border-b border-pink-500/20 text-xs font-bold text-pink-200">
            <span>تلاوة الآيات (83 إلى 110)</span>
            <button onClick={() => setIsReciterMenuOpen(false)} className="text-pink-300 text-[11px]">إغلاق</button>
          </div>
          <div className="grid grid-cols-2 gap-1 mb-2">
            {RECITERS.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setSelectedReciter(r);
                  setIsReciterMenuOpen(false);
                  if (isPlayingAudio) playAyah(currentAyah, r);
                }}
                className={`text-[10px] sm:text-[11px] p-1.5 rounded-lg text-right truncate ${
                  selectedReciter.id === r.id ? 'bg-pink-600 text-white font-bold' : 'bg-purple-950/60 text-purple-200'
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
