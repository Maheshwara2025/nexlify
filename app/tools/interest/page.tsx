"use client";

import { useState } from "react";
import Link from "next/link";

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState<"simple" | "compound">("simple");
  const [result, setResult] = useState<{ interest: number; total: number } | null>(null);

  function calculate() {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    if (!p || !r || !t) return;
    let interest = type === "simple" ? (p * r * t) / 100 : p * Math.pow(1 + r / 100, t) - p;
    setResult({ interest: Math.round(interest * 100) / 100, total: Math.round((p + interest) * 100) / 100 });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-600 text-white text-center text-sm py-2">A unit of A.S.V Enterprises | Mutharam Digital Services</div>
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/tools" className="text-base text-orange-600 font-semibold">← All Tools</Link>
          <span className="font-bold text-lg">Interest Calculator</span>
          <Link href="/" className="text-base text-gray-500">Home</Link>
        </div>
      </header>
      <div className="max-w-xl mx-auto px-4 py-12 md:py-16">
        <div className="bg-white rounded-3xl shadow-md border p-8 md:p-10 space-y-6">
          <div className="flex gap-3">
            <button onClick={() => setType("simple")} className={`flex-1 py-4 rounded-xl text-lg font-bold ${type === "simple" ? "bg-orange-500 text-white" : "bg-gray-100"}`}>Simple</button>
            <button onClick={() => setType("compound")} className={`flex-1 py-4 rounded-xl text-lg font-bold ${type === "compound" ? "bg-orange-500 text-white" : "bg-gray-100"}`}>Compound</button>
          </div>
          <div>
            <label className="text-base font-medium text-gray-700">Principal (₹)</label>
            <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full border-2 rounded-xl px-5 py-4 mt-2 text-xl focus:border-orange-500 focus:outline-none" placeholder="10000" />
          </div>
          <div>
            <label className="text-base font-medium text-gray-700">Rate (% per year)</label>
            <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full border-2 rounded-xl px-5 py-4 mt-2 text-xl focus:border-orange-500 focus:outline-none" placeholder="12" />
          </div>
          <div>
            <label className="text-base font-medium text-gray-700">Time (years)</label>
            <input type="number" value={time} onChange={(e) => setTime(e.target.value)} className="w-full border-2 rounded-xl px-5 py-4 mt-2 text-xl focus:border-orange-500 focus:outline-none" placeholder="2" />
          </div>
          <button onClick={calculate} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-xl">Calculate</button>
          {result && (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center space-y-2">
              <p className="text-base text-gray-600">Interest</p>
              <p className="text-4xl font-black text-green-700">₹ {result.interest}</p>
              <p className="text-base text-gray-600 mt-3">Total Amount</p>
              <p className="text-3xl font-bold text-gray-900">₹ {result.total}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}