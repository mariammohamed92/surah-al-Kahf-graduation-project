import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, BookOpen, Users, ListTree, ZoomIn, X } from 'lucide-react';
import MindMapSlide from './MindMapSlide.jsx';
import AppendixTablesSlide from './AppendixTablesSlide.jsx';
import TributeSlide from './TributeSlide.jsx';

export function formatIslamicText(text) {
  if (!text || typeof text !== 'string') return text;

  const qSegments = text.split(/(?<=[؟])/);
  if (qSegments.length > 1) {
    return qSegments.map((seg, sIdx) => {
      if (seg.includes('؟')) {
        const isLongQuestion = seg.trim().length > 110;
        return (
          <span
            key={sIdx}
            className={
              isLongQuestion
                ? "text-white font-bold px-0.5 inline"
                : "text-pink-200 font-bold px-0.5 inline"
            }
          >
            {seg}
          </span>
        );
      }
      return formatIslamicText(seg);
    });
  }

  const regex = /(﴿[^﴾]+﴾|\{[^}]+\}|صلى الله عليه وسلم|صل الله عليه وسلم|ﷺ|«[^»]+»|غريب الكلمات:?|التفسير الإجمالي:?|الفوائد التربوية:?|-?\s*الخلاصة:?|-?\s*التطبيق:?|-?\s*القانون الأول:?|-?\s*القانون الثاني:?|-?\s*القانون الثالث:?|-?\s*القانون الرابع:?|-?\s*القانون الخامس:?|قانون التصديق:?|قانون الفعل:?|قانون العطاء:?|قانون التحرر:?|قانون الاستطاعة:?|المادة الأولى:?|المادة الثانية:?|المادة الثالثة:?|-?\s*روشتة أصحاب الكهف:?|-?\s*روشتة موسى والخضر:?|-?\s*روشتة أصحاب الجنتين:?|-?\s*عهد مع نفسي:?|-?\s*علّمني ذو القرنين:?|-?\s*الإجابة:?|أولاً:?|ثانياً:?|ثالثاً:?|رابعاً:?|خامساً:?|سادساً:?|سابعاً:?|ثامناً:?|أولًا:?|ثانيًا:?|ثالثًا:?|رابعًا:?|خامسًا:?|سادسًا:?|سابعًا:?|ثامنًا:?|ثامناً وأخيراً:?|المحور الأول:?|المحور الثاني:?|المحور الثالث:?|المحور الرابع:?|المحور الخامس:?|العصمة منها:?|البُعد التربوي في الفتنة:?|البعد التربوي في الفتنة:?|مناسبة فاتحة السورة لخاتمتها والترابط الموضوعي بين أقسامها:?|العلاقة التفصيلية بين افتتاح السورة وخواتيم السورة:?|-?\s*رسالة التدبّر:?|-?\s*رسالة التدبر:?|-?\s*الموقف الأول:?|-?\s*الموقف الثاني:?|-?\s*الموقف الثالث:?|-?\s*الموقف الرابع:?|-?\s*رسالة التغيير:?|-?\s*السؤال الأول:?|-?\s*السؤال الثاني:?|-?\s*السؤال الثالث:?|-?\s*قصة أصحاب الكهف|-?\s*قصة ذي القرنين والسد|-?\s*دلالة الغطاء|-?\s*حديث حفظ عشر آيات من أول السورة|-?\s*الربط بين اسم السورة والكهف والسد والغطاء والأخسرين أعمالًا|-?\s*منهج العمل|-?\s*وموضع التأمل هنا:?|-?\s*أصحاب الكهف:?|-?\s*صاحب الجنتين:?|-?\s*موسى والخضر:?|-?\s*ذو القرنين:?|-?\s*في بناء السورة الداخلي:?|-?\s*في موضع الآيات الأواخر:?|-?\s*في خاتمة السورة:?|-?\s*لطيفة التدبر:?|لطيفة التدبر:?|المَسْألَةُ الأُولى:?|المسألة الأولى:?|المَسْألَةُ الثَّانِيَة:?|المسألة الثانية:?|تفسير\s+[^:]+:?|الآية\s+\(\d+\):?|الآيتان\s+\([^)]+\):?|\b\d+[\.)\–:-])/g;
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    if (!part) return null;

    if ((part.startsWith('﴿') && part.endsWith('﴾')) || (part.startsWith('{') && part.endsWith('}'))) {
      return (
        <span
          key={idx}
          className="text-pink-200 font-bold font-quran text-[1.05em] px-1.5 py-0.5 inline-block leading-loose"
        >
          {part}
        </span>
      );
    }

    const cleanPart = part.replace(/^[-–\s❖]+/, '').replace(/[:]/g, '').trim();

    // قوانين الحياة وروشتات الحياة - البينك الخفيف بدون بوردر ولا بلوك
    const isLawItem = [
      'القانون الأول', 'القانون الثاني', 'القانون الثالث', 'القانون الرابع', 'القانون الخامس',
      'قانون التصديق', 'قانون الفعل', 'قانون العطاء', 'قانون التحرر', 'قانون الاستطاعة',
      'المادة الأولى', 'المادة الثانية', 'المادة الثالثة', 'التطبيق',
      'روشتة أصحاب الكهف', 'روشتة موسى والخضر', 'روشتة أصحاب الجنتين',
      'عهد مع نفسي', 'علّمني ذو القرنين'
    ].includes(cleanPart);

    if (isLawItem) {
      return (
        <span
          key={idx}
          className="text-pink-200 font-bold px-1 inline-block"
        >
          {part.replace(/^[❖\s]+/, '')}
        </span>
      );
    }

    const isMajorHeading = [
      'غريب الكلمات', 'التفسير الإجمالي', 'الفوائد التربوية', 'الخلاصة'
    ].includes(cleanPart) || cleanPart.startsWith('تفسير') || cleanPart.startsWith('الآية') || cleanPart.startsWith('الآيتان');

    if (isMajorHeading) {
      return (
        <span
          key={idx}
          className="text-pink-300 font-black text-base sm:text-lg block my-1.5 font-bold tracking-wide"
        >
          {part.replace(/^[❖\s]+/, '')}
        </span>
      );
    }

    if (
      part === 'اسم السورة التوقيفي' ||
      part === 'صلى الله عليه وسلم' ||
      part === 'صل الله عليه وسلم' ||
      part === 'ﷺ' ||
      (part.startsWith('«') && part.endsWith('»')) ||
      [
        'أولاً', 'ثانياً', 'ثالثاً', 'رابعاً', 'خامساً', 'سادساً', 'سابعاً', 'ثامناً',
        'أولًا', 'ثانيًا', 'ثالثًا', 'رابعًا', 'خامسًا', 'سادسًا', 'سابعًا', 'ثامنًا',
        'ثامناً وأخيراً', 'ثامناً واخيراً', 'ثامنًا وأخيرًا', 'ثامنًا واخيرًا',
        'المحور الأول', 'المحور الثاني', 'المحور الثالث', 'المحور الرابع', 'المحور الخامس',
        'العصمة منها', 'البُعد التربوي في الفتنة', 'البعد التربوي في الفتنة',
        'مناسبة فاتحة السورة لخاتمتها والترابط الموضوعي بين أقسامها',
        'مناسبة فاتحة السورة لخاتمتها والترابط الموضوعي بين اقسامها',
        'العلاقة التفصيلية بين افتتاح السورة وخواتيم السورة',
        'رسالة التدبّر', 'رسالة التدبر', 'الموقف الأول', 'الموقف الثاني', 'الموقف الثالث', 'الموقف الرابع',
        'رسالة التغيير', 'السؤال الأول', 'السؤال الثاني', 'السؤال الثالث',
        'قصة أصحاب الكهف', 'قصة ذي القرنين والسد', 'دلالة الغطاء',
        'حديث حفظ عشر آيات من أول السورة', 'الربط بين اسم السورة والكهف والسد والغطاء والأخسرين أعمالًا', 'منهج العمل',
        'وموضع التأمل هنا', 'أصحاب الكهف', 'صاحب الجنتين', 'موسى والخضر', 'ذو القرنين',
        'في بناء السورة الداخلي', 'في موضع الآيات الأواخر', 'في خاتمة السورة',
        'لطيفة التدبر', 'المسألة الأولى', 'المسألة الثانية', 'المَسْألَةُ الأُولى', 'المَسْألَةُ الثَّانِيَة',
        'الإجابة'
      ].includes(cleanPart) ||
      /^\s*\d+[\.)–:-]/.test(part)
    ) {
      const isAxisOrProtection = ['المحور الأول', 'المحور الثاني', 'المحور الثالث', 'المحور الرابع', 'المحور الخامس', 'العصمة منها', 'البُعد التربوي في الفتنة', 'البعد التربوي في الفتنة'].includes(cleanPart);
      return (
        <span
          key={idx}
          className={
            isAxisOrProtection
              ? "text-pink-100 font-bold px-0.5 inline-block"
              : "text-pink-200 font-bold px-0.5 inline-block"
          }
        >
          {part.replace(/^[❖\s]+/, '')}
        </span>
      );
    }

    return part;
  });
}

