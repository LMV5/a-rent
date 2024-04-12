"use client";

import Link from "next/link";

function LinkButton({ children, href, type, active, onClick, text }) {
  const base =
    "text-white hover:bg-gray-800 hover:text-white rounded-md px-3 py-2";

  const styles = {
    primary: base + " py-3 px-4 md:px-6 md:py-4",
    mobileMenu: "text-white block rounded-md px-3 py-2 text-base font-medium",
    btnForRenters: "bg-black text-white hover:bg-gray-700 rounded-md px-3 py-2",
    btnForOwners: "bg-blue-500 hover:bg-blue-300 rounded-md px-3 py-2",
  };

  if (href) {
    return (
      <Link href={href} className={`${styles[type]} ${active}`}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <Link href={href} className={styles[type]}>
        {text}
      </Link>
    );
  }
}

export default LinkButton;
