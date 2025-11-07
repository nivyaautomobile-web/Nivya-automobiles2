import mongoose from "mongoose";

const TruevalueEnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
    },
    number: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      trim: true,
    },
    formType: {
      type: String,
    },
  },
  { timestamps: true }
);

const TruevalueEnquiry =
  mongoose.models.TruevalueEnquiry ||
  mongoose.model("TruevalueEnquiry", TruevalueEnquirySchema);

export default TruevalueEnquiry;
