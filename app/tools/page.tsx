"use client";

import { useState } from "react";
import Link from "next/link";

const tools = [
  { href: "/tools/interest", icon: "💰", title: "Interest Calculator", desc: "Simple & compound interest", color: "orange" },
  { href: "/tools/age", icon: "🎂", title: "Age Calculator", desc: "Exact age in years, months, days", color: "violet" },
  { href: "/tools/date", icon: "📅", title: "Date Duration", desc: "Days between two dates", color: "sky" },
  { href: "/tools/land", icon: "🌾", title: "Land Converter", desc: "Cents, guntas, acres, hectares", color: "green" },
  { href: "/tools/length", icon: "📏", title: "Length Converter", desc: "cm, m, km, feet, yards", color: "blue" },
  { href: "/tools/notes", icon: "💵", title: "Note Counter", desc: "₹10, 20, 50, 100, 200, 500", color: "emerald" },
  { href: "/tools/bmi", icon: "⚖️", title: "BMI Calculator", desc: "Body mass index", color: "rose" },
  { href: "/tools/calculator", icon: "🔢", title: "Basic Calculator", desc: "Quick everyday math", color: "slate" },
  { href: "/tools/scientific", icon: "🧪", title: "Scientific Calculator", desc: "Sin, cos, log, power", color: "indigo" },
];

const colorMap: Record<string, string> = {
  orange: "bg-orange-100 text-orange-600",
  violet: "bg-violet-100 text-violet-600",
  sky: "bg-sky-100 text-sky-600",
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  emerald: "bg-emerald-100 text-emerald-600",
  rose: "bg-rose-100 text-rose-600",
  slate: "bg-slate-100 text-slate-600",
  indigo: "bg-indigo-100 text-indigo-600",
};

export default function ToolsPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-orange-600 text-white text-center text-xs sm:text-sm py-2">
        A unit of A.S.V Enterprises | Mutharam Digital Services
      </div>

      <header className="bg-white/95 backdrop-blur sticky top-0 z-50 border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
              N
            </div>
            <div>
              <p className="font-bold text-slate-900 leading-tight">Nexlify Nucleus</p>
              <p className="text-[11px] text-orange-600 font-medium">Digital Tools</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-4 text-sm font-semibold text-slate-700">
            <Link href="/" className="hover:text-orange-500">Home</Link>
            <Link href="/tools" className="text-orange-600">Tools</Link>
            <Link href="/agriculture" className="hover:text-orange-500">Agriculture</Link>
            <Link href="/business" className="hover:text-orange-500">Business</Link>
            <Link href="/news" className="hover:text-orange-500">News</Link>
            <Link href="/contact" className="hover:text-orange-500">Contact</Link>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 rounded-xl hover:bg-slate-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t px-4 py-3 space-y-1">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">Home</Link>
            <Link href="/tools" onClick={() => setMenuOpen(false)} className="block py-2 font-medium text-orange-600">Tools</Link>
            <Link href="/agriculture" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">Agriculture</Link>
            <Link href="/business" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">Business</Link>
            <Link href="/news" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">News</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">Contact</Link>
          </div>
        )}
      </header>

      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">🛠️ Digital Tools</h1>
          <p className="text-slate-500 mt-2">Free calculators & converters — mobile friendly</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col transition duration-300 hover:-translate-y-1.5 hover:shadow-xl group"
            >
              <div className={`w-14 h-14 rounded-2xl ${colorMap[t.color]} flex items-center justify-center text-2xl mb-4`}>
                {t.icon}
              </div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition">
                {t.title}
              </h2>
              <p className="text-sm text-slate-500 mt-1 flex-1">{t.desc}</p>
              <span className="text-orange-600 font-semibold text-sm mt-4">Open →</span>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-slate-500 hover:text-orange-600 text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>

      <footer className="bg-slate-950 text-slate-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white font-semibold">Nexlify Nucleus</p>
          <p className="text-sm mt-1">A unit of A.S.V Enterprises · Mutharam</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/news" className="hover:text-white">News</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/admin/login" className="hover:text-slate-300">Admin</Link>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-3">
        <a href="https://wa.me/919502336495" target="_blank" className="w-14 h-14 rounded-full bg-green-500 text-white shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition">💬</a>
        <a href="tel:9502336495" className="w-14 h-14 rounded-full bg-orange-500 text-white shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition">📞</a>
      </div>
    </div>
  );
}