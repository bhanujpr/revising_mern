import type { ReactElement } from "react";

export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick: () => void;
}

const variantStyles = {
  primary: "bg-purple-600 text-white hover:bg-purple-700",
  secondary: "bg-purple-300 text-purple-600 hover:bg-purple-400",
};

const textStyle = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const defaultStyles = "rounded flex items-center gap-2 font-light";

export const Button = (props: ButtonProps) => {
  return (
    <button
      type="button" // important to prevent form submit
      onClick={props.onClick}
      className={`${variantStyles[props.variant]} ${textStyle[props.size]} ${defaultStyles}`}
    >
      {props.startIcon && <div className="pr-2">{props.startIcon}</div>}
      {props.text}
      {props.endIcon && <span>{props.endIcon}</span>}
    </button>
  );
};
