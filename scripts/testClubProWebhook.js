// One-off manual test: sends a sample order payload to the ClubPro (Larimar
// Logistics WMS) webhook using the real configured URL + secret, so we can see
// exactly what was sent and how their endpoint responded.
//
// Usage: node scripts/testClubProWebhook.js

require("dotenv").config();
const { sendClubProOrderWebhook } = require("../src/utils/clubProWebhook");

const samplePayload = {
  order: {
    order_number: "TEST-1001",
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
      sku: "DUMMY-SKU-1330",
      quantity: 1,
      price: "45.00",
    },
  ],
};

sendClubProOrderWebhook(samplePayload).then(() => process.exit(0));
