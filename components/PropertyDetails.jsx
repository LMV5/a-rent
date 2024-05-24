"use client";

import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCheck,
  FaUserFriends,
} from "react-icons/fa";
import Link from "next/link";

function PropertyDetails({ property }) {
  return (
    <>
      <div className="rounded-lg shadow-lg p-5">
        <div className="flex justify-between gap-5">
          <h1 className="text-xl font-bold mb-6">{property.name}</h1>
          <p className="text-2xl font-bold text-persianGreen">
            {`€${property.rates.nightly.toLocaleString()}`}
          </p>
        </div>

        <h3 className="text-lg font-bold mb-6">Description & Details</h3>
        <div className="grid grid-cols-2 ssm:grid-cols-4 gap-1 mb-4 text-md sm:text-xl">
          <p className="justify-self-center">
            <FaUserFriends className="inline-block mr-2 pb-1" />{" "}
            {property.numGuests}
            <span className="hidden sm:inline"> Guests</span>
          </p>
          <p className="justify-self-center">
            <FaBed className="inline-block mr-2 pb-1" /> {property.beds}
            <span className="hidden sm:inline"> Beds</span>
          </p>
          <p className="justify-self-center">
            <FaBath className="inline-block mr-2 pb-1" /> {property.baths}
            <span className="hidden sm:inline"> Baths</span>
          </p>
          <p className="justify-self-center">
            <FaRulerCombined className="inline-block mr-2 pb-1" />
            {property.square_metre}{" "}
            <span className="hidden sm:inline">m&#178;</span>
          </p>
        </div>

        <p className="text-gray-500 mb-4 text-center">{property.description}</p>
      </div>

      <div className="rounded-lg shadow-lg p-5">
        <h3 className="text-lg font-bold mb-4">Amenities</h3>

        <ul className="m-auto grid grid-cols-1 md:grid-cols-2 list-none">
          {property.amenities.map((amenity, index) => (
            <li key={index}>
              <FaCheck className="inline-block mr-2 text-persianGreen" />
              {amenity}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid my-5 sm:justify-self-center lg:col-start-2">
        <Link
          className="text-2xl bg-persianGreen  hover:bg-opacity-70 text-gray px-4 py-2 rounded-full text-center"
          href={`/properties/${property._id}/reservation`}
        >
          Reserve now
        </Link>
      </div>
    </>
  );
}

export default PropertyDetails;
