const express = require("express");
const router = express.Router();
const { Form } = require("../models");

// Create a new form
router.post("/", async (req, res) => {
  try {
    const form = await Form.create(req.body);
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all forms
router.get("/", async (req, res) => {
  try {
    const forms = await Form.findAll();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get a form by ID
router.get("/:id", async (req, res) => {
  try {
    const form = await Form.findByPk(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update a form
router.put("/:id", async (req, res) => {
  try {
    const form = await Form.findByPk(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    await form.update(req.body);
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a form
router.delete("/:id", async (req, res) => {
  try {
    const form = await Form.findByPk(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    await form.destroy();
    res.json({ message: "Form deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
