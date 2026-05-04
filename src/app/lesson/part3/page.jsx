"use client";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  Users, 
  Scale, 
  Lock, 
  HeartHandshake, 
  UserCheck, 
  Eye,
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles
} from "lucide-react";

export default function Part3() {
  const router = useRouter();

  const handleFinishLesson = () => {
    const currentName = localStorage.getItem("currentUser");
    
    if (currentName) {
      const allUsersData = JSON.parse(localStorage.getItem("allUsersData")) || {};
      const userData = allUsersData[currentName];

      if (userData) {
        // تأمين وجود الكائن لتجنب الأخطاء البرمجية
        if (!userData.completedLessons) {
          userData.completedLessons = {};
        }

        // التحقق مما إذا كان هذا الإنهاء هو الأول للدرس الثالث
        if (!userData.completedLessons["lesson3"]) {
          // إضافة 10 نقاط XP و 14% تقدم
          userData.xp = (userData.xp || 0) + 10;
          userData.progress = Math.min((userData.progress || 0) + 14, 100);
          
          // وضع علامة "تم الإنهاء" لمنع تكرار النقاط
          userData.completedLessons["lesson3"] = true;

          // حفظ البيانات المحدثة في القائمة الكلية
          allUsersData[currentName] = userData;
          localStorage.setItem("allUsersData", JSON.stringify(allUsersData));
          
          // تحديث المفاتيح المباشرة التي يقرأها (الهيدر) و (الداشبورد)
          localStorage.setItem("studentXP", String(userData.xp));
          localStorage.setItem("studentProgress", String(userData.progress));

          // إطلاق حدث لتحديث واجهة المستخدم (النقاط في الهيدر) فوراً
          window.dispatchEvent(new Event("storage"));
        }
      }
    }

    // الانتقال للاختبار بعد معالجة البيانات
    router.push("/lesson/part3/test3");
  };

  const ethics = [
    {
      title: "Inclusiveness",
      desc: "AI tools must include all users, not just a specific group. Everyone should benefit.",
      icon: <Users className="text-blue-600" />,
      color: "bg-blue-50"
    },
    {
      title: "Unbiased",
      desc: "AI decisions must be based on facts, not opinions or personal views (bias).",
      icon: <Scale className="text-purple-600" />,
      color: "bg-purple-50"
    },
    {
      title: "Protectiveness (Privacy)",
      desc: "User privacy and data security must be guaranteed. Personal info should never be leaked.",
      icon: <Lock className="text-red-600" />,
      color: "bg-red-50"
    },
    {
      title: "Benefit",
      desc: "AI should help society, not be used for harmful personal gains or cheating.",
      icon: <HeartHandshake className="text-green-600" />,
      color: "bg-green-50"
    },
    {
      title: "Responsibility",
      desc: "If an AI tool makes a mistake, the designer should admit and correct it.",
      icon: <UserCheck className="text-orange-600" />,
      color: "bg-orange-50"
    },
    {
      title: "Transparency",
      desc: "Designers must be ready to explain exactly how their AI tools work.",
      icon: <Eye className="text-teal-600" />,
      color: "bg-teal-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white" dir="ltr">
      <article className="max-w-4xl mx-auto space-y-10 pb-20 px-4">
        
        {/* Header */}
        <header className="text-center space-y-4 pt-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl mb-2 animate-bounce">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Ethics: Using AI Responsibly
          </h1>
          <div className="h-1.5 w-24 bg-yellow-500 mx-auto rounded-full"></div>
        </header>

        {/* Warning Box */}
        <section className="relative overflow-hidden p-8 bg-linear-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-[2.5rem] shadow-sm">
          <AlertTriangle className="absolute -right-4 -bottom-4 text-yellow-200 size-32 rotate-12" />
          <div className="relative z-10 flex gap-4 items-start">
            <div className="p-3 bg-yellow-500 text-white rounded-xl shadow-lg animate-pulse">
               <Sparkles size={24} />
            </div>
            <p className="text-xl text-slate-700 font-bold leading-relaxed">
              Because Artificial Intelligence is very powerful, we must develop and use it in a <span className="text-yellow-600 underline decoration-wavy underline-offset-4">responsible and ethical way</span>.
            </p>
          </div>
        </section>

        {/* Ethics Grid */}
        <section className="grid md:grid-cols-2 gap-6">
          {ethics.map((item, index) => (
            <div 
              key={index}
              className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300"
            >
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-slate-300 font-serif italic text-3xl">{index + 1}.</span>
                {item.title}
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium text-lg">
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        {/* Action Button */}
        <div className="pt-16 pb-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-green-600 font-bold animate-pulse">
            <CheckCircle2 size={20} />
            <span>Last part! Get your final +10 XP</span>
          </div>
          <button 
            onClick={handleFinishLesson}
            className="group px-16 py-6 bg-green-600 text-white rounded-4xl font-black text-2xl shadow-2xl hover:bg-green-700 hover:-translate-y-2 transition-all flex items-center gap-4"
          >
            Take Quiz 3
            <ChevronRight size={28} />
          </button>
        </div>

      </article>
    </div>
  );
}