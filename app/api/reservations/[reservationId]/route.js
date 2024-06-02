import connectDB from "@/config/database";
import Property from "@/models/Property";
import Reservation from "@/models/Reservation";
import { getSessionUser } from "@/utils/getSessionUser";

// // GET /api/reservations/:reservationId

// export const GET = async (request, { params }) => {
//   try {
//     await connectDB();

//     const property = await Property.findById(params.id);
//     if (!property) return new Response("Property not found", { status: 404 });

//     return new Response(JSON.stringify(property), {
//       status: 200,
//     });
//   } catch (error) {
//     return new Response("Something went wrong", { status: 500 });
//   }
// };

// DELETE /api/reservations/:reservationId

export const DELETE = async (request, { params }) => {
  try {
    await connectDB();
    const { reservationId } = params;

    if (!reservationId) {
      return new Response("Reservation ID is required", { status: 401 });
    }

    const reservation = await Reservation.findByIdAndDelete(reservationId);

    if (!reservation)
      return new Response("Reservation not found", { status: 404 });

    return new Response("Reservation deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// PUT /api/reservations/:reservationId

export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }
    const { id } = params;
    const { userId, role } = sessionUser;
    const formData = await request.formData();
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");
    const existingProperty = await Reservation.findById(id);

    if (!existingProperty) {
      return new Response("Property does not exist", { status: 404 });
    }

    if (existingProperty.owner.toString() !== userId && role !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        country: formData.get("location.country"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      numGuests: formData.get("numGuests"),
      square_metre: formData.get("square_metre"),
      amenities,
      rates: {
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    return new Response(JSON.stringify(updatedProperty), {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to update property:", error);
    return new Response("Failed to update property", { status: 500 });
  }
};
