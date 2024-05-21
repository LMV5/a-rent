"use client";

import { useState } from "react";

const ReservationForm = ({ propertyId, rates, onSubmit }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    calculateTotalAmount(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    calculateTotalAmount(startDate, date);
  };

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
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 rounded shadow-md"
    >
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
        <label className="block text-gray">Start Date:</label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">End Date:</label>
      </div>
      <div className="mb-4">
        <p className="text-gray">Total Amount: ${totalAmount}</p>
      </div>
      <button type="submit" className="w-full bg-greenTea py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default ReservationForm;
