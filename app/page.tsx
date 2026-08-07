"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-orange-600 text-white text-center text-sm py-2">
        A unit of A.S.V Enterprises | Mutharam Digital Services
      </div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              N
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">Nexlify Nucleus</h1>
              <p className="text-xs text-orange-600 font-medium">Digital Services Portal</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
            <Link href="/" className="hover:text-orange-500 transition">Home</Link>
            <Link href="/#services" className="hover:text-orange-500 transition">Services</Link>
            <Link href="/news" className="hover:text-orange-500 transition">News</Link>
            <Link href="/#services" className="hover:text-orange-500 transition">Agriculture</Link>
            <Link href="/contact" className="hover:text-orange-500 transition">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919502336495"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
            >
              WhatsApp
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
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

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">Home</Link>
            <Link href="/#services" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">Services</Link>
            <Link href="/news" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">News</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">Contact</Link>
            <a
              href="https://wa.me/919502336495"
              target="_blank"
              className="block py-2 font-medium text-green-600"
            >
              WhatsApp
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 text-center">
          <div className="inline-block bg-orange-100 text-orange-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Powered by A.S.V Enterprises
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Building a<br />
            <span className="text-orange-500">Smarter Village</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            ముత్తారం డిజిటల్ విప్లవం — ప్రభుత్వ సేవలు, వార్తలు మరియు సాంకేతికత ఇప్పుడు మీ చేతుల్లో
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#services"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
            >
              View All Services
            </a>
            <Link
              href="/contact"
              className="bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3.5 rounded-xl font-semibold text-lg transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-3">Our Services</h3>
          <p className="text-gray-500">మన సేవలు — Digital solutions by A.S.V Enterprises</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service Cards */}
          {[
            { icon: "🏢", title: "CSC సేవలు", desc: "ప్రభుత్వ పథకాలు, మీ-సేవ, పాన్ కార్డ్ మరియు ఇతర సర్టిఫికేట్లు" },
            { icon: "💳", title: "పాన్ కార్డ్", desc: "కొత్త పాన్ కార్డ్ లేదా సవరణల కోసం త్వరిత దరఖాస్తు" },
            { icon: "📰", title: "వార్తలు", desc: "ముత్తారం మరియు పరిసర ప్రాంతాల తాజా సమాచారం" },
            { icon: "🌱", title: "రైతు సేవలు", desc: "వాతావరణం, మార్కెట్ ధరలు మరియు వ్యవసాయ సలహాలు" },
            { icon: "🎓", title: "విద్య సేవలు", desc: "స్కాలర్‌షిప్‌లు, ఫలితాలు మరియు విద్యా సమాచారం" },
            { icon: "💼", title: "బిజినెస్ సేవలు", desc: "Udyam, GST, బ్యాంక్ అకౌంట్ మరియు వ్యాపార సేవలు" },
          ].map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-orange-100 group-hover:bg-orange-500 rounded-xl flex items-center justify-center text-2xl mb-5 transition-colors">
                <span className="group-hover:scale-110 transition-transform">{service.icon}</span>
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">{service.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-orange-500 text-white py-14">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold mb-1">500+</div>
            <div className="text-orange-100 text-sm">Services Completed</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold mb-1">24/7</div>
            <div className="text-orange-100 text-sm">Digital Support</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold mb-1">100%</div>
            <div className="text-orange-100 text-sm">Local Focus</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold mb-1">AI</div>
            <div className="text-orange-100 text-sm">Powered Hub</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-lg">
                N
              </div>
              <div>
                <div className="font-bold">Nexlify Nucleus</div>
                <div className="text-gray-400 text-sm">A unit of A.S.V Enterprises</div>
              </div>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <Link href="/news" className="hover:text-white transition">News</Link>
              <Link href="/contact" className="hover:text-white transition">Contact</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
            © 2026 Nexlify Nucleus • A unit of A.S.V Enterprises • Mutharam
          </div>
        </div>
      </footer>
    </div>
  );
}