import { Link } from "react-router";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = [
  {
    title: "الروابط السريعة",
    links: [
      { label: "الرئيسية", href: "/" },
      { label: "الخدمات", href: "/services" },
      { label: "من نحن", href: "/about" },
      { label: "أعمالنا", href: "/portfolio" },
    ],
  },
  {
    title: "الخدمات",
    links: [
      { label: "حل الواجبات", href: "/services" },
      { label: "المساعدة في الامتحانات", href: "/services" },
      { label: "تصميم المواقع", href: "/services" },
      { label: "التصميم الجرافيكي", href: "/services" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#060A12]" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.jpg"
                alt="Academicx Solution"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-bold text-[#E6F7FF]">
                  أكاديميكس سوليوشن
                </h3>
                <p className="text-xs text-[#8CA0B3]">Academicx Solution</p>
              </div>
            </div>
            <p className="text-sm text-[#8CA0B3] leading-relaxed">
              حلول أكاديمية وبرمجية وتصميمية بلا حدود. نساعدك في تحقيق التميز
              الأكاديمي باحترافية وسرية.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/academix__solution"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8CA0B3] hover:text-[#00F0FF] hover:border-[#00F0FF]/30 transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href="https://t.me/AcademicxSolution"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8CA0B3] hover:text-[#00F0FF] hover:border-[#00F0FF]/30 transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 2L2.5 10.3c-.7.3-.7 1.1 0 1.4l4.4 1.5 1.6 5.2c.2.5.8.7 1.2.4l2.3-1.8 4.5 3.3c.5.4 1.2.1 1.3-.5L22.5 3c.1-.6-.5-1.1-1-.9l-19.5 8.2"/></svg>
              </a>
              <a
                href="https://wa.me/967730087023"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8CA0B3] hover:text-[#00F0FF] hover:border-[#00F0FF]/30 transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-bold text-[#E6F7FF] mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-[#8CA0B3] hover:text-[#00F0FF] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-10 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 text-sm text-[#8CA0B3]">
            <Mail size={14} className="text-[#00F0FF]" />
            <span>academicx.solution@gmail.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#8CA0B3]">
            <Phone size={14} className="text-[#00F0FF]" />
            <span>+967 730 087 023</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#8CA0B3]">
            <MapPin size={14} className="text-[#00F0FF]" />
            <span>السعودية والخليج العربي</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-[#8CA0B3]/60">
            &copy; {new Date().getFullYear()} أكاديميكس سوليوشن - Academicx
            Solution. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
