"use client";
import { useRouter } from "next/navigation";
import Image from "next/image"; // استيراد مكون الصور
import { BrainCircuit, Lightbulb, ChevronRight, CheckCircle2, Cpu } from "lucide-react";

export default function Part1() {
  const router = useRouter();

  const handleFinishLesson = () => {
    const currentName = localStorage.getItem("currentUser");
    
    if (currentName) {
      const allUsersData = JSON.parse(localStorage.getItem("allUsersData")) || {};
      const userData = allUsersData[currentName];

      if (userData && !userData.completedLessons["lesson1"]) {
        userData.xp = Math.min(userData.xp + 10, 100);
        userData.progress = Math.min(userData.progress + 14, 100);
        userData.completedLessons["lesson1"] = true;

        allUsersData[currentName] = userData;
        localStorage.setItem("allUsersData", JSON.stringify(allUsersData));
        
        localStorage.setItem("studentXP", userData.xp);
        localStorage.setItem("studentProgress", userData.progress);

        window.dispatchEvent(new Event("storage"));
      }
    }
    router.push("/lesson/part1/test1");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300" dir="ltr">
      <article className="max-w-4xl mx-auto space-y-10 pb-20 px-4">
        
        {/* Header */}
        <header className="text-center space-y-4 pt-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl mb-2 animate-bounce">
            <BrainCircuit size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">Artificial Intelligence (AI)</h1>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </header>

        {/* Intro Section */}
        <section className="grid md:grid-cols-2 gap-10 items-center bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="space-y-4">
            <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
              Imagine that a machine can <span className="font-bold text-blue-600 dark:text-blue-400">think</span>, solve problems, and make decisions just like you!
            </p>
          </div>
          {/* صورة مدخل الذكاء الاصطناعي */}
          <div className="relative h-64 w-full overflow-hidden rounded-3xl border-2 border-blue-100 dark:border-blue-900 shadow-inner bg-blue-50 dark:bg-slate-800">
            <Image 
              src="/images/1.jpg" 
              alt="AI Concept Illustration"
              fill
              className="object-cover"
            />
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
          <h3 className="text-3xl font-black text-slate-900 dark:text-white text-center">How do these machines learn?</h3>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <ul className="space-y-4">
              {[
                "Artificial Intelligence depends on algorithms.",
                "An algorithm is a set of detailed steps that tells the computer what to do.",
                "Algorithms are like recipes that the machine follows to learn and solve problems."
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm">
                  <div className="shrink-0 w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium text-lg">{text}</span>
                </li>
              ))}
            </ul>
            {/* صورة الخوارزميات */}
            <div className="relative h-80 w-full overflow-hidden rounded-4xl border-2 border-slate-100 dark:border-slate-800 shadow-lg bg-slate-50 dark:bg-slate-800">
              <Image 
                src="/images/2.jpg" 
                alt="How Algorithms Work"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* Action Button */}
        <div className="pt-16 pb-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold animate-pulse">
            <CheckCircle2 size={20} />
            <span>Finish lesson to get +10 XP</span>
          </div>
          <button 
            onClick={handleFinishLesson}
            className="group px-16 py-6 bg-green-600 text-white rounded-4xl font-black text-2xl shadow-2xl hover:bg-green-700 hover:-translate-y-2 transition-all flex items-center gap-4 active:scale-95"
          >
            Take the Test
            <ChevronRight size={28} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

      </article>
    </div>
  );
}