import connectDB from "@/config/database";
import Reservation from "@/models/Reservation";

// GET /api/reservations/user/:userId

export const GET = async (request) => {
  try {
    await connectDB();

    const reservations = await Reservation.find().populate(
      "owner guestId property"
    );

    return new Response(JSON.stringify(reservations), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return new Response("Something went wrong", { status: 500 });
  }
};
