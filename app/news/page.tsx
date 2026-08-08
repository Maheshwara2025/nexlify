"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type NewsItem = {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  location?: string;
  category?: string;
  created_at: string;
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      const { data } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });
      setNews(data || []);
      setLoading(false);
    }
    fetchNews();
  }, []);

  const featured = news[0];
  const rest = news.slice(1);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-orange-600 text-white text-center text-sm py-2">
        A unit of A.S.V Enterprises | Mutharam Digital Services
      </div>

      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">N</div>
            <span className="font-bold text-gray-900 text-lg">Nexlify Nucleus</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-semibold text-gray-700">
            <Link href="/" className="hover:text-orange-500">Home</Link>
            <Link href="/news" className="text-orange-500">News</Link>
            <Link href="/contact" className="hover:text-orange-500">Contact</Link>
          </nav>
          <a href="https://wa.me/919502336495" target="_blank" className="bg-green-500 text-white text-sm px-4 py-2 rounded-lg">WhatsApp</a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-black text-gray-900 mb-8 border-b-4 border-orange-500 inline-block pb-1">
          తాజా వార్తలు
        </h1>

        {loading ? (
          <p className="text-center text-gray-500 py-20">Loading...</p>
        ) : news.length === 0 ? (
          <p className="text-center text-gray-500 py-20">ఇంకా వార్తలు లేవు</p>
        ) : (
          <>
            {/* FEATURED NEWS - Big */}
            {featured && (
              <Link href={`/news/${featured.id}`} className="block mb-10 group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-md border grid md:grid-cols-2">
                  {featured.image_url ? (
                    <div className="h-64 md:h-80 overflow-hidden">
                      <img
                        src={featured.image_url}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-64 md:h-80 bg-orange-100 flex items-center justify-center text-orange-300 text-6xl font-black">
                      N
                    </div>
                  )}
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <span className="text-xs font-bold text-orange-600 uppercase mb-2">
                      {featured.category || "General"} • Featured
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight group-hover:text-orange-600 transition mb-3">
                      {featured.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {featured.content}
                    </p>
                    <span className="text-orange-600 font-bold text-sm">
                      Continue reading →
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* REST OF NEWS - Grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-lg transition group"
                  >
                    {item.image_url ? (
                      <div className="h-44 overflow-hidden">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-44 bg-gray-100 flex items-center justify-center text-gray-300 text-4xl font-black">
                        N
                      </div>
                    )}
                    <div className="p-4">
                      <span className="text-xs text-orange-600 font-semibold">
                        {item.category || "General"}
                      </span>
                      <h3 className="font-bold text-gray-900 mt-1 leading-snug group-hover:text-orange-600 transition line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                        {item.content}
                      </p>
                      <p className="text-orange-600 text-xs font-semibold mt-3">
                        Read more →
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-medium">Nexlify Nucleus</p>
          <p className="text-gray-400 text-sm mt-1">A unit of A.S.V Enterprises • Mutharam</p>
        </div>
      </footer>
    </div>
  );
}