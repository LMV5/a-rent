import LinkButton from "@/components/LinkButton";
import { signOut } from "next-auth/react";
import {
  FaHouseUser,
  FaCalendarAlt,
  FaBookmark,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

export default function SideNavigation() {
  return (
    <div className="mt-2 ml-8 w-48 rounded-md py-1">
      <div className="flex">
        <LinkButton href="/profile" style="menuItem">
          <FaHouseUser className="mb-2 mr-3 text-slateBlue" /> Your Profile
        </LinkButton>
      </div>

      <div className="flex">
        <LinkButton href="/profile/reservations" style="menuItem">
          <FaCalendarAlt className="mb-2 mr-3 text-slateBlue" /> Reservations
        </LinkButton>
      </div>

      <div className="flex">
        <LinkButton href="/profile/saved" style="menuItem">
          <FaBookmark className="mb-2 mr-3 text-slateBlue" /> Saved Properties
        </LinkButton>
      </div>

      <div className="flex">
        <LinkButton href="/profile/listings" style="menuItem">
          <FaClipboardList className="mb-2 mr-3 text-slateBlue" /> Your Listings
        </LinkButton>
      </div>

      <div className="flex">
        <button
          onClick={() => {
            signOut();
          }}
          href="#"
          className="block px-4 py-2 text-sm text-gray hover:text-slateBlue "
        >
          <FaSignOutAlt className="inline-block mb-2 mr-3 text-slateBlue" />{" "}
          Sign Out
        </button>
      </div>
    </div>
  );
}
