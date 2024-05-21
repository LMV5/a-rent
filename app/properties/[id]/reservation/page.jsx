import { FaTimes } from "react-icons/fa";
import ReservationForm from "@/components/ReservationForm";
import DateSelector from "@/components/DateSelector";

function Page() {
  return (
    <div className="flex items-center justify-center z-50">
      <div className="max-w-4xl bg-red p-8 rounded shadow-lg relative">
        <h2 className="text-2xl mb-4">Reservation Form</h2>
        <div className="flex flex-col border border-gray min-h-[600px]">
          <DateSelector />
          <ReservationForm />
        </div>
      </div>
    </div>
  );
}

export default Page;
