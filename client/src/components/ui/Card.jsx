import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, className = "" }) {
  return (
    <div className={`mb-4 ${className}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }) {
  return <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = "" }) {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
}
