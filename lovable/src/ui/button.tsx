import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({ children, variant = "default", className = "", ...props }) => {
  let variantClass = "";
  if (variant === "primary") {
    variantClass = "bg-blue-600 text-white";
  } else if (variant === "secondary") {
    variantClass = "bg-gray-200 text-gray-900";
  } else {
    variantClass = "bg-gray-100 text-gray-900";
  }
  return (
    <button
      {...props}
      className={`px-2 py-1 rounded-md border-0 font-medium cursor-pointer ${variantClass} ${className}`.trim()}
    >
      {children}
    </button>
  );
};
