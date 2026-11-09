import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, X } from 'lucide-react';

const mindMapNodes = [
  {
    id: 1,
    title: '1. رد الفضل لله',
    verse: '﴿قَالَ هَٰذَا رَحْمَةٌ مِّن رَّبِّي﴾',
    desc: 'الاعتراف بأن الإنجازات والنجاحات هي بفضل الله ورحمته لا بالغرور والتعالي.',
    category: 'التواضع والشكر',
    color: 'from-purple-600/30 to-pink-600/30 border-pink-500/40 text-pink-200'
  },
  {
    id: 2,
    title: '2. الفناء السنني',
    verse: '﴿فَإِذَا جَاءَ وَعْدُ رَبِّي جَعَلَهُ دَكَّاءَ﴾',
    desc: 'اليقين بأن كل قوة مادية أو دنيوية زائلة وستدك يوم القيامة طبقاً لسنن الله.',
    category: 'اليقين بالفناء',
    color: 'from-fuchsia-600/30 to-purple-600/30 border-fuchsia-500/40 text-fuchsia-200'
  },
  {
    id: 3,
    title: '3. الحشر الشامل',
    verse: '﴿وَتَرَكْنَا بَعْضَهُمْ يَوْمَئِذٍ يَمُوجُ فِي بَعْضٍ﴾',
    desc: 'مشهد القيامة واضطراب الخلق واجتماعهم لموقف الحساب العظيم.',
    category: 'مشاهد الآخرة',
    color: 'from-purple-700/30 to-pink-700/30 border-pink-400/40 text-pink-300'
  },
  {
    id: 4,
    title: '4. عرض جهنم',
    verse: '﴿وَعَرَضْنَا جَهَنَّمَ يَوْمَئِذٍ لِّلْكَافِرِينَ عَرْضًا﴾',
    desc: 'معاينة العذاب الحقيقي والمصير الأخير للكافرين والمكذبين.',
    category: 'الإنذار الإلهي',
    color: 'from-rose-600/30 to-purple-600/30 border-rose-500/40 text-rose-300'
  },
  {
    id: 5,
    title: '5. غطاء البصيرة',
    verse: '﴿الَّذِينَ كَانَتْ أَعْيُنُهُمْ فِي غِطَاءٍ عَن ذِكْرِي﴾',
    desc: 'خطر الغفلة وحجب البصيرة عن سماع وقبول آيات الله وتذكيراته.',
    category: 'محاسبة النفس',
    color: 'from-purple-600/30 to-indigo-600/30 border-purple-400/40 text-purple-200'
  },
  {
    id: 6,
    title: '6. تصحيح الولاء',
    verse: '﴿أَفَحَسِبَ الَّذِينَ كَفَرُوا أَن يَتَّخِذُوا عِبَادِي﴾',
    desc: 'بطلان اتخاذ المخلوقين أولياء من دون الله والتعلق بغير الخالق.',
    category: 'التوحيد والولاء',
    color: 'from-pink-600/30 to-rose-600/30 border-pink-500/40 text-pink-200'
  },
  {
    id: 7,
    title: '7. الخسران الأكبر',
    verse: '﴿قُلْ هَلْ نُنَبِّئُكُم بِالْأَخْسَرِينَ أَعْمَالًا﴾',
    desc: 'التحذير النبوي الشديد من ضياع السعي في الدنيا وفوات الأوان.',
    category: 'تقويم العمل',
    color: 'from-fuchsia-700/30 to-pink-600/30 border-fuchsia-400/40 text-fuchsia-200'
  },
  {
    id: 8,
    title: '8. وهم الإحسان',
    verse: '﴿وَهُمْ يَحْسَبُونَ أَنَّهُمْ يُحْسِنُونَ صُنْعًا﴾',
    desc: 'أخطر أنواع الخسران: أن يظن الإنسان أنه على حق وعمل صالح وهو في ضلال.',
    category: 'اليقظة الإيمانية',
    color: 'from-purple-800/30 to-fuchsia-700/30 border-purple-500/40 text-purple-200'
  }
];

export default function VisualMindMap() {
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <div className="space-y-6">
      {/* Central Hub Header */}
      <div className="text-center bg-[#240c35]/90 border border-pink-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 text-xs font-bold mb-3 shadow-sm">
          <Sparkles className="w-4 h-4" /> الخريطة الذهنية التفاعلية للآيات (98-104)
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-2">
          مرتكزات سورة الكهف وقصة ذي القرنين
        </h3>
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
          اضغط على أي عقدة في الخريطة أدناه لعرض تفاصيلها التدبرية ومقاصدها الإيمانية بدقة تامة.
        </p>
      </div>

      {/* Visual Mind Map Grid / Branches */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mindMapNodes.map((node) => (
          <motion.div
            key={node.id}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedNode(node)}
            className={`cursor-pointer rounded-2xl p-4 bg-gradient-to-br ${node.color} border backdrop-blur-md shadow-lg transition-all flex flex-col justify-between group relative overflow-hidden`}
          >
            <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/40 text-white font-bold text-xs flex items-center justify-center border border-white/20">
              {node.id}
            </div>

            <div className="space-y-2 mt-4">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-black/30 text-gray-200 border border-white/10">
                {node.category}
              </span>
              <h4 className="text-base sm:text-lg font-black text-white group-hover:text-pink-300 transition-colors">
                {node.title}
              </h4>
              <p className="text-xs font-quran text-pink-200 leading-relaxed font-bold">
                {node.verse}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
              <span className="truncate max-w-[150px]">{node.desc}</span>
              <span className="text-pink-300 font-bold group-hover:translate-x-[-3px] transition-transform flex items-center gap-1">
                التفاصيل <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedNode(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1e072d] border border-pink-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden space-y-5"
            >
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-4 left-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-pink-500/20 text-pink-300 text-xs font-bold">
                {selectedNode.category} • المحطة #{selectedNode.id}
              </div>

              <h3 className="text-2xl font-black text-white">
                {selectedNode.title}
              </h3>

              <div className="p-4 rounded-2xl bg-[#290d3e] border border-pink-500/30 text-center">
                <span className="text-lg font-quran text-pink-200 font-bold leading-loose">
                  {selectedNode.verse}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-pink-300">التفسير والتدبر:</h4>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                  {selectedNode.desc}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedNode(null)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-lg hover:opacity-90 transition-opacity"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
