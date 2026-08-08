"use client";

import { useState } from "react";
import Link from "next/link";

export default function BasicCalculator() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [fresh, setFresh] = useState(true);

  function input(n: string) {
    if (fresh) {
      setDisplay(n);
      setFresh(false);
    } else {
      setDisplay(display === "0" ? n : display + n);
    }
  }

  function operate(nextOp: string) {
    const current = parseFloat(display);
    if (prev !== null && op && !fresh) {
      const result = compute(prev, current, op);
      setDisplay(String(result));
      setPrev(result);
    } else {
      setPrev(current);
    }
    setOp(nextOp);
    setFresh(true);
  }

  function compute(a: number, b: number, operation: string) {
    if (operation === "+") return a + b;
    if (operation === "-") return a - b;
    if (operation === "×") return a * b;
    if (operation === "÷") return b !== 0 ? a / b : 0;
    return b;
  }

  function equals() {
    if (prev === null || !op) return;
    const result = compute(prev, parseFloat(display), op);
    setDisplay(String(Math.round(result * 1000000) / 1000000));
    setPrev(null);
    setOp(null);
    setFresh(true);
  }

  function clear() {
    setDisplay("0");
    setPrev(null);
    setOp(null);
    setFresh(true);
  }

  const btn = "h-14 rounded-xl text-lg font-semibold active:scale-95 transition";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-600 text-white text-center text-sm py-2">A unit of A.S.V Enterprises</div>
      <header className="bg-white shadow sticky top-0">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between">
          <Link href="/tools" className="text-sm text-orange-600 font-medium">← All Tools</Link>
          <span className="font-bold">Calculator</span>
          <Link href="/" className="text-sm text-gray-500">Home</Link>
        </div>
      </header>
      <div className="max-w-xs mx-auto px-4 py-10">
        <div className="bg-gray-900 rounded-2xl p-4 shadow-lg">
          <div className="text-right text-white text-3xl font-mono py-4 px-2 mb-2 overflow-x-auto">{display}</div>
          <div className="grid grid-cols-4 gap-2">
            <button onClick={clear} className={`${btn} bg-gray-600 text-white col-span-2`}>C</button>
            <button onClick={() => operate("÷")} className={`${btn} bg-orange-500 text-white`}>÷</button>
            <button onClick={() => operate("×")} className={`${btn} bg-orange-500 text-white`}>×</button>
            {["7","8","9"].map(n => <button key={n} onClick={() => input(n)} className={`${btn} bg-gray-700 text-white`}>{n}</button>)}
            <button onClick={() => operate("-")} className={`${btn} bg-orange-500 text-white`}>−</button>
            {["4","5","6"].map(n => <button key={n} onClick={() => input(n)} className={`${btn} bg-gray-700 text-white`}>{n}</button>)}
            <button onClick={() => operate("+")} className={`${btn} bg-orange-500 text-white`}>+</button>
            {["1","2","3"].map(n => <button key={n} onClick={() => input(n)} className={`${btn} bg-gray-700 text-white`}>{n}</button>)}
            <button onClick={equals} className={`${btn} bg-green-500 text-white row-span-2`}>=</button>
            <button onClick={() => input("0")} className={`${btn} bg-gray-700 text-white col-span-2`}>0</button>
            <button onClick={() => input(".")} className={`${btn} bg-gray-700 text-white`}>.</button>
          </div>
        </div>
      </div>
    </div>
  );
}