import React from "react";
import "@/assets/styles/globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "A-Rent | Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rental, find properties, apartment, hotel, room",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="flex flex-col min-height: 100vh;">
          <NavBar />
          <main className="flex-grow: 1">{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
