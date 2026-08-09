"use client";

import { useState } from "react";
import Link from "next/link";

const topics = [
  { icon: "🌱", title: "పంటల సమాచారం", desc: "Season crops, tips, care", color: "green" },
  { icon: "🧪", title: "ఎరువులు & విత్తనాలు", desc: "Fertilizer & seed guidance", color: "emerald" },
  { icon: "📋", title: "ప్రభుత్వ పథకాలు", desc: "Rythu Bandhu, insurance, subsidies", color: "lime" },
  { icon: "🏪", title: "మార్కెట్ రేట్లు", desc: "Local mandi / price updates", color: "teal" },
  { icon: "🤝", title: "FPO Updates", desc: "Farmer producer org news", color: "green" },
  { icon: "🛠️", title: "Land Tools", desc: "Cents, guntas, acres converter", color: "orange", href: "/tools/land" },
];

const colorMap: Record<string, string> = {
  green: "bg-green-100 text-green-700",
  emerald: "bg-emerald-100 text-emerald-700",
  lime: "bg-lime-100 text-lime-700",
  teal: "bg-teal-100 text-teal-700",
  orange: "bg-orange-100 text-orange-700",
};

export default function AgriculturePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-green-700 text-white text-center text-xs sm:text-sm py-2">
        రైతు సేవా కేంద్రం · A unit of A.S.V Enterprises · Mutharam
      </div>

      <header className="bg-white/95 backdrop-blur sticky top-0 z-50 border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
              N
            </div>
            <div>
              <p className="font-bold text-slate-900 leading-tight">Nexlify Nucleus</p>
              <p className="text-[11px] text-green-700 font-medium">Agriculture</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-4 text-sm font-semibold text-slate-700">
            <Link href="/" className="hover:text-green-600">Home</Link>
            <Link href="/tools" className="hover:text-green-600">Tools</Link>
            <Link href="/agriculture" className="text-green-700">Agriculture</Link>
            <Link href="/business" className="hover:text-green-600">Business</Link>
            <Link href="/news" className="hover:text-green-600">News</Link>
            <Link href="/contact" className="hover:text-green-600">Contact</Link>
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
            <Link href="/tools" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">Tools</Link>
            <Link href="/agriculture" onClick={() => setMenuOpen(false)} className="block py-2 font-medium text-green-700">Agriculture</Link>
            <Link href="/business" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">Business</Link>
            <Link href="/news" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">News</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">Contact</Link>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-white to-emerald-50" />
        <div className="relative max-w-6xl mx-auto px-4 py-12 sm:py-16 text-center">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
            🌾 Agri Corner
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
            రైతు సేవా కేంద్రం
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
            పంటలు · పథకాలు · మార్కెట్ · FPO — Mutharam local support
          </p>
          <a
            href="https://wa.me/919502336495?text=Agriculture%20help%20kavali"
            target="_blank"
            className="inline-flex mt-6 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-green-200"
          >
            WhatsApp లో సలహా అడగండి
          </a>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map((t) => {
            const inner = (
              <>
                <div className={`w-14 h-14 rounded-2xl ${colorMap[t.color]} flex items-center justify-center text-2xl mb-4`}>
                  {t.icon}
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">{t.title}</h2>
                <p className="text-sm text-slate-500 flex-1">{t.desc}</p>
                <span className="text-green-700 font-semibold text-sm mt-4">
                  {t.href ? "Open tool →" : "WhatsApp →"}
                </span>
              </>
            );

            if (t.href) {
              return (
                <Link
                  key={t.title}
                  href={t.href}
                  className="bg-white rounded-3xl border border-green-100 shadow-sm p-6 flex flex-col transition hover:-translate-y-1.5 hover:shadow-xl"
                >
                  {inner}
                </Link>
              );
            }

            return (
              <a
                key={t.title}
                href={`https://wa.me/919502336495?text=${encodeURIComponent(t.title + " gurinchi")}`}
                target="_blank"
                className="bg-white rounded-3xl border border-green-100 shadow-sm p-6 flex flex-col transition hover:-translate-y-1.5 hover:shadow-xl"
              >
                {inner}
              </a>
            );
          })}
        </div>

        <div className="mt-12 bg-green-800 text-white rounded-3xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Need personal guidance?</h3>
          <p className="text-green-100 text-sm mb-4">Visit center or message on WhatsApp</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/919502336495" target="_blank" className="bg-white text-green-800 font-bold px-5 py-2.5 rounded-xl text-sm">
              WhatsApp
            </a>
            <a href="tel:9502336495" className="bg-green-600 font-bold px-5 py-2.5 rounded-xl text-sm">
              Call
            </a>
            <Link href="/tools" className="bg-green-700 font-bold px-5 py-2.5 rounded-xl text-sm">
              Land Tools
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-slate-500 hover:text-green-700 text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
{/* Page navigation */}
<div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl border p-4 max-w-6xl mx-auto px-4">
  <Link href="/PREV" className="text-sm font-semibold text-slate-600 hover:text-orange-600">
    ← Previous: NAME
  </Link>
  <Link href="/" className="text-sm font-bold text-orange-600">
    🏠 Home
  </Link>
  <Link href="/NEXT" className="text-sm font-semibold text-slate-600 hover:text-orange-600">
    Next: NAME →
  </Link>
</div>
      <footer className="bg-slate-950 text-slate-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white font-semibold">Nexlify Nucleus</p>
          <p className="text-sm mt-1">A unit of A.S.V Enterprises · Mutharam</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/tools" className="hover:text-white">Tools</Link>
            <Link href="/news" className="hover:text-white">News</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
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