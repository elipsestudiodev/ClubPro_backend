// One-time script: fills a placeholder SKU ("DUMMY-SKU-<id>") on every product
// that doesn't have one yet. Run this AFTER `npx prisma db push` has added the
// `sku` column. Replace these placeholders with real SKUs via the admin
// dashboard whenever they're available.
//
// Usage: node scripts/backfillDummySkus.js

require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    where: { sku: null },
    select: { id: true, name: true },
  });

  if (products.length === 0) {
    console.log("No products are missing a SKU. Nothing to do.");
    return;
  }

  console.log(`Filling dummy SKU for ${products.length} product(s)...`);

  for (const product of products) {
    const dummySku = `DUMMY-SKU-${product.id}`;
    await prisma.product.update({
      where: { id: product.id },
      data: { sku: dummySku },
    });
    console.log(`  #${product.id} "${product.name}" -> ${dummySku}`);
  }

  console.log("Done.");
}

main()
  .catch((err) => {
    console.error("Backfill failed:", err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
