import { BrainCircuit, Smartphone, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LessonSelection() {
  const lessons = [
    { id: "part1", title: "What is AI?", icon: <BrainCircuit size={48} />, color: "bg-blue-500" },
    { id: "part2", title: "AI in Daily Lives", icon: <Smartphone size={48} />, color: "bg-purple-500" },
    { id: "part3", title: "Ethics & Privacy", icon: <ShieldCheck size={48} />, color: "bg-emerald-500" },
  ];

  return (
    <div className="min-h-screen bg-white p-8" dir="ltr">
      <div className="max-w-6xl mx-auto">
        
        {/* العنوان الرئيسي في المنتصف */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-2">Lesson 1</h1>
          <p className="text-xl text-slate-500">Artificial Intelligence and Ethics of Its Use</p>
        </div>

        {/* شبكة الدروس */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lessons.map((lesson) => (
            <Link 
              href={`/lesson/${lesson.id}`} 
              key={lesson.id} 
              className="group relative h-96 rounded-[40px] overflow-hidden shadow-xl hover:-translate-y-4 transition-all duration-500"
            >
              <div className={`absolute inset-0 ${lesson.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                <div className="mb-6 transform group-hover:scale-125 transition-transform duration-500">
                  {lesson.icon}
                </div>
                
                <h2 className="text-3xl font-bold leading-tight">{lesson.title}</h2>
                
                {/* زر Explore مع السهم جهة اليمين (الاتجاه الطبيعي للإنجليزي) */}
                <div className="mt-8 flex items-center gap-2 font-bold bg-white/20 px-6 py-2 rounded-full group-hover:bg-white group-hover:text-slate-900 transition-colors">
                  <span>Explore</span>
                  <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}