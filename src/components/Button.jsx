import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props // jo bhi aur properties paas karega user
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} ${textCOlor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

