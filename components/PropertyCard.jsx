import Image from "next/image";
import LinkButton from "./LinkButton";
import { FaBed, FaBath, FaRulerCombined, FaUserFriends } from "react-icons/fa";

const PropertyCard = ({ property }) => {
  const getRateDisplay = () => {
    const { rates } = property;

    if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/night`;
    }
  };

  return (
    <div className="rounded-xl shadow-lg relative">
      <Image
        src={property.images[0]}
        alt={`image of ${property.name}`}
        height={0}
        width={0}
        priority={true}
        sizes="100vw"
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray">{property.type}</div>
          <h3 className="text-xl font-bold text-gray sm:text-2xl">
            {property.name}
          </h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-teaGreen px-4 py-2 rounded-lg text-gray font-bold text-right md:text-center lg:text-right">
          €{getRateDisplay()}
        </h3>

        <div className="flex justify-center gap-4 text-gray mb-4 text-sm ssm:text-base sm:text-md">
          <p>
            <FaUserFriends className="inline mr-2 pb-1" />
            {property.numGuests}
            <span className="hidden lg:inline"> Guests</span>
          </p>
          <p>
            <FaBed className="inline mr-2 pb-1" /> {property.beds}
            <span className="md:hidden lg:inline"> Beds</span>
          </p>
          <p>
            <FaBath className="inline mr-2 pb-1" /> {property.baths}
            <span className="md:hidden lg:inline"> Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline mr-2 pb-1" />
            {property.square_metre}{" "}
            <span className="md:hidden lg:inline">m&#178;</span>
          </p>
        </div>

        <div className="flex flex-col justify-between mb-4">
          <LinkButton href={`/properties/${property._id}`} style="details">
            Details
          </LinkButton>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
