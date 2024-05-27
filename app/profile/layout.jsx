"use client";

import SideNavigation from "@/components/SideNavigation";

export default function Layout({ children }) {
  return (
    // <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
    <div className="flex flex-col ssm:flex-row h-full ssm:gap-2">
      <SideNavigation />
      {children}
    </div>
  );
}
