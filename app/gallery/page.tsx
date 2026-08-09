"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function GalleryPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });
      setPhotos(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const categories = ["All", ...Array.from(new Set(photos.map((p) => p.category).filter(Boolean)))];
  const filtered = filter === "All" ? photos : photos.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-orange-600 text-white text-center text-xs sm:text-sm py-2">
        Gallery · A unit of A.S.V Enterprises · Mutharam
      </div>

      <header className="bg-white/95 backdrop-blur sticky top-0 z-50 border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
              N
            </div>
            <div>
              <p className="font-bold text-slate-900 leading-tight">Nexlify Nucleus</p>
              <p className="text-[11px] text-orange-600 font-medium">Gallery</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-4 text-sm font-semibold text-slate-700">
            <Link href="/" className="hover:text-orange-500">Home</Link>
            <Link href="/tools" className="hover:text-orange-500">Tools</Link>
            <Link href="/agriculture" className="hover:text-orange-500">Agriculture</Link>
            <Link href="/business" className="hover:text-orange-500">Business</Link>
            <Link href="/gallery" className="text-orange-600">Gallery</Link>
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
            <Link href="/gallery" onClick={() => setMenuOpen(false)} className="block py-2 font-medium text-orange-600">Gallery</Link>
            <Link href="/news" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">News</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">Contact</Link>
          </div>
        )}
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-white to-rose-50" />
        <div className="relative max-w-6xl mx-auto px-4 py-12 sm:py-14 text-center">
          <span className="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
            📷 Photo Gallery
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">Gallery</h1>
          <p className="text-slate-600 text-sm sm:text-base">Mutharam events · programs · festivals</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-12">
        {/* Filters */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`text-sm font-semibold px-4 py-1.5 rounded-full transition ${
                  filter === c ? "bg-orange-500 text-white" : "bg-white text-slate-600 border"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <p className="text-center text-slate-400 py-16">Loading photos...</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border">
            <p className="text-4xl mb-3">📷</p>
            <p className="text-slate-500 mb-2">No photos yet</p>
            <p className="text-sm text-slate-400">Admin లో upload చేస్తే ఇక్కడ కనిపిస్తాయి</p>
            <Link href="/admin" className="text-orange-600 text-sm font-medium mt-3 inline-block">
              Admin →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <article
                key={p.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition group"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-5">
                  {p.category && (
                    <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                      {p.category}
                    </span>
                  )}
                  <h2 className="font-bold text-slate-900 mt-2 text-lg leading-snug">{p.title}</h2>
                  {p.description && (
                    <p className="text-sm text-slate-500 mt-1 line-clamp-3">{p.description}</p>
                  )}
                  <p className="text-xs text-slate-400 mt-3">
                    {new Date(p.created_at).toLocaleDateString("te-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 bg-slate-900 text-white rounded-3xl p-8 text-center">
          <h3 className="text-lg font-bold mb-2">Share event photos?</h3>
          <p className="text-slate-400 text-sm mb-4">WhatsApp లో పంపండి — gallery లో add చేస్తాం</p>
          <a
            href="https://wa.me/919502336495?text=Gallery%20photo%20pampali"
            target="_blank"
            className="inline-block bg-green-500 hover:bg-green-600 font-bold px-6 py-3 rounded-xl text-sm"
          >
            💬 Send on WhatsApp
          </a>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl border p-4">
          <Link href="/business" className="text-sm font-semibold text-slate-600 hover:text-orange-600">
            ← Business
          </Link>
          <Link href="/" className="text-sm font-bold text-orange-600">
            🏠 Home
          </Link>
          <Link href="/news" className="text-sm font-semibold text-slate-600 hover:text-orange-600">
            News →
          </Link>
        </div>
      </div>

      <footer className="bg-slate-950 text-slate-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white font-semibold">Nexlify Nucleus</p>
          <p className="text-sm mt-1">A unit of A.S.V Enterprises · Mutharam</p>
        </div>
      </footer>

      <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-3">
        <a href="https://wa.me/919502336495" target="_blank" className="w-14 h-14 rounded-full bg-green-500 text-white shadow-lg flex items-center justify-center text-2xl">💬</a>
        <a href="tel:9502336495" className="w-14 h-14 rounded-full bg-orange-500 text-white shadow-lg flex items-center justify-center text-2xl">📞</a>
      </div>
    </div>
  );
}