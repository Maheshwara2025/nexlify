"use client";

import { useState } from "react";
import Link from "next/link";

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  function calculate() {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w) return;
    setBmi(Math.round((w / (h * h)) * 10) / 10);
  }

  function status(b: number) {
    if (b < 18.5) return { text: "Underweight", color: "text-blue-600" };
    if (b < 25) return { text: "Normal", color: "text-green-600" };
    if (b < 30) return { text: "Overweight", color: "text-orange-600" };
    return { text: "Obese", color: "text-red-600" };
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-600 text-white text-center text-sm py-2">A unit of A.S.V Enterprises</div>
      <header className="bg-white shadow sticky top-0">
        <div className="max-w-xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/tools" className="text-base text-orange-600 font-semibold">← All Tools</Link>
          <span className="font-bold text-lg">BMI Calculator</span>
          <Link href="/" className="text-base text-gray-500">Home</Link>
        </div>
      </header>
      <div className="max-w-xl mx-auto px-4 py-12 md:py-16">
        <div className="bg-white rounded-3xl border p-8 md:p-10 space-y-6 shadow-md">
          <div>
            <label className="text-base font-medium text-gray-700">Height (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full border-2 rounded-xl px-5 py-4 mt-2 text-xl focus:border-orange-500 focus:outline-none" placeholder="170" />
          </div>
          <div>
            <label className="text-base font-medium text-gray-700">Weight (kg)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full border-2 rounded-xl px-5 py-4 mt-2 text-xl focus:border-orange-500 focus:outline-none" placeholder="65" />
          </div>
          <button onClick={calculate} className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl text-xl">Calculate BMI</button>
          {bmi !== null && (
            <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 text-center">
              <p className="text-5xl font-black text-purple-700">{bmi}</p>
              <p className={`text-2xl font-bold mt-2 ${status(bmi).color}`}>{status(bmi).text}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}