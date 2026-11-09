import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Copy, Check, X, ZoomIn } from 'lucide-react';
import tributeImg from '../assets/images/tribute.png';

export default function TributeSlide({ slide, isActive }) {
  const [copied, setCopied] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const fullLetterText = `فضيلة الشيخ د. حازم شومان،
السلام عليكم ورحمة الله وبركاته،

نكتب إليك اليوم بقلوب مختلفة تماماً عن تلك التي بدأت الدورة.
دخلنا «فن مصاحبة سورة» ونحن نقرأ الآيات كما تعودنا، وخرجنا منها ونحن نرى القرآن يبني فينا نفوساً جديدة علّمتنا كيف نستنطق المعاني، وكيف نتلمس أثر التنزيل وزمنه، وكيف نرى الإعجاز التغييري وهو يهز زوايا حياتنا، وكيف تترابط السورة موضوعاً وموضعاً لتصنع بصيرة لا مجرد فكرة.

نحن في فريق «فاتّبع سبباً» لم نكن نطلب مجرد علم يُدوّن في الدفاتر، بل كنا نبحث عن الأثر الذي يُحيي القلوب ويقود للعمل. وبفضل الله ثم بصدق ما بثثته فينا يا شيخ حازم، شعرنا حقاً بمعنى الحياة بالقرآن وبدأنا نأخذ بأسباب هذا النور.

جزاك الله عنا وعن قلوبنا خير ما جزى معلماً ومربياً عن طلابه، وجعل كل حرف، وكل تدبّر، وكل أثر نتركه في ميزان حسناتك وصدقة جارية لك إلى يوم نلقى الله.

فريق «فاتّبع سبباً»`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullLetterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-pink-500/30 to-purple-600/30 text-pink-300 border border-pink-500/40 shadow-sm shrink-0">
            <Heart className="w-6 h-6 text-pink-400 fill-pink-500/30" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-black bg-gradient-to-l from-white via-pink-100 to-amber-200 bg-clip-text text-transparent">
              {slide.title}
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1.5 shrink-0">
          <span className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md border border-pink-400/40 shrink-0">
            {slide.slideNumber}
          </span>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/30 text-pink-200 hover:text-white transition-all text-[11px] font-bold shadow-xs"
            title="نسخ نص الرسالة"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-300">تم النسخ</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>نسخ النص</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* عرض صورة رسالة الشكر بعرض الشريحة بالكامل وبدون أي بوردر داخلي */}
      <div className="w-full flex justify-center pt-2">
        <img
          src={tributeImg}
          alt="رسالة شكر وتقدير لفضيلة الشيخ د. حازم شومان"
          onClick={() => setIsZoomed(true)}
          className="w-full h-auto rounded-2xl shadow-2xl cursor-pointer hover:opacity-95 transition-opacity"
        />
      </div>

      {/* نافذة التكبير الكامل عند النقر */}
      <AnimatePresence>
        {isZoomed && (
          <div
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl max-h-[96vh] w-full h-full flex flex-col items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-3 left-3 z-10 p-2 rounded-xl bg-purple-950/80 text-pink-300 hover:text-white hover:bg-pink-600 border border-pink-500/40 shadow-lg transition-all"
                title="إغلاق"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full h-full flex items-center justify-center overflow-auto p-2">
                <img
                  src={tributeImg}
                  alt="رسالة شكر وتقدير لفضيلة الشيخ د. حازم شومان"
                  className="max-h-[92vh] max-w-full w-auto object-contain rounded-2xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
