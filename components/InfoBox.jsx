"use client";

import Link from "next/link";
import LinkButton from "./LinkButton";

function InfoBox({
  heading,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  text,
  children,
  href,
  type,
  onClick,
}) {
  return (
    <div className={` ${backgroundColor} bg-gray-100 p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor} mt-2 mb-4`}>{children}</p>
      {/* <Link
        href={buttonInfo.link}
        className={`${buttonInfo.backgroundColor} inline-block text-white rounded-lg px-4 py-2 hover:opacity-80`}
      >
        {buttonInfo.text}
      </Link> */}
      <LinkButton onClick={onClick} href={href} type={type}>
        {text}
      </LinkButton>
    </div>
  );
}

export default InfoBox;
