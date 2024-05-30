"use client";

import SideNavigation from "@/components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col sm:flex-row h-full ssm:gap-2">
      <SideNavigation />
      <div className="mx-auto container">{children}</div>
    </div>
  );
}
