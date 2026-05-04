"use client";
import { useRouter } from "next/navigation";
import { BrainCircuit, Lightbulb, ChevronRight, CheckCircle2, Image as ImageIcon, Cpu } from "lucide-react";

export default function Part1() {
  const router = useRouter();

  const handleFinishLesson = () => {
    // 1. معرفة من هو الطالب الحالي
    const currentName = localStorage.getItem("currentUser");
    
    if (currentName) {
      // 2. جلب قاعدة البيانات الشاملة
      const allUsersData = JSON.parse(localStorage.getItem("allUsersData")) || {};
      const userData = allUsersData[currentName];

      // 3. التأكد هل هذه أول مرة ينهي فيها الطالب هذا الدرس بالتحديد؟
      if (userData && !userData.completedLessons["lesson1"]) {
        // إضافة 10 نقاط للـ XP
        userData.xp = Math.min(userData.xp + 10, 100);
        
        // زيادة شريط التقدم (مثلاً 14% لكل درس)
        userData.progress = Math.min(userData.progress + 14, 100);
        
        // تعليم الدرس كـ "مكتمل" لهذا الطالب
        userData.completedLessons["lesson1"] = true;

        // 4. حفظ التحديثات في قاعدة البيانات الكبيرة
        allUsersData[currentName] = userData;
        localStorage.setItem("allUsersData", JSON.stringify(allUsersData));
        
        // 5. تحديث القيم اللحظية (studentXP) لضمان ظهورها في الهيدر فوراً
        localStorage.setItem("studentXP", userData.xp);
        localStorage.setItem("studentProgress", userData.progress);

        // تنبيه الموقع لتحديث الـ Header
        window.dispatchEvent(new Event("storage"));
      }
    }

    // 6. الانتقال للاختبار في كل الأحوال
    router.push("/lesson/part1/test1");
  };

  return (
    <div className="min-h-screen bg-white" dir="ltr">
      <article className="max-w-4xl mx-auto space-y-10 pb-20 px-4">
        
        {/* Header */}
        <header className="text-center space-y-4 pt-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-2 animate-bounce">
            <BrainCircuit size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900">Artificial Intelligence (AI)</h1>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </header>

        {/* Intro Section */}
        <section className="grid md:grid-cols-2 gap-10 items-center bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="space-y-4">
            <p className="text-xl text-slate-700 leading-relaxed">
              Imagine that a machine can <span className="font-bold text-blue-600">think</span>, solve problems, and make decisions just like you!
            </p>
          </div>
          <div className="relative h-64 w-full bg-blue-200 rounded-3xl border-2 border-dashed border-blue-300 flex flex-col items-center justify-center text-blue-600 gap-2">
            <ImageIcon size={48} className="opacity-40" />
            <span className="text-sm font-bold opacity-50 text-center px-4 italic">AI Concept Image Placeholder</span>
          </div>
        </section>

        {/* Definition */}
        <section className="p-8 bg-linear-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] text-white shadow-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
              <Lightbulb size={30} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">What is AI?</h2>
              <p className="text-lg text-blue-50 leading-relaxed">
                It is a technology that enables machines to use human-like traits, such as logic, to solve complex problems.
              </p>
            </div>
          </div>
        </section>

        {/* Algorithms Section */}
        <section className="space-y-6">
          <h3 className="text-3xl font-black text-slate-900 text-center">How do these machines learn?</h3>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <ul className="space-y-4">
              {[
                "Artificial Intelligence depends on algorithms.",
                "An algorithm is a set of detailed steps that tells the computer what to do.",
                "Algorithms are like recipes that the machine follows to learn and solve problems."
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <div className="shrink-0 w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <span className="text-slate-700 font-medium text-lg">{text}</span>
                </li>
              ))}
            </ul>
            <div className="relative h-80 bg-slate-100 rounded-4xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 gap-2">
               <Cpu size={48} className="opacity-40" />
               <span className="text-sm font-bold opacity-50 text-center px-4 italic">Algorithms Illustration Placeholder</span>
            </div>
          </div>
        </section>

        {/* Action Button */}
        <div className="pt-16 pb-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-green-600 font-bold animate-pulse">
            <CheckCircle2 size={20} />
            <span>Finish lesson to get +10 XP</span>
          </div>
          <button 
            onClick={handleFinishLesson}
            className="group px-16 py-6 bg-green-600 text-white rounded-4xl font-black text-2xl shadow-2xl hover:bg-green-700 hover:-translate-y-2 transition-all flex items-center gap-4"
          >
            Take the Test
            <ChevronRight size={28} />
          </button>
        </div>

      </article>
    </div>
  );
}