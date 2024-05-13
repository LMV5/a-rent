import LinkButton from "./LinkButton";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex bg-gray-200 py-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
          <ul className="flex space-x-4">
            <li className="hover:underline">
              <LinkButton href="/properties">Properties</LinkButton>
            </li>
            <li className="hover:underline">
              <LinkButton href="/terms">Terms of Service</LinkButton>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; {currentYear} A-Rent. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
