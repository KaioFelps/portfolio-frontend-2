import type { JSXElementConstructor, ReactElement } from "react";
import type { ServerResponse } from "@/core/types/server-response";

export type FallbackComponentProps<E = string> = {
  error: E;
};

export type ComponentProps<T> = {
  data: T;
};

type Props<T, E = string> = {
  data: ServerResponse<T, E>;
  children?: ReactElement;
  component?: JSXElementConstructor<ComponentProps<T>>;
  fallback?: ReactElement;
  fallbackComponent?: JSXElementConstructor<FallbackComponentProps<E>>;
};

export function ServerResponseBoundary<T, E = string>({
  data,
  children,
  fallback,
  component: Component,
  fallbackComponent: FallbackComponent,
}: Props<T, E>) {
  if (!fallback && !FallbackComponent)
    throw new Error(
      "ServerResponseBoundary must take at least `fallback` or `fallbackComponent` props.",
    );

  if (!children && !Component)
    throw new Error(
      "ServerResponseBoundary must take at least `children` or `component` props.",
    );

  if (data.success)
    return Component ? <Component data={data.data} /> : children;

  if (fallback) return fallback;
  if (FallbackComponent) return <FallbackComponent error={data.error} />;

  return null;
}
