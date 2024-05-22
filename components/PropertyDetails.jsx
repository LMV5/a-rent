"use client";

import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

import { useState } from "react";
import DateSelector from "@/components/DateSelector";
import ReservationForm from "@/components/ReservationForm";

function PropertyDetails({ property }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="col-start-1 col-end-7 rounded-lg shadow-lg bg-cosmicLatte ">
          <div className="flex justify-between">
            <h2 className="text-2xl p-5">Reservation Form</h2>
            <button className="pr-5" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="flex justify-center gap-20">
            <DateSelector />
            <ReservationForm property={property} />
          </div>
        </div>
      )}

      <div className="col-start-1 col-end-3 rounded-lg shadow-lg p-5">
        <div className="flex gap-10">
          <h1 className="text-3xl font-bold mb-4">{property.name}</h1>

          <p className="text-4xl font-bold text-slateBlue">
            {`€${property.rates.nightly.toLocaleString()}`}
          </p>
        </div>

        <div className="grid mt-10">
          <button
            className="text-2xl bg-teaGreen  hover:bg-opacity-70 text-gray px-4 py-2 rounded-full text-center"
            onClick={() => setIsOpen(true)}
          >
            Reserve now
          </button>
        </div>
      </div>

      <div className="col-start-3 col-end-5 rounded-lg shadow-lg p-5">
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
        <p className="text-gray-500 mb-4 text-center">{property.description}</p>
      </div>

      <div className="col-start-5  col-end-7 rounded-lg shadow-lg p-5">
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
    </>
  );
}

export default PropertyDetails;
