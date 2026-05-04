"use client";
import { useRouter } from "next/navigation";
import { 
  Smartphone, 
  Mic, 
  Mail, 
  PenTool, 
  MessageSquare, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles,
  Layout
} from "lucide-react";

export default function Part2() {
  const router = useRouter();

  const handleFinishLesson = () => {
    // 1. معرفة من هو الطالب الحالي
    const currentName = localStorage.getItem("currentUser");
    
    if (currentName) {
      // 2. جلب قاعدة البيانات الشاملة
      const allUsersData = JSON.parse(localStorage.getItem("allUsersData")) || {};
      const userData = allUsersData[currentName];

      // 3. التأكد هل هذه أول مرة ينهي فيها الطالب هذا الدرس بالتحديد؟
      // نستخدم مفتاح "lesson2" لتمييزه عن الدرس الأول
      if (userData && !userData.completedLessons["lesson2"]) {
        // إضافة 10 نقاط للـ XP
        userData.xp = Math.min(userData.xp + 10, 100);
        
        // زيادة شريط التقدم (14% إضافية)
        userData.progress = Math.min(userData.progress + 14, 100);
        
        // تعليم الدرس كـ "مكتمل"
        userData.completedLessons["lesson2"] = true;

        // 4. حفظ التحديثات
        allUsersData[currentName] = userData;
        localStorage.setItem("allUsersData", JSON.stringify(allUsersData));
        
        // 5. تحديث القيم اللحظية للعرض الفوري
        localStorage.setItem("studentXP", userData.xp);
        localStorage.setItem("studentProgress", userData.progress);

        // تنبيه الموقع لتحديث الـ Header
        window.dispatchEvent(new Event("storage"));
      }
    }

    // 6. الانتقال للاختبار الثاني
    router.push("/lesson/part2/test2");
  };

  const tools = [
    {
      name: "Facial Recognition",
      use: "Used to verify your identity and unlock your phone.",
      example: "Your smartphone",
      icon: <Smartphone className="text-blue-600" size={24} />,
      bg: "bg-blue-50"
    },
    {
      name: "Voice Assistants",
      use: "Digital robots that answer your questions using voice commands.",
      example: "Siri or Alexa",
      icon: <Mic className="text-purple-600" size={24} />,
      bg: "bg-purple-50"
    },
    {
      name: "Email Filter",
      use: "Prevents dangerous or unwanted messages from reaching your inbox.",
      example: "Your email inbox",
      icon: <Mail className="text-red-600" size={24} />,
      bg: "bg-red-50"
    },
    {
      name: "Language Tools",
      use: "Help you formulate writings, answers, and simple messages.",
      example: "Search & writing tools",
      icon: <PenTool className="text-green-600" size={24} />,
      bg: "bg-green-50"
    },
    {
      name: "Chat Windows",
      use: "Windows on websites that respond using chatbots.",
      example: "Customer service",
      icon: <MessageSquare className="text-orange-600" size={24} />,
      bg: "bg-orange-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white" dir="ltr">
      <article className="max-w-4xl mx-auto space-y-10 pb-20 px-4">
        
        {/* Header */}
        <header className="text-center space-y-4 pt-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl mb-2 animate-pulse">
            <Layout size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900">AI in Our Daily Lives</h1>
          <div className="h-1.5 w-24 bg-indigo-600 mx-auto rounded-full"></div>
          <p className="text-slate-500 font-medium">Part 2: Discovering AI Tools Around Us</p>
        </header>

        {/* Tools Section (Grid Layout instead of Table for better UI) */}
        <section className="grid gap-6">
          {tools.map((tool, index) => (
            <div 
              key={index}
              className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white border border-slate-100 rounded-4xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`shrink-0 w-16 h-16 ${tool.bg} rounded-2xl flex items-center justify-center`}>
                {tool.icon}
              </div>
              <div className="flex-1 space-y-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-slate-900">{tool.name}</h3>
                <p className="text-slate-600 leading-relaxed">{tool.use}</p>
                <div className="inline-block mt-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Example: {tool.example}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Interactive Highlight */}
        <section className="p-8 bg-linear-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
          <Sparkles className="absolute top-4 right-4 opacity-20" size={60} />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-3 italic">Did you know?</h2>
            <p className="text-lg text-indigo-50 leading-relaxed">
              Every time you unlock your phone with your face or ask Siri for the weather, 
              you are interacting with an advanced AI algorithm!
            </p>
          </div>
        </section>

        {/* Action Button */}
        <div className="pt-16 pb-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-green-600 font-bold animate-pulse">
            <CheckCircle2 size={20} />
            <span>Complete Part 2 to get +10 XP</span>
          </div>
          <button 
            onClick={handleFinishLesson}
            className="group px-16 py-6 bg-green-600 text-white rounded-4xl font-black text-2xl shadow-2xl hover:bg-green-700 hover:-translate-y-2 transition-all flex items-center gap-4"
          >
            Take Quiz 2
            <ChevronRight size={28} />
          </button>
        </div>

      </article>
    </div>
  );
}