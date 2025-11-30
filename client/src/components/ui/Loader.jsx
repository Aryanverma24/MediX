import React from "react";

export default function Loader({ size = 40 }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div
        className="relative animate-spin"
        style={{ width: size, height: size }}
      >
        {/* Outer gradient ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-purple-500 via-teal-400 to-purple-500 blur-sm"></div>

        {/* Inner glass circle */}
        <div className="absolute inset-1 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center">
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
