import Link from "next/link";
import LinkButton from "./LinkButton";

function MobileMenu() {
  return (
    <div id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2">
        <LinkButton href="/" type="mobileMenu">
          Home
        </LinkButton>
        <LinkButton href="/properties" type="mobileMenu">
          Properties
        </LinkButton>
        <LinkButton href="/properties/add" type="mobileMenu">
          Add Property
        </LinkButton>
        <button className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-4">
          <span>Login or Register</span>
        </button>
      </div>
    </div>
  );
}

export default MobileMenu;
