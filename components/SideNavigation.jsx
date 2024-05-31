import LinkButton from "@/components/LinkButton";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  FaHouseUser,
  FaCalendarAlt,
  FaBookmark,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

export default function SideNavigation() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="flex rounded-md py-1 sm:flex-col ssm:min-w-max">
      <LinkButton href="/profile" style="menuItem" pathname={pathname}>
        <FaHouseUser className=" text-slateBlue" />{" "}
        <span className="hidden sm:block ssm:px-3">Your Profile</span>
      </LinkButton>

      <LinkButton
        href="/profile/reservation"
        style="menuItem"
        pathname={pathname}
      >
        <FaCalendarAlt className=" text-slateBlue" />{" "}
        <span className="hidden sm:block ssm:px-3">Reservations</span>
      </LinkButton>

      <LinkButton href="/profile/saved" style="menuItem" pathname={pathname}>
        <FaBookmark className=" text-slateBlue" />{" "}
        <span className="hidden sm:block ssm:px-3">Saved Properties</span>
      </LinkButton>

      {isAdmin && (
        <LinkButton
          href="/profile/listings"
          style="menuItem"
          pathname={pathname}
        >
          <FaClipboardList className=" text-slateBlue" />{" "}
          <span className="hidden sm:block ssm:px-3">Your Listings</span>
        </LinkButton>
      )}

      <div className="flex px-4 sm:py-3">
        <button
          onClick={() => {
            signOut();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") signOut();
          }}
          href="#"
          className="block text-sm text-gray hover:text-slateBlue "
        >
          <FaSignOutAlt className="inline-block text-slateBlue" />{" "}
          <span className="hidden sm:inline-block sm:px-2">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
