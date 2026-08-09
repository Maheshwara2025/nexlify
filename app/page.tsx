"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [latestNews, setLatestNews] = useState<any[]>([]);
  const [flash, setFlash] = useState<{ message: string; link: string | null } | null>(null);

  useEffect(() => {
    async function load() {
      const { data: news } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);
      setLatestNews(news || []);

      const { data: flashData } = await supabase
        .from("flash_messages")
        .select("message, link")
        .eq("active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (flashData) setFlash(flashData);
    }
    load();
  }, []);

  const hubs = [
    {
      icon: "💻",
      title: "01. Digital & CSC",
      desc: "ప్రింటింగ్, సర్టిఫికేట్లు, ఆన్‌లైన్ సేవలు",
      color: "orange",
      tags: ["Xerox", "PAN", "Certificates", "Biometric", "Mini ATM", "IRCTC", "Recharge", "Asara", "CSC"],
      href: "https://wa.me/919502336495?text=CSC%20service%20kavali",
      linkLabel: "WhatsApp →",
      external: true,
    },
    {
      icon: "🌾",
      title: "02. రైతు సేవా కేంద్రం",
      desc: "పంటలు, పథకాలు, సలహాలు",
      color: "green",
      tags: ["పంటలు", "విత్తనాలు", "పథకాలు", "FPO", "Land tools", "Market rates"],
      href: "/agriculture",
      linkLabel: "Agriculture →",
      external: false,
    },
    {
      icon: "📰",
      title: "03. Local News",
      desc: "ముత్తారం & గ్రామీణ వార్తలు",
      color: "sky",
      tags: ["Local news", "Announcements", "Photos", "Updates"],
      href: "/news",
      linkLabel: "All news →",
      external: false,
    },
    {
      icon: "🎓",
      title: "04. Education",
      desc: "విద్య, ఫలితాలు, స్కాలర్‌షిప్‌లు",
      color: "violet",
      tags: ["Results", "Scholarships", "Applications", "Certificates", "Online forms"],
      href: "https://wa.me/919502336495?text=Education%20service",
      linkLabel: "WhatsApp →",
      external: true,
    },
    {
      icon: "💼",
      title: "05. Business & Web",
      desc: "Udyam, GST, digital business help",
      color: "blue",
      tags: ["Udyam", "GST", "Banking", "Licenses", "Online presence"],
      href: "/business",
      linkLabel: "Business →",
      external: false,
    },
    {
      icon: "🛠️",
      title: "06. Digital Tools",
      desc: "Free calculators & converters",
      color: "rose",
      tags: ["Interest", "Land", "BMI", "Age", "Notes", "Scientific"],
      href: "/tools",
      linkLabel: "Open Tools →",
      external: false,
    },
  ];

  const colorMap: Record<string, string> = {
    orange: "bg-orange-100 text-orange-600 border-orange-100",
    green: "bg-green-100 text-green-600 border-green-100",
    sky: "bg-sky-100 text-sky-600 border-sky-100",
    violet: "bg-violet-100 text-violet-600 border-violet-100",
    blue: "bg-blue-100 text-blue-600 border-blue-100",
    rose: "bg-rose-100 text-rose-600 border-rose-100",
  };

  const tagMap: Record<string, string> = {
    orange: "bg-orange-50 text-orange-700",
    green: "bg-green-50 text-green-700",
    sky: "bg-sky-50 text-sky-700",
    violet: "bg-violet-50 text-violet-700",
    blue: "bg-blue-50 text-blue-700",
    rose: "bg-rose-50 text-rose-700",
  };

  const linkMap: Record<string, string> = {
    orange: "text-orange-600",
    green: "text-green-600",
    sky: "text-sky-600",
    violet: "text-violet-600",
    blue: "text-blue-600",
    rose: "text-rose-600",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-orange-600 text-white text-center text-xs sm:text-sm py-2 px-3">
        A unit of A.S.V Enterprises | Mutharam Digital Services
      </div>

      {flash && (
        <div className="bg-slate-900 text-white text-sm">
          <div className="max-w-6xl mx-auto px-3 py-2.5 flex items-center justify-center gap-2 text-center">
            <span className="bg-red-500 text-[10px] font-black px-1.5 py-0.5 rounded shrink-0">LIVE</span>
            {flash.link ? (
              <a href={flash.link} target="_blank" className="hover:underline font-medium leading-snug">
                {flash.message}
              </a>
            ) : (
              <span className="font-medium leading-snug">{flash.message}</span>
            )}
          </div>
        </div>
      )}

      <header className="bg-white/95 backdrop-blur sticky top-0 z-50 border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
              N
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Nexlify Nucleus</h1>
              <p className="text-[11px] text-orange-600 font-medium">Digital Services Portal</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-4 text-sm font-semibold text-slate-700">
            <Link href="/" className="text-orange-600">Home</Link>
            <a href="#services" className="hover:text-orange-500">Services</a>
            <Link href="/tools" className="hover:text-orange-500">Tools</Link>
            <Link href="/agriculture" className="hover:text-orange-500">Agriculture</Link>
            <Link href="/business" className="hover:text-orange-500">Business</Link>
            <Link href="/links" className="hover:text-orange-500">Links</Link>
            <Link href="/gallery" className="hover:text-orange-500">Gallery</Link>
            <Link href="/news" className="hover:text-orange-500">News</Link>
            <Link href="/contact" className="hover:text-orange-500">Contact</Link>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/919502336495"
              target="_blank"
              className="hidden sm:inline-flex bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl"
            >
              WhatsApp
            </a>
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
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t px-4 py-3 space-y-1">
            {[
              ["/", "Home"],
              ["#services", "Services"],
              ["/tools", "Tools"],
              ["/agriculture", "Agriculture"],
              ["/business", "Business"],
              ["/links", "Links"],
              ["/gallery", "Gallery"],
              ["/news", "News"],
              ["/contact", "Contact"],
            ].map(([href, label]) =>
              href.startsWith("#") ? (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block py-2.5 font-medium text-slate-800">
                  {label}
                </a>
              ) : (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="block py-2.5 font-medium text-slate-800">
                  {label}
                </Link>
              )
            )}
            <a href="https://wa.me/919502336495" target="_blank" className="block py-2.5 font-medium text-green-600">
              WhatsApp
            </a>
          </div>
        )}
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-white to-green-50" />
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-green-300/25 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24 text-center">
          <span className="inline-block bg-white/80 border border-orange-100 text-orange-700 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-6 shadow-sm">
            Powered by A.S.V Enterprises · Mutharam
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight mb-5">
            మీ డిజిటల్ & వ్యవసాయ
            <br />
            <span className="text-orange-500">అవసరాలు అన్నీ ఒకే చోట</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-9">
            CSC · Printing · News · Agri support — Kasrlagadda, Mutharam
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a
              href="https://wa.me/919502336495"
              target="_blank"
              className="inline-flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-green-200 transition hover:-translate-y-0.5"
            >
              WhatsApp లో మెసేజ్
            </a>
            <a
              href="#services"
              className="inline-flex justify-center bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-bold px-8 py-3.5 rounded-2xl transition hover:-translate-y-0.5"
            >
              సేవలు చూడండి
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">మా సేవలు</h3>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">6 hubs — clear, fast, mobile-friendly</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {hubs.map((h) => (
            <div
              key={h.title}
              className={`bg-white rounded-3xl border ${colorMap[h.color].split(" ").pop()} shadow-sm p-6 flex flex-col h-full transition duration-300 hover:-translate-y-1.5 hover:shadow-xl`}
            >
              <div className={`w-14 h-14 rounded-2xl ${colorMap[h.color]} flex items-center justify-center text-2xl mb-4`}>
                {h.icon}
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">{h.title}</h4>
              <p className="text-sm text-slate-500 mb-4">{h.desc}</p>
              <div className="flex flex-wrap gap-2 mb-5 flex-1 content-start">
                {h.tags.map((t) => (
                  <span key={t} className={`text-xs font-medium px-3 py-1.5 rounded-full ${tagMap[h.color]}`}>
                    {t}
                  </span>
                ))}
              </div>
              {h.external ? (
                <a href={h.href} target="_blank" className={`font-semibold text-sm ${linkMap[h.color]} mt-auto`}>
                  {h.linkLabel}
                </a>
              ) : (
                <Link href={h.href} className={`font-semibold text-sm ${linkMap[h.color]} mt-auto`}>
                  {h.linkLabel}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/links"
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-sm"
          >
            🌐 Useful Websites →
          </Link>
        </div>
      </section>

      <section className="bg-white border-y border-slate-100 py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl sm:text-3xl font-black text-center text-slate-900 mb-10">
            ఎందుకు మమ్మల్ని ఎంచుకోవాలి?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="p-5 rounded-2xl hover:bg-slate-50 transition">
              <div className="text-5xl mb-3">⚡</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Speed work</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                WhatsApp లో documents పంపి print ready — queue తక్కువ
              </p>
            </div>
            <div className="p-5 rounded-2xl hover:bg-slate-50 transition">
              <div className="text-5xl mb-3">✅</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Local trust</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Mutharam accurate news & agri info</p>
            </div>
            <div className="p-5 rounded-2xl hover:bg-slate-50 transition">
              <div className="text-5xl mb-3">🏪</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">One-stop center</h4>
              <p className="text-sm text-slate-500 leading-relaxed">CSC + Agri + Digital + Tools — one address</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">Latest News</h3>
            <p className="text-sm text-slate-500">ముత్తారం తాజా వార్తలు</p>
          </div>
          <Link href="/news" className="text-orange-600 font-semibold text-sm">
            View all →
          </Link>
        </div>
        {latestNews.length === 0 ? (
          <p className="text-center text-slate-400 py-8">No news yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {latestNews.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition group"
              >
                {item.image_url ? (
                  <div className="h-36 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-36 bg-orange-50 flex items-center justify-center text-3xl text-orange-300 font-black">
                    N
                  </div>
                )}
                <div className="p-4">
                  <h4 className="font-bold text-slate-900 line-clamp-2 group-hover:text-orange-600 transition">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2">
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
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 sm:p-10 text-center text-white shadow-lg shadow-orange-200">
          <h3 className="text-xl sm:text-2xl font-black mb-2">🛠️ Free Digital Tools</h3>
          <p className="text-orange-100 text-sm mb-5">Interest · Land · BMI · Calculator & more</p>
          <Link
            href="/tools"
            className="inline-block bg-white text-orange-600 font-bold px-6 py-3 rounded-xl hover:scale-105 transition"
          >
            Open Tools →
          </Link>
        </div>
      </section>

      <section className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Visit / Contact</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              Near Water Tank, Kasrlagadda
              <br />
              Mutharam, Peddapalli District
              <br />
              Telangana, India — PIN 505184
            </p>
            <p className="text-slate-300 text-sm mb-1">🕘 9:00 AM – 9:00 PM (Sunday Open)</p>
            <p className="text-slate-300 text-sm mb-4">📞 9502336495</p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:9502336495" className="bg-white text-slate-900 font-semibold text-sm px-4 py-2 rounded-xl">
                Call
              </a>
              <a href="https://wa.me/919502336495" target="_blank" className="bg-green-500 font-semibold text-sm px-4 py-2 rounded-xl">
                WhatsApp
              </a>
              <a href="https://maps.app.goo.gl/2p1M4BhcWehhv8dK8" target="_blank" className="bg-slate-700 font-semibold text-sm px-4 py-2 rounded-xl">
                Maps
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <a
              href="https://maps.app.goo.gl/2p1M4BhcWehhv8dK8"
              target="_blank"
              className="block bg-slate-800 hover:bg-slate-700 rounded-2xl p-8 text-center transition border border-slate-700 hover:-translate-y-1"
            >
              <div className="text-4xl mb-2">📍</div>
              <p className="font-bold">Open in Google Maps</p>
              <p className="text-slate-400 text-sm mt-1">Kasrlagadda, Mutharam</p>
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white font-semibold">Nexlify Nucleus</p>
          <p className="text-sm mt-1">A unit of A.S.V Enterprises · Mutharam</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/tools" className="hover:text-white">Tools</Link>
            <Link href="/links" className="hover:text-white">Links</Link>
            <Link href="/news" className="hover:text-white">News</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/admin/login" className="hover:text-slate-300">Admin</Link>
          </div>
          <p className="text-xs mt-6 text-slate-600">© 2026 Nexlify Nucleus</p>
        </div>
      </footer>

      <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-3">
        <a href="https://wa.me/919502336495" target="_blank" className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-300 flex items-center justify-center text-2xl hover:scale-110 transition">
          💬
        </a>
        <a href="tel:9502336495" className="w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-300 flex items-center justify-center text-2xl hover:scale-110 transition">
          📞
        </a>
        <a href="https://maps.app.goo.gl/2p1M4BhcWehhv8dK8" target="_blank" className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 text-white shadow-lg flex items-center justify-center text-lg hover:scale-110 transition">
          📍
        </a>
      </div>
    </div>
  );
}