const express = require("express");
const router = express.Router();
const { Like } = require("../models");

// Like a template
router.post("/", async (req, res) => {
  try {
    const like = await Like.create(req.body);
    res.json(like);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all likes
router.get("/", async (req, res) => {
  try {
    const likes = await Like.findAll();
    res.json(likes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a like
router.delete("/:id", async (req, res) => {
  try {
    const like = await Like.findByPk(req.params.id);
    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }
    await like.destroy();
    res.json({ message: "Like deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
