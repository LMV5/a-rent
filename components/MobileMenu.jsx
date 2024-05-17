import LinkButton from "./LinkButton";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

function MobileMenu({ session, providers, signIn, setIsMobileMenuOpen }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathName = usePathname();

  return (
    <div id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2">
        <Link
          href="/"
          className="flex items-center text-gray hover:bg-cosmicLatte hover:text-gray hover:transition-all hover:delay-50 rounded-md px-3 py-2"
          onClick={() => {
            setIsMobileMenuOpen(false);
          }}
        >
          Home
        </Link>
        <Link
          href="/properties"
          className="flex items-center text-gray hover:bg-cosmicLatte hover:text-gray hover:transition-all hover:delay-50 rounded-md px-3 py-2"
          onClick={() => {
            setIsMobileMenuOpen(false);
          }}
        >
          Properties
        </Link>
        {session && (
          <Link
            href="/properties/add"
            className="flex items-center text-gray hover:bg-cosmicLatte hover:text-gray hover:transition-all hover:delay-50 rounded-md px-3 py-2"
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
          >
            Add Property
          </Link>
        )}

        {!session &&
          providers &&
          Object.values(providers).map((provider, index) => (
            <button
              onClick={() => signIn(provider.id)}
              key={index}
              type="mobileMenu"
            >
              Login or Register
            </button>
          ))}
      </div>
    </div>
  );
}

export default MobileMenu;
// active={`${pathName === "/" ? "bg-black" : ""} `}
