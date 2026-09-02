const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function testUpdate() {
  try {
    console.log("Attempting to update product 1364 sku to CPG-0095...");
    const updated = await prisma.product.update({
      where: { id: 1364 },
      data: { sku: "CPG-0095" },
    });
    console.log("SUCCESS! Updated product:", updated.id, "SKU:", updated.sku);
  } catch (err) {
    console.error("ERROR updating SKU:", err);
  }
}

testUpdate().then(() => process.exit(0));
