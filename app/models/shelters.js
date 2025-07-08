const mongoose = require("mongoose");

const shelterSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  companyEmail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  business_license: {
    type: String,
    required: true,
    trim: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  created_by_userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Shelters", shelterSchema);