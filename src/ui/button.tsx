import React from "react";

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => (
  <button
    style={{
      padding: "6px 12px",
      borderRadius: 4,
      border: "1px solid #888",
      background: "#eee",
      cursor: "pointer",
    }}
    {...props}
  >
    {children}
  </button>
);
