import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "@/components/DeleteReservation";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), { addSuffix: true }).replace(
    "about ",
    ""
  );

export default function ReservationCard({ booking }) {
  const { id, guestId, startDate, endDate, numNights } = booking;

  return <div>Reservation Card</div>;
}
