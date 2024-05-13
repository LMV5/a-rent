import LinkButton from "./LinkButton";
import { usePathname } from "next/navigation";

function MobileMenu({ session, providers, signIn }) {
  const pathName = usePathname();

  return (
    <div id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2">
        <LinkButton href="/" type="mobileMenu">
          Home
        </LinkButton>
        <LinkButton href="/properties" type="mobileMenu">
          Properties
        </LinkButton>
        {session && (
          <LinkButton href="/properties/add" type="mobileMenu">
            Add Property
          </LinkButton>
        )}

        {!session &&
          providers &&
          Object.values(providers).map((provider, index) => (
            <LinkButton
              onClick={() => signIn(provider.id)}
              key={index}
              type="mobileMenu"
            >
              Login or Register
            </LinkButton>
          ))}
      </div>
    </div>
  );
}

export default MobileMenu;
// active={`${pathName === "/" ? "bg-black" : ""} `}
