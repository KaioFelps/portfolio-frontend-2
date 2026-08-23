"use client";

import "@/styles/starry-night.css";
import { useLayoutEffect } from "react";
import { StarryNightSingletone } from "@/lib/starry-night";

export function useStarryNight() {
  useLayoutEffect(() => {
    const codeBlocks = Array.from(document.querySelectorAll("pre code"));
    StarryNightSingletone.clientSideHighlight(codeBlocks);
  }, []);
}
