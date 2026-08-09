"use client";

import Link from "next/link";

export default function GalleryPage() {
  // Later మీరు real photos add చేయవచ్చు
  const albums = [
    { title: "గ్రామ పంచాయతీ కార్యక్రమాలు", desc: "ఉప సర్పంచ్ నేతృత్వంలో జరిగిన కార్యక్రమాలు", count: "Photos" },
    { title: "అభివృద్ధి పనులు", desc: "రోడ్లు, నీరు, ఇతర అభివృద్ధి", count: "Photos" },
    { title: "పండుగలు & సంబరాలు", desc: "గ్రామ స్థాయి పండుగలు, సమావేశాలు", count: "Photos" },
    { title: "సేవా కార్యక్రమాలు", desc: "ఆరోగ్య శిబిరాలు, అవగాహన కార్యక్రమాలు", count: "Photos" },
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
            <Link href="/business" className="hover:text-orange-500">Business</Link>
            <Link href="/gallery" className="text-orange-500">Gallery</Link>
            <Link href="/news" className="hover:text-orange-500">News</Link>
            <Link href="/contact" className="hover:text-orange-500">Contact</Link>
          </nav>
          <a href="https://wa.me/919502336495" target="_blank" className="bg-green-500 text-white text-sm px-4 py-2 rounded-lg">WhatsApp</a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">📸 Gallery</h2>
          <p className="text-gray-500">గ్రామ పంచాయతీ & స్థానిక కార్యక్రమాల ఫోటోలు</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {albums.map((a, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-md transition"
            >
              <div className="h-40 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-5xl">
                📷
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{a.title}</h3>
                <p className="text-gray-500 text-sm mb-3">{a.desc}</p>
                <span className="text-xs text-orange-600 font-medium">Photos coming soon</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-orange-50 border border-orange-200 rounded-2xl p-6 text-center">
          <p className="text-gray-700 font-medium">
            ఫోటోలు త్వరలో add చేయబడతాయి. Admin panel నుంచి upload చేయవచ్చు.
          </p>
          <a href="https://wa.me/919502336495" target="_blank" className="inline-block mt-3 bg-green-500 text-white px-6 py-2 rounded-lg text-sm font-medium">
            WhatsApp
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