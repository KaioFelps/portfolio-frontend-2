"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Returns a stable, debounced version of `callback`. The latest `callback`
 * is always used (via a ref), so consumers don't need to memoize it.
 */
export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delayMs: number,
) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return useCallback(
    (...args: Args) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(
        () => callbackRef.current(...args),
        delayMs,
      );
    },
    [delayMs],
  );
}
