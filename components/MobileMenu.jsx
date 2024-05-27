import Link from "next/link";

function MobileMenu({ session, providers, signIn, setIsMobileMenuOpen }) {
  return (
    <div id="mobile-menu">
      <div className="space-y-1 px-5 pb-3 pt-2">
        <Link
          href="/"
          className="flex items-center text-white hover:bg-cosmicLatte hover:bg-opacity-25 hover:text-gray hover:transition-all hover:delay-50 rounded-md px-3 py-2"
          onClick={() => {
            setIsMobileMenuOpen(false);
          }}
        >
          Home
        </Link>
        <Link
          href="/properties"
          className="flex items-center text-white hover:bg-cosmicLatte hover:bg-opacity-25 hover:text-gray hover:transition-all hover:delay-50 rounded-md px-3 py-2"
          onClick={() => {
            setIsMobileMenuOpen(false);
          }}
        >
          Properties
        </Link>
        {session && (
          <Link
            href="/properties/add"
            className="flex items-center text-white hover:bg-cosmicLatte hover:bg-opacity-25 hover:text-gray hover:transition-all hover:delay-50 rounded-md px-3 py-2"
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
              className="items-center text-white rounded-md px-3 py-2 my-4 hover:bg-cosmicLatte hover:bg-opacity-25 hover:text-gray hover:transition-all hover:delay-50"
            >
              Sign up
            </button>
          ))}
      </div>
    </div>
  );
}

export default MobileMenu;
