import connectDB from "@/config/database";
import Reservation from "@/models/Reservation";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

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
