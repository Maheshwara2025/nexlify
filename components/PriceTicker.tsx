"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type MarketPrices = {
  gold_price: string;
  silver_price: string;
  diesel_price: string;
  updated_at: string;
};

function formatPrice(value: string) {
  const num = parseFloat(value.replace(/,/g, ""));
  if (isNaN(num)) return value;
  return num.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

export default function PriceTicker() {
  const [prices, setPrices] = useState<MarketPrices | null>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("market_prices")
        .select("gold_price, silver_price, diesel_price, updated_at")
        .eq("id", 1)
        .maybeSingle();
      if (data) setPrices(data);
    }
    load();
  }, []);

  if (!prices) return null;

  const items = [
    { icon: "🥇", label: "Gold", value: prices.gold_price, unit: "/10g" },
    { icon: "🥈", label: "Silver", value: prices.silver_price, unit: "/kg" },
    { icon: "⛽", label: "Diesel", value: prices.diesel_price, unit: "/L" },
  ];

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-3 py-1.5 flex items-center gap-2 sm:gap-3">
        <span className="bg-orange-500 text-[10px] font-black px-1.5 py-0.5 rounded shrink-0 uppercase tracking-wide">
          Rates
        </span>
        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-4 sm:gap-8 whitespace-nowrap text-xs sm:text-sm">
            {items.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-1">
                <span>{item.icon}</span>
                <span className="text-slate-400">{item.label}</span>
                <strong className="text-orange-400 font-bold">
                  ₹{formatPrice(item.value)}
                  {item.unit}
                </strong>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
