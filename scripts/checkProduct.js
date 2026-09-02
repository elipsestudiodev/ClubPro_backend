const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function check() {
  const p1364 = await prisma.product.findUnique({
    where: { id: 1364 },
  });
  console.log("=== Product 1364 ===");
  console.log("ID:", p1364?.id);
  console.log("Name:", p1364?.name);
  console.log("SKU:", p1364?.sku);
  console.log("Fishbowl Part Number:", p1364?.fishbowlPartNumber);

  const existingWithSku = await prisma.product.findMany({
    where: {
      sku: { not: null }
    },
    select: { id: true, name: true, sku: true }
  });
  console.log("\n=== Products with non-null SKU ===");
  console.log(existingWithSku);
}

check().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
