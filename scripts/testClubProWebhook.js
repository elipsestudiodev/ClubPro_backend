// One-off manual test: sends order payloads to the ClubPro (Larimar
// Logistics WMS) webhook using the real configured URL + secret.

require("dotenv").config();
const { sendClubProOrderWebhook } = require("../src/utils/clubProWebhook");

async function run() {
  const timestamp = Date.now();
  const order1Number = `ORD-MULTI1-${timestamp}`;
  const order2Number = `ORD-MULTI2-${timestamp + 1}`;

  // Order 1 with 4 line items (including CPG-0094 & CPG-0093)
  const payload1 = {
    order: {
      order_number: order1Number,
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
      {
        sku: "CPG-0093",
        quantity: 2,
        price: "99.00",
      },
      {
        sku: "CPG-0105",
        quantity: 1,
        price: "149.00",
      },
      {
        sku: "CPG-0100",
        quantity: 1,
        price: "89.00",
      },
    ],
  };

  // Order 2 with 3 line items
  const payload2 = {
    order: {
      order_number: order2Number,
      order_date: new Date().toISOString(),
    },
    customer: {
      first_name: "Jane",
      last_name: "Smith",
      address1: "500 Madison Ave",
      address2: "Suite 4B",
      city: "New York",
      state: "NY",
      zip: "10022",
      country: "US",
      email: "jane.smith@example.com",
      phone: "+15559876543",
    },
    line_items: [
      {
        sku: "CPG-0097",
        quantity: 1,
        price: "129.00",
      },
      {
        sku: "CPG-0095",
        quantity: 1,
        price: "109.00",
      },
      {
        sku: "CPG-0099",
        quantity: 2,
        price: "79.00",
      },
    ],
  };

  console.log(`\n========================================`);
  console.log(`Sending Order 1 | 4 Items | Order #: ${order1Number}`);
  console.log(`========================================`);
  await sendClubProOrderWebhook(payload1);

  console.log(`\n========================================`);
  console.log(`Sending Order 2 | 3 Items | Order #: ${order2Number}`);
  console.log(`========================================`);
  await sendClubProOrderWebhook(payload2);
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error executing script:", err);
    process.exit(1);
  });


