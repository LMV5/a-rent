import connectDB from "@/config/database";
import Reservation from "@/models/Reservation";
import { getSessionUser } from "@/utils/getSessionUser";

// GET /api/:id/reservation/

export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const reservation = await Reservation.findById(params.id);
    if (!reservation)
      return new Response("Reservation not found", { status: 404 });

    return new Response(JSON.stringify(reservation), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};

// DELETE /api/:id/reservation/

export const DELETE = async (request, { params }) => {
  try {
    const reservationId = params.id;
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    await connectDB();

    const reservation = await Reservation.findById(reservationId);
    if (!reservation)
      return new Response("Reservation not found", { status: 404 });

    if (reservation.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await reservation.deleteOne();

    return new Response("Reservation Deleted", {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};
