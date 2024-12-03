
const express = require("express");
const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/orders");
const cron = require("./utils/cron");

const app = express();
app.use(express.json());

// Use routes
app.use("/menu", menuRoutes);
app.use("/orders", orderRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Start cron jobs
cron.start();
