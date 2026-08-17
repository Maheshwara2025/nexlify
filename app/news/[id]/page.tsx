"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type NewsItem = {
  id: number;
  title: string;
  content: string;
  sub_headline_1?: string;
  sub_headline_2?: string;
  sub_headline_3?: string;
  sub_headline_4?: string;
  sub_headline_5?: string;
  sub_headline_6?: string;
  image_url?: string;
  video_url?: string;
  location?: string;
  category?: string;
  created_at: string;
};

export default function NewsDetailPage() {
  const params = useParams();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [related, setRelated] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from("news")
        .select("*")
        .eq("id", params.id)
        .single();

      setNews(data);

      const { data: all } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      setRelated((all || []).filter((n) => n.id !== Number(params.id)).slice(0, 4));
      setLoading(false);
    }
    if (params.id) fetchData();
  }, [params.id]);

  function getYouTubeId(url: string) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
    return match ? match[1] : null;
  }

  function getShareUrl() {
    if (typeof window !== "undefined") return window.location.href;
    return "";
  }

  function shareWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${news?.title}\n\n${getShareUrl()}`)}`, "_blank");
  }
  function shareFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`, "_blank");
  }
  function shareTwitter() {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(news?.title || "")}&url=${encodeURIComponent(getShareUrl())}`, "_blank");
  }
  function copyLink() {
    navigator.clipboard.writeText(getShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  }

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>News not found</p>
          <Link href="/news" className="text-orange-500">← Back</Link>
        </div>
      </div>
    );
  }

  const subHeadlines = [
    news.sub_headline_1, news.sub_headline_2, news.sub_headline_3,
    news.sub_headline_4, news.sub_headline_5, news.sub_headline_6,
  ].filter(Boolean);

  const youtubeId = news.video_url ? getYouTubeId(news.video_url) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-600 text-white text-center text-sm py-2">
        A unit of A.S.V Enterprises | Mutharam Digital Services
      </div>

      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">N</div>
            <span className="font-bold text-gray-900">Nexlify Nucleus</span>
          </Link>
          <Link href="/news" className="text-sm text-gray-500 hover:text-orange-500">← All News</Link>
        </div>
      </header>

      {/* Main + Sidebar Layout */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">

        {/* LEFT - Article (2/3 width) */}
        <article className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
              {news.category || "General"}
            </span>
            {news.location && <span className="text-sm text-gray-500">📍 {news.location}</span>}
            <span className="text-sm text-gray-400">
              {new Date(news.created_at).toLocaleDateString("te-IN", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight mb-5">
            {news.title}
          </h1>

          {/* Share */}
          <div className="flex flex-wrap gap-2 mb-6 pb-5 border-b">
            <button onClick={shareWhatsApp} className="bg-green-500 text-white text-xs font-medium px-3 py-1.5 rounded-full">WhatsApp</button>
            <button onClick={shareFacebook} className="bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full">Facebook</button>
            <button onClick={shareTwitter} className="bg-black text-white text-xs font-medium px-3 py-1.5 rounded-full">X</button>
            <button onClick={copyLink} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full border">
              {copied ? "✓ Copied" : "🔗 Copy"}
            </button>
          </div>

          {subHeadlines.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
              <p className="text-xs font-bold text-orange-600 uppercase mb-2">Key Points</p>
              <ul className="space-y-1.5">
                {subHeadlines.map((sub, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-800 font-medium">
                    <span className="text-orange-500 font-bold">{i + 1}.</span>
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {news.image_url && (
            <img src={news.image_url} alt={news.title} className="w-full rounded-xl shadow mb-6 max-h-[420px] object-cover" />
          )}

          {news.video_url && (
            <div className="mb-6 rounded-xl overflow-hidden shadow">
              {youtubeId ? (
                <div className="aspect-video">
                  <iframe src={`https://www.youtube.com/embed/${youtubeId}`} className="w-full h-full" allowFullScreen />
                </div>
              ) : (
                <video src={news.video_url} controls className="w-full" />
              )}
            </div>
          )}

          <div className="text-gray-800 text-base md:text-lg leading-8 whitespace-pre-line">
            {news.content}
          </div>
        </article>

        {/* RIGHT SIDEBAR (1/3 width) */}
        <aside className="space-y-6">

          {/* Company Card */}
          <div className="bg-white rounded-2xl shadow-sm border p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">N</div>
              <div>
                <p className="font-bold text-gray-900">Nexlify Nucleus</p>
                <p className="text-xs text-gray-500">Digital Services</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              A unit of <strong>A.S.V Enterprises</strong>, Mutharam.
              CSC, PAN, Agriculture & Digital services.
            </p>
            <a href="https://wa.me/919502336495" target="_blank" className="mt-3 inline-block bg-green-500 text-white text-xs font-medium px-4 py-2 rounded-lg">
              WhatsApp Us
            </a>
          </div>

          {/* Date / Time */}
          <div className="bg-white rounded-2xl shadow-sm border p-5">
            <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Published</p>
            <p className="font-bold text-gray-900">
              {new Date(news.created_at).toLocaleDateString("te-IN", {
                weekday: "long", day: "numeric", month: "long", year: "numeric",
              })}
            </p>
            {news.location && (
              <p className="text-sm text-gray-500 mt-1">📍 {news.location}</p>
            )}
          </div>

          {/* Related News */}
          <div className="bg-white rounded-2xl shadow-sm border p-5">
            <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">Related News</h3>
            {related.length === 0 ? (
              <p className="text-sm text-gray-400">No other news</p>
            ) : (
              <div className="space-y-4">
                {related.map((item) => (
                  <Link key={item.id} href={`/news/${item.id}`} className="flex gap-3 group">
                    {item.image_url ? (
                      <img src={item.image_url} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-orange-100 flex items-center justify-center text-orange-400 font-bold flex-shrink-0">N</div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 leading-snug line-clamp-2">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(item.created_at).toLocaleDateString("te-IN")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 mb-3">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link href="/" className="block text-orange-700 hover:underline">🏠 Home</Link>
              <Link href="/news" className="block text-orange-700 hover:underline">📰 All News</Link>
              <Link href="/contact" className="block text-orange-700 hover:underline">📞 Contact</Link>
              <a href="https://wa.me/919502336495" target="_blank" className="block text-orange-700 hover:underline">💬 WhatsApp</a>
            </div>
          </div>
        </aside>
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-medium">Nexlify Nucleus</p>
          <p className="text-gray-400 text-sm mt-1">A unit of A.S.V Enterprises • Mutharam</p>
        </div>
      </footer>
    </div>
  );
}