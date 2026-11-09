import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ClipboardList, 
  X, 
  HeartHandshake, 
  Award 
} from 'lucide-react';
import { formatIslamicText } from './SlideSection.jsx';

export default function AppendixTablesSlide({ slide, isActive }) {
  const [activeTab, setActiveTab] = useState(0); // 0: worship, 1: participation
  const [isZoomed, setIsZoomed] = useState(false);

  const images = slide.images || [];
  const currentImg = images[activeTab] || images[0];

  return (
    <motion.section
      id={`slide-${slide.slideNumber}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className={`rounded-3xl bg-[#1a0827]/95 border p-4 sm:p-7 lg:p-9 shadow-xl backdrop-blur-md space-y-6 max-w-5xl mx-auto transition-all duration-300 ${
        isActive 
          ? 'border border-pink-400/60 shadow-[0_0_15px_rgba(236,72,153,0.2)]' 
          : 'border-pink-500/30'
      }`}
    >
      {/* رأس الشريحة */}
      <div className="flex items-center justify-between pb-4 border-b border-pink-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/40 shadow-sm">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-black bg-gradient-to-l from-white via-pink-100 to-purple-200 bg-clip-text text-transparent">
              {slide.title}
            </h2>
          </div>
        </div>
        <span className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md border border-pink-400/40 shrink-0">
          {slide.slideNumber}
        </span>
      </div>

      {/* البسملة التمهيدية */}
      {slide.introText && (
        <div className="bg-[#240c35]/90 border border-pink-500/25 rounded-2xl p-3.5 text-center shadow-sm">
          <p className="text-base sm:text-xl font-bold font-quran text-pink-200">
            {formatIslamicText(slide.introText)}
          </p>
        </div>
      )}

      {/* زرا التبديل بين الجدولين */}
      <div className="flex justify-center gap-3 sm:gap-4 flex-wrap pt-1">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-5 sm:px-7 py-3 rounded-2xl text-xs sm:text-sm md:text-base font-bold transition-all shadow-md flex items-center gap-2.5 ${
              activeTab === idx
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border border-pink-400/60 shadow-[0_0_20px_rgba(236,72,153,0.35)] scale-[1.02]'
                : 'bg-[#240c35]/90 text-pink-200 border border-pink-500/25 hover:border-pink-500/50 hover:bg-[#2b0e3f]'
            }`}
          >
            {idx === 0 ? (
              <HeartHandshake className="w-5 h-5 text-pink-300" />
            ) : (
              <Award className="w-5 h-5 text-pink-300" />
            )}
            <span>{img.title}</span>
          </button>
        ))}
      </div>

      {/* عرض الصورة بعرض وحجم الشريحة مباشرة بدون أي بوردر داخلي وبدون نصوص أسفلها */}
      <div className="w-full flex justify-center pt-2">
        {currentImg && (
          <img
            src={currentImg.src}
            alt={currentImg.title}
            onClick={() => setIsZoomed(true)}
            className="w-full h-auto rounded-2xl shadow-2xl cursor-pointer hover:opacity-95 transition-opacity"
          />
        )}
      </div>

      {/* نافذة التكبير الكامل عند النقر اختيارياً */}
      <AnimatePresence>
        {isZoomed && currentImg && (
          <div 
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-6xl max-h-[98vh] w-full h-full flex flex-col items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-2 right-2 z-10 p-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white transition-all shadow-lg flex items-center justify-center"
                title="إغلاق"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full flex-1 overflow-auto p-1 flex items-center justify-center">
                <img
                  src={currentImg.src}
                  alt={currentImg.title}
                  className="max-w-full max-h-[96vh] object-contain rounded-xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
