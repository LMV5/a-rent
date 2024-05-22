import ReservationForm from "@/components/ReservationForm";
import DateSelector from "@/components/DateSelector";

function Page() {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-6xl p-8 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Reservation Form</h2>
        <div className="grid grid-cols-6 grid-rows-2 border border-gray min-h-[600px]">
          <DateSelector />
          <ReservationForm />
        </div>
      </div>
    </div>
  );
}

export default Page;
