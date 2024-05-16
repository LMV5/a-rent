"use client";

import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
  FaMapMarker,
} from "react-icons/fa";

function PropertyDetails({ property }) {
  return (
    <>
      <div className="flex flex-col">
        <div className="px-6 py-6 rounded-lg shadow-lg text-center md:text-left">
          <div className="text-gray mb-4">{property.type}</div>
          <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
          <div className="text-gray mb-4 flex align-middle justify-center md:justify-start">
            <FaMapMarker className="text-lg mr-2 text-persianGreen" />
            <p className="text-persianGreen">
              {property.location.street} {property.location.city}{" "}
              {property.location.country}
            </p>
          </div>

          <h3 className="text-lg font-bold my-6 text-gray p-2">
            Rates & Options
          </h3>
          <div className="flex flex-col md:flex-row justify-around">
            <div className="flex items-center justify-center mb-4 border-b border-gray md:border-b-0 pb-4 md:pb-0">
              <div className="mr-2 font-bold">Nightly</div>
              <div className="text-2xl font-bold text-slateBlue">
                {property.rates.nightly ? (
                  `€${property.rates.nightly.toLocaleString()}`
                ) : (
                  <FaTimes className="text-red" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-center mb-4 border-b border-gray md:border-b-0 pb-4 md:pb-0">
              <div className="mr-2 font-bold">Weekly</div>
              <div className="text-2xl text-slateBlue font-bold">
                {property.rates.weekly ? (
                  `€${property.rates.weekly.toLocaleString()}`
                ) : (
                  <FaTimes className="text-red" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
              <div className="text-gray mr-2 font-bold">Monthly</div>
              <div className="text-2xl font-bold text-slateBlue">
                {property.rates.monthly ? (
                  `€${property.rates.monthly.toLocaleString()}`
                ) : (
                  <FaTimes className="text-red" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg shadow-lg mt-6">
          <h3 className="text-lg font-bold mb-6">Description & Details</h3>
          <div className="flex justify-center gap-4 mb-4 text-xl space-x-9">
            <p>
              <FaBed className="inline-block mr-2" /> {property.beds}
              <span className="hidden sm:inline"> Beds</span>
            </p>
            <p>
              <FaBath className="inline-block mr-2" /> {property.baths}
              <span className="hidden sm:inline"> Baths</span>
            </p>
            <p>
              <FaRulerCombined className="inline-block mr-2" />
              {property.square_metre}{" "}
              <span className="hidden sm:inline">m&#178;</span>
            </p>
          </div>
          <p className="text-gray-500 mb-4 text-center">
            {property.description}
          </p>
        </div>

        <div className="p-6 rounded-lg shadow-lg mt-6">
          <h3 className="text-lg font-bold mb-6">Amenities</h3>

          <ul className="m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
            {property.amenities.map((amenity, index) => (
              <li key={index}>
                <FaCheck className="inline-block mr-2 text-persianGreen" />
                {amenity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default PropertyDetails;
