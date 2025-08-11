import React from "react";

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div
    style={{
      border: "1px solid #ccc",
      borderRadius: 8,
      background: "#fff",
      boxShadow: "0 2px 8px #0001",
      padding: 16,
    }}
    {...props}
  >
    {children}
  </div>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => <div {...props}>{children}</div>;
