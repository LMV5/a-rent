import { Schema, model, models } from "mongoose";

const ReservationSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    guest: {
      name: {
        type: String,
        required: [true, "Guest name is required"],
      },
      email: {
        type: String,
        required: [true, "Guest email is required"],
      },
    },
    dates: {
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
    },
    numNights: {
      type: Number,
      required: true,
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    rates: {
      nightly: {
        type: Number,
        required: true,
      },
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reservation =
  models.Reservation || model("Reservation", ReservationSchema);

export default Reservation;