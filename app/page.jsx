import React from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";

export const metadata = {
  title: "A-Rent | Find The Perfect Rental",
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeProperties />
    </>
  );
};

export default HomePage;
