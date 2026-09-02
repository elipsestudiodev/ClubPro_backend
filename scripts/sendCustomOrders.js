require("dotenv").config();
const { sendClubProOrderWebhook } = require("../src/utils/clubProWebhook");

async function run() {
  const order1 = {
    order: {
      order_number: "101",
      order_date: new Date().toISOString(),
    },
    customer: {
      first_name: "Jon",
      last_name: "Doe",
      address1: "1000 5th Ave",
      address2: null,
      city: "New York",
      state: "NY",
      zip: "10028",
      country: "US",
      email: "jon.doe@example.com",
      phone: "+15551234567",
    },
    line_items: [
      {
        sku: "CPG-0094",
        quantity: 1,
        price: "119.00",
      },
    ],
  };

  const order2 = {
    order: {
      order_number: "102",
      order_date: new Date().toISOString(),
    },
    customer: {
      first_name: "Jon",
      last_name: "Doe",
      address1: "1000 5th Ave",
      address2: null,
      city: "New York",
      state: "NY",
      zip: "10028",
      country: "US",
      email: "jon.doe@example.com",
      phone: "+15551234567",
    },
    line_items: [
      {
        sku: "CPG-0093",
        quantity: 1,
        price: "119.00",
      },
    ],
  };

  console.log("=== Sending Order 1 (SKU: CPG-0094, Order #: 101) ===");
  await sendClubProOrderWebhook(order1);

  console.log("\n=== Sending Order 2 (SKU: CPG-0093, Order #: 102) ===");
  await sendClubProOrderWebhook(order2);
}

run().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
