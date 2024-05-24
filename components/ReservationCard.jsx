import {
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaUserFriends,
  FaMoon,
  FaRegClock,
} from "react-icons/fa";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function ReservationCard({ reservation }) {
  const { guestData, dates, numNights, totalAmount, propertyName } =
    reservation;

  console.log(guestData, dates, numNights, totalAmount);
  return (
    <div className="border-gray rounded-lg shadow-lg p-5 flex gap-5">
      <p>
        <span className="text-bold text-gray text-2xl">{numNights}</span> nights
        in
        <span className="text-bold text-gray text-xl"> {propertyName}</span>
      </p>
      <div className="flex gap-3">
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
      <div>
        <span className="flex gap-5">
          <FaUserFriends className="pt-1" /> {guestData.numGuests}
        </span>
        <div className="flex flex-col">
          <p>Reserved by:</p>
          <span>{guestData.name}</span>
          <span>{guestData.email}</span>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="flex gap-5">
          <FaFileInvoiceDollar className="pt-1" /> Total amount:{" "}
        </span>
        <span className="text-bold text-gray text-2xl ">€{totalAmount}</span>
      </div>
    </div>
  );
}

export default ReservationCard;
