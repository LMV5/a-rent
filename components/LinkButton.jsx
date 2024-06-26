"use client";

import Link from "next/link";

function LinkButton({ children, href, style, pathname }) {
  const base =
    "text-white hover:text-gray hover:transition-all hover:delay-50 rounded-md px-3 py-2";

  const styles = {
    primary:
      base +
      "py-3 px-4 md:px-6 md:py-4 hover:bg-cosmicLatte hover:bg-opacity-25",
    property: "text-gray hover:underline decoration-persianGreen ",
    logo: "flex flex-shrink-0 flex-row items-center",
    viewBtn:
      "block bg-persianGreen text-white text-center py-4 px-6 rounded-xl hover:bg-opacity-75",
    menuItem: `flex px-3 py-3 text-sm hover:text-slateBlue text-gray ${
      pathname === href ? "bg-teaGreen bg-opacity-50" : ""
    }`,
    dropdownMenu:
      "block px-4 py-2 text-sm text-gray hover:text-teaGreen hover:bg-darkPurple",
    btnBack:
      "text-gray hover:bg-gray hover:bg-opacity-10 flex items-center px-4 py-2 hover:rounded-full inline-block",
    edit: "bg-periwinkle text-gray px-3 py-2 rounded-md mt-2",
    details:
      "h-[36px] bg-persianGreen hover:bg-opacity-75 text-gray px-4 py-2 rounded-lg text-center text-sm",
  };

  if (href) {
    return (
      <Link href={href} className={`${styles[style]}`}>
        {children}
      </Link>
    );
  }
}

export default LinkButton;
