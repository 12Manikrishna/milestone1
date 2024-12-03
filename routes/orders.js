
const express = require("express");
const { menu, orders } = require("../data/storage");

const router = express.Router();
let orderIdCounter = 1;

// Place Order
router.post("/", (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Items must be a non-empty array" });
  }

  const invalidItems = items.filter(
    (itemId) => !menu.some((menuItem) => menuItem.id === itemId)
  );

  if (invalidItems.length > 0) {
    return res
      .status(400)
      .json({ error: `Invalid item IDs: ${invalidItems.join(", ")}` });
  }

  const order = {
    id: orderIdCounter++,
    items,
    status: "Preparing",
    createdAt: new Date(),
  };

  orders.push(order);
  res.status(201).json(order);
});

// Get Order by ID
router.get("/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find((order) => order.id === orderId);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.status(200).json(order);
});

module.exports = router;
