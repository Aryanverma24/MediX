import React from "react";

export default function Input({ label, ...props }) {
  return (
    <div>
      {label && <label className="font-semibold text-gray-600 block my-1">{label}</label>}
      <input
        {...props}
        className="w-full px-4 py-2 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
      />
    </div>
  );
}
