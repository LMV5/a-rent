import {
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaUserFriends,
  FaMoon,
  FaRegClock,
} from "react-icons/fa";
// import Link from "next/link";
import LinkButton from "./LinkButton";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function ReservationCard({ reservation }) {
  const { guestData, dates, numNights, totalAmount, propertyName, property } =
    reservation;

  return (
    <div className="border-gray rounded-lg shadow-lg p-5 flex flex-col gap-5 lg:flex-row lg:gap-10">
      <p>
        <span className="text-bold text-2xl text-persianGreen">
          {numNights} nights{" "}
        </span>
        <LinkButton href={`/properties/${property}`} style="property">
          in {propertyName}
        </LinkButton>
      </p>
      <div className="flex mt-2 gap-3 lg:gap-7">
        <div className="flex flex-col gap-2">
          <span className="text-xs">CHECK-IN</span>{" "}
          <span>{formatDate(dates.startDate)}</span>{" "}
          <span className="text-sm">14:00 - 19:30</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs">CHECK-OUT</span>{" "}
          <span>{formatDate(dates.endDate)}</span>{" "}
          <span className="text-sm">until 11:00</span>
        </div>
      </div>
      <div className="py-2 lg:py-0">
        <span className="flex gap-5 text-persianGreen">
          <FaUserFriends className="pt-1" /> {guestData.numGuests}
        </span>
        <div className="flex flex-col">
          <p>Reserved by:</p>
          <span>{guestData.name}</span>
          <span>{guestData.email}</span>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="flex gap-5 text-persianGreen">
          <FaFileInvoiceDollar className="pt-1 hidden" /> Total amount:{" "}
        </span>
        <span className="text-bold text-persianGreen text-2xl ">
          €{totalAmount}
        </span>
      </div>
    </div>
  );
}

export default ReservationCard;
