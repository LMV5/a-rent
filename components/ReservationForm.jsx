"use client";

import { useState } from "react";
import { useReservation } from "@/context/ReservationContext";
import { useParams } from "next/navigation";
import { differenceInDays } from "date-fns";
import { toast } from "react-toastify";
import { useUser } from "@/context/UserContext";

// function formatDate(dateString) {
//   const date = new Date(dateString);
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   return `${day}/${month}/${year}`;
// }

const ReservationForm = ({ property }) => {
  const { range, resetRange } = useReservation();
  const { user } = useUser();
  console.log(user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { id: propertyId } = useParams();

  const startDate = range?.from ? String(range.from) : "";
  const endDate = range?.to ? String(range.to) : "";
  // const startDate = range?.from;
  // const endDate = range?.to;
  console.log(startDate);
  console.log(endDate);
  const price = property?.rates?.nightly || 0;
  const numNights =
    range?.from && range?.to ? differenceInDays(range?.to, range?.from) : 0;
  const totalAmount = numNights * price;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      owner: property.owner,
      property,
      dates: { startDate, endDate },
      numNights,
      rates: { nightly: price },
      totalAmount,
      // guestId: user._id,
      guestId: "6620d350928168756b91c3c6",
      guestData: { name, email },
    };

    try {
      const res = await fetch(`/api/properties/${propertyId}/reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to create reservation");
      }

      toast.success("Reservation created successfully");
      resetRange();
      setName("");
      setEmail("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-2 min-w-72">
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
