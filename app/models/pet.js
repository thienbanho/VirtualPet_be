const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PetType",
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Đực", "Cái", "Khác"],
  },
  shelter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shelter",
  },
  status: {
    type: String,
    required: true,
    enum: ["Có sẵn", "Đã nhận nuôi", "Đang nuôi dưỡng"],
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
  size: { type: String, enum: ["Nhỏ", "Vừa", "Lớn"] }, // Kích thước
  fur: { type: String, enum: ["Ngắn", "Vừa", "Dài"] },   // Lông
  personality: { type: String },
});


module.exports = mongoose.model("Pet", petSchema);
