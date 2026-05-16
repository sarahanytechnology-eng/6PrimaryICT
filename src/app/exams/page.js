"use client";
import Link from "next/link";
import { FileText, Award } from "lucide-react";

export default function ExamsPage() {
  const examList = [
    { name: "Test 1", path: "/lesson/part1/test1", desc: "Evaluate your knowledge in Part 1 content", type: "quiz" },
    { name: "Test 2", path: "/lesson/part2/test2", desc: "Evaluate your knowledge in Part 2 content", type: "quiz" },
    { name: "Test 3", path: "/lesson/part3/test3", desc: "Evaluate your knowledge in Part 3 content", type: "quiz" },
    { name: "Final Exam", path: "/finaltest", desc: "The ultimate challenge covering the whole semester!", type: "final" }
  ];

  return (
    <div className="text-center py-12 px-4 select-none">
      {/* عنوان الصفحة مشرق ومبهج جداً مع الـ Layout */}
      <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight uppercase mb-4">
        ICT Primary <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 font-extrabold">Exams</span>
      </h1>
      <p className="text-slate-500 text-sm md:text-lg font-black mb-16 max-w-2xl mx-auto uppercase tracking-wide">
        🎮 Complete the quests, defeat the tests, and loot <span className="text-orange-500 font-extrabold">+10 XP</span>!
      </p>

      {/* شبكة كروت الـ Light Gaming البيضاء والمشرقة */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {examList.map((exam, index) => {
          const isFinal = exam.type === "final";
          return (
            <div 
              key={index} 
              className={`group relative p-8 rounded-3xl border-3 transition-all duration-300 ease-out flex flex-col justify-between items-center text-center hover:-translate-y-2.5 active:scale-98 bg-white ${
                isFinal 
                  ? "border-orange-200 hover:border-orange-500 shadow-xl shadow-orange-100/40 hover:shadow-2xl hover:shadow-orange-400/30" 
                  : "border-slate-100 hover:border-blue-500 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/30"
              }`}
            >
              {/* شارة الـ XP بشكل كرتوني مبهج ومضيء ملائم للخلفية البيضاء */}
              <span className={`absolute top-4 right-4 text-xs font-black px-3 py-1 rounded-xl border shadow-xs transition-transform group-hover:scale-110 ${
                isFinal 
                  ? "bg-orange-50 border-orange-200 text-orange-600" 
                  : "bg-blue-50 border-blue-100 text-blue-600"
              }`}>
                +10 XP
              </span>

              {/* شارة الـ Boss Fight للامتحان النهائي */}
              {isFinal && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-linear-to-r from-orange-500 to-amber-500 text-white text-xs font-black px-5 py-1 rounded-full uppercase tracking-widest shadow-md shadow-orange-500/20">
                  ⚠️ Boss Fight
                </span>
              )}

              <div className="flex flex-col items-center gap-5 mb-8 mt-2">
                {/* صندوق الأيقونة ملون ومبهج وبيكبر ويلف مع الماوس */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                  isFinal 
                    ? "bg-linear-to-br from-orange-500 to-amber-500 text-white shadow-orange-200" 
                    : "bg-linear-to-br from-blue-600 to-indigo-500 text-white shadow-blue-200"
                }`}>
                  {isFinal ? <Award size={32} /> : <FileText size={32} />}
                </div>
                
                <div>
                  {/* العناوين واضحة وصريحة على الخلفية البيضاء الكريستال */}
                  <h3 className={`text-2xl font-black tracking-wide transition-colors ${
                    isFinal ? "text-orange-600 group-hover:text-orange-500" : "text-slate-800 group-hover:text-blue-600"
                  }`}>
                    {exam.name}
                  </h3>
                  <p className="text-slate-400 font-bold text-sm mt-2 max-w-xs leading-relaxed">
                    {exam.desc}
                  </p>
                </div>
              </div>

              {/* الأزرار بنظام أزرار الجيمينج البارزة الأنيقة جداً (3D Arcade Buttons) */}
              <Link 
                href={exam.path}
                className={`w-full py-4 px-6 text-lg font-black text-white rounded-2xl shadow-lg transition-all duration-200 text-center block uppercase tracking-wider border-b-4 active:border-b-0 ${
                  isFinal 
                    ? "bg-orange-500 hover:bg-orange-400 border-orange-700 shadow-orange-500/20 hover:shadow-orange-400/40" 
                    : "bg-blue-600 hover:bg-blue-500 border-blue-800 shadow-blue-500/20 hover:shadow-blue-500/40"
                }`}
              >
                Launch Quest ⚔️
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}