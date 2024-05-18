import LinkButton from "@/components/LinkButton";
import { useSession } from "next-auth/react";
import {
  FaHouseUser,
  FaCalendarAlt,
  FaBookmark,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

export default function SideNavigation() {
  const { data: session } = useSession();

  return (
    <div className="mt-2 ml-8 w-48 rounded-md py-1">
      <div className="flex">
        <FaHouseUser className="mt-2" />
        <LinkButton href="/profile" style="menuItem">
          Your Profile
        </LinkButton>
      </div>

      <div className="flex">
        <FaCalendarAlt className="mt-2" />
        <LinkButton href="/profile/reservations" style="menuItem">
          Reservations
        </LinkButton>
      </div>

      <div className="flex">
        <FaBookmark className="mt-2" />
        <LinkButton href="/properties/saved" style="menuItem">
          Saved Properties
        </LinkButton>
      </div>

      <div className="flex">
        <FaClipboardList className="mt-2" />
        <LinkButton href="/profile/listings" style="menuItem">
          Your Listings
        </LinkButton>
      </div>

      <div className="flex">
        <FaSignOutAlt className="mt-2" />
        <button
          onClick={() => {
            setIsProfileMenuOpen(false);
            signOut();
          }}
          href="#"
          className="block px-4 py-2 text-sm hover:text-gray hover:bg-cosmicLatte hover:bg-opacity-75"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
