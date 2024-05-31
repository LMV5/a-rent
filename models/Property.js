import { Schema, model, models } from "mongoose";

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const LocationSchema = new Schema({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  zipcode: {
    type: String,
  },
});

const SellerInfoSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    match: [emailRegex, "Please fill a valid email address"],
  },
  phone: {
    type: String,
    match: [/^\+?(\d.*){3,}$/, "Please fill a valid phone number"],
  },
});

const PropertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      type: LocationSchema,
      required: true,
    },
    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    square_metre: {
      type: Number,
      required: true,
    },
    numGuests: {
      type: Number,
      required: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    rates: {
      nightly: {
        type: Number,
      },
    },
    seller_info: {
      type: SellerInfoSchema,
    },
    images: [
      {
        type: String,
      },
    ],
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Property = models.Property || model("Property", PropertySchema);

export default Property;
