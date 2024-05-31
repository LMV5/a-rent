import { Schema, model, models } from "mongoose";

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const GuestDataSchema = new Schema({
  name: {
    type: String,
    required: [true, "Guest name is required"],
  },
  email: {
    type: String,
    required: [true, "Guest email is required"],
    match: [emailRegex, "Please fill a valid email address"],
  },
  numGuests: {
    type: Number,
    required: [true, "Number of guests is required"],
  },
});

const DatesSchema = new Schema({
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
  },
  endDate: {
    type: Date,
    required: [true, "End date is required"],
    validate: {
      validator: function (value) {
        return value > this.startDate;
      },
      message: "End date must be after start date",
    },
  },
});

const RatesSchema = new Schema({
  nightly: {
    type: Number,
    required: true,
  },
});

const ReservationSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    guestId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    guestData: {
      type: GuestDataSchema,
      required: true,
    },
    dates: {
      type: DatesSchema,
      required: true,
    },
    numNights: {
      type: Number,
      required: true,
      min: [1, "Number of nights must be at least 1"],
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    propertyName: {
      type: String,
      required: true,
    },
    rates: {
      type: RatesSchema,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: [0, "Total amount must be a positive number"],
    },
  },
  {
    timestamps: true,
  }
);

const Reservation =
  models.Reservation || model("Reservation", ReservationSchema);

export default Reservation;
