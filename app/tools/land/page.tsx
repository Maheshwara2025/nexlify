"use client";

import { useState } from "react";
import Link from "next/link";

export default function LandConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("cents");

  const cents = (() => {
    const v = parseFloat(value) || 0;
    if (from === "cents") return v;
    if (from === "guntas") return v * 2.5;
    if (from === "acres") return v * 100;
    if (from === "hectares") return v * 247.105;
    return v;
  })();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-600 text-white text-center text-sm py-2">A unit of A.S.V Enterprises</div>
      <header className="bg-white shadow sticky top-0">
        <div className="max-w-xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/tools" className="text-base text-orange-600 font-semibold">← All Tools</Link>
          <span className="font-bold text-lg">Land Converter</span>
          <Link href="/" className="text-base text-gray-500">Home</Link>
        </div>
      </header>
      <div className="max-w-xl mx-auto px-4 py-12 md:py-16">
        <div className="bg-white rounded-3xl border p-8 md:p-10 space-y-6 shadow-md">
          <div>
            <label className="text-base font-medium text-gray-700">Value</label>
            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full border-2 rounded-xl px-5 py-4 mt-2 text-xl focus:border-orange-500 focus:outline-none" placeholder="10" />
          </div>
          <div>
            <label className="text-base font-medium text-gray-700">From</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full border-2 rounded-xl px-5 py-4 mt-2 text-xl focus:border-orange-500 focus:outline-none">
              <option value="cents">Cents</option>
              <option value="guntas">Guntas</option>
              <option value="acres">Acres</option>
              <option value="hectares">Hectares</option>
            </select>
          </div>
          {value && (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 space-y-3 text-lg">
              <p>Cents: <strong className="text-2xl">{cents.toFixed(2)}</strong></p>
              <p>Guntas: <strong className="text-2xl">{(cents / 2.5).toFixed(2)}</strong></p>
              <p>Acres: <strong className="text-2xl">{(cents / 100).toFixed(4)}</strong></p>
              <p>Hectares: <strong className="text-2xl">{(cents / 247.105).toFixed(4)}</strong></p>
            </div>
          )}
          <p className="text-sm text-gray-400">1 Acre ≈ 100 Cents | 1 Gunta ≈ 2.5 Cents</p>
        </div>
      </div>
    </div>
  );
}