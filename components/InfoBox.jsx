"use client";

import LinkButton from "./LinkButton";

function InfoBox({
  heading,
  backgroundColor,
  textColor = "text-gray-800",
  text,
  children,
  href,
  type,
}) {
  return (
    <div className={` ${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor} mt-2 mb-4`}>{children}</p>

      <LinkButton href={href} type={type}>
        {text}
      </LinkButton>
    </div>
  );
}

export default InfoBox;
