"use client";

import { useState } from "react";
import Link from "next/link";

const services = [
  { icon: "🏢", title: "Udyam Registration", desc: "MSME registration help" },
  { icon: "🧾", title: "GST Support", desc: "GST info & applications" },
  { icon: "🆔", title: "PAN / TAN", desc: "PAN card & related forms" },
  { icon: "🏦", title: "Banking Help", desc: "Account, KYC, basic support" },
  { icon: "📜", title: "Licenses", desc: "Trade / local license guidance" },
  { icon: "🌐", title: "Digital Presence", desc: "Online listing & basic web help" },
];

export default function BusinessPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-blue-700 text-white text-center text-xs sm:text-sm py-2">
        Business Services · A unit of A.S.V Enterprises · Mutharam
      </div>

      <header className="bg-white/95 backdrop-blur sticky top-0 z-50 border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
              N
            </div>
            <div>
              <p className="font-bold text-slate-900 leading-tight">Nexlify Nucleus</p>
              <p className="text-[11px] text-blue-700 font-medium">Business</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-4 text-sm font-semibold text-slate-700">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/tools" className="hover:text-blue-600">Tools</Link>
            <Link href="/agriculture" className="hover:text-blue-600">Agriculture</Link>
            <Link href="/business" className="text-blue-700">Business</Link>
            <Link href="/gallery" className="hover:text-blue-600">Gallery</Link>
            <Link href="/news" className="hover:text-blue-600">News</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
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
            <Link href="/agriculture" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">Agriculture</Link>
            <Link href="/business" onClick={() => setMenuOpen(false)} className="block py-2 font-medium text-blue-700">Business</Link>
            <Link href="/gallery" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">Gallery</Link>
            <Link href="/news" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">News</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">Contact</Link>
          </div>
        )}
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-sky-50" />
        <div className="relative max-w-6xl mx-auto px-4 py-12 sm:py-16 text-center">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
            💼 Business Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">Business Services</h1>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
            Udyam · GST · PAN · Licenses — one center support
          </p>
          <a
            href="https://wa.me/919502336495?text=Business%20service%20kavali"
            target="_blank"
            className="inline-flex mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-blue-200"
          >
            WhatsApp లో enquire
          </a>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <a
              key={s.title}
              href={`https://wa.me/919502336495?text=${encodeURIComponent(s.title + " gurinchi")}`}
              target="_blank"
              className="bg-white rounded-3xl border border-blue-100 shadow-sm p-6 flex flex-col transition hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl mb-4">
                {s.icon}
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">{s.title}</h2>
              <p className="text-sm text-slate-500 flex-1">{s.desc}</p>
              <span className="text-blue-700 font-semibold text-sm mt-4">WhatsApp →</span>
            </a>
          ))}
        </div>

        {/* Page navigation */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl border p-4">
          <Link href="/agriculture" className="text-sm font-semibold text-slate-600 hover:text-blue-700">
            ← Previous: Agriculture
          </Link>
          <Link href="/" className="text-sm font-bold text-orange-600 hover:underline">
            🏠 Home
          </Link>
          <Link href="/gallery" className="text-sm font-semibold text-slate-600 hover:text-blue-700">
            Next: Gallery →
          </Link>
        </div>
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