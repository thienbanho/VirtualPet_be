const Pet = require("../models/pet");

// Create a new pet
exports.createPet = async (req, res) => {
  try {
    const petData = {
      ...req.body,
      shelter_id: req.user.shelter_id,
    };
    const newPet = new Pet(petData);
    const savedPet = await newPet.save();
    res.status(201).json(savedPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all pets (URL : GET /pets?type=dog&size=medium&fur=short&gender=female&minAge=1&maxAge=5&page=1&limit=6)
exports.getAllPets = async (req, res) => {
  try {
    const {
      type,
      gender,
      status,
      size,
      fur,
      personality,
      vaccinated,
      child_friendly,
      minAge,
      maxAge,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (type && type !== 'Tất cả') filter.type = type;
    if (gender && gender !== 'Tất cả') filter.gender = gender;
    if (status && status !== 'Tất cả') filter.status = status;
    if (size && size !== 'Tất cả') filter.size = size;
    if (fur && fur !== 'Tất cả') filter.fur = fur;
    if (personality && personality !== 'Tất cả') filter.personality = personality;
    if (vaccinated !== undefined) filter.vaccinated = vaccinated === 'true';
    if (child_friendly !== undefined) filter.child_friendly = child_friendly === 'true';
    if (minAge || maxAge) {
      filter.age = {};
      if (minAge) filter.age.$gte = parseInt(minAge);
      if (maxAge) filter.age.$lte = parseInt(maxAge);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const pets = await Pet.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('shelter_id');

    const total = await Pet.countDocuments(filter);

    res.status(200).json({
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      data: pets,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get pet by ID
exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("shelter_id");
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update pet by ID
exports.updatePet = async (req, res) => {
  try {
    const petData = {
      ...req.body,
      shelter_id: req.user.shelter_id,
    };
    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, petData, {
      new: true,
      runValidators: true,
    });
    if (!updatedPet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete pet by ID
exports.deletePet = async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.id);
    if (!deletedPet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.bulkCreatePets = async (req, res) => {
  try {
    const shelterId = req.user.shelter_id;

    // Gán shelter_id cho mỗi pet nếu chưa có
    const petData = req.body.map(pet => ({
      ...pet,
      shelter_id: shelterId,
    }));

    const insertedPets = await Pet.insertMany(petData);
    res.status(201).json({ message: 'Pets inserted successfully', data: insertedPets });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
