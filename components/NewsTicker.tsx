"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type NewsItem = {
  id: string;
  title: string;
};

export default function NewsTicker() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("news")
        .select("id, title")
        .order("created_at", { ascending: false })
        .limit(10);
      if (data) setNews(data);
    }
    load();
  }, []);

  if (news.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 shadow-2xl">
      <div className="flex items-center max-w-full">
        <div className="bg-yellow-400 text-black text-xs sm:text-sm font-black px-3 sm:px-5 py-2.5 flex-shrink-0 uppercase tracking-wider shadow-inner">
          🔴 LIVE
        </div>
        <div className="overflow-hidden flex-1 py-2.5">
          <div className="animate-marquee whitespace-nowrap flex gap-10 sm:gap-12">
            {news.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="text-white text-xs sm:text-base font-bold hover:text-yellow-300 transition inline-block"
              >
                ★ {item.title}
              </Link>
            ))}
            {news.map((item) => (
              <Link
                key={`dup-${item.id}`}
                href={`/news/${item.id}`}
                className="text-white text-xs sm:text-base font-bold hover:text-yellow-300 transition inline-block"
              >
                ★ {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
