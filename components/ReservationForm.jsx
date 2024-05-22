"use client";

import { useState } from "react";
import { useReservation } from "@/context/ReservationContext";
import { useParams } from "next/navigation";
import { differenceInDays } from "date-fns";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based in JavaScript
  const year = date.getFullYear();
  return `${day}/${month}/${year}` || "";
}

const ReservationForm = ({ property }) => {
  const { range, resetRange } = useReservation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { id: propertyId } = useParams();

  const startDate = range?.from ? formatDate(String(range.from)) : "";
  const endDate = range?.to ? formatDate(String(range.to)) : "";
  const price = property.rates.nightly;
  const numNights = differenceInDays(range?.to, range?.from);
  const totalAmount = numNights * price;
  console.log(price, numNights, totalAmount, startDate, endDate);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = {
  //     owner: "6617ecaa2c847bd2317ab3e3",
  //     guest: { name, email },
  //     dates: { startDate, endDate },
  //     numNights: Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)),
  //     propertyId,
  //     rates,
  //     totalAmount,
  //   };
  //   await onSubmit(formData);
  // };

  return (
    // <form onSubmit={handleSubmit} className="px-2 min-w-72">
    <form className="px-2 min-w-72">
      <div className="mb-4">
        <label className="block text-gray">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div className="mb-4 text-gray text-md">
        <p>Start date: {startDate}</p>
        <p>End date: {endDate}</p>
        <p>Nights: {numNights || ""}</p>
        <p className="mt-5 text-2xl">Total Amount: €{totalAmount || 0}</p>
      </div>
      <div className="flex gap-5 pb-2">
        {range?.from || range?.to ? (
          <button
            className="bg-red bg-opacity-40 hover:bg-opacity-70 text-gray font-bold py-3 px-7 rounded-full focus:outline-none focus:shadow-outline"
            onClick={() => {
              resetRange();
              setName("");
              setEmail("");
            }}
          >
            Clear
          </button>
        ) : null}
        <button
          className="bg-slateBlue hover:bg-opacity-70 text-gray font-bold py-3 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;
