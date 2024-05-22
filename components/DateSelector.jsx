"use client";

// import { isWithinInterval } from "date-fns";
import { useReservation } from "@/context/ReservationContext";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// function isAlreadyBooked(range, dateArr) {
//   return (
//     range.from &&
//     range.to &&
//     dateArr.some((date) =>
//       isWithinInterval(date, { start: range.from, end: range.to })
//     )
//   );
// }

function DateSelector() {
  const { range, setRange, resetRange } = useReservation();

  const minBookingLength = 1;
  const maxBookingLength = 23;

  return (
    <div className="">
      <DayPicker
        className=""
        mode="range"
        onSelect={setRange}
        selected={range}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 2}
        captionLayout="dropdown"
        numberOfMonths={2}
      />
    </div>
  );
}

export default DateSelector;
