import { MessageCircle, Mail } from "lucide-react";

export default function Contact() {
  // البيانات الخاصة بكِ
  const whatsappNumber = "201155466502"; // يفضل كتابة الرقم بالكود الدولي بدون أصفار أو + (مثلاً: 20115...)
  const emailAddress = "engineersarahany@gmail.com"; // ضعي الإيميل الكامل هنا

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-[40px] shadow-sm border border-slate-100 p-12 text-center">
        <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageCircle size={48} />
        </div>
        <h1 className="text-3xl font-black mb-4">Meet the Developer</h1>
        <p className="text-slate-500 mb-8 text-lg">Creating professional e-learning experiences for the next generation of ICT heroes.</p>
        
        <div className="flex flex-col gap-4">
          {/* رابط الواتساب */}
          <a 
            href={`https://wa.me/${whatsappNumber}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold hover:opacity-90 transition-opacity"
          >
            <MessageCircle /> WhatsApp Me
          </a>

          {/* رابط الإيميل */}
          <a 
            href={`mailto:${emailAddress}`}
            className="flex items-center justify-center gap-3 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors"
          >
            <Mail /> Send Email
          </a>
        </div>
      </div>
    </div>
  );
}