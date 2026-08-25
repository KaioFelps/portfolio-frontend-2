"use client";

import "@/styles/starry-night.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { StarryNightSingleton } from "@/lib/starry-night";

export function useStarryNight() {
  useLayoutEffect(() => {
    const codeBlocks = Array.from(document.querySelectorAll("pre code"));
    StarryNightSingleton.clientSideHighlight(codeBlocks);
  }, []);
}

/**
 * Loads the Starry Night grammars once (cached by `StarryNightSingletone`)
 * and reports readiness. Does **not** touch the DOM — unlike `useStarryNight`
 * (which is meant for static, already-rendered content and re-highlights by
 * replacing element children), this is meant to be paired with the
 * `StarryNightDecorations` tiptap extension, which reads the loaded
 * highlighter live via `StarryNightSingletone.getSync()` on every document
 * change, and is therefore safe inside a live/dynamic editor.
 */
export function useStarryNightHighlighter() {
  const [ready, setReady] = useState(
    () => StarryNightSingleton.getSync() !== null,
  );

  useEffect(() => {
    if (ready) return;

    let cancelled = false;
    StarryNightSingleton.maybeInitialize().then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [ready]);

  return { ready };
}
