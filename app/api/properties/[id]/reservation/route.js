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

    let reservations;
    const user = await User.findById(userId);

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    if (user.role === "admin") {
      reservations = await Reservation.find();
    } else {
      reservations = await Reservation.find({ guestId: userId });
    }

    return new Response(JSON.stringify(reservations), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}

// export async function GET() {
//   try {
//     await connectDB();
//     const sessionUser = await getSessionUser();

//     if (!sessionUser || !sessionUser.userId) {
//       return new Response("User ID is required", { status: 401 });
//     }

//     const { userId } = sessionUser;

//     let reservations;

//     if (userId === "6617ecaa2c847bd2317ab3e3") {
//       reservations = await Reservation.find({ owner: userId });
//     } else {
//       reservations = await Reservation.find({ guestId: userId });
//     }

//     return new Response(JSON.stringify(reservations), { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return new Response("Something went wrong", { status: 500 });
//   }
// }

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

// export const DELETE = async (request, { params }) => {
//   try {
//     await connectDB();
//     const sessionUser = await getSessionUser();

//     if (!sessionUser || !sessionUser.userId) {
//       return new Response("User ID is required", { status: 401 });
//     }

//     const { userId } = sessionUser;
//     const data = await request.json();
//     const { reservationId } = data;
//     const reservation = await Reservation.findById(reservationId);

//     if (!reservation) {
//       return new Response("Reservation not found", {
//         status: 404,
//       });
//     }

//     await Reservation.deleteOne({ _id: reservationId });

//     const user = await User.findById(userId);
//     user.reservations = user.reservations.filter(
//       (res) => res.toString() !== reservationId
//     );
//     await user.save();

//     return new Response("Reservation deleted successfully", { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return new Response("Something went wrong", { status: 500 });
//   }
// };
