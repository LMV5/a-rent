import Image from "next/image";
import logo from "@/assets/images/logo-white.png";
import React from "react";
import LinkButton from "./LinkButton";

const Logo = () => {
  return (
    <LinkButton href="/" type="logo">
      <Image className="h-10 w-auto" src={logo} alt="logo of A-Rent" />
      <span className="hidden md:block text-gray text-2xl font-bold ml-2">
        A-Rent
      </span>
    </LinkButton>
  );
};

export default Logo;
