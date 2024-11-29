import React from "react";
import { Navbar } from "@/components";

export default function NavigationLayout({ children }) {
  return (
    <div>
      <div>
        <Navbar />
        <div className="w-full text-slate-900">{children}</div>
      </div>
    </div>
  );
}
