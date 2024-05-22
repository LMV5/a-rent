"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import profileDefault from "@/assets/images/profile.png";
import Link from "next/link";
import LinkButton from "./LinkButton";
import Logo from "./Logo";
import { FaGoogle, FaRegEnvelope } from "react-icons/fa";
import MobileMenu from "./MobileMenu";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import UnreadMessageCount from "./UnreadMessageCount";

function NavBar() {
  const { data: session } = useSession();
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
    <nav className="bg-teaGreen border-b border-periwinkle">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray focus:outline-none focus:ring-2 focus:ring-inset"
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

          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* <!-- Logo --> */}
            <Logo />
            {/* <!-- Desktop Menu Hidden below md screens --> */}
            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-2">
                <LinkButton href="/" style="primary">
                  Home
                </LinkButton>
                <LinkButton href="/properties" style="primary">
                  Properties
                </LinkButton>
                <LinkButton href="/properties/add" style="primary">
                  Add property
                </LinkButton>
              </div>
            </div>
          </div>

          {/* <!-- Right Side Menu (Logged Out) --> */}
          {!session && (
            <div className="hidden md:block md:ml-6">
              <div className="flex items-center">
                {providers &&
                  Object.values(providers).map((provider, index) => (
                    <button
                      onClick={() => signIn(provider.id)}
                      key={index}
                      className="flex items-center text-gray hover:bg-slateBlue hover:bg-opacity-45 rounded-md px-3 py-2"
                    >
                      <FaGoogle className="text-white mr-2" />
                      <span>Login or Register</span>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* <!-- Right Side Menu (Logged In) --> */}
          {session && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              <Link href="/messages" className="relative group">
                <button
                  type="button"
                  className="relative rounded-full p-1 text-gray hover:text-slateBlue focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>

                  <FaRegEnvelope className="" />
                </button>
                <UnreadMessageCount session={session} />
              </Link>

              {/* <!-- Profile dropdown button --> */}

              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setIsProfileMenuOpen((isOpen) => !isOpen)}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
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
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-teaGreen py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                    {/* <Link
                      href="/profile/reservations"
                      className="block px-4 py-2 text-sm hover:text-gray hover:bg-cosmicLatte hover:bg-opacity-75"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      Reservations
                    </Link>
                    <Link
                      href="/properties/saved"
                      className="block px-4 py-2 text-sm hover:text-gray hover:bg-cosmicLatte hover:bg-opacity-75"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      Saved Properties
                    </Link> */}
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
