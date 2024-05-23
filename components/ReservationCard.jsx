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
  const { guestData, dates, numNights, totalAmount } = reservation;

  console.log(guestData, dates, numNights, totalAmount);
  return (
    <div className="border-gray rounded-lg shadow-lg p-5 flex gap-5">
      <p>
        <span className="text-bold text-gray text-2xl">{numNights}</span> nights
        in <span className="text-bold text-gray text-2xl">Room 001</span>
      </p>
      <div className="flex">
        <div className="flex flex-col">
          <span>CHECK-IN</span> <span>{formatDate(dates.startDate)}</span>{" "}
          <span>14:00 - 19:30</span>
        </div>
        <div className="flex flex-col">
          <span>CHECK-OUT</span> <span>{formatDate(dates.endDate)}</span>{" "}
          <span>until 11:00</span>
        </div>
      </div>
      <p>
        {" "}
        <FaUserFriends /> {guestData.name} {guestData.email}
      </p>

      <span>
        <FaFileInvoiceDollar /> Total amount: {totalAmount}
      </span>
    </div>
  );
}

export default ReservationCard;
