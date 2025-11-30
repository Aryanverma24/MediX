import React from "react";

export default function Button({children,type="button", className="",...props}){
    return (
        <button {...props} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 transition font-semibold ${className}`}>
            {children}
        </button>
    )
}