import Link from "next/link";
import ReservationCard from "@/components/ReservationCard";

export default function Page() {
  const bookings = [];

  return (
    <div className="m-auto text-xl text-gray font-semibold mb-4 mt-4">
      <h2 className="mb-7">Your reservations</h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link href="/properties" className="underline text-slateBlue">
            properties.
          </Link>
        </p>
      ) : (
        <ul class Name="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
