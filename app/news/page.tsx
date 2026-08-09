"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function NewsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });
      setNews(data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-sky-700 text-white text-center text-xs sm:text-sm py-2">
        Local News · A unit of A.S.V Enterprises · Mutharam
      </div>

      <header className="bg-white/95 backdrop-blur sticky top-0 z-50 border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-700 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
              N
            </div>
            <div>
              <p className="font-bold text-slate-900 leading-tight">Nexlify Nucleus</p>
              <p className="text-[11px] text-sky-700 font-medium">News</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-4 text-sm font-semibold text-slate-700">
            <Link href="/" className="hover:text-sky-600">Home</Link>
            <Link href="/tools" className="hover:text-sky-600">Tools</Link>
            <Link href="/agriculture" className="hover:text-sky-600">Agriculture</Link>
            <Link href="/business" className="hover:text-sky-600">Business</Link>
            <Link href="/gallery" className="hover:text-sky-600">Gallery</Link>
            <Link href="/news" className="text-sky-700">News</Link>
            <Link href="/contact" className="hover:text-sky-600">Contact</Link>
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
            <Link href="/business" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">Business</Link>
            <Link href="/gallery" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">Gallery</Link>
            <Link href="/news" onClick={() => setMenuOpen(false)} className="block py-2 font-medium text-sky-700">News</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">Contact</Link>
          </div>
        )}
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-blue-50" />
        <div className="relative max-w-6xl mx-auto px-4 py-12 sm:py-14 text-center">
          <span className="inline-block bg-sky-100 text-sky-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
            📰 Local Bulletin
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">News</h1>
          <p className="text-slate-600 text-sm sm:text-base">ముత్తారం & గ్రామీణ తాజా వార్తలు</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-10">
        {loading ? (
          <p className="text-center text-slate-400 py-16">Loading news...</p>
        ) : news.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border">
            <p className="text-4xl mb-3">📰</p>
            <p className="text-slate-500">No news yet</p>
            <Link href="/admin/login" className="text-sky-600 text-sm font-medium mt-2 inline-block">
              Admin login →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {news.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition group flex flex-col"
              >
                {item.image_url ? (
                  <div className="h-44 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-44 bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center text-4xl text-sky-300 font-black">
                    N
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="font-bold text-slate-900 line-clamp-2 group-hover:text-sky-700 transition text-lg leading-snug">
                    {item.title}
                  </h2>
                  {item.content && (
                    <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                      {item.content.replace(/<[^>]+>/g, "").slice(0, 100)}
                    </p>
                  )}
                  <p className="text-xs text-slate-400 mt-auto pt-4">
                    {new Date(item.created_at).toLocaleDateString("te-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Prev / Home / Next */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl border p-4">
          <Link href="/gallery" className="text-sm font-semibold text-slate-600 hover:text-sky-700">
            ← Previous: Gallery
          </Link>
          <Link href="/" className="text-sm font-bold text-orange-600">
            🏠 Home
          </Link>
          <Link href="/contact" className="text-sm font-semibold text-slate-600 hover:text-sky-700">
            Next: Contact →
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