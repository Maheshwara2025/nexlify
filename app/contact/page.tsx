"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setStatus("All fields required");
      return;
    }
    setLoading(true);
    setStatus("");

    const { error } = await supabase.from("contacts").insert({
      name: name.trim(),
      phone: phone.trim(),
      message: message.trim(),
    });

    setLoading(false);
    if (error) {
      setStatus("Opening WhatsApp...");
      const text = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nMessage: ${message}`);
      window.open(`https://wa.me/919502336495?text=${text}`, "_blank");
    } else {
      setStatus("✅ Message sent successfully!");
      setName("");
      setPhone("");
      setMessage("");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-orange-600 text-white text-center text-xs sm:text-sm py-2">
        A unit of A.S.V Enterprises | Mutharam Digital Services
      </div>

      <header className="bg-white/95 backdrop-blur sticky top-0 z-50 border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
              N
            </div>
            <div>
              <p className="font-bold text-slate-900 leading-tight">Nexlify Nucleus</p>
              <p className="text-[11px] text-orange-600 font-medium">Contact</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-4 text-sm font-semibold text-slate-700">
            <Link href="/" className="hover:text-orange-500">Home</Link>
            <Link href="/#services" className="hover:text-orange-500">Services</Link>
            <Link href="/tools" className="hover:text-orange-500">Tools</Link>
            <Link href="/agriculture" className="hover:text-orange-500">Agriculture</Link>
            <Link href="/business" className="hover:text-orange-500">Business</Link>
            <Link href="/gallery" className="hover:text-orange-500">Gallery</Link>
            <Link href="/news" className="hover:text-orange-500">News</Link>
            <Link href="/contact" className="text-orange-600">Contact</Link>
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
            <Link href="/news" onClick={() => setMenuOpen(false)} className="block py-2 font-medium">News</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="block py-2 font-medium text-orange-600">Contact</Link>
          </div>
        )}
      </header>

      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Contact Us</h1>
          <p className="text-slate-500 mt-2">మాతో మాట్లాడండి — WhatsApp fastest</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition">
              <p className="text-2xl mb-2">📍</p>
              <h3 className="font-bold text-slate-900 mb-1">Address</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Near Water Tank, Kasrlagadda
                <br />
                Mutharam, Peddapalli District
                <br />
                Telangana — PIN 505184
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition">
              <p className="text-2xl mb-2">🕘</p>
              <h3 className="font-bold text-slate-900 mb-1">Timings</h3>
              <p className="text-sm text-slate-600">9:00 AM – 9:00 PM · Sunday Open</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition">
              <p className="text-2xl mb-2">📞</p>
              <h3 className="font-bold text-slate-900 mb-1">Phone / WhatsApp</h3>
              <p className="text-sm text-slate-600 mb-3">9502336495</p>
              <div className="flex flex-wrap gap-2">
                <a href="tel:9502336495" className="bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-xl">Call</a>
                <a href="https://wa.me/919502336495" target="_blank" className="bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-xl">WhatsApp</a>
                <a href="https://maps.app.goo.gl/2p1M4BhcWehhv8dK8" target="_blank" className="bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-xl">Maps</a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-1">Send a message</h2>
            <p className="text-sm text-slate-500 mb-6">Form లేదా నేరుగా WhatsApp</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 mt-1 text-base focus:border-orange-500 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 mt-1 text-base focus:border-orange-500 focus:outline-none"
                  placeholder="95023..."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 mt-1 text-base focus:border-orange-500 focus:outline-none resize-none"
                  placeholder="Service / enquiry..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
              {status && <p className="text-center text-sm font-medium text-green-600">{status}</p>}
            </form>

            <div className="mt-6 pt-6 border-t text-center">
              <a
                href="https://wa.me/919502336495"
                target="_blank"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl"
              >
                💬 Direct WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-slate-950 text-slate-400 py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white font-semibold">Nexlify Nucleus</p>
          <p className="text-sm mt-1">A unit of A.S.V Enterprises · Mutharam</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/tools" className="hover:text-white">Tools</Link>
            <Link href="/agriculture" className="hover:text-white">Agriculture</Link>
            <Link href="/business" className="hover:text-white">Business</Link>
            <Link href="/news" className="hover:text-white">News</Link>
            <Link href="/admin/login" className="hover:text-slate-300">Admin</Link>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-3">
        <a href="https://wa.me/919502336495" target="_blank" className="w-14 h-14 rounded-full bg-green-500 text-white shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition">💬</a>
        <a href="tel:9502336495" className="w-14 h-14 rounded-full bg-orange-500 text-white shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition">📞</a>
        <a href="https://maps.app.goo.gl/2p1M4BhcWehhv8dK8" target="_blank" className="w-12 h-12 rounded-full bg-slate-800 text-white shadow-lg flex items-center justify-center text-lg hover:scale-110 transition">📍</a>
      </div>
    </div>
  );
}