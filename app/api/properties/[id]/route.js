import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

// GET /api/properties/:id

export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);
    if (!property) return new Response("Property not found", { status: 404 });

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};

// DELETE /api/properties/:id

export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id;
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId, role } = sessionUser;

    await connectDB();

    const property = await Property.findById(propertyId);
    if (!property) return new Response("Property not found", { status: 404 });

    if (property.owner.toString() !== userId && role !== "admin") {
      return new Response("You do not have permission to delete property", {
        status: 401,
      });
    }

    await property.deleteOne();

    return new Response("Property Deleted", {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};

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
    const existingProperty = await Property.findById(id);

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

    const imageUploadPromises = images.map(async (image) => {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      const imageBase64 = imageData.toString("base64");
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "A-Rent",
        }
      );

      return result.secure_url;
    });

    const uploadedImages = await Promise.all(imageUploadPromises);
    propertyData.images = uploadedImages;

    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData, {
      new: true,
    });

    return new Response(JSON.stringify(updatedProperty), {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to update property:", error);
    return new Response("Failed to update property", { status: 500 });
  }
};
