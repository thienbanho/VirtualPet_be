const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["dog", "cat", "bird"],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  shelter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shelter",
  },
  status: {
    type: String,
    required: true,
    enum: ["available", "adopted", "fostered"],
  },
  price: {
    type: Number,
    required: true,
  },
  vaccinated: {
    type: Boolean,
    default: false,
  },
  health_condition: {
    type: String,
    required: true,
  },
  child_friendly: {
    type: Boolean,
    default: false,
  },
  size: { type: String, enum: ["small", "medium", "large"] }, // Kích thước
  fur: { type: String, enum: ["short", "medium", "long"] },   // Lông
  personality: { type: String },
});


module.exports = mongoose.model("Pet", petSchema);
