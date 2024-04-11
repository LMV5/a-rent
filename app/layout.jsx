import React from "react";
import "@/assets/styles/globals.css";

export const metadata = {
  title: "A-Rent | Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords:
    "rental, find rental, find properties, apartment, condo, cottage, cabin, house, chalet",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
