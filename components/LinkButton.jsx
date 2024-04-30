"use client";

import Link from "next/link";

function LinkButton({ children, href, type, active, onClick, key }) {
  const base =
    "text-white hover:bg-gray-800 hover:text-white rounded-md px-3 py-2";

  const styles = {
    primary: base + "py-3 px-4 md:px-6 md:py-4",
    mobileMenu: "text-white block rounded-md px-3 py-2 text-base font-medium",
    btnForRenters: "text-white hover:bg-gray-700 rounded-md px-3 py-2",
    btnForOwners: "hover:bg-blue-300 rounded-md px-3 py-2",
    btnBack: "text-blue-500 hover:text-blue-600 flex items-center mb-3",
    btnLogIn:
      "flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2",
  };

  if (href) {
    return (
      <Link
        key={key}
        onClick={onClick}
        href={href}
        className={`${styles[type]} ${active}`}
      >
        {children}
      </Link>
    );
  }
}

export default LinkButton;
