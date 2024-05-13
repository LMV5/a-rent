"use client";

import Link from "next/link";

function LinkButton({ children, href, type, active, onClick, key, disabled }) {
  const base =
    "hover:text-teaGreen hover:transition-all hover:delay-50 rounded-md px-3 py-2";

  const styles = {
    primary: base + "py-3 px-4 md:px-6 md:py-4 hover:bg-darkPurple",
    logo: "flex flex-shrink-0 flex-row items-center",
    viewBtn:
      "block bg-darkPurple text-teaGreen text-center py-4 px-6 rounded-xl",
    mobileMenu:
      "flex items-center text-gray hover:bg-darkPurple hover:text-teaGreen rounded-md px-3 py-2",
    dropdownMenu:
      "block px-4 py-2 text-sm text-gray-700 hover:text-teaGreen hover:bg-darkPurple",
    btnBack: "text-blue-500 hover:text-blue-600 flex items-center mb-3",
    read: "mt-4 py-1 px-3 rounded-md text-gray bg-ashGray flex items-center mb-3",
    edit: "bg-periwinkle text-gray px-3 py-2 rounded-md mt-2",
    new: "mt-4 py-1 px-3 rounded-md text-teaGreen bg-slateBlue flex items-center mb-3",
    delete: "mt-4 bg-red text-teaGreen py-1 px-3 rounded-md",
    details:
      "h-[36px] bg-darkPurple hover:bg-purple text-teaGreen px-4 py-2 rounded-lg text-center text-sm",
    addBookmark:
      "bg-persianGreen hover:bg-persianGreenLight text-teaGreen font-bold w-full py-2 px-4 rounded-full flex items-center justify-center",
    removeBookmark:
      "bg-red hover:bg-fuchsia-900 text-teaGreen font-bold w-full py-2 px-4 rounded-full flex items-center justify-center",
  };

  if (href) {
    return (
      <Link key={key} href={href} className={`${styles[type]}`}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        key={key}
        onClick={onClick}
        className={`${styles[type]}`}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}

export default LinkButton;