export default function SlideSection({ slide, isActive }) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [activeStationIdx, setActiveStationIdx] = useState(0);
  const [activeSubStationIdx, setActiveSubStationIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // 1. شريحة الغلاف (Cover)
  if (slide.type === 'cover') {
    return (
      <motion.section
        id={`slide-${slide.slideNumber}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className="w-full relative overflow-hidden bg-[#110519] scroll-mt-24"
      >
        <div className="w-full relative">
          <img
            src={slide.image}
            alt="غلاف سورة الكهف"
            className="w-full h-auto block object-contain"
          />
        </div>
      </motion.section>
    );
  }

  // 2. الصفحة الثانية: بيانات الورشة ونطاق الفِرق القرآني
  if (slide.type === 'workshop-info') {
    const { workshopName, workshopNumber, attendance, quranGroup } = slide.workshopDetails;
    return (
      <motion.section
        id={`slide-${slide.slideNumber}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className={`rounded-3xl bg-[#1a0827]/95 border p-5 sm:p-8 lg:p-10 shadow-xl backdrop-blur-md space-y-6 max-w-5xl mx-auto transition-all duration-300 ${
          isActive 
            ? 'border border-pink-400/60 shadow-[0_0_15px_rgba(236,72,153,0.2)]' 
            : 'border-pink-500/30'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-pink-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/40">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-lg sm:text-2xl font-black bg-gradient-to-l from-white via-pink-100 to-purple-200 bg-clip-text text-transparent">
              مشروع التخرج:
            </h2>
          </div>
          <span className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md border border-pink-400/40 shrink-0">
            {slide.slideNumber}
          </span>
        </div>

        <div className="text-center pb-2">
          <h3 className="text-xl sm:text-3xl font-quran font-bold text-pink-200">
            ( دراسة تدبرية في سورة الكهف )
          </h3>
        </div>

        {/* تفاصيل الورشة */}
        <div className="bg-[#240c35]/90 border border-pink-500/30 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5 leading-loose">
          <div className="flex items-center gap-4 py-3 border-b border-pink-500/15">
            <span className="text-pink-300 font-bold text-base sm:text-lg">اسم الورشة:</span>
            <span className="text-gray-100 font-bold text-base sm:text-lg">{workshopName}</span>
          </div>

          <div className="flex items-center gap-4 py-3 border-b border-pink-500/15">
            <span className="text-pink-300 font-bold text-base sm:text-lg">رقم الورشة:</span>
            <span className="text-gray-100 font-bold text-base sm:text-lg">{workshopNumber}</span>
          </div>

          <div className="flex items-center gap-4 py-3 border-b border-pink-500/15">
            <span className="text-pink-300 font-bold text-base sm:text-lg">نوع الحضور:</span>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-pink-500 flex items-center justify-center shadow-md">
                <Check className="w-4 h-4 text-white stroke-[3]" />
              </div>
              <span className="text-gray-100 font-bold text-base sm:text-lg">{attendance}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 py-3">
            <span className="text-pink-300 font-bold text-base sm:text-lg">اسم الفِرق القرآني:</span>
            <span className="text-white font-bold text-base sm:text-lg">{quranGroup}</span>
          </div>
        </div>

        {/* نطاق الفِرق القرآني */}
        {slide.quranScopeTitle && (
          <div className="bg-[#12051d]/90 border border-pink-500/30 rounded-2xl p-6 sm:p-8 shadow-inner space-y-4">
            <h4 className="text-lg sm:text-2xl font-bold text-white">
              {slide.quranScopeTitle}
            </h4>
            <div className="space-y-3 text-white font-quran text-base sm:text-xl leading-loose">
              <p>{slide.quranScopeFrom}</p>
              <p>{slide.quranScopeTo}</p>
            </div>
          </div>
        )}
      </motion.section>
    );
  }

  // 3. شريحة فريق العمل (Team)
  if (slide.type === 'team') {
    return (
      <motion.section
        id={`slide-${slide.slideNumber}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className={`rounded-3xl bg-[#1a0827]/95 border p-5 sm:p-8 lg:p-10 shadow-xl backdrop-blur-md space-y-6 max-w-4xl mx-auto transition-all duration-300 ${
          isActive 
            ? 'border border-pink-400/60 shadow-[0_0_15px_rgba(236,72,153,0.2)]' 
            : 'border-pink-500/30'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-pink-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/40">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-lg sm:text-2xl font-black bg-gradient-to-l from-white via-pink-100 to-purple-200 bg-clip-text text-transparent">
              {slide.title}
            </h2>
          </div>
          <span className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md border border-pink-400/40 shrink-0">
            {slide.slideNumber}
          </span>
        </div>

        <div className="max-h-[380px] overflow-y-auto pr-2 pb-8 scrollbar-thin scrollbar-thumb-pink-500/40 scrollbar-track-purple-950/40 space-y-3">
          {slide.members.map((member, idx) => {
    
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 bg-[#240c35]/90 border border-pink-500/25 rounded-2xl p-4 shadow-sm hover:border-pink-500/50 hover:bg-[#2b0e3f] transition-all"
              >
                <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-md">
                  {idx + 1}
                </span>
                <span className="text-base sm:text-lg font-bold text-gray-100 flex items-center gap-2 flex-wrap">
                  {member}
                
                </span>
              </div>
            );
          })}
        </div>
      </motion.section>
    );
  }

  // 4. شريحة الفهرس (Index)
  if (slide.type === 'index') {
    return (
      <motion.section
        id={`slide-${slide.slideNumber}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className={`rounded-3xl bg-[#1a0827]/95 border p-5 sm:p-8 lg:p-10 shadow-xl backdrop-blur-md space-y-6 max-w-4xl mx-auto transition-all duration-300 ${
          isActive 
            ? 'border border-pink-400/60 shadow-[0_0_15px_rgba(236,72,153,0.2)]' 
            : 'border-pink-500/30'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-pink-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/40">
              <ListTree className="w-6 h-6" />
            </div>
            <h2 className="text-lg sm:text-2xl font-black bg-gradient-to-l from-white via-pink-100 to-purple-200 bg-clip-text text-transparent">
              {slide.title}
            </h2>
          </div>
          <span className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md border border-pink-400/40 shrink-0">
            {slide.slideNumber}
          </span>
        </div>

        <div className="space-y-3.5 max-h-[420px] overflow-y-auto pr-2 pb-8 scrollbar-thin scrollbar-thumb-pink-500/40 scrollbar-track-purple-950/40">
          {slide.indexChapters.map((chap, idx) => (
            <div
              key={idx}
              onClick={() => {
                const el = document.getElementById(`slide-${chap.page}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="flex flex-col bg-[#240c35]/90 border border-pink-500/25 rounded-2xl p-4 sm:p-5 shadow-sm hover:border-pink-500/50 hover:bg-[#2b0e3f] transition-all gap-2.5 cursor-pointer"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-300 font-mono font-bold text-sm flex items-center justify-center border border-pink-500/40 shrink-0">
                    {chap.num}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {chap.title}
                  </h3>
                </div>
                <span className="w-8 h-8 rounded-xl bg-purple-900/60 text-pink-200 font-bold text-sm flex items-center justify-center border border-pink-500/30 shrink-0">
                  {chap.page}
                </span>
              </div>

              {chap.subItems && chap.subItems.length > 0 && (
                <div className="pr-11 pt-2 space-y-2 border-t border-pink-500/15 mt-1">
                  {chap.subItems.map((sub, sIdx) => (
                    <div key={sIdx} className="text-sm sm:text-base text-white font-medium">
                      • {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.section>
    );
  }

  // 5. شريحة المحتوى العادي (Content) مع استخدام text-right لمنع تمدد المسافات
  if (slide.type === 'content') {
    const activeSection = slide.sections && slide.sections[activeTabIdx] ? slide.sections[activeTabIdx] : null;

    return (
      <motion.section
        id={`slide-${slide.slideNumber}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className={`rounded-3xl bg-[#1a0827]/95 border p-5 sm:p-8 lg:p-10 shadow-xl backdrop-blur-md space-y-6 max-w-5xl mx-auto transition-all duration-300 ${
          isActive 
            ? 'border border-pink-400/60 shadow-[0_0_15px_rgba(236,72,153,0.2)]' 
            : 'border-pink-500/30'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-pink-500/20">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-black bg-gradient-to-l from-white via-pink-100 to-purple-200 bg-clip-text text-transparent">
            {slide.title}
          </h2>
          <span className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md border border-pink-400/40 shrink-0">
            {slide.slideNumber}
          </span>
        </div>

        {/* النص التمهيدي للشريحة يأتي أولاً قبل أزرار المحاور */}
        {slide.introText && (
          <div className="bg-[#240c35]/90 border border-pink-500/25 rounded-2xl p-4 text-center shadow-sm">
            <p className="text-base sm:text-xl font-bold font-quran text-pink-200">
              {formatIslamicText(slide.introText)}
            </p>
          </div>
        )}

        {/* أزرار التبديل متجاورة مع اسكرول أفقي ومؤشرات بصرية واضحة لوجود اسكرول جانبي */}
        {slide.sections && slide.sections.length > 0 && (
          <div className="relative">
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#1a0827] to-transparent pointer-events-none z-10 flex items-center justify-start text-pink-400 opacity-90">
              <span className="text-xs font-bold animate-pulse">◀</span>
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#1a0827] to-transparent pointer-events-none z-10 flex items-center justify-end text-pink-400 opacity-90">
              <span className="text-xs font-bold animate-pulse">▶</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 px-4 scrollbar-thin scrollbar-thumb-pink-500/40 scrollbar-track-purple-950/40 whitespace-nowrap">
              {slide.sections.map((sec, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => {
                    setActiveTabIdx(sIdx);
                    setActiveStationIdx(0);
                    setActiveSubStationIdx(0);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm shrink-0 whitespace-nowrap ${
                    activeTabIdx === sIdx
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border border-pink-400/50 shadow-md'
                      : 'bg-[#240c35]/90 text-pink-200 border border-pink-500/25 hover:border-pink-500/50'
                  }`}
                >
                  {sec.buttonTitle || sec.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={slide.image ? "flex flex-col lg:flex-row gap-6 lg:items-stretch" : "w-full"}>
          <div className={slide.image ? "w-full lg:w-7/12 flex-1 flex flex-col" : "w-full space-y-4"}>
            {activeSection && (
              <div className="bg-[#240c35]/90 border border-pink-500/25 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm flex-1 flex flex-col">
                <h3 className="text-base sm:text-xl font-bold text-pink-300 pb-2 border-b border-pink-500/20">
                  {activeSection.title}
                </h3>

                {/* مقدمة المحطات إذا وجدت */}
                {activeSection.introTexts && activeSection.introTexts.length > 0 && (
                  <div className="space-y-3 pb-3 border-b border-pink-500/15">
                    {activeSection.introTexts.map((intro, iIdx) => (
                      <p key={iIdx} dir="rtl" className="text-sm sm:text-base leading-relaxed text-gray-100 font-medium text-right">
                        {formatIslamicText(intro)}
                      </p>
                    ))}
                  </div>
                )}

                {/* إذا كانت المحطات موجودة (سبع محطات) بدون بوردر إضافي */}
                {activeSection.stations && activeSection.stations.length > 0 ? (
                  <div className="space-y-4">
                    {/* أزرار المحطات السبع متجاورة مع اسكرول أفقي ومؤشرات بصرية */}
                    <div className="relative">
                      <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#240c35] to-transparent pointer-events-none z-10 flex items-center justify-start text-pink-400">
                        <span className="text-xs font-bold">◀</span>
                      </div>
                      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#240c35] to-transparent pointer-events-none z-10 flex items-center justify-end text-pink-400">
                        <span className="text-xs font-bold">▶</span>
                      </div>

                      <div className="flex items-center gap-2 overflow-x-auto pb-2 px-3 scrollbar-thin scrollbar-thumb-pink-500/40 whitespace-nowrap">
                        {activeSection.stations.map((st, stIdx) => (
                          <button
                            key={stIdx}
                            onClick={() => {
                              setActiveStationIdx(stIdx);
                              setActiveSubStationIdx(0);
                            }}
                            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm shrink-0 whitespace-nowrap ${
                              activeStationIdx === stIdx
                                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border border-pink-400/50 shadow-md'
                                : 'bg-[#1a0827]/90 text-pink-200 border border-pink-500/25 hover:border-pink-500/50'
                            }`}
                          >
                            {st.buttonTitle || `المحطة ${stIdx + 1}`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* صندوق عرض المحطة النشطة بدون بوردر إضافي مع اسكرول رأسي شرطي */}
                    {activeSection.stations[activeStationIdx] && (
                      <div className="space-y-3">
                        <h4 className="text-sm sm:text-lg font-bold text-pink-300 pb-2 border-b border-pink-500/20">
                          {activeSection.stations[activeStationIdx].stationTitle}
                        </h4>

                        {activeSection.stations[activeStationIdx].subStations &&
                        activeSection.stations[activeStationIdx].subStations.length > 0 ? (
                          <div className="space-y-4">
                            <div className="relative">
                              <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#240c35] to-transparent pointer-events-none z-10 flex items-center justify-start text-pink-400">
                                <span className="text-xs font-bold">◀</span>
                              </div>
                              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#240c35] to-transparent pointer-events-none z-10 flex items-center justify-end text-pink-400">
                                <span className="text-xs font-bold">▶</span>
                              </div>

                              <div className="flex items-center gap-2 overflow-x-auto pb-2 px-3 scrollbar-thin scrollbar-thumb-pink-500/40 whitespace-nowrap">
                                {activeSection.stations[activeStationIdx].subStations.map((subSt, subIdx) => (
                                  <button
                                    key={subIdx}
                                    onClick={() => setActiveSubStationIdx(subIdx)}
                                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm shrink-0 whitespace-nowrap ${
                                      activeSubStationIdx === subIdx
                                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border border-pink-400/50 shadow-md'
                                        : 'bg-[#12051d]/90 text-pink-200 border border-pink-500/25 hover:border-pink-500/50'
                                    }`}
                                  >
                                    {subSt.buttonTitle}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {activeSection.stations[activeStationIdx].subStations[activeSubStationIdx] && (
                              <div className="space-y-3">
                                {activeSection.stations[activeStationIdx].subStations[activeSubStationIdx].subStationTitle && (
                                  <h5 className="text-sm sm:text-base font-bold text-pink-300 pb-2 border-b border-pink-500/20">
                                    {formatIslamicText(activeSection.stations[activeStationIdx].subStations[activeSubStationIdx].subStationTitle)}
                                  </h5>
                                )}
                                <div
                                  className={
                                    (activeSection.stations[activeStationIdx].subStations[activeSubStationIdx].texts || []).join('').length > 350
                                      ? "max-h-[300px] lg:max-h-[320px] overflow-y-auto pr-2 pb-10 scrollbar-thin scrollbar-thumb-pink-500/40 scrollbar-track-purple-950/40 space-y-3"
                                      : "space-y-3"
                                  }
                                >
                                  {(activeSection.stations[activeStationIdx].subStations[activeSubStationIdx].texts || []).map((txt, tIdx) => (
                                    <p key={tIdx} dir="rtl" className="text-sm sm:text-base leading-relaxed text-gray-100 font-medium text-right">
                                      {formatIslamicText(txt)}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className={(activeSection.stations[activeStationIdx].texts || []).join('').length > 350 ? "max-h-[300px] lg:max-h-[320px] overflow-y-auto pr-2 pb-10 scrollbar-thin scrollbar-thumb-pink-500/40 scrollbar-track-purple-950/40 space-y-3" : "space-y-3"}>
                            {(activeSection.stations[activeStationIdx].texts || []).map((txt, tIdx) => (
                              <p key={tIdx} dir="rtl" className="text-sm sm:text-base leading-relaxed text-gray-100 font-medium text-right">
                                {formatIslamicText(txt)}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  /* العرض العادي للنصوص مع تفعيل الاسكرول فقط إذا كان الكلام طويلاً يحتاج ذلك */
                  <div className={(activeSection.texts || []).join('').length > 350 ? "max-h-[350px] lg:max-h-[370px] overflow-y-auto pr-3 pb-12 scrollbar-thin scrollbar-thumb-pink-500/40 scrollbar-track-purple-950/40 space-y-4" : "space-y-4"}>
                    {(activeSection.texts || []).map((txt, tIdx) => {
                      const isQuestionHeader = /^\d+\)\s*/.test(txt);
                      const isSubHeader = /^\d+\.\s*(خاتمة|إسقاط)/.test(txt);
                      const isHeading = isQuestionHeader || isSubHeader;
                      const isLongHeading = isHeading && txt.length > 70;
                      return (
                        <p
                          key={tIdx}
                          dir="rtl"
                          className={
                            isHeading
                              ? isLongHeading
                                ? "text-sm sm:text-base lg:text-lg leading-loose text-white font-bold text-right pt-4 pb-2 border-b border-pink-500/20"
                                : "text-base sm:text-lg leading-loose text-pink-300 font-bold text-right pt-4 pb-2 border-b border-pink-500/20"
                              : "text-sm sm:text-base lg:text-lg leading-loose text-gray-100 font-medium text-right"
                          }
                        >
                          {formatIslamicText(txt)}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {slide.image && (
            <div className="w-full lg:w-5/12 shrink-0 lg:self-stretch flex flex-col">
              <div className="rounded-3xl overflow-hidden border-2 border-pink-500/30 shadow-[0_8px_30px_rgba(236,72,153,0.25)] bg-[#12051d] flex-1 h-full lg:max-h-[460px]">
                <img
                  src={slide.image}
                  alt={slide.title || ''}
                  className="w-full h-auto lg:h-full object-cover lg:object-fill block"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </motion.section>
    );
  }

  if (slide.type === 'mindmap') {
    return <MindMapSlide slide={slide} isActive={isActive} />;
  }

  // 6. شريحة المصادر والمراجع المعتمدة (References)
  if (slide.type === 'references') {
    return (
      <motion.section
        id={`slide-${slide.slideNumber}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className={`rounded-3xl bg-[#1a0827]/95 border p-5 sm:p-8 lg:p-10 shadow-xl backdrop-blur-md space-y-6 max-w-5xl mx-auto transition-all duration-300 ${
          isActive 
            ? 'border border-pink-400/60 shadow-[0_0_15px_rgba(236,72,153,0.2)]' 
            : 'border-pink-500/30'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-pink-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/40">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-lg sm:text-2xl font-black bg-gradient-to-l from-white via-pink-100 to-purple-200 bg-clip-text text-transparent">
              {slide.title}
            </h2>
          </div>
          <span className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md border border-pink-400/40 shrink-0">
            {slide.slideNumber}
          </span>
        </div>

        {slide.introText && (
          <div className="bg-[#240c35]/90 border border-pink-500/25 rounded-2xl p-4 text-center shadow-sm">
            <p className="text-base sm:text-xl font-bold font-quran text-pink-200">
              {formatIslamicText(slide.introText)}
            </p>
          </div>
        )}

        <div className="w-full">
          <div className="bg-[#240c35]/90 border border-pink-500/25 rounded-2xl p-4 sm:p-6 shadow-sm">
            <div className="max-h-[420px] overflow-y-auto pr-2 pb-10 scrollbar-thin scrollbar-thumb-pink-500/40 scrollbar-track-purple-950/40">
              <div className="space-y-3">
                {(slide.references || []).map((ref, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#1b0829]/80 border border-pink-500/25 hover:border-pink-500/50 hover:bg-[#220a33] transition-all flex items-start gap-3.5 shadow-sm"
                  >
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500/40 to-purple-600/40 text-white font-bold text-sm flex items-center justify-center shrink-0 border border-pink-400/40 mt-0.5 shadow-sm">
                      {idx + 1}
                    </span>
                    <p dir="rtl" className="text-base sm:text-lg leading-relaxed text-white font-medium text-right flex-1">
                      {ref.replace(/^\d+[\.\)]\s*/, '')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }

  if (slide.type === 'appendix-tables') {
    return <AppendixTablesSlide slide={slide} isActive={isActive} />;
  }

  if (slide.type === 'tribute') {
    return <TributeSlide slide={slide} isActive={isActive} />;
  }

  return null;
}
