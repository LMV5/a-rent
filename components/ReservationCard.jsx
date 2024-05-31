import { FaFileInvoiceDollar, FaUserFriends } from "react-icons/fa";
import LinkButton from "./LinkButton";

function formatDate(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
}

function ReservationCard({ reservation }) {
  const {
    guestData: { name, email, numGuests },
    dates: { startDate, endDate },
    numNights,
    totalAmount,
    propertyName,
    property,
  } = reservation;

  return (
    <div className="border rounded-lg shadow-lg p-5 flex flex-col gap-5">
      <p>
        <span className="text-bold text-2xl text-persianGreen">
          {numNights} nights{" "}
        </span>
        <LinkButton href={`/properties/${property}`} style="property">
          in {propertyName}
        </LinkButton>
      </p>
      <div className="flex mt-2 gap-10 sm:flex-row lg:gap-7">
        <div className="flex flex-col gap-2">
          <span className="text-xs">CHECK-IN</span>{" "}
          <span>{formatDate(startDate)}</span>{" "}
          <span className="text-sm">14:00 - 19:30</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs">CHECK-OUT</span>{" "}
          <span>{formatDate(endDate)}</span>{" "}
          <span className="text-sm">until 11:00</span>
        </div>
      </div>
      <div className="flex py-2 lg:py-0">
        <span className="flex gap-5 text-persianGreen">
          <FaUserFriends className="hidden pt-1" /> Number of guests:{" "}
          {numGuests}
        </span>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <p>Reserved by:</p>
          <span>{name}</span>
          <a href={`mailto:${email}`} className="text-slateBlue underline">
            {email}
          </a>
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
    </div>
  );
}

export default ReservationCard;
