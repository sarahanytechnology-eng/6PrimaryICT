"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Award, ArrowRight, RefreshCw, Trophy, Star, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function Test2() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState("quiz"); 
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  const questions = [
    { 
        id: 1, 
        q: "Which tool is specifically used to verify your identity and unlock your smartphone?", 
        options: [
            { id: "a", text: "Voice Assistants" }, 
            { id: "b", text: "Chat windows" }, 
            { id: "c", text: "Facial Recognition" }, 
            { id: "d", text: "Email filters" }
        ], 
        correct: "c" 
    },
    { 
        id: 2, 
        q: "Siri and Alexa are examples of which AI tool?", 
        options: [
            { id: "a", text: "Voice Assistants" }, 
            { id: "b", text: "Language processing tools" }, 
            { id: "c", text: "Facial Recognition" }, 
            { id: "d", text: "Chatbots" }
        ], 
        correct: "a" 
    },
    { 
        id: 3, 
        q: "What is the main purpose of an 'Email filter'?", 
        options: [
            { id: "a", text: "To help you write professional emails." }, 
            { id: "b", text: "To unlock your computer using your voice." }, 
            { id: "c", text: "To prevent dangerous or unwanted messages from reaching your inbox." }, 
            { id: "d", text: "To automatically chat with customer service." }
        ], 
        correct: "c" 
    },
    { 
        id: 4, 
        q: "Which tool helps you formulate your writing, send emails, or use search tools more effectively?", 
        options: [
            { id: "a", text: "Facial Recognition" }, 
            { id: "b", text: "Language processing tools" }, 
            { id: "c", text: "Voice commands" }, 
            { id: "d", text: "Malicious mail tools" }
        ], 
        correct: "b" 
    },
    { 
        id: 5, 
        q: "Where are you most likely to encounter 'Chat windows' that use chatbots?", 
        options: [
            { id: "a", text: "Inside your email inbox to filter spam." }, 
            { id: "b", text: "When you use your camera to unlock a phone." }, 
            { id: "c", text: "On websites for automated customer service responses." }, 
            { id: "d", text: "When giving voice commands to play music." }
        ], 
        correct: "c" 
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
    if (currentName) {
      const allUsersData = JSON.parse(localStorage.getItem("allUsersData")) || {};
      const userData = allUsersData[currentName];
      // نستخدم "test2" هنا لتمييز السجل
      const previousBest = userData.testScores["test2"] || 0;

      if (totalScore > previousBest) {
        const xpDiff = totalScore - previousBest;
        userData.xp = Math.min(userData.xp + xpDiff, 100);
        
        // إذا كانت أول مرة ينجح (score >= 6)، نزيد التقدم
        if (previousBest === 0 && totalScore >= 6) {
          userData.progress = Math.min(userData.progress + 14, 100);
        }
        
        userData.testScores["test2"] = totalScore;
        allUsersData[currentName] = userData;
        localStorage.setItem("allUsersData", JSON.stringify(allUsersData));
        localStorage.setItem("studentXP", userData.xp);
        localStorage.setItem("studentProgress", userData.progress);
        window.dispatchEvent(new Event("storage"));
      }
    }

    if (totalScore >= 6) {
      new Audio("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3").play();
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#6366f1', '#a855f7', '#ec4899'] });
    } else {
      new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3").play();
    }
    setCurrentStep("result");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-indigo-50 py-12 px-4" dir="ltr">
      <div className="max-w-3xl mx-auto">
        
        {currentStep === "quiz" ? (
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-indigo-100 overflow-hidden border border-white">
            <div className="bg-indigo-600 p-8 text-center text-white relative">
                <Sparkles className="absolute top-4 right-4 opacity-50" />
                <h1 className="text-3xl font-black mb-2">Quiz: AI Tools 🛠️</h1>
                <p className="text-indigo-100">Test your knowledge about AI in daily life!</p>
            </div>

            <div className="p-8 md:p-12 space-y-10">
              {questions.map((q, idx) => (
                <div key={q.id} className="space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold italic">
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
                          ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md" 
                          : "border-slate-100 hover:border-indigo-200 hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        <div className="flex items-center gap-3 relative z-10">
                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-colors ${
                                answers[q.id] === opt.id ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-200 group-hover:border-indigo-300"
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
                className="w-full py-6 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-4xl font-black text-2xl shadow-xl shadow-indigo-200 hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0 transition-all mt-8"
              >
                Check My Score! 🏆
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in duration-500 bg-white rounded-[3rem] shadow-2xl overflow-hidden text-center relative border-4 border-white">
            {score >= 6 ? (
              <div className="p-12 space-y-8 bg-linear-to-b from-indigo-50 to-white">
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-indigo-200 blur-3xl rounded-full opacity-50 animate-pulse"></div>
                    <div className="relative bg-white p-6 rounded-full shadow-xl">
                        <Trophy size={80} className="text-yellow-500 animate-bounce" />
                    </div>
                    <Star className="absolute -top-2 -right-2 text-yellow-400 fill-yellow-400" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-5xl font-black text-slate-900 tracking-tight">Brilliant! 🌟</h2>
                    <p className="text-2xl text-indigo-600 font-bold">You scored {score}/10 points</p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-inner border-2 border-dashed border-indigo-200 relative group">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-6 py-1 rounded-full text-sm font-black tracking-widest uppercase">
                        New Achievement
                    </div>
                    <Award size={100} className="text-indigo-500 mx-auto drop-shadow-lg" />
                    <h3 className="text-2xl font-black text-slate-800 mt-4">Daily Life Expert</h3>
                    <p className="text-slate-500">You understand AI tools perfectly!</p>
                </div>

                <button 
                  onClick={() => router.push("/lesson/part3")}
                  className="group flex items-center justify-center gap-3 w-full py-6 bg-indigo-600 text-white rounded-4xl font-black text-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
                >
                  Continue to Part 3 <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            ) : (
              <div className="p-12 space-y-8 bg-linear-to-b from-red-50 to-white">
                <div className="bg-white p-6 rounded-full shadow-xl inline-block">
                    <XCircle size={80} className="text-red-500 animate-pulse" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-4xl font-black text-slate-900">Try Again!</h2>
                    <p className="text-2xl text-red-600 font-bold">Score: {score}/10</p>
                    <p className="text-slate-500 max-w-xs mx-auto">Don't worry, even AI learns from mistakes. Review the tools and try once more!</p>
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