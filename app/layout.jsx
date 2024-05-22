import "@/assets/styles/globals.css";
import NavBar from "@/components/NavBar";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "@/context/GlobalContext";
import { ReservationProvider } from "@/context/ReservationContext";
import "photoswipe/dist/photoswipe.css";
import { Josefin_Sans } from "next/font/google";

const font = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "A-Rent | Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rental, find properties, apartment, hotel, room",
};

export default function RootLayout({ children }) {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <body className={`${font.className} flex flex-col min-height: 100vh`}>
            <NavBar />
            <ReservationProvider>
              <main className="flex-1">{children}</main>
            </ReservationProvider>
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
}
