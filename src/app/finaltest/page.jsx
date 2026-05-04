"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Award, Home, RefreshCw, Trophy, Star, Sparkles, ShieldCheck, Zap } from "lucide-react";
import confetti from "canvas-confetti";

export default function FinalTest() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState("quiz"); 
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  const questions = [
    { id: 1, q: "Siri and Alexa are examples of which AI tool?", options: [{ id: "a", text: "Email filters" }, { id: "b", text: "Facial Recognition" }, { id: "c", text: "Voice Assistants" }, { id: "d", text: "Chat windows" }], correct: "c" },
    { id: 2, q: "The principle of 'Unbiased' means AI decisions should be based on:", options: [{ id: "a", text: "Facts" }, { id: "b", text: "Personal views" }, { id: "c", text: "Opinions" }, { id: "d", text: "Bias" }], correct: "a" },
    { id: 3, q: "What is an 'Algorithm'?", options: [{ id: "a", text: "A digital robot that answers questions." }, { id: "b", text: "A tool to unlock your phone." }, { id: "c", text: "A set of detailed steps that tells the computer what to do." }, { id: "d", text: "A malicious message in your inbox." }], correct: "c" },
    { id: 4, q: "Which tool is used to verify your identity and unlock your smartphone?", options: [{ id: "a", text: "Language processing tools" }, { id: "b", text: "Facial Recognition" }, { id: "c", text: "Voice commands" }, { id: "d", text: "Search tools" }], correct: "b" },
    { id: 5, q: "'Inclusiveness' in AI ethics means that:", options: [{ id: "a", text: "AI should only be for a specific group." }, { id: "b", text: "Everyone should benefit from AI tools." }, { id: "c", text: "AI should be kept secret." }, { id: "d", text: "AI should make mistakes." }], correct: "b" },
    { id: 6, q: "What do 'Email filters' prevent from reaching your inbox?", options: [{ id: "a", text: "Important messages" }, { id: "b", text: "Malicious or unwanted mails" }, { id: "c", text: "Voice commands" }, { id: "d", text: "Recipes" }], correct: "b" },
    { id: 7, q: "If an AI tool makes a mistake, the 'Responsibility' principle says the designer should:", options: [{ id: "a", text: "Ignore it." }, { id: "b", text: "Blame the user." }, { id: "c", text: "Admit and correct the mistake." }, { id: "d", text: "Keep it hidden." }], correct: "c" },
    { id: 8, q: "Algorithms are like ________ that the machine follows to learn and solve problems.", options: [{ id: "a", text: "Images" }, { id: "b", text: "Recipes" }, { id: "c", text: "Passwords" }, { id: "d", text: "Stories" }], correct: "b" },
    { id: 9, q: "Which tool helps you formulate your writings or answers and send simple messages?", options: [{ id: "a", text: "Chatbots" }, { id: "b", text: "Facial Recognition" }, { id: "c", text: "Language processing tools" }, { id: "d", text: "Email filters" }], correct: "c" },
    { id: 10, q: "'Transparency' means that the designer of the AI tool is ready to:", options: [{ id: "a", text: "Explain how the AI tools work." }, { id: "b", text: "Share user passwords." }, { id: "c", text: "Make the tool hard to use." }, { id: "d", text: "Use the tool for cheating." }], correct: "a" }
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
      if (answers[q.id] === q.correct) {
        totalScore += 4; // كل سؤال بـ 4 نقاط، المجموع 40
      }
    });
    
    setScore(totalScore);

    const currentName = localStorage.getItem("currentUser");
    
    // --- منطق النجاح النهائي (24 من 40 أو أكثر) ---
    if (totalScore >= 24) {
      // 1. تحديث الأوسمة للمستوى النهائي (4 أوسمة)
      localStorage.setItem("studentBadges", "4");

      // 2. تحديث البيانات المركزية
      if (currentName) {
        const allUsersData = JSON.parse(localStorage.getItem("allUsersData")) || {};
        const userData = allUsersData[currentName];
        
        if (userData) {
          const previousBest = userData.testScores["finalTest"] || 0;
          
          if (totalScore > previousBest) {
            const xpDiff = totalScore - previousBest;
            // إضافة نقاط XP جديدة (بحد أقصى 100 للملف الشخصي)
            userData.xp = Math.min((userData.xp || 0) + xpDiff, 100);
            
            // اكتمال التقدم 100%
            userData.progress = 100;
            
            userData.testScores["finalTest"] = totalScore;
            allUsersData[currentName] = userData;
            
            // حفظ في التخزين
            localStorage.setItem("allUsersData", JSON.stringify(allUsersData));
            localStorage.setItem("studentXP", String(userData.xp));
            localStorage.setItem("studentProgress", "100");
          }
        }
      }

      // إطلاق حدث التحديث للداشبورد
      window.dispatchEvent(new Event("storage"));

      // أصوات واحتفالات صاخبة
      new Audio("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3").play().catch(() => {});
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        confetti({ 
            particleCount: 50, 
            startVelocity: 30, 
            spread: 360, 
            origin: { x: Math.random(), y: Math.random() - 0.2 },
            colors: ['#FFD700', '#FFA500', '#0000FF']
        });
      }, 250);
    } else {
      new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3").play().catch(() => {});
    }
    
    setCurrentStep("result");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-blue-900 py-12 px-4" dir="ltr">
      <div className="max-w-4xl mx-auto">
        
        {currentStep === "quiz" ? (
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border-4 border-blue-400">
            <div className="bg-linear-to-r from-blue-600 to-indigo-700 p-10 text-center text-white relative">
                <Zap className="absolute top-4 left-4 text-yellow-300 animate-pulse" />
                <h1 className="text-4xl font-black mb-2">The Grand Final Challenge 👑</h1>
                <p className="text-blue-100 text-lg">Answer all 10 questions to become an AI Master!</p>
            </div>

            <div className="p-8 md:p-12 space-y-12">
              {questions.map((q, idx) => (
                <div key={q.id} className="space-y-6 pb-6 border-b border-slate-100 last:border-0">
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black shadow-lg">
                      {idx + 1}
                    </span>
                    <p className="text-2xl font-bold text-slate-800 leading-tight pt-1">{q.q}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 pl-14">
                    {q.options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelect(q.id, opt.id)}
                        className={`group p-5 rounded-2xl text-left transition-all border-2 font-bold relative ${
                          answers[q.id] === opt.id 
                          ? "border-blue-600 bg-blue-50 text-blue-800 shadow-md" 
                          : "border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${
                                answers[q.id] === opt.id ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200"
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
                disabled={Object.keys(answers).length < 10}
                className="w-full py-8 bg-linear-to-r from-yellow-400 to-orange-500 text-white rounded-4xl font-black text-3xl shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 transition-all mt-8 uppercase tracking-widest"
              >
                Claim My Final Reward! 🎁
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in duration-700 bg-white rounded-[4rem] shadow-2xl overflow-hidden text-center relative border-8 border-yellow-400">
            {score >= 24 ? (
              <div className="p-12 space-y-8 bg-linear-to-b from-yellow-50 to-white">
                <div className="relative inline-block">
                    <Trophy size={120} className="text-yellow-500 mx-auto drop-shadow-2xl animate-bounce" />
                    <Sparkles className="absolute top-0 right-0 text-orange-500 size-10 animate-pulse" />
                    <Sparkles className="absolute bottom-0 left-0 text-blue-500 size-10 animate-pulse" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-6xl font-black text-slate-900 tracking-tighter">AI MASTER! 🎓</h2>
                    <p className="text-3xl text-green-600 font-black">Score: {score}/40</p>
                </div>

                <div className="bg-linear-to-br from-yellow-400 via-orange-400 to-yellow-500 p-1 rounded-[3rem] shadow-2xl">
                    <div className="bg-white p-10 rounded-[2.8rem] space-y-4">
                        <ShieldCheck size={120} className="text-blue-600 mx-auto drop-shadow-lg" />
                        <h3 className="text-3xl font-black text-slate-800">Final Excellence Badge</h3>
                        <p className="text-xl text-slate-500 font-bold">You have officially mastered Artificial Intelligence basics!</p>
                    </div>
                </div>

                <button 
                  onClick={() => router.push("/")}
                  className="group flex items-center justify-center gap-3 w-full py-6 bg-slate-900 text-white rounded-4xl font-black text-2xl hover:bg-black transition-all shadow-xl"
                >
                  <Home /> Return to Dashboard
                </button>
              </div>
            ) : (
              <div className="p-12 space-y-8 bg-linear-to-b from-red-50 to-white">
                <XCircle size={100} className="text-red-500 mx-auto" />
                <div className="space-y-2">
                    <h2 className="text-4xl font-black text-slate-900">So Close!</h2>
                    <p className="text-2xl text-red-600 font-bold">Your Score: {score}/40</p>
                    <p className="text-slate-500 max-w-sm mx-auto font-bold italic">The final master badge requires more focus. Review all the lessons and try the final challenge again!</p>
                </div>

                <button 
                  onClick={handleRetry}
                  className="flex items-center justify-center gap-3 w-full py-6 bg-blue-600 text-white rounded-4xl font-black text-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                >
                  <RefreshCw /> Retake Final Test
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}