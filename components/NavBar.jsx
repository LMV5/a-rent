"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import profileDefault from "@/assets/images/profile.png";
import Link from "next/link";
import LinkButton from "./LinkButton";
import Logo from "./Logo";
import { FaGoogle } from "react-icons/fa";
import MobileMenu from "./MobileMenu";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function NavBar() {
  const { data: session } = useSession();
  const admin = session?.user?.role === "admin";
  const profileImage = session?.user?.image;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  return (
    <nav className="bg-persianGreen relative px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-20 items-center justify-between">
        {/* <!-- Mobile menu button--> */}
        <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
          <button
            type="button"
            id="mobile-dropdown-button"
            className="relative inline-flex text-white items-center justify-center rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-inset"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          >
            <span className="absolute -inset-0.5"></span>
            <svg
              className="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start text-xl">
          <Logo />
          <div className="hidden md:ml-6 md:block">
            <div className="flex space-x-2">
              <LinkButton href="/" style="primary">
                Home
              </LinkButton>
              <LinkButton href="/properties" style="primary">
                Properties
              </LinkButton>
              {session && admin && (
                <LinkButton href="/properties/add" style="primary">
                  Add property
                </LinkButton>
              )}
            </div>
          </div>
        </div>

        {/* <!-- Right Side Menu (Logged Out) --> */}
        {!session && (
          <div className="flex md:ml-6">
            <div className="flex items-center">
              {providers &&
                Object.values(providers).map((provider, index) => (
                  <button
                    onClick={() => signIn(provider.id)}
                    key={index}
                    className="text-sm flex items-center text-white hover:bg-cosmicLatte hover:bg-opacity-25 rounded-md px-3 py-4"
                  >
                    <FaGoogle className="text-white mr-2 mb-1" />
                    <span>Sign up with Google</span>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* <!-- Right Side Menu (Logged In) --> */}
        {session && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setIsProfileMenuOpen((isOpen) => !isOpen)}
                >
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={profileImage || profileDefault}
                    alt=""
                    width={40}
                    height={40}
                  />
                </button>
              </div>

              {isProfileMenuOpen && (
                <div
                  id="user-menu"
                  className="absolute right-0 z-40 mt-2 w-48 origin-top-right rounded-md bg-teaGreen py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm hover:text-gray  hover:bg-cosmicLatte hover:bg-opacity-75"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                    }}
                  >
                    Your Profile
                  </Link>

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      signOut();
                    }}
                    href="#"
                    className="block px-4 py-2 text-sm hover:text-gray hover:bg-cosmicLatte hover:bg-opacity-75"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {isMobileMenuOpen && (
        <MobileMenu
          session={session}
          providers={providers}
          signIn={signIn}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      )}
    </nav>
  );
}
export default NavBar;
