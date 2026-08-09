"use client";

import Link from "next/link";

export default function AgriculturePage() {
  const topics = [
    { title: "పంటల సమాచారం", desc: "వరి, పత్తి, మిర్చి, కూరగాయలు — సీజన్ వారీ సలహాలు", icon: "🌾" },
    { title: "మార్కెట్ రేట్లు", desc: "స్థానిక మార్కెట్ ధరలు మరియు ధరల సమాచారం", icon: "💰" },
    { title: "వాతావరణం", desc: "వర్షం, ఉష్ణోగ్రత — రైతులకు ఉపయోగకరమైన సమాచారం", icon: "⛅" },
    { title: "ప్రభుత్వ పథకాలు", desc: "PM-KISAN, రైతు భరోసా, సబ్సిడీలు", icon: "📋" },
    { title: "సేంద్రీయ వ్యవసాయం", desc: "సహజ ఎరువులు, కీటకాల నియంత్రణ", icon: "🌿" },
    { title: "పశువుల సంరక్షణ", desc: "పశువైద్యం, ఆహారం, టీకాలు", icon: "🐄" },
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
            <Link href="/agriculture" className="text-orange-500">Agriculture</Link>
            <Link href="/business" className="hover:text-orange-500">Business</Link>
            <Link href="/gallery" className="hover:text-orange-500">Gallery</Link>
            <Link href="/news" className="hover:text-orange-500">News</Link>
            <Link href="/contact" className="hover:text-orange-500">Contact</Link>
          </nav>
          <a href="https://wa.me/919502336495" target="_blank" className="bg-green-500 text-white text-sm px-4 py-2 rounded-lg">WhatsApp</a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🌾 Agriculture</h2>
          <p className="text-gray-500">రైతులకు ఉపయోగకరమైన సమాచారం — ముత్తారం & పరిసరాలు</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition">
              <div className="text-4xl mb-3">{t.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
          <p className="text-gray-700 font-medium">మరిన్ని వివరాలు కావాలంటే మమ్మల్ని సంప్రదించండి</p>
          <a href="https://wa.me/919502336495" target="_blank" className="inline-block mt-3 bg-green-500 text-white px-6 py-2 rounded-lg text-sm font-medium">
            WhatsApp చేయండి
          </a>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <p className="font-medium">Nexlify Nucleus</p>
    <p className="text-gray-400 text-sm mt-1">A unit of A.S.V Enterprises • Mutharam</p>
    <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-400">
      <Link href="/" className="hover:text-white">Home</Link>
      <Link href="/tools" className="hover:text-white">Tools</Link>
      <Link href="/agriculture" className="hover:text-white">Agriculture</Link>
      <Link href="/business" className="hover:text-white">Business</Link>
      <Link href="/gallery" className="hover:text-white">Gallery</Link>
      <Link href="/news" className="hover:text-white">News</Link>
      <Link href="/contact" className="hover:text-white">Contact</Link>
      <Link href="/admin/login" className="hover:text-gray-300">Admin</Link>
    </div>
  </div>
</footer>
    </div>
  );
}