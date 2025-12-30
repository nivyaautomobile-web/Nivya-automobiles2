import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Popup = mongoose.models.popup || mongoose.model('popup', Schema);
export default Popup;
