"use client";

import { useState } from "react";
import Link from "next/link";

export default function DateDuration() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState<{ days: number; weeks: number; months: number; years: number } | null>(null);

  function calculate() {
    if (!from || !to) return;
    const diff = Math.abs(new Date(to).getTime() - new Date(from).getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    setResult({ days, weeks: Math.floor(days / 7), months: Math.floor(days / 30.44), years: Math.floor(days / 365.25) });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-600 text-white text-center text-sm py-2">A unit of A.S.V Enterprises</div>
      <header className="bg-white shadow sticky top-0">
        <div className="max-w-xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/tools" className="text-base text-orange-600 font-semibold">← All Tools</Link>
          <span className="font-bold text-lg">Date Duration</span>
          <Link href="/" className="text-base text-gray-500">Home</Link>
        </div>
      </header>
      <div className="max-w-xl mx-auto px-4 py-12 md:py-16">
        <div className="bg-white rounded-3xl border p-8 md:p-10 space-y-6 shadow-md">
          <div>
            <label className="text-base font-medium text-gray-700">From Date</label>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="w-full border-2 rounded-xl px-5 py-4 mt-2 text-xl focus:border-orange-500 focus:outline-none" />
          </div>
          <div>
            <label className="text-base font-medium text-gray-700">To Date</label>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="w-full border-2 rounded-xl px-5 py-4 mt-2 text-xl focus:border-orange-500 focus:outline-none" />
          </div>
          <button onClick={calculate} className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl text-xl">Calculate</button>
          {result && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 space-y-2 text-center text-xl">
              <p><strong className="text-3xl">{result.days}</strong> Days</p>
              <p><strong className="text-2xl">{result.weeks}</strong> Weeks</p>
              <p><strong className="text-2xl">{result.months}</strong> Months</p>
              <p><strong className="text-2xl">{result.years}</strong> Years</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}