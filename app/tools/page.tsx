"use client";

import Link from "next/link";

const tools = [
  {
    title: "Interest Calculator",
    desc: "Simple & Compound interest",
    icon: "💰",
    href: "/tools/interest",
    color: "from-green-400 to-emerald-600",
  },
  {
    title: "Age Calculator",
    desc: "Age from date of birth",
    icon: "🎂",
    href: "/tools/age",
    color: "from-pink-400 to-rose-600",
  },
  {
    title: "Date Duration",
    desc: "Days, months, years between dates",
    icon: "📅",
    href: "/tools/date-duration",
    color: "from-blue-400 to-indigo-600",
  },
  {
    title: "Land Converter",
    desc: "Cents, Guntas, Acres, Hectares",
    icon: "🌾",
    href: "/tools/land",
    color: "from-lime-400 to-green-700",
  },
  {
    title: "Length Converter",
    desc: "Meters, cm, mm, yards, miles",
    icon: "📏",
    href: "/tools/length",
    color: "from-cyan-400 to-teal-600",
  },
  {
    title: "Note Counter",
    desc: "₹10, ₹20, ₹50, ₹100, ₹200, ₹500",
    icon: "💵",
    href: "/tools/notes",
    color: "from-amber-400 to-orange-600",
  },
  {
    title: "Basic Calculator",
    desc: "Add, subtract, multiply, divide",
    icon: "🔢",
    href: "/tools/calculator",
    color: "from-violet-400 to-purple-600",
  },
  {
    title: "Scientific Calculator",
    desc: "Sin, Cos, Tan, log, powers",
    icon: "📐",
    href: "/tools/scientific",
    color: "from-sky-400 to-blue-700",
  },
  {
  title: "BMI Calculator",
  desc: "Body Mass Index",
  icon: "⚖️",
  href: "/tools/bmi",
  color: "from-fuchsia-400 to-purple-700",
},
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-600 text-white text-center text-sm py-2">
        A unit of A.S.V Enterprises | Mutharam Digital Services
      </div>

      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              N
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Nexlify Nucleus</h1>
              <p className="text-xs text-orange-600 font-medium">Digital Services Portal</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-gray-700">
            <Link href="/" className="hover:text-orange-500">Home</Link>
            <Link href="/tools" className="text-orange-500">Tools</Link>
            <Link href="/business" className="hover:text-orange-500">Business</Link>
            <Link href="/news" className="hover:text-orange-500">News</Link>
            <Link href="/contact" className="hover:text-orange-500">Contact</Link>
          </nav>
          <a href="https://wa.me/919502336495" target="_blank" className="bg-green-500 text-white text-sm px-4 py-2 rounded-lg">
            WhatsApp
          </a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🛠️ Digital Tools</h2>
          <p className="text-gray-500">Calculators, converters & useful tools — free for everyone</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-lg transition group"
            >
              <div className={`h-24 bg-gradient-to-br ${tool.color} flex items-center justify-center text-4xl`}>
                {tool.icon}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition">
                  {tool.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{tool.desc}</p>
                <p className="text-orange-500 text-xs font-semibold mt-3">Open tool →</p>
              </div>
            </Link>
          ))}
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