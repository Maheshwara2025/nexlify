"use client";

import { usePathname } from "next/navigation";
import PriceTicker from "./PriceTicker";
import NewsTicker from "./NewsTicker";

export default function SiteTickers() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <PriceTicker />
      <NewsTicker />
    </>
  );
}
