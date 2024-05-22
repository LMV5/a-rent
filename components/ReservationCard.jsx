function ReservationCard({ reservation }) {
  console.log(reservation);
  return (
    <div>
      <p>Property name</p>
      <p>Guest name and email</p>
      <p>Dates: startDate and endDate</p>
      <p>NumNights</p>
      <p>TotalAmount</p>
    </div>
  );
}

export default ReservationCard;
