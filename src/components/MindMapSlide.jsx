import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Sparkles, X, Maximize2 } from 'lucide-react';
import mindmap from '../assets/images/mindmap.png';
import infographic from '../assets/images/infographic.png';

export default function MindMapSlide({ slide, isActive }) {
  const [activeTab, setActiveTab] = useState(0); // 0 for General Mind Map, 1 for Last Section Mind Map
  const [isZoomed, setIsZoomed] = useState(false);

  const mindMapImages = [
    {
      title: 'الخريطة الذهنية العامة للسورة',
      src: mindmap
    },
    {
      title: 'الخريطة الذهنية التفصيلية للمقطع القرآني الأخير',
      src: infographic
    }
  ];

  const currentImg = mindMapImages[activeTab];

  return (
    <motion.section
      id={`slide-${slide.slideNumber}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className={`rounded-3xl bg-[#1a0827]/95 border p-5 sm:p-8 lg:p-10 shadow-xl backdrop-blur-md space-y-6 max-w-6xl mx-auto transition-all duration-300 ${
        isActive 
          ? 'border border-pink-400/60 shadow-[0_0_15px_rgba(236,72,153,0.2)]' 
          : 'border-pink-500/30'
      }`}
    >
      {/* رأس الشريحة */}
      <div className="flex flex-row items-center justify-between pb-4 border-b border-pink-500/20 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/40">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-black bg-gradient-to-l from-white via-pink-100 to-purple-200 bg-clip-text text-transparent">
              الخريطة الذهنية لسورة الكهف
            </h2>
          </div>
        </div>
        <span className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md border border-pink-400/40 shrink-0">
          {slide.slideNumber}
        </span>
      </div>

      {/* أزرار التبديل بين الصورتين */}
      <div className="flex justify-center gap-3 flex-wrap">
        {mindMapImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2 ${
              activeTab === idx
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border border-pink-400/50 shadow-pink-500/30 shadow-lg'
                : 'bg-[#240c35]/90 text-pink-200 border border-pink-500/25 hover:border-pink-500/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-pink-300" />
            {img.title}
          </button>
        ))}
      </div>

      {/* عرض الصورة بعرض السيكشن مباشرة بدون بوردر أو خلفية */}
      <div className="relative flex flex-col items-center w-full">
        <div 
          onClick={() => setIsZoomed(true)}
          className="relative w-full overflow-hidden cursor-pointer group rounded-2xl"
        >
          <img
            src={currentImg.src}
            alt={currentImg.title}
            className="w-full h-auto object-contain max-h-[90vh] mx-auto transition-transform duration-300 group-hover:scale-[1.005]"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold backdrop-blur-xs">
            <Maximize2 className="w-6 h-6 text-pink-300" />
            <span>اضغط لتكبير الصورة</span>
          </div>
        </div>
      </div>

      {/* نافذة التكبير (Lightbox Modal) */}
      <AnimatePresence>
        {isZoomed && (
          <div 
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-6xl max-h-[95vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-2 right-2 z-10 p-3 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-all shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={currentImg.src}
                alt={currentImg.title}
                className="max-w-full max-h-[95vh] object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
