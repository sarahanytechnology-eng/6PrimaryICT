"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Award, ArrowRight, RefreshCw, Trophy, Star, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function Test1() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState("quiz"); 
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  const questions = [
    { id: 1, q: "According to the text, what is Artificial Intelligence (AI)?", options: [{ id: "a", text: "A machine that only follows human voice commands." }, { id: "b", text: "A technology that enables machines to use human-like traits to solve problems." }, { id: "c", text: "A type of computer that does not need logic." }, { id: "d", text: "A set of physical tools for building robots." }], correct: "b" },
    { id: 2, q: "What does Artificial Intelligence depend on to learn and function?", options: [{ id: "a", text: "Physical strength." }, { id: "b", text: "Random guessing." }, { id: "c", text: "Algorithms." }, { id: "d", text: "Internet speed only." }], correct: "c" },
    { id: 3, q: "What is the definition of an 'algorithm' provided in the passage?", options: [{ id: "a", text: "A type of electronic screen." }, { id: "b", text: "The memory capacity of a computer." }, { id: "c", text: "A set of detailed steps that tells the computer what to do." }, { id: "d", text: "A person who programs the machine." }], correct: "c" },
    { id: 4, q: "In the text, algorithms are compared to:", options: [{ id: "a", text: "Maps." }, { id: "b", text: "Recipes." }, { id: "c", text: "Textbooks." }, { id: "d", text: "Engines." }], correct: "b" },
    { id: 5, q: "What human-like trait is specifically mentioned as being used by AI to solve problems?", options: [{ id: "a", text: "Emotions." }, { id: "b", text: "Physical movement." }, { id: "c", text: "Logic." }, { id: "d", text: "Hearing." }], correct: "c" }
  ];

  const handleSelect = (qId, optionId) => {
    setAnswers({ ...answers, [qId]: optionId });
  };

  const handleRetry = () => {
    setAnswers({}); 
    setScore(0);    
    setCurrentStep("quiz"); 
  };

  const calculateResult = () => {
    let totalScore = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) totalScore += 2;
    });
    setScore(totalScore);

    const currentName = localStorage.getItem("currentUser");
    
    // --- المنطق المظبوط: نجاح عند درجة 6 أو أكثر ---
    if (totalScore >= 6) {
      const allUsersData = JSON.parse(localStorage.getItem("allUsersData")) || {};
      const userData = allUsersData[currentName];
      
      if (userData) {
        // 1. تحديث التقدم: زيادة 14% لمرة واحدة فقط (أول مرة ينجح فيها)
        if (!userData.testScores["test1"]) {
          const prevProgress = parseInt(localStorage.getItem("studentProgress") || "0");
          const newProgress = prevProgress + 14; // الزيادة الثابتة المتفق عليها
          
          userData.progress = newProgress;
          localStorage.setItem("studentProgress", String(newProgress));
        }

        // 2. تحديث الأوسمة: ده الاختبار الأول يبقى نضمن إن معاه وسام رقم 1
        userData.badges = Math.max(userData.badges || 0, 1);
        localStorage.setItem("studentBadges", String(userData.badges));

        // 3. تحديث النقاط (XP): الزيادة فقط لو جاب درجة أحسن من المرة اللي فاتت
        const previousBest = userData.testScores["test1"] || 0;
        if (totalScore > previousBest) {
          const xpGain = totalScore - previousBest;
          userData.xp = (userData.xp || 0) + xpGain;
          userData.testScores["test1"] = totalScore;
          localStorage.setItem("studentXP", String(userData.xp));
        }

        // 4. حفظ البيانات النهائية في قاعدة البيانات
        allUsersData[currentName] = userData;
        localStorage.setItem("allUsersData", JSON.stringify(allUsersData));
      }

      // تشغيل أصوات النجاح والاحتفال
      new Audio("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3").play().catch(() => {});
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#22c55e', '#3b82f6', '#eab308'] });
      
      // إرسال تنبيه لتحديث الـ Header والـ Dashboard
      window.dispatchEvent(new Event("storage"));
    } else {
      // صوت الفشل في حالة عدم تحقيق درجة النجاح
      new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3").play().catch(() => {});
    }
    
    setCurrentStep("result");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-blue-50 py-12 px-4" dir="ltr">
      <div className="max-w-3xl mx-auto">
        
        {currentStep === "quiz" ? (
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-100 overflow-hidden border border-white">
            <div className="bg-blue-600 p-8 text-center text-white relative">
                <Sparkles className="absolute top-4 right-4 opacity-50" />
                <h1 className="text-3xl font-black mb-2">Knowledge Check 🚀</h1>
                <p className="text-blue-100">Show us what you've learned about AI!</p>
            </div>

            <div className="p-8 md:p-12 space-y-10">
              {questions.map((q, idx) => (
                <div key={q.id} className="space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold italic">
                      {idx + 1}
                    </span>
                    <p className="text-xl font-bold text-slate-800 leading-tight">{q.q}</p>
                  </div>
                  
                  <div className="grid gap-3 pl-11">
                    {q.options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelect(q.id, opt.id)}
                        className={`group p-5 rounded-2xl text-left transition-all border-2 font-semibold relative overflow-hidden ${
                          answers[q.id] === opt.id 
                          ? "border-blue-600 bg-blue-50 text-blue-700 shadow-md" 
                          : "border-slate-100 hover:border-blue-200 hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        <div className="flex items-center gap-3 relative z-10">
                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-colors ${
                                answers[q.id] === opt.id ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200 group-hover:border-blue-300"
                            }`}>
                                {opt.id.toUpperCase()}
                            </span>
                            {opt.text}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={calculateResult}
                disabled={Object.keys(answers).length < 5}
                className="w-full py-6 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-4xl font-black text-2xl shadow-xl shadow-blue-200 hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0 transition-all mt-8"
              >
                Finish & See My Reward! 🏆
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in duration-500 bg-white rounded-[3rem] shadow-2xl overflow-hidden text-center relative border-4 border-white">
            {score >= 6 ? (
              <div className="p-12 space-y-8 bg-linear-to-b from-green-50 to-white">
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-green-200 blur-3xl rounded-full opacity-50 animate-pulse"></div>
                    <div className="relative bg-white p-6 rounded-full shadow-xl">
                        <Trophy size={80} className="text-yellow-500 animate-bounce" />
                    </div>
                    <Star className="absolute -top-2 -right-2 text-yellow-400 fill-yellow-400" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-5xl font-black text-slate-900 tracking-tight">Masterpiece! 🎉</h2>
                    <p className="text-2xl text-green-600 font-bold">You scored {score}/10 points</p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-inner border-2 border-dashed border-yellow-200 relative group">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-white px-6 py-1 rounded-full text-sm font-black tracking-widest uppercase">
                        Unlocked
                    </div>
                    <Award size={100} className="text-yellow-500 mx-auto drop-shadow-lg" />
                    <h3 className="text-2xl font-black text-slate-800 mt-4">Smart Explorer Badge</h3>
                    <p className="text-slate-500">First step into the AI world!</p>
                </div>

                <button 
                  onClick={() => router.push("/lesson/part2")}
                  className="group flex items-center justify-center gap-3 w-full py-6 bg-blue-600 text-white rounded-4xl font-black text-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                >
                  Go to Part 2 <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            ) : (
              <div className="p-12 space-y-8 bg-linear-to-b from-red-50 to-white">
                <div className="bg-white p-6 rounded-full shadow-xl inline-block">
                    <XCircle size={80} className="text-red-500 animate-pulse" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-4xl font-black text-slate-900">Don't Give Up!</h2>
                    <p className="text-2xl text-red-600 font-bold">Score: {score}/10</p>
                    <p className="text-slate-500 max-w-xs mx-auto">AI is a big topic. Let's review the lesson and try again!</p>
                </div>

                <button 
                  onClick={handleRetry}
                  className="flex items-center justify-center gap-3 w-full py-6 bg-slate-900 text-white rounded-4xl font-black text-2xl hover:bg-black transition-all shadow-xl shadow-slate-200"
                >
                  <RefreshCw size={24} /> Try Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}