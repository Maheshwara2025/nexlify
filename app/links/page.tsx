"use client";

import { useState } from "react";
import Link from "next/link";

const sections = [
  {
    title: "Citizen & CSC Services",
    color: "orange",
    items: [
      { name: "CSC Portal", url: "https://www.csc.gov.in/", icon: "💻" },
      { name: "MeeSeva TS", url: "https://ts.meeseva.telangana.gov.in/", icon: "🏛️" },
      { name: "ePDS Telangana", url: "https://epds.telangana.gov.in/", icon: "🛒" },
      { name: "ePass Telangana", url: "https://telanganaepass.cgg.gov.in/", icon: "🎓" },
      { name: "PAN (NSDL)", url: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html", icon: "🆔" },
      { name: "Income Tax", url: "https://www.incometax.gov.in/", icon: "📄" },
      { name: "UMANG", url: "https://web.umang.gov.in/", icon: "📱" },
      { name: "Aadhaar UIDAI", url: "https://uidai.gov.in/", icon: "🪪" },
      { name: "DigiLocker", url: "https://www.digilocker.gov.in/", icon: "📁" },
      { name: "Voter Services", url: "https://voters.eci.gov.in/", icon: "🗳️" },
    ],
  },
  {
    title: "Land & Registration",
    color: "green",
    items: [
      { name: "Dharani", url: "https://dharani.telangana.gov.in/", icon: "🗺️" },
      { name: "Registration Dept", url: "https://registration.telangana.gov.in/", icon: "📜" },
      { name: "TS Bhu Bharati", url: "https://bhubharati.telangana.gov.in/", icon: "🏡" },
    ],
  },
  {
    title: "Business / MSME",
    color: "blue",
    items: [
      { name: "Udyam Registration", url: "https://udyamregistration.gov.in/", icon: "🏢" },
      { name: "GST Portal", url: "https://www.gst.gov.in/", icon: "🧾" },
      { name: "NABARD", url: "https://www.nabard.org/", icon: "🌾" },
      { name: "MSME Ministry", url: "https://msme.gov.in/", icon: "💼" },
      { name: "GEM Portal", url: "https://gem.gov.in/", icon: "🛒" },
      { name: "PF / EPFO", url: "https://www.epfindia.gov.in/", icon: "🏦" },
    ],
  },
  {
    title: "Education",
    color: "violet",
    items: [
      { name: "TS Intermediate", url: "https://www.bie.tg.nic.in/", icon: "📘" },
      { name: "DoST Admissions", url: "https://dost.cgg.gov.in/", icon: "🎓" },
      { name: "ePass Scholarships", url: "https://telanganaepass.cgg.gov.in/", icon: "💰" },
      { name: "NTA Exams", url: "https://nta.ac.in/", icon: "📝" },
      { name: "Manabadi", url: "https://www.manabadi.co.in/", icon: "📊" },
      { name: "Results (example)", url: "https://results.telangana.gov.in/", icon: "📋" },
    ],
  },
  {
    title: "Newspapers",
    color: "sky",
    items: [
      { name: "Eenadu", url: "https://www.eenadu.net/", icon: "📰" },
      { name: "Sakshi", url: "https://www.sakshi.com/", icon: "📰" },
      { name: "Namasthe Telangana", url: "https://www.ntnews.com/", icon: "📰" },
      { name: "Andhra Jyothy", url: "https://www.andhrajyothy.com/", icon: "📰" },
      { name: "The Hindu", url: "https://www.thehindu.com/", icon: "📰" },
      { name: "TOI", url: "https://timesofindia.indiatimes.com/", icon: "📰" },
    ],
  },
  {
    title: "Insurance & Health",
    color: "rose",
    items: [
      { name: "PMFBY Crop Insurance", url: "https://pmfby.gov.in/", icon: "🛡️" },
      { name: "LIC India", url: "https://licindia.in/", icon: "🛡️" },
      { name: "Aarogyasri", url: "https://www.aarogyasri.telangana.gov.in/", icon: "🏥" },
      { name: "Cowin / Health", url: "https://www.mohfw.gov.in/", icon: "💊" },
    ],
  },
  {
    title: "AI Tools",
    color: "violet",
    items: [
      { name: "ChatGPT", url: "https://chatgpt.com/", icon: "🤖" },
      { name: "Google Gemini", url: "https://gemini.google.com/", icon: "✨" },
      { name: "Claude", url: "https://claude.ai/", icon: "🟣" },
      { name: "Microsoft Copilot", url: "https://copilot.microsoft.com/", icon: "💙" },
      { name: "Perplexity", url: "https://www.perplexity.ai/", icon: "🔍" },
      { name: "Grok (xAI)", url: "https://grok.com/", icon: "⚡" },
      { name: "Canva", url: "https://www.canva.com/", icon: "🎨" },
      { name: "Remove.bg", url: "https://www.remove.bg/", icon: "🖼️" },
    ],
  },
  {
    title: "Daily Utility Tools",
    color: "orange",
    items: [
      { name: "Google Translate", url: "https://translate.google.com/", icon: "🌐" },
      { name: "ILovePDF", url: "https://www.ilovepdf.com/", icon: "📑" },
      { name: "SmallPDF", url: "https://smallpdf.com/", icon: "📄" },
      { name: "Photopea (edit)", url: "https://www.photopea.com/", icon: "🖌️" },
      { name: "TinEye Reverse", url: "https://tineye.com/", icon: "🔎" },
      { name: "Speed Test", url: "https://www.speedtest.net/", icon: "📶" },
    ],
  },
  {
    title: "Travel & Booking",
    color: "blue",
    items: [
      { name: "IRCTC", url: "https://www.irctc.co.in/", icon: "🚆" },
      { name: "TS RTC", url: "https://www.tgrtcbus.in/", icon: "🚌" },
      { name: "RedBus", url: "https://www.redbus.in/", icon: "🔴" },
      { name: "Indian Rail Enquiry", url: "https://enquiry.indianrail.gov.in/", icon: "🛤️" },
    ],
  },
];

const headerColor: Record<string, string> = {
  orange: "text-orange-700 bg-orange-50",
  green: "text-green-700 bg-green-50",
  blue: "text-blue-700 bg-blue-50",
  violet: "text-violet-700 bg-violet-50",
  sky: "text-sky-700 bg-sky-50",
  rose: "text-rose-700 bg-rose-50",
};

export default function LinksPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-orange-600 text-white text-center text-xs sm:text-sm py-2">
        Useful Websites · A unit of A.S.V Enterprises · Mutharam
      </div>

      <header className="bg-white/95 backdrop-blur sticky top-0 z-50 border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
              N
            </div>
            <div>
              <p className="font-bold text-slate-900 leading-tight">Nexlify Nucleus</p>
              <p className="text-[11px] text-orange-600 font-medium">Useful Links</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-4 text-sm font-semibold text-slate-700">
            <Link href="/" className="hover:text-orange-500">Home</Link>
            <Link href="/tools" className="hover:text-orange-500">Tools</Link>
            <Link href="/business" className="hover:text-orange-500">Business</Link>
            <Link href="/links" className="text-orange-600">Links</Link>
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
            <Link href="/tools" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">Tools</Link>
            <Link href="/business" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">Business</Link>
            <Link href="/links" onClick={() => setMenuOpen(false)} className="block py-2 font-medium text-orange-600">Links</Link>
            <Link href="/news" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">News</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">Contact</Link>
          </div>
        )}
      </header>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Useful Websites</h1>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Gov · CSC · AI · PDF · Travel — click to open
          </p>
          <a
            href="https://wa.me/919502336495?text=Website%20help%20kavali"
            target="_blank"
            className="inline-block mt-4 text-sm font-semibold text-green-600"
          >
            Need help opening any site? WhatsApp →
          </a>
        </div>

        <div className="space-y-10">
          {sections.map((sec) => (
            <div key={sec.title}>
              <h2
                className={`inline-block text-sm font-bold px-3 py-1 rounded-full mb-4 ${headerColor[sec.color]}`}
              >
                {sec.title}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {sec.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col items-center text-center transition hover:-translate-y-1 hover:shadow-lg hover:border-orange-200"
                  >
                    <span className="text-3xl mb-2">{item.icon}</span>
                    <span className="text-sm font-semibold text-slate-800 leading-snug">
                      {item.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-orange-50 border border-orange-100 rounded-3xl p-6 text-center">
          <p className="font-bold text-slate-900 mb-1">Center lo service కావాలా?</p>
          <p className="text-sm text-slate-600 mb-4">
            Form fill, print, apply — WhatsApp లేదా shop కి రండి
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/919502336495" target="_blank" className="bg-green-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm">
              WhatsApp
            </a>
            <a href="tel:9502336495" className="bg-orange-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm">
              Call
            </a>
            <Link href="/contact" className="bg-slate-800 text-white font-bold px-5 py-2.5 rounded-xl text-sm">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl border p-4">
          <Link href="/business" className="text-sm font-semibold text-slate-600 hover:text-orange-600">
            ← Business
          </Link>
          <Link href="/" className="text-sm font-bold text-orange-600">
            🏠 Home
          </Link>
          <Link href="/tools" className="text-sm font-semibold text-slate-600 hover:text-orange-600">
            Tools →
          </Link>
        </div>
      </div>

      <footer className="bg-slate-950 text-slate-400 py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white font-semibold">Nexlify Nucleus</p>
          <p className="text-sm mt-1">A unit of A.S.V Enterprises · Mutharam CSC</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/news" className="hover:text-white">News</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/919502336495"
          target="_blank"
          className="w-14 h-14 rounded-full bg-green-500 text-white shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition"
        >
          💬
        </a>
        <a
          href="tel:9502336495"
          className="w-14 h-14 rounded-full bg-orange-500 text-white shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition"
        >
          📞
        </a>
      </div>
    </div>
  );
}