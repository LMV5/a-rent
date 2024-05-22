"use client";

import { useState } from "react";
import { useReservation } from "@/context/ReservationContext";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based in JavaScript
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const ReservationForm = ({ propertyId, rates, onSubmit }) => {
  const { range, resetRange } = useReservation();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  // const handleStartDateChange = (date) => {
  //   setStartDate(date);
  //   calculateTotalAmount(date, endDate);
  // };

  // const handleEndDateChange = (date) => {
  //   setEndDate(date);
  //   calculateTotalAmount(startDate, date);
  // };

  const calculateTotalAmount = (start, end) => {
    if (start && end) {
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      const amount = nights * rates.nightly;
      setTotalAmount(amount);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      owner: "6617ecaa2c847bd2317ab3e3",
      guest: { name, email },
      dates: { startDate, endDate },
      numNights: Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)),
      propertyId,
      rates,
      totalAmount,
    };
    await onSubmit(formData);
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
      <div className="mb-4">
        <label className="block text-gray">
          Start Date: {range?.from ? formatDate(String(range?.from)) : ""}
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray">
          End Date: {range?.from ? formatDate(String(range?.to)) : ""}
        </label>
      </div>
      <div className="mb-4">
        <p className="text-gray">Total Amount: ${totalAmount}</p>
      </div>
      <div className="flex gap-5 py-8">
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
