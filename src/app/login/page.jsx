"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserCircle, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [studentName, setStudentName] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const name = studentName.trim();
    
    if (name === "") {
      alert("enter your name to login");
      return;
    }

    // 1. تحديد اسم الطالب الحالي في الجلسة
    localStorage.setItem("currentUser", name);
    localStorage.setItem("userName", name);

    // 2. جلب قاعدة بيانات الطلاب الشاملة من المتصفح
    const allUsersData = JSON.parse(localStorage.getItem("allUsersData")) || {};
    
    // 3. التحقق من حالة الطالب
    if (allUsersData[name]) {
      // --- حالة: طالب مسجل مسبقاً ---
      const userData = allUsersData[name];
      localStorage.setItem("studentXP", userData.xp || 0);
      localStorage.setItem("studentProgress", userData.progress || 0);
      localStorage.setItem("studentBadges", userData.badges || 0); 
    } else {
      // --- حالة: طالب جديد لأول مرة ---
      const newUser = { 
        xp: 0, 
        progress: 0, 
        badges: 0, 
        completedLessons: {}, 
        testScores: {} 
      };
      
      allUsersData[name] = newUser;
      
      // حفظ البيانات في القاعدة الشاملة
      localStorage.setItem("allUsersData", JSON.stringify(allUsersData));
      
      // تهيئة مفاتيح التشغيل المباشرة
      localStorage.setItem("studentXP", 0);
      localStorage.setItem("studentProgress", 0);
      localStorage.setItem("studentBadges", 0);
    }

    // 4. إرسال تنبيه للنظام لتحديث الواجهات فوراً
    window.dispatchEvent(new Event("storage"));
    
    // 5. التوجه للوحة التحكم
    router.push("/"); 
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50/50 p-4" dir="ltr">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 border border-slate-100 p-10 relative overflow-hidden">
        
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-3xl shadow-xl shadow-blue-200 mb-6 rotate-3">
              <UserCircle size={44} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome back!</h1>
            <p className="text-slate-500 font-medium">Sign in to start your learning journey in ICT</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* حقل اسم الطالب بالاتجاه الإنجليزي الصحيح */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 block">Student name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                  <UserCircle size={20} />
                </span>
                <input 
                  required
                  type="text" 
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your name..." 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-medium"
                />
              </div>
            </div>

            {/* حقل كلمة المرور بالاتجاه الإنجليزي الصحيح */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 block">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                  <Lock size={20} />
                </span>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-medium"
                />
              </div>
            </div>

            {/* زر تسجيل الدخول مع تعديل حركة السهم للأمام */}
            <button 
              type="submit"
              className="w-full mt-4 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg shadow-lg shadow-blue-200 flex items-center justify-center gap-3 group transition-all"
            >
              Sign In
              <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-slate-400 text-sm">
            Having a problem? <a href="/contact" className="text-blue-600 font-bold hover:underline ml-1">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
}