import LinkButton from "@/components/LinkButton";
import { FaArrowRight } from "react-icons/fa";
import homeImage from "@/public/images/home.jpg";
import Image from "next/image";

function Hero() {
  return (
    <section className="grid relative min-h-screen">
      <Image
        src={homeImage}
        alt="image of Izola"
        height={0}
        width={0}
        priority={true}
        sizes="100vw"
        className="object-cover w-full h-full fill absolute object-top inset-0 z-0 filter brightness-50 "
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 flex flex-col items-center text-center justify-center">
        <h1 className="tracking-tight text-3xl font-extrabold text-white sm:text-5xl md:text-6xl">
          Find Your Dream Apartment
        </h1>
        <p className="text-2xl text-white">Reserve now, pay upon arrival</p>
        <p className="py-10 text-white text-md sm:text-2xl font-bold max-w-6xl">
          Discover the perfect escape nestled in the heart of Izola, Slovenia.
          Our apartments offer a serene retreat just moments away from the
          waters of the Adriatic Sea. Located a 5-minute stroll from the coast,
          our accommodations provide the ideal blend of convenience and
          tranquility. Immerse yourself in the charm of Izola's historic
          streets, indulge in coastal cuisine, or simply unwind on the beaches
          just minutes from your doorstep. Whether you seek adventure or
          relaxation, our apartments offer the perfect starting point for your
          Slovenian seaside getaway.
        </p>
        <div className="mt-6 relative z-10 max-w-lg px-6 justify-self-end text-xl">
          <LinkButton href="/properties" style="viewBtn">
            <span className="flex font-semibold">
              Explore our apartments{" "}
              <FaArrowRight className="mt-1 ml-3 text-white" />
            </span>
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

export default Hero;
