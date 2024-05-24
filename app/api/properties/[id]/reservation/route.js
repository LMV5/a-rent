import connectDB from "@/config/database";
import Reservation from "@/models/Reservation";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

// GET /api/:id/reservation/

export async function GET() {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;
    const reservations = await Reservation.find({ guestId: userId });
    return new Response(JSON.stringify(reservations), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}

// POST /api/properties/:id/reservation

export const POST = async (request, { params }) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;
    const data = await request.json();
    const newReservation = new Reservation({ ...data, guestId: userId });
    await newReservation.save();

    const user = await User.findById(userId);

    user.reservations.push(newReservation._id);
    await user.save();

    return new Response(JSON.stringify(newReservation), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// // DELETE /api/:id/reservation/

// export const DELETE = async (request, { params }) => {
//   try {
//     const reservationId = params.id;
//     const sessionUser = await getSessionUser();

//     if (!sessionUser || !sessionUser.userId) {
//       return new Response("User ID is required", { status: 401 });
//     }

//     const { userId } = sessionUser;

//     await connectDB();

//     const reservation = await Reservation.findById(reservationId);
//     if (!reservation)
//       return new Response("Reservation not found", { status: 404 });

//     if (reservation.owner.toString() !== userId) {
//       return new Response("Unauthorized", { status: 401 });
//     }

//     await reservation.deleteOne();

//     return new Response("Reservation Deleted", {
//       status: 200,
//     });
//   } catch (error) {
//     return new Response("Something went wrong", { status: 500 });
//   }
// };
