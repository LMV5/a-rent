import React from "react";
import Link from "next/link";

export const metadata = {
  title: "A-Rent | Find The Perfect Rental",
};

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl">Welcome</h1>
      <Link href="/properties">Show Properties</Link>
    </div>
  );
};

export default HomePage;
