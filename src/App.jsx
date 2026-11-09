import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import SlideSection from './components/SlideSection.jsx';
import SlideNavigation from './components/SlideNavigation.jsx';
import { KAHF_SLIDES } from './data/kahfData.js';
import logoImg from './assets/images/logo.png';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // شاشة لودينج لمدة 3 ثواني تعمل في كل مرة يتم فتح الموقع
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // تتبع التمرير لتحديث السلايدر السفلي
  useEffect(() => {
    if (isLoading) return;
    const handleScroll = () => {
      const triggerPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = KAHF_SLIDES.length - 1; i >= 0; i--) {
        const el = document.getElementById(`slide-${i + 1}`);
        if (el) {
          const top = el.offsetTop;
          if (triggerPosition >= top) {
            setCurrentSlideIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  const scrollToSlide = (index) => {
    if (index < 0 || index >= KAHF_SLIDES.length) return;
    setCurrentSlideIndex(index);
    if (index === 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(`slide-${index + 1}`);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  // شاشة التحميل (اللوجو وحده فقط في المنتصف لمدة 3 ثواني عند كل دخول)
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#110519] flex items-center justify-center z-50">
        <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full overflow-hidden shadow-[0_0_70px_rgba(236,72,153,0.7)] animate-pulse">
          <img src={logoImg} alt="شعار المشروع" className="w-full h-full object-cover" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#110519] text-[#fbebf4] bg-islamic-pattern font-cairo flex flex-col relative selection:bg-pink-500 selection:text-white">
      {/* الناف بار ظاهرة وثابتة دائماً في الأعلى في كل الشرائح */}
      <Navbar />

      <main className="flex-1 w-full pb-28">
        {/* شريحة الغلاف الأولى: صورة كاملة من الشمال واليمين بدون بوردر ولا رقم ولا هوامش */}
        {KAHF_SLIDES.length > 0 && (
          <SlideSection
            slide={KAHF_SLIDES[0]}
            isActive={currentSlideIndex === 0}
          />
        )}

        {/* باقي الشرائح داخل الحاوية الموحدة للتابلت واللابتوب */}
        <div className="max-w-[96vw] sm:max-w-5xl mx-auto w-full px-3 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-14">
          {KAHF_SLIDES.slice(1).map((slide, idx) => (
            <SlideSection
              key={slide.id}
              slide={slide}
              isActive={idx + 1 === currentSlideIndex}
            />
          ))}
        </div>
      </main>

      {/* شريط التنقل السفلي */}
      <SlideNavigation
        slides={KAHF_SLIDES}
        currentIndex={currentSlideIndex}
        onSelectSlide={scrollToSlide}
      />
    </div>
  );
}
