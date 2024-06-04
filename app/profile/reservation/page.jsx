"use client";

import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { toast } from "react-toastify";
import ReservationCard from "@/components/ReservationCard";

export default function Page() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("date");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch(`/api/reservations`);
        if (res.status === 200) {
          const data = await res.json();
          setReservations(data);
        } else {
          toast.error("Failed to fetch reservations");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch reservations");
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const sortReservations = (reservations, type) => {
    const sorted = [...reservations];
    if (type === "date") {
      sorted.sort(
        (a, b) => new Date(a.dates.startDate) - new Date(b.dates.startDate)
      );
    } else if (type === "nights") {
      sorted.sort((a, b) => a.numNights - b.numNights);
    }
    return sorted;
  };

  const sortedReservations = sortReservations(reservations, sortType);

  const handleDeleteReservation = async function (reservationId) {
    const confirmed = window.confirm(
      "Are you sure you want do delete this reservation?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/reservations/${reservationId}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        const updatedReservations = reservations.filter(
          (reservation) => reservation._id !== reservationId
        );
        setReservations(updatedReservations);
        toast.success("Reservation deleted successfully");
      } else {
        toast.error("Failed to delete reservation");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete reservation");
    }
  };

  return (
    <div className="my-4 ">
      <h2 className="flex flex-col text-xs sm:text-xl font-semibold gap-5 ml-5 my-4">
        Your reservations
      </h2>
      <div className="ml-5 my-5">
        <label htmlFor="sort" className="mr-2">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="date">Date</option>
          <option value="nights">Nights</option>
        </select>
      </div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="text-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5 sm:pr-5 sm:place-items-center">
          {sortedReservations.length === 0 ? (
            <p className="text-lg">
              You have no reservations yet. Check out our{" "}
              <Link href="/properties" className="underline text-slateBlue">
                properties.
              </Link>
            </p>
          ) : (
            <>
              {sortedReservations.map((reservation) => (
                <ReservationCard
                  key={reservation._id}
                  reservation={reservation}
                  onDeleteReservation={handleDeleteReservation}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
