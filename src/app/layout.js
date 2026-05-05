"use client";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Trophy, LogIn } from "lucide-react";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [stats, setStats] = useState({ xp: 0, progress: 0 });

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

  const isHomePage = pathname === "/";

  return (
    <html lang="en" dir="ltr">
      <body className="bg-slate-50 text-slate-900 font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          
          <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b-2 border-slate-100">
            <div className="container mx-auto px-6 h-24 flex items-center justify-between">
              
              <div className="flex items-center gap-12">
                <Link href="/" className="group flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform shadow-xl shadow-blue-200">
                    <span className="text-white font-black text-2xl italic">6</span>
                  </div>
                  <span className="text-2xl font-black text-slate-800 tracking-tight uppercase">
                    Primary<span className="text-blue-600">ICT</span>
                  </span>
                </Link>
                
                <nav className="hidden lg:flex items-center gap-10">
                  {[
                    { name: "Home", href: "/" },
                    { name: "Content", href: "/lesson" },
                    { name: "Contact us", href: "/contact" }
                  ].map((link) => (
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

              <div className="flex items-center gap-6">
                {!isHomePage && (
                  <div className="hidden md:flex items-center gap-6 bg-slate-100 p-2 pr-6 rounded-4xl border-2 border-slate-200/50">
                    <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-3xl shadow-md border border-orange-100">
                      <Trophy size={22} className="text-orange-500 fill-orange-500" />
                      <span className="text-lg font-black text-orange-700">{stats.xp} XP</span>
                    </div>
                    
                    <div className="flex flex-col w-40 gap-1.5">
                      <div className="flex justify-between text-xs font-black text-slate-500 uppercase tracking-widest">
                        <span>Progress</span>
                        <span className="text-blue-600">{stats.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(37,99,235,0.5)]" 
                          style={{ width: `${stats.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <Link 
                  href="/login" 
                  className="flex items-center gap-3 px-8 py-3.5 text-base font-black text-white bg-slate-900 rounded-2xl shadow-xl hover:bg-blue-600 transition-all active:scale-95 shadow-slate-200"
                >
                  <LogIn size={20} />
                  Login
                </Link>
              </div>
            </div>
          </header>

          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-6 md:p-12">
              <div className="max-w-6xl mx-auto">
                {children}
              </div>
            </main>
            
            <footer className="py-10 border-t border-slate-100 text-center text-slate-400 text-sm font-bold tracking-wide">
              &copy; {new Date().getFullYear()} PRIMARY ICT • READY TO LEARN
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
