"use client";

import { useState } from "react";
import Link from "next/link";

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [fresh, setFresh] = useState(true);

  function input(n: string) {
    if (fresh) {
      setDisplay(n === "." ? "0." : n);
      setFresh(false);
    } else {
      if (n === "." && display.includes(".")) return;
      setDisplay(display === "0" && n !== "." ? n : display + n);
    }
  }

  function clear() {
    setDisplay("0");
    setFresh(true);
  }

  function backspace() {
    if (display.length <= 1) {
      setDisplay("0");
      setFresh(true);
    } else {
      setDisplay(display.slice(0, -1));
    }
  }

  function calculate() {
    try {
      let expr = display
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/π/g, String(Math.PI))
        .replace(/\^/g, "**");
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${expr})`)();
      setDisplay(String(Math.round(result * 1e10) / 1e10));
      setFresh(true);
    } catch {
      setDisplay("Error");
      setFresh(true);
    }
  }

  function fn(type: string) {
    const x = parseFloat(display);
    if (isNaN(x)) return;
    let r = 0;
    if (type === "sin") r = Math.sin(x * Math.PI / 180);
    if (type === "cos") r = Math.cos(x * Math.PI / 180);
    if (type === "tan") r = Math.tan(x * Math.PI / 180);
    if (type === "log") r = Math.log10(x);
    if (type === "ln") r = Math.log(x);
    if (type === "sqrt") r = Math.sqrt(x);
    if (type === "sq") r = x * x;
    if (type === "inv") r = 1 / x;
    if (type === "fact") {
      if (x < 0 || x !== Math.floor(x)) { setDisplay("Error"); setFresh(true); return; }
      r = 1;
      for (let i = 2; i <= x; i++) r *= i;
    }
    setDisplay(String(Math.round(r * 1e10) / 1e10));
    setFresh(true);
  }

  const btn = "h-16 rounded-2xl text-xl font-bold active:scale-95 transition shadow-sm";

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-orange-600 text-white text-center text-sm py-2">
        A unit of A.S.V Enterprises | Mutharam Digital Services
      </div>

      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/tools" className="text-sm text-orange-600 font-medium">← All Tools</Link>
          <span className="font-bold text-gray-900 text-lg">Scientific Calculator</span>
          <Link href="/" className="text-sm text-gray-500">Home</Link>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="bg-gray-900 rounded-3xl p-5 shadow-2xl">
          {/* Display - Large */}
          <div className="bg-gray-800 rounded-2xl px-5 py-6 mb-5 text-right">
            <p className="text-white text-4xl md:text-5xl font-mono tracking-wider break-all min-h-[60px]">
              {display}
            </p>
          </div>

          {/* Scientific row */}
          <div className="grid grid-cols-5 gap-2 mb-2">
            <button onClick={() => fn("sin")} className={`${btn} bg-indigo-600 text-white text-base`}>sin</button>
            <button onClick={() => fn("cos")} className={`${btn} bg-indigo-600 text-white text-base`}>cos</button>
            <button onClick={() => fn("tan")} className={`${btn} bg-indigo-600 text-white text-base`}>tan</button>
            <button onClick={() => fn("log")} className={`${btn} bg-indigo-600 text-white text-base`}>log</button>
            <button onClick={() => fn("ln")} className={`${btn} bg-indigo-600 text-white text-base`}>ln</button>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-2">
            <button onClick={() => fn("sqrt")} className={`${btn} bg-indigo-600 text-white text-base`}>√</button>
            <button onClick={() => fn("sq")} className={`${btn} bg-indigo-600 text-white text-base`}>x²</button>
            <button onClick={() => fn("inv")} className={`${btn} bg-indigo-600 text-white text-base`}>1/x</button>
            <button onClick={() => fn("fact")} className={`${btn} bg-indigo-600 text-white text-base`}>n!</button>
            <button onClick={() => input("π")} className={`${btn} bg-indigo-600 text-white text-base`}>π</button>
          </div>

          {/* Main buttons - Large */}
          <div className="grid grid-cols-4 gap-2.5">
            <button onClick={clear} className={`${btn} bg-red-500 text-white`}>C</button>
            <button onClick={backspace} className={`${btn} bg-gray-600 text-white`}>⌫</button>
            <button onClick={() => input("^")} className={`${btn} bg-orange-500 text-white`}>xʸ</button>
            <button onClick={() => input("÷")} className={`${btn} bg-orange-500 text-white`}>÷</button>

            {["7", "8", "9"].map((n) => (
              <button key={n} onClick={() => input(n)} className={`${btn} bg-gray-700 text-white`}>{n}</button>
            ))}
            <button onClick={() => input("×")} className={`${btn} bg-orange-500 text-white`}>×</button>

            {["4", "5", "6"].map((n) => (
              <button key={n} onClick={() => input(n)} className={`${btn} bg-gray-700 text-white`}>{n}</button>
            ))}
            <button onClick={() => input("-")} className={`${btn} bg-orange-500 text-white`}>−</button>

            {["1", "2", "3"].map((n) => (
              <button key={n} onClick={() => input(n)} className={`${btn} bg-gray-700 text-white`}>{n}</button>
            ))}
            <button onClick={() => input("+")} className={`${btn} bg-orange-500 text-white`}>+</button>

            <button onClick={() => input("0")} className={`${btn} bg-gray-700 text-white col-span-2`}>0</button>
            <button onClick={() => input(".")} className={`${btn} bg-gray-700 text-white`}>.</button>
            <button onClick={calculate} className={`${btn} bg-green-500 text-white`}>=</button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          sin/cos/tan in degrees • Nexlify Nucleus Tools
        </p>
      </div>
    </div>
  );
}