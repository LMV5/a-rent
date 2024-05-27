"use client";

import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { toast } from "react-toastify";
import ReservationCard from "@/components/ReservationCard";
import { useParams } from "next/navigation";

export default function Page() {
  const [reservations, setReservation] = useState([]);
  const [loading, setLoading] = useState(true);
  const { propertyId } = useParams();

  useEffect(() => {
    const fetchUserReservations = async () => {
      try {
        const res = await fetch(`/api/properties/${propertyId}/reservation`);
        if (res.status === 200) {
          const data = await res.json();
          setReservation(data);
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
    fetchUserReservations();
  }, []);

  // const handleDeleteReservation = async function (reservationId) {
  //   const confirmed = window.confirm(
  //     "Are you sure you want do delete this reservation?"
  //   );

  //   if (!confirmed) return;

  //   try {
  //     const res = await fetch(`/api/properties/reservation`, {
  //       method: "DELETE",
  //     });

  //     if (res.status === 200) {
  //       toast.success("Reservation Deleted");
  //       if (onDelete) onDelete(reservationId);
  //     } else {
  //       toast.error("Failed to delete reservation");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed to delete reservation");
  //   }
  // };

  return (
    <div className="max-w-6xl my-4 ">
      <h2 className="flex flex-col text-xs sm:text-xl font-semibold gap-5 ml-5 my-4">
        Your reservations
      </h2>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="text-lg pr-3  sm:flex sm:gap-10 lg:flex-col">
          {reservations.length === 0 ? (
            <p className="text-lg">
              You have no reservations yet. Check out our{" "}
              <Link href="/properties" className="underline text-slateBlue">
                properties.
              </Link>
            </p>
          ) : (
            <>
              {reservations.map((reservation) => (
                <ReservationCard
                  key={reservation._id}
                  reservation={reservation}
                  // onDeleteReservation={handleDeleteReservation}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
