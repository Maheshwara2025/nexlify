"use client";

import { useState } from "react";
import Link from "next/link";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<{ years: number; months: number; days: number } | null>(null);

  function calculate() {
    if (!dob) return;
    const birth = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    setResult({ years, months, days });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-600 text-white text-center text-sm py-2">A unit of A.S.V Enterprises</div>
      <header className="bg-white shadow sticky top-0">
        <div className="max-w-xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/tools" className="text-base text-orange-600 font-semibold">← All Tools</Link>
          <span className="font-bold text-lg">Age Calculator</span>
          <Link href="/" className="text-base text-gray-500">Home</Link>
        </div>
      </header>
      <div className="max-w-xl mx-auto px-4 py-12 md:py-16">
        <div className="bg-white rounded-3xl border p-8 md:p-10 space-y-6 shadow-md">
          <div>
            <label className="text-base font-medium text-gray-700">Date of Birth</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full border-2 rounded-xl px-5 py-4 mt-2 text-xl focus:border-orange-500 focus:outline-none" />
          </div>
          <button onClick={calculate} className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl text-xl">Calculate Age</button>
          {result && (
            <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-6 text-center">
              <p className="text-5xl font-black text-pink-700">{result.years} years</p>
              <p className="text-xl text-gray-600 mt-2">{result.months} months, {result.days} days</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}