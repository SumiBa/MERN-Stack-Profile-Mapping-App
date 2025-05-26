const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    photo: { type: String, required: false },
    description: { type: String, required: true },
    address: { type: String, required: true },
    location: {
      lat: { type: Number, required: false },
      lng: { type: Number, required: false },
    },
    contact: { type: String, required: false },
    interests: { type: [String], required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
