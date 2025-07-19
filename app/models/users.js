const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    }
  },
  phone: {
    type: String,
    required: function () {
      return !this.googleId;
    }
  },
  address: {
    type: String,
    required: function () {
      return !this.googleId;
    }
  },
  role: {
    type: String,
    enum: ["adopters", "admin", "shelter_manager", "shelter_staff"],
    default: "adopters",
  },
  googleId: {
    type: String,
    default: null
  },
  shelter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shelter",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  refreshToken: {
    type: String,
    default: null,
  },
  
});

module.exports = mongoose.model("User", userSchema);
