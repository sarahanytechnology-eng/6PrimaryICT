"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Award, ArrowRight, RefreshCw, Trophy, Star, Sparkles, ShieldAlert } from "lucide-react";
import confetti from "canvas-confetti";

export default function Test3() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState("quiz"); 
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  const questions = [
    { 
        id: 1, 
        q: "What does the principle of 'Inclusiveness' in AI mean?", 
        options: [
            { id: "a", text: "AI tools should only be used by experts." }, 
            { id: "b", text: "AI tools should benefit only a specific group of people." }, 
            { id: "c", text: "AI tools must include and benefit all users, not just a specific group." }, 
            { id: "d", text: "AI tools should be expensive so only few can use them." }
        ], 
        correct: "c" 
    },
    { 
        id: 2, 
        q: "According to the 'Unbiased' principle, AI decisions should be based on:", 
        options: [
            { id: "a", text: "Facts." }, 
            { id: "b", text: "Personal views." }, 
            { id: "c", text: "Opinions." }, 
            { id: "d", text: "Bias." }
        ], 
        correct: "a" 
    },
    { 
        id: 3, 
        q: "Which principle ensures that personal information is not leaked and user data is secure?", 
        options: [
            { id: "a", text: "Transparency." }, 
            { id: "b", text: "Responsibility." }, 
            { id: "c", text: "Protectiveness (Privacy)." }, 
            { id: "d", text: "Benefit." }
        ], 
        correct: "c" 
    },
    { 
        id: 4, 
        q: "If an AI tool makes a mistake, the 'Responsibility' principle states that the designer should:", 
        options: [
            { id: "a", text: "Ignore the mistake." }, 
            { id: "b", text: "Blame the user." }, 
            { id: "c", text: "Admit the mistake and correct it." }, 
            { id: "d", text: "Delete the tool immediately." }
        ], 
        correct: "c" 
    },
    { 
        id: 5, 
        q: "What is the meaning of 'Transparency' in AI development?", 
        options: [
            { id: "a", text: "The designer is ready to explain how the AI tools work." }, 
            { id: "b", text: "The AI tool is invisible to the user." }, 
            { id: "c", text: "The tool is used for harmful personal gains." }, 
            { id: "d", text: "The tool collects data without permission." }
        ], 
        correct: "a" 
    }
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
    
    // --- منطق التحديث عند النجاح (درجة 6 أو أكثر) ---
    if (totalScore >= 6) {
      // 1. تحديث عدد الأوسمة ليكون 3 (لهذا الاختبار)
      const currentBadges = parseInt(localStorage.getItem("studentBadges") || "0");
      if (currentBadges < 3) {
        localStorage.setItem("studentBadges", "3");
      }

      // 2. تحديث البيانات الكبيرة للمزامنة
      if (currentName) {
        const allUsersData = JSON.parse(localStorage.getItem("allUsersData")) || {};
        const userData = allUsersData[currentName];
        
        if (userData) {
          const previousBest = userData.testScores["test3"] || 0;
          if (totalScore > previousBest) {
            const xpDiff = totalScore - previousBest;
            userData.xp = Math.min((userData.xp || 0) + xpDiff, 100);
            
            // زيادة التقدم إذا كانت هذه أول مرة ينجح فيها
            if (previousBest < 6) {
              userData.progress = Math.min((userData.progress || 0) + 25, 100); 
            }
            
            userData.testScores["test3"] = totalScore;
            allUsersData[currentName] = userData;
            
            // حفظ التحديثات النهائية
            localStorage.setItem("allUsersData", JSON.stringify(allUsersData));
            localStorage.setItem("studentXP", String(userData.xp));
            localStorage.setItem("studentProgress", String(userData.progress));
          }
        }
      }

      // تأثيرات الاحتفال
      new Audio("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3").play().catch(() => {});
      confetti({ 
        particleCount: 150, 
        spread: 70, 
        origin: { y: 0.6 }, 
        colors: ['#f59e0b', '#fbbf24', '#ffffff'] 
      });
      
      // مزامنة التغييرات مع الواجهات الأخرى
      window.dispatchEvent(new Event("storage"));
    } else {
      new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3").play().catch(() => {});
    }
    
    setCurrentStep("result");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-orange-50 py-12 px-4" dir="ltr">
      <div className="max-w-3xl mx-auto">
        
        {currentStep === "quiz" ? (
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-orange-100 overflow-hidden border border-white">
            <div className="bg-amber-500 p-8 text-center text-white relative">
                <ShieldAlert className="absolute top-4 right-4 opacity-50" />
                <h1 className="text-3xl font-black mb-2">Ethics Quiz ⚖️</h1>
                <p className="text-amber-50">Testing your responsible AI knowledge!</p>
            </div>

            <div className="p-8 md:p-12 space-y-10">
              {questions.map((q, idx) => (
                <div key={q.id} className="space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="shrink-0 w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold italic">
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
                          ? "border-amber-500 bg-amber-50 text-amber-700 shadow-md" 
                          : "border-slate-100 hover:border-amber-200 hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        <div className="flex items-center gap-3 relative z-10">
                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-colors ${
                                answers[q.id] === opt.id ? "bg-amber-500 border-amber-500 text-white" : "border-slate-200 group-hover:border-amber-300"
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
                className="w-full py-6 bg-linear-to-r from-amber-500 to-orange-600 text-white rounded-4xl font-black text-2xl shadow-xl shadow-amber-200 hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0 transition-all mt-8"
              >
                Submit Answers! 🚀
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in duration-500 bg-white rounded-[3rem] shadow-2xl overflow-hidden text-center relative border-4 border-white">
            {score >= 6 ? (
              <div className="p-12 space-y-8 bg-linear-to-b from-amber-50 to-white">
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-amber-200 blur-3xl rounded-full opacity-50 animate-pulse"></div>
                    <div className="relative bg-white p-6 rounded-full shadow-xl">
                        <Trophy size={80} className="text-amber-500 animate-bounce" />
                    </div>
                    <Star className="absolute -top-2 -right-2 text-yellow-400 fill-yellow-400" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-5xl font-black text-slate-900 tracking-tight">Ethical Hero! 🛡️</h2>
                    <p className="text-2xl text-amber-600 font-bold">You scored {score}/10 points</p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-inner border-2 border-dashed border-amber-200 relative group">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-6 py-1 rounded-full text-sm font-black tracking-widest uppercase">
                        Unstoppable
                    </div>
                    <Award size={100} className="text-amber-500 mx-auto drop-shadow-lg" />
                    <h3 className="text-2xl font-black text-slate-800 mt-4">Responsibility Badge</h3>
                    <p className="text-slate-500">You completed all lesson parts!</p>
                </div>

                <button 
                  onClick={() => router.push("/finaltest")}
                  className="group flex items-center justify-center gap-3 w-full py-6 bg-green-600 text-white rounded-4xl font-black text-2xl hover:bg-green-700 transition-all shadow-xl shadow-green-100"
                >
                  الذهاب للاختبار النهائي <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            ) : (
              <div className="p-12 space-y-8 bg-linear-to-b from-red-50 to-white">
                <div className="bg-white p-6 rounded-full shadow-xl inline-block">
                    <XCircle size={80} className="text-red-500 animate-pulse" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-4xl font-black text-slate-900">Review Ethics!</h2>
                    <p className="text-2xl text-red-600 font-bold">Score: {score}/10</p>
                    <p className="text-slate-500 max-w-xs mx-auto">Responsible AI is important for everyone. Take a quick look back and try again!</p>
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