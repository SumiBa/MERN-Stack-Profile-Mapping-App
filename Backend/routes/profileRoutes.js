const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Profile = require("../models/Profile");

// Get all profiles
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new profile
router.post("/", async (req, res) => {
  // Prevent duplicate key error on _id
  if ('_id' in req.body) {
    delete req.body._id;
  }

  const { lat, lng, ...rest } = req.body;
  const profileData = {
    ...rest,
    location: { lat, lng },
  };

  const profile = new Profile(profileData);

  try {
    const newProfile = await profile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a profile
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid profile ID" });
  }

  try {
    const deleted = await Profile.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a profile
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid profile ID" });
  }

  const { lat, lng, ...rest } = req.body;

  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      {
        ...rest,
        location: { lat, lng },
      },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
