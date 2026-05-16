import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, GraduationCap, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { href: "/", labelAr: "الرئيسية", labelEn: "Home" },
  { href: "/services", labelAr: "الخدمات", labelEn: "Services" },
  { href: "/about", labelAr: "من نحن", labelEn: "About" },
  { href: "/portfolio", labelAr: "أعمالنا", labelEn: "Portfolio" },
  { href: "/how-it-works", labelAr: "كيف نعمل", labelEn: "How It Works" },
  { href: "/faq", labelAr: "الأسئلة الشائعة", labelEn: "FAQ" },
  { href: "/contact", labelAr: "تواصل معنا", labelEn: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-6xl ${
          scrolled
            ? "bg-[#0B1120]/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            : "bg-[#0B1120]/60 backdrop-blur-xl border border-white/5"
        } rounded-full px-4 md:px-6 py-3`}
        dir="rtl"
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/images/logo.jpg"
              alt="Academicx Solution"
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="hidden md:inline text-sm font-bold text-[#E6F7FF]">
              أكاديميكس
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  isActive(link.href)
                    ? "text-[#00F0FF] bg-[#00F0FF]/10"
                    : "text-[#8CA0B3] hover:text-[#E6F7FF] hover:bg-white/5"
                }`}
              >
                {link.labelAr}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {user?.role === "admin" && (
              <Link
                to="/dashboard"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#00F0FF] bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 transition-all border border-[#00F0FF]/20"
              >
                <LayoutDashboard size={14} />
                لوحة التحكم
              </Link>
            )}

            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-xs text-[#8CA0B3]">{user.name}</span>
                <button
                  onClick={logout}
                  className="px-3 py-1.5 rounded-full text-xs text-[#8CA0B3] hover:text-white hover:bg-white/5 transition-all"
                >
                  خروج
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#00F0FF] to-[#2E5BFF] text-[#060A12] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all"
              >
                <GraduationCap size={14} />
                تسجيل الدخول
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-[#8CA0B3] hover:text-[#00F0FF] transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#060A12]/95 backdrop-blur-2xl pt-24 px-6"
          dir="rtl"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive(link.href)
                    ? "text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/20"
                    : "text-[#8CA0B3] hover:text-[#E6F7FF] hover:bg-white/5"
                }`}
              >
                {link.labelAr}
              </Link>
            ))}
            {user?.role === "admin" && (
              <Link
                to="/dashboard"
                className="px-4 py-3 rounded-xl text-base font-medium text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/20"
              >
                لوحة التحكم
              </Link>
            )}
            <div className="mt-4 pt-4 border-t border-white/10">
              {user ? (
                <button
                  onClick={logout}
                  className="w-full px-4 py-3 rounded-xl text-base text-[#8CA0B3] hover:text-white hover:bg-white/5 transition-all text-right"
                >
                  تسجيل الخروج ({user.name})
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block w-full px-4 py-3 rounded-xl text-base font-bold bg-gradient-to-r from-[#00F0FF] to-[#2E5BFF] text-[#060A12] text-center"
                >
                  تسجيل الدخول
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
