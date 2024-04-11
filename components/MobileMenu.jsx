import LinkButton from "./LinkButton";
import { usePathname } from "next/navigation";

function MobileMenu({ isLoggedIn, setIsLoggedIn }) {
  const pathName = usePathname();

  return (
    <div id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2">
        <LinkButton
          href="/"
          type="mobileMenu"
          active={`${pathName === "/" ? "bg-black" : ""} `}
        >
          Home
        </LinkButton>
        <LinkButton
          href="/properties"
          type="mobileMenu"
          active={`${pathName === "/properties" ? "bg-black" : ""} `}
        >
          Properties
        </LinkButton>
        {isLoggedIn && (
          <LinkButton
            href="/properties/add"
            type="mobileMenu"
            active={`${pathName === "/properties/add" ? "bg-black" : ""} `}
          >
            Add Property
          </LinkButton>
        )}

        {!isLoggedIn && (
          <button className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-4">
            <span>Login or Register</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default MobileMenu;
// active={`${pathName === "/" ? "bg-black" : ""} `}
