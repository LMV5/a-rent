import connectDB from "@/config/database";
import Reservation from "@/models/Reservation";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

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
    const propertyId = newReservation.property;
    user.reservations.push(newReservation._id);
    await user.save();

    if (!propertyId || !newReservation._id) {
      return new Response("Property ID or Reservation ID is missing", {
        status: 500,
      });
    }

    return new Response(JSON.stringify(newReservation), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
