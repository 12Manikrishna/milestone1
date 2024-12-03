
const cron = require("node-cron");
const { orders } = require("../data/storage");

function start() {
  cron.schedule("*/10 * * * * *", () => {
    orders.forEach((order) => {
      if (order.status === "Preparing") {
        order.status = "Out for Delivery";
      } else if (order.status === "Out for Delivery") {
        order.status = "Delivered";
      }
    });
    console.log("Order statuses updated:", orders);
  });
}

module.exports = { start };
