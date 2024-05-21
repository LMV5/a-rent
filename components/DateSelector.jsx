"use client";

import { isWithinInterval } from "date-fns";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function isAlreadyBooked(range, dateArr) {
  return (
    range.from &&
    range.to &&
    dateArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector() {
  const minBookingLength = 1;
  const maxBookingLength = 23;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
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
      <div className="flex items-center justify-between px-8 bg-teaGreen"></div>
    </div>
  );
}

export default DateSelector;
