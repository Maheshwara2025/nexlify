"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const { error } = await supabase.from("contacts").insert([
      { name, phone, message },
    ]);

    setLoading(false);

    if (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
    } else {
      setSuccess(true);
      setName("");
      setPhone("");
      setMessage("");
    }
  };

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

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
            <Link href="/" className="hover:text-orange-500 transition">Home</Link>
            <Link href="/#services" className="hover:text-orange-500 transition">Services</Link>
            <Link href="/news" className="hover:text-orange-500 transition">News</Link>
            <Link href="/contact" className="text-orange-500">Contact</Link>
          </nav>

          <a
            href="https://wa.me/919502336495"
            target="_blank"
            className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            WhatsApp
          </a>
        </div>
      </header>

      {/* Contact Form */}
      <section className="max-w-xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h2>
          <p className="text-gray-500">మాతో సంప్రదించండి — మేము త్వరలో reply చేస్తాము</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="మీ పేరు"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="9502336495"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="మీ సందేశం..."
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm font-medium">Message sent successfully! ✓</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-medium">Nexlify Nucleus</p>
          <p className="text-gray-400 text-sm mt-1">A unit of A.S.V Enterprises • Mutharam</p>
        </div>
      </footer>
    </div>
  );
}