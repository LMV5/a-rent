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
    const fetchReservations = async () => {
      try {
        const res = await fetch(`/api/properties/${propertyId}/reservation`);
        if (res.status === 200) {
          const data = await res.json();
          setReservation(data);
          console.log(data);
        } else {
          console.log(res.statusText);
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

  return (
    <div className="max-w-6xl">
      <h2 className="text-xl font-semibold my-4">Your reservations</h2>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="text-lg">
          {reservations.length === 0 ? (
            <p className="text-lg">
              You have no reservations yet. Check out our{" "}
              <Link href="/properties" className="underline text-slateBlue">
                properties.
              </Link>
            </p>
          ) : (
            <div className="flex flex-col gap-5">
              {reservations.map((reservation) => (
                <ReservationCard
                  key={reservation._id}
                  reservation={reservation}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
