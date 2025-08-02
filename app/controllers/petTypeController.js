const PetType = require("../models/petType");

// [GET] /pet-types
exports.getAllPetTypes = async (req, res) => {
  try {
    const types = await PetType.find();
    res.status(200).json(types);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// [POST] /pet-types
exports.createPetType = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await PetType.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Loại thú đã tồn tại" });
    }

    const newType = new PetType({ name });
    await newType.save();
    res.status(201).json(newType);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
