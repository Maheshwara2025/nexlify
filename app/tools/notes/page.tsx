"use client";

import { useState } from "react";
import Link from "next/link";

const denominations = [10, 20, 50, 100, 200, 500];

export default function NoteCounter() {
  const [counts, setCounts] = useState<Record<number, string>>({ 10: "", 20: "", 50: "", 100: "", 200: "", 500: "" });
  const total = denominations.reduce((s, d) => s + d * (parseInt(counts[d]) || 0), 0);
  const totalNotes = denominations.reduce((s, d) => s + (parseInt(counts[d]) || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-600 text-white text-center text-sm py-2">A unit of A.S.V Enterprises</div>
      <header className="bg-white shadow sticky top-0">
        <div className="max-w-xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/tools" className="text-base text-orange-600 font-semibold">← All Tools</Link>
          <span className="font-bold text-lg">Note Counter</span>
          <Link href="/" className="text-base text-gray-500">Home</Link>
        </div>
      </header>
      <div className="max-w-xl mx-auto px-4 py-12 md:py-16">
        <div className="bg-white rounded-3xl border p-8 md:p-10 space-y-4 shadow-md">
          {denominations.map((d) => (
            <div key={d} className="flex items-center gap-4">
              <span className="w-24 text-xl font-bold text-gray-800">₹{d}</span>
              <input type="number" min="0" value={counts[d]} onChange={(e) => setCounts({ ...counts, [d]: e.target.value })} className="flex-1 border-2 rounded-xl px-4 py-3 text-xl focus:border-orange-500 focus:outline-none" placeholder="0" />
              <span className="w-28 text-right text-lg text-gray-600">= ₹{d * (parseInt(counts[d]) || 0)}</span>
            </div>
          ))}
          <div className="border-t-2 pt-6 mt-4 text-center">
            <p className="text-lg text-gray-500">Total Notes: {totalNotes}</p>
            <p className="text-4xl font-black text-green-700 mt-2">₹ {total.toLocaleString("en-IN")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}