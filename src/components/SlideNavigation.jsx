import React, { useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function SlideNavigation({ slides, currentIndex, onSelectSlide }) {
  const scrollContainerRef = useRef(null);

  // Scroll active slide button into view when currentIndex changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeBtn = scrollContainerRef.current.children[currentIndex];
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [currentIndex]);

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[94vw] sm:w-auto max-w-xl">
      <div className="bg-[#1b0829]/95 border border-pink-500/40 backdrop-blur-xl px-2 sm:px-4 py-2 rounded-2xl shadow-2xl flex items-center justify-between gap-1.5 sm:gap-3">
        {/* Previous Slide Button */}
        <button
          onClick={() => currentIndex > 0 && onSelectSlide(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="p-1.5 sm:p-2 rounded-xl bg-purple-900/40 text-pink-300 hover:text-white disabled:opacity-30 border border-pink-500/20 shrink-0"
          title="الشريحة السابقة"
        >
          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Scrollable / Swipeable Number Buttons Container (Horizontal Swipe like sections) */}
        <div 
          ref={scrollContainerRef}
          className="flex items-center gap-1.5 overflow-x-auto scrollbar-none touch-pan-x px-1 py-1 max-w-[58vw] sm:max-w-md"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => onSelectSlide(idx)}
              className={`transition-all rounded-xl flex items-center justify-center font-bold shrink-0 ${
                idx === currentIndex
                  ? 'w-7 h-7 sm:w-9 sm:h-9 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs sm:text-sm shadow-md scale-110 border border-pink-300/60'
                  : 'w-6 h-6 sm:w-8 sm:h-8 bg-purple-950/80 text-purple-200 text-xs hover:bg-purple-900 border border-pink-500/20'
              }`}
              title={s.title}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        {/* Next Slide Button */}
        <button
          onClick={() => currentIndex < slides.length - 1 && onSelectSlide(currentIndex + 1)}
          disabled={currentIndex === slides.length - 1}
          className="p-1.5 sm:p-2 rounded-xl bg-purple-900/40 text-pink-300 hover:text-white disabled:opacity-30 border border-pink-500/20 shrink-0"
          title="الشريحة التالية"
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}
