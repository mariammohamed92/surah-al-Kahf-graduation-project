/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import AudioPlayer from './AudioPlayer';
import quranImg from '../assets/images/quran.jpg';
import { FileText } from 'lucide-react';

export default function Navbar() {
  const pdfLink = "https://drive.google.com/drive/folders/1cDji70KqdLrK7isbNUIrBA-XoxRk3hvs";

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-[#140620]/90 border-b border-pink-500/30 shadow-[0_4px_25px_rgba(236,72,153,0.15)] transition-all print:hidden">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
        
        {/* عنوان العرض: (سورة الكهف (قصة ذي القرنين) */}
        <div className="flex items-center justify-center lg:justify-start w-full lg:w-auto">
          <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-500/25 via-purple-600/35 to-pink-500/25 border border-pink-500/50 shadow-md flex items-center gap-2.5 backdrop-blur-md">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl overflow-hidden border border-pink-400/60 shadow-[0_0_12px_rgba(236,72,153,0.6)] shrink-0">
              <img src={quranImg} alt="" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-sm sm:text-base md:text-lg font-bold bg-gradient-to-l from-white via-pink-100 to-purple-200 bg-clip-text text-transparent leading-tight tracking-wide">
              سورة الكهف • قصة ذي القرنين
            </h1>
          </div>
        </div>

        {/* مجموعة ريكورد التلاوة وزر مشروع التخرج PDF */}
        {/* على الموبايل والتابلت (< lg): تحت بعض. على اللابتوب والشاشات الكبيرة (lg+): جنب بعض بمسافات منسقة. */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-4 w-full lg:w-auto">
          <AudioPlayer />

          <div>
            <a
              href={pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs sm:text-sm font-bold shadow-[0_0_15px_rgba(236,72,153,0.4)] border border-pink-400/40 transition transform hover:scale-105 whitespace-nowrap cursor-pointer"
              title="فتح مشروع التخرج PDF في تبويب جديد"
            >
              <FileText className="w-4 h-4 text-pink-200" />
              <span>مشروع التخرج PDF</span>
            </a>
          </div>
        </div>

      </div>
    </header>
  );
}

