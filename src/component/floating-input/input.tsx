import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function FloatingInputInput({
  className,
  placeholder = "input",
  ...props
}: Props) {
  return (
    <input
      className={clsx("form-control", className && className)}
      placeholder={placeholder}
      {...props}
    />
  );
}
