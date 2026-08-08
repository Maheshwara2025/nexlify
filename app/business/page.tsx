"use client";

import Link from "next/link";

export default function BusinessPage() {
  const services = [
    { title: "Udyam Registration", desc: "MSM E registration — online help", icon: "📄" },
    { title: "GST Services", desc: "GST registration, filing, returns", icon: "🧾" },
    { title: "PAN / TAN", desc: "New PAN, corrections, TAN", icon: "🪪" },
    { title: "Banking Support", desc: "Account opening guidance, documents", icon: "🏦" },
    { title: "Digital Marketing", desc: "WhatsApp Business, basic online presence", icon: "📱" },
    { title: "Licenses & Certificates", desc: "Trade license, other local certificates", icon: "✅" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-600 text-white text-center text-sm py-2">
        A unit of A.S.V Enterprises | Mutharam Digital Services
      </div>

      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">N</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Nexlify Nucleus</h1>
              <p className="text-xs text-orange-600 font-medium">Digital Services Portal</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-700">
            <Link href="/" className="hover:text-orange-500">Home</Link>
            <Link href="/agriculture" className="hover:text-orange-500">Agriculture</Link>
            <Link href="/business" className="text-orange-500">Business</Link>
            <Link href="/gallery" className="hover:text-orange-500">Gallery</Link>
            <Link href="/news" className="hover:text-orange-500">News</Link>
            <Link href="/contact" className="hover:text-orange-500">Contact</Link>
          </nav>
          <a href="https://wa.me/919502336495" target="_blank" className="bg-green-500 text-white text-sm px-4 py-2 rounded-lg">WhatsApp</a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">💼 Business Services</h2>
          <p className="text-gray-500">వ్యాపారులకు అవసరమైన డిజిటల్ & registration services</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition">
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
          <p className="text-gray-700 font-medium">మీ వ్యాపారానికి సహాయం కావాలా?</p>
          <a href="https://wa.me/919502336495" target="_blank" className="inline-block mt-3 bg-green-500 text-white px-6 py-2 rounded-lg text-sm font-medium">
            WhatsApp చేయండి
          </a>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-medium">Nexlify Nucleus</p>
          <p className="text-gray-400 text-sm mt-1">A unit of A.S.V Enterprises • Mutharam</p>
        </div>
      </footer>
    </div>
  );
}