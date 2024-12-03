
const express = require("express");
const { menu } = require("../data/storage");

const router = express.Router();

// Predefined categories
const categories = ["Main Course", "Dessert", "Beverage"];

// Add Menu Item
router.post("/", (req, res) => {
  const { name, price, category } = req.body;

  // Validation
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Invalid name" });
  }
  if (!price || typeof price !== "number" || price <= 0) {
    return res.status(400).json({ error: "Invalid price" });
  }
  if (!categories.includes(category)) {
    return res.status(400).json({ error: "Invalid category" });
  }

  const id = menu.length + 1;
  menu.push({ id, name, price, category });
  res.status(201).json({ message: "Menu item added", id });
});

// Get Menu
router.get("/", (req, res) => {
  res.status(200).json(menu);
});

module.exports = router;
