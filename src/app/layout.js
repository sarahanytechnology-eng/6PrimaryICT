"use client";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Trophy, LogIn, Menu } from "lucide-react";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [stats, setStats] = useState({ xp: 0, progress: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // تحديث الإحصائيات من الـ Local Storage
  useEffect(() => {
    const updateStats = () => {
      const savedXP = parseInt(localStorage.getItem("studentXP")) || 0;
      const savedProgress = parseInt(localStorage.getItem("studentProgress")) || 0;
      setStats({ xp: savedXP, progress: savedProgress });
    };

    updateStats();
    window.addEventListener("storage", updateStats);
    return () => window.removeEventListener("storage", updateStats);
  }, [pathname]);

  // إغلاق قائمة الموبايل عند تغيير الصفحة
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isHomePage = pathname === "/";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Content", href: "/lesson" },
    { name: "Exams", href: "/exams" },
    { name: "Contact us", href: "/contact" }
  ];

  return (
    <html lang="en" dir="ltr">
      <body className="bg-slate-50 text-slate-900 font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          
          <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b-2 border-slate-100">
            <div className="container mx-auto px-4 md:px-6 h-20 md:h-24 flex items-center justify-between">
              
              {/* اللوجو */}
              <div className="flex items-center gap-4 lg:gap-12">
                <Link href="/" className="group flex items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-blue-200">
                    <span className="text-white font-black text-xl md:text-2xl italic">6</span>
                  </div>
                  <span className="text-lg md:text-2xl font-black text-slate-800 tracking-tight uppercase">
                    Primary<span className="text-blue-600">ICT</span>
                  </span>
                </Link>
                
                {/* القائمة العادية للكمبيوتر */}
                <nav className="hidden lg:flex items-center gap-10">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href}
                      href={link.href} 
                      className={`relative text-lg font-black transition-colors hover:text-blue-600 ${
                        pathname === link.href ? "text-blue-600" : "text-slate-500"
                      } after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-1 after:bg-blue-600 after:rounded-full after:transition-all hover:after:w-full`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* أزرار التحكم والإحصائيات */}
              <div className="flex items-center gap-2 md:gap-6">
                {!isHomePage && (
                  <div className="flex items-center gap-2 md:gap-6 bg-slate-100 p-1.5 md:p-2 md:pr-6 rounded-2xl md:rounded-4xl border-2 border-slate-200/50">
                    <div className="flex items-center gap-1.5 md:gap-3 bg-white px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl md:rounded-3xl shadow-sm border border-orange-100">
                      <Trophy size={18} className="text-orange-500 fill-orange-500" />
                      <span className="text-sm md:text-lg font-black text-orange-700">{stats.xp} <span className="text-[10px] md:text-sm">XP</span></span>
                    </div>
                    
                    <div className="hidden sm:flex flex-col w-24 md:w-40 gap-1">
                      <div className="flex justify-between text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest">
                        <span>Progress</span>
                        <span className="text-blue-600">{stats.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 md:h-3 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(37,99,235,0.5)]" 
                          style={{ width: `${stats.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* زر الدخول - تم إصلاح كود الـ Icon هنا */}
                <Link 
                  href="/login" 
                  className="flex items-center gap-1.5 md:gap-3 px-4 py-2 md:px-8 md:py-3.5 text-sm md:text-base font-black text-white bg-slate-900 rounded-xl md:rounded-2xl shadow-md hover:bg-blue-600 transition-all active:scale-95 shadow-slate-200"
                >
                  <LogIn size={18} />
                  <span className="hidden sm:inline">Login</span>
                </Link>

                {/* زر قائمة الموبايل */}
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition-colors"
                  aria-label="Toggle Menu"
                >
                  <Menu size={22} />
                </button>
              </div>
            </div>

            {/* القائمة المنسدلة للموبايل */}
            {mobileMenuOpen && (
              <div className="lg:hidden w-full bg-white border-b-2 border-slate-100 absolute top-20 left-0 right-0 shadow-xl px-6 py-4 flex flex-col gap-3 z-50">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className={`flex items-center gap-3 p-3 rounded-xl font-black text-base transition-colors ${
                      pathname === link.href 
                        ? "bg-blue-50 text-blue-600" 
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </header>

          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-4 md:p-12">
              <div className="max-w-6xl mx-auto">
                {children}
              </div>
            </main>
            
            <footer className="py-6 md:py-10 border-t border-slate-100 text-center text-slate-400 text-xs md:text-sm font-bold tracking-wide">
              &copy; {new Date().getFullYear()} PRIMARY ICT • READY TO LEARN
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}