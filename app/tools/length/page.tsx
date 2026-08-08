"use client";

import { useState } from "react";
import Link from "next/link";

export default function LengthConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("m");
  const toMeters: Record<string, number> = { mm: 0.001, cm: 0.01, m: 1, km: 1000, inch: 0.0254, ft: 0.3048, yard: 0.9144, mile: 1609.34 };
  const meters = (parseFloat(value) || 0) * (toMeters[from] || 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-600 text-white text-center text-sm py-2">A unit of A.S.V Enterprises</div>
      <header className="bg-white shadow sticky top-0">
        <div className="max-w-xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/tools" className="text-base text-orange-600 font-semibold">← All Tools</Link>
          <span className="font-bold text-lg">Length Converter</span>
          <Link href="/" className="text-base text-gray-500">Home</Link>
        </div>
      </header>
      <div className="max-w-xl mx-auto px-4 py-12 md:py-16">
        <div className="bg-white rounded-3xl border p-8 md:p-10 space-y-6 shadow-md">
          <div>
            <label className="text-base font-medium text-gray-700">Value</label>
            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full border-2 rounded-xl px-5 py-4 mt-2 text-xl focus:border-orange-500 focus:outline-none" />
          </div>
          <div>
            <label className="text-base font-medium text-gray-700">From</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full border-2 rounded-xl px-5 py-4 mt-2 text-xl focus:border-orange-500 focus:outline-none">
              <option value="mm">Millimeter</option>
              <option value="cm">Centimeter</option>
              <option value="m">Meter</option>
              <option value="km">Kilometer</option>
              <option value="inch">Inch</option>
              <option value="ft">Feet</option>
              <option value="yard">Yard</option>
              <option value="mile">Mile</option>
            </select>
          </div>
          {value && (
            <div className="bg-cyan-50 border-2 border-cyan-200 rounded-2xl p-6 space-y-2 text-lg">
              {Object.entries(toMeters).map(([unit, factor]) => (
                <p key={unit}><strong className="text-xl">{(meters / factor).toFixed(4)}</strong> {unit}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}