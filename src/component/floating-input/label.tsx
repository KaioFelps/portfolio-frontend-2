import type { LabelHTMLAttributes } from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement>;

export function FloatingInputLabel({ className: _, htmlFor, ...props }: Props) {
  // biome-ignore lint/a11y/noLabelWithoutControl: not this component's job
  return <label {...props} />;
}
