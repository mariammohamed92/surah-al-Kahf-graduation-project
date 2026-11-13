import React from 'react';
import AudioPlayer from './AudioPlayer';
import quranImg from '../assets/images/quran.jpg';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-[#140620]/90 border-b border-pink-500/30 shadow-[0_4px_25px_rgba(236,72,153,0.15)] transition-all print:hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        
        {/* عنوان العرض: (سورة الكهف • قصة ذي القرنين) */}
        <div className="flex items-center justify-center">
          <div className="px-4 py-1.5 sm:py-2 rounded-2xl bg-gradient-to-r from-pink-500/25 via-purple-600/35 to-pink-500/25 border border-pink-500/50 shadow-md flex items-center gap-2.5 backdrop-blur-md">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl overflow-hidden border border-pink-400/60 shadow-[0_0_12px_rgba(236,72,153,0.6)] shrink-0">
              <img src={quranImg} alt="" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-l from-white via-pink-100 to-purple-200 bg-clip-text text-transparent leading-tight tracking-wide">
              سورة الكهف • قصة ذي القرنين
            </h1>
          </div>
        </div>

        {/* ريكورد / مشغل التلاوة */}
        <AudioPlayer />

      </div>
    </header>
  );
}
