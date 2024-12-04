const express = require("express");
const router = express.Router();
const { Template } = require("../models");

// Create a new template
router.post("/", async (req, res) => {
  try {
    const template = await Template.create(req.body);
    res.json(template);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all templates
router.get("/", async (req, res) => {
  try {
    const templates = await Template.findAll();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get a template by ID
router.get("/:id", async (req, res) => {
  try {
    const template = await Template.findByPk(req.params.id);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    res.json(template);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update a template
router.put("/:id", async (req, res) => {
  try {
    const template = await Template.findByPk(req.params.id);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    await template.update(req.body);
    res.json(template);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a template
router.delete("/:id", async (req, res) => {
  try {
    const template = await Template.findByPk(req.params.id);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    await template.destroy();
    res.json({ message: "Template deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
