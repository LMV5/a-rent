"use client";

import { useState } from "react";
import { useReservation } from "@/context/ReservationContext";
import { useParams } from "next/navigation";
import { differenceInDays } from "date-fns";
import { toast } from "react-toastify";

const ReservationForm = ({ property, id }) => {
  const { range, resetRange } = useReservation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  const { id: propertyId } = useParams();
  const startDate = range?.from ? Number(range.from) : "";
  const endDate = range?.to ? Number(range.to) : "";
  const price = property?.rates?.nightly || 0;
  const numNights =
    range?.from && range?.to ? differenceInDays(range?.to, range?.from) : 0;
  const totalAmount = numNights * price;
  const maxNumGuests = property.numGuests;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      owner: property.owner,
      property,
      propertyName: property.name,
      dates: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
      numNights,
      rates: { nightly: price },
      totalAmount,
      guestId: id,
      guestData: { name, email, numGuests },
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
      setNumGuests("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-2 min-w-72 lg:col-start-3">
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

      <div className="mb-4 ">
        <label className="block text-gray">Guests:</label>
        <select
          onChange={(e) => setNumGuests(+e.target.value)}
          className="block w-full px-3 py-3 pr-8 border border-gray rounded leading-tight focus:outline-none focus:shadow-outline-slateBlue focus:border-slateBlue"
        >
          {Array.from({ length: maxNumGuests }, (_, i) => i + 1).map((num) => (
            <option className="py-1" value={num} key={num}>
              {num}
            </option>
          ))}
        </select>

        <p className="pt-4">Nights: {numNights || ""}</p>
        <p className="mt-5 text-2xl">Total Amount: €{totalAmount || 0}</p>
      </div>
      <div className="flex gap-5 pb-2">
        {range?.from || range?.to ? (
          <button
            className="bg-red bg-opacity-40 hover:bg-opacity-70 text-gray font-bold py-3 px-4 w-full rounded-full focus:outline-none focus:shadow-outline"
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
          className="bg-persianGreen hover:bg-opacity-70 text-gray font-bold py-3 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;
