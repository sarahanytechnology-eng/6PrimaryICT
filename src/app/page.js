"use client";
import { useEffect, useState } from "react";
import { Trophy, Star, Target, PlayCircle, X, Lock, Award, ShieldCheck, Zap, Crown } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [studentData, setStudentData] = useState({
    name: "Hero",
    xp: 0,
    badges: 0,
    progress: 0
  });

  // قائمة الأوسمة الأربعة
  const badgesList = [
    { id: 1, name: "Explorer", icon: <Zap size={40} />, color: "text-amber-500", bg: "bg-amber-100", desc: "Complete 1st Exam" },
    { id: 2, name: "Specialist", icon: <ShieldCheck size={40} />, color: "text-blue-500", bg: "bg-blue-100", desc: "Complete 2nd Exam" },
    { id: 3, name: "Master", icon: <Award size={40} />, color: "text-purple-500", bg: "bg-purple-100", desc: "Complete 3rd Exam" },
    { id: 4, name: "Grandmaster", icon: <Crown size={40} />, color: "text-red-500", bg: "bg-red-100", desc: "Finish Final Exam" },
  ];

  useEffect(() => {
    // جلب البيانات من LocalStorage مع التأكد من القيم الافتراضية هي 0
    const savedName = localStorage.getItem("userName");
    const savedXP = parseInt(localStorage.getItem("studentXP")) || 0;
    const savedProgress = parseInt(localStorage.getItem("studentProgress")) || 0;
    const savedBadges = parseInt(localStorage.getItem("studentBadges")) || 0; 

    setStudentData({
      name: savedName || "Hero",
      xp: savedXP,
      badges: savedBadges,
      progress: savedProgress
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50" dir="ltr">
      <main className="max-w-6xl mx-auto p-6 md:p-12 space-y-10">
        
        {/* Header */}
        <header className="bg-linear-to-r from-blue-700 to-indigo-600 rounded-[2.5rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
              Welcome back, <span className="text-yellow-300">{studentData.name}</span>! 👋
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-blue-100 font-medium max-w-2xl">
              {studentData.progress === 0 
                ? "Your journey starts now! Solve exams to earn badges." 
                : "Keep going! You are doing great."}
            </p>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* XP Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-6 group">
            <div className="p-5 bg-orange-100 text-orange-600 rounded-3xl group-hover:rotate-12 transition-transform"><Trophy size={40} /></div>
            <div>
              <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">Points</p>
              <p className="text-4xl font-black text-slate-800">{studentData.xp} <span className="text-lg text-slate-400">XP</span></p>
            </div>
          </div>

          {/* Badges Card */}
          <button 
            onClick={() => setShowBadgesModal(true)}
            className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-sm hover:border-purple-300 transition-all flex items-center gap-6 group text-left"
          >
            <div className="p-5 bg-purple-100 text-purple-600 rounded-3xl group-hover:scale-110 transition-transform">
              <Star size={40} className={studentData.badges > 0 ? "fill-purple-600" : ""} />
            </div>
            <div>
              <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">Progress</p>
              <p className="text-4xl font-black text-slate-800">
                {studentData.badges}<span className="text-slate-300 mx-1">/</span>4
              </p>
              <p className="text-blue-600 text-xs font-black underline mt-1 italic">Click to reveal</p>
            </div>
          </button>

          {/* Progress Card - التفاعلي */}
          <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-sm flex items-center gap-6 group hover:border-blue-200 transition-all">
            <div className="p-5 bg-blue-100 text-blue-600 rounded-3xl group-hover:animate-bounce transition-all"><Target size={40} /></div>
            <div className="flex-1">
              <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">Course Done</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex-1 bg-slate-100 h-5 rounded-full overflow-hidden border border-slate-200 relative group-hover:h-6 transition-all shadow-inner">
                  <div 
                    className="bg-linear-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-1000 ease-out relative" 
                    style={{ width: `${studentData.progress}%` }}
                  >
                    {/* لمعة داخلية لشريط التقدم عند التفاعل */}
                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                  </div>
                </div>
                <span className="text-2xl font-black text-blue-600 group-hover:scale-125 transition-transform">{studentData.progress}%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Start Button */}
        <div className="flex justify-center pt-10">
          <Link href="/lesson" className="group relative">
            <div className="absolute -inset-2 bg-linear-to-r from-blue-600 to-indigo-400 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
            <button className="relative px-16 py-8 bg-slate-900 text-white rounded-full font-black text-3xl flex items-center gap-6 shadow-2xl transition-all hover:scale-105 active:scale-95">
              <PlayCircle size={40} />
              {studentData.progress === 0 ? "Start Adventure" : "Continue"}
            </button>
          </Link>
        </div>

        {/* Badges Modal */}
        {showBadgesModal && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl relative animate-in zoom-in-95 duration-300">
              <button 
                onClick={() => setShowBadgesModal(false)}
                className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={32} className="text-slate-400" />
              </button>

              <h2 className="text-4xl font-black text-slate-800 mb-2 italic">Badge Collection</h2>
              <p className="text-slate-500 mb-10 font-bold text-lg">Every exam you pass unlocks a new professional identity!</p>

              <div className="grid grid-cols-2 gap-6">
                {badgesList.map((badge) => {
                  // المنطق: الوسام يفتح فقط إذا كان عدد أوسمة الطالب أكبر من أو يساوي رقم الوسام
                  const isUnlocked = studentData.badges >= badge.id;
                  return (
                    <div 
                      key={badge.id}
                      className={`p-6 rounded-[2.5rem] border-4 flex flex-col items-center text-center transition-all duration-500 ${
                        isUnlocked 
                        ? `${badge.bg} border-transparent scale-100 shadow-lg` 
                        : "bg-slate-50 border-slate-100 opacity-60 scale-95 grayscale"
                      }`}
                    >
                      <div className={`mb-4 p-4 rounded-2xl ${isUnlocked ? "bg-white shadow-sm " + badge.color : "text-slate-300"}`}>
                        {isUnlocked ? badge.icon : <Lock size={40} />}
                      </div>
                      <h3 className={`text-xl font-black ${isUnlocked ? "text-slate-800" : "text-slate-400"}`}>
                        {isUnlocked ? badge.name : "???"}
                      </h3>
                      <div className="mt-2">
                        {isUnlocked ? (
                          <span className="bg-green-500 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest animate-bounce">Unlocked</span>
                        ) : (
                          <p className="text-xs font-bold text-slate-400 uppercase">{badge.desc}</p>
                        )}
                      </div>
                    </div>
                    
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}