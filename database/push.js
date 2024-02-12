import { PrismaClient } from "@prisma/client";
import { jsonData } from "./product-seed.js";


const prisma = new PrismaClient();

async function main() {
  await prisma.products.deleteMany();
  await prisma.products.createMany({ data: jsonData });
}
main().catch((e) => console.log(e));
