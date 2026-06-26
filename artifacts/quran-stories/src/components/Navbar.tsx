import { useState } from "react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/stories", label: "القصص" },
  { href: "/prophets", label: "الأنبياء" },
  { href: "/about", label: "عن الموقع" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="bg-gradient-green shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold text-white tracking-wide group-hover:text-gold transition-colors">
            قصص القرآن
          </span>
          <span className="text-gold text-2xl">✦</span>
        </Link>

        <div className="hidden md:flex gap-8 text-white font-semibold text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-gold transition-colors duration-200 ${
                location === link.href ? "text-gold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="قائمة التنقل"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-primary/95 px-4 pb-4 flex flex-col gap-3 text-white font-semibold text-base border-t border-white/20">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 hover:text-gold transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
