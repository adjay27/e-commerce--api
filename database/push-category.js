import { PrismaClient } from "@prisma/client";
import { jsonData } from "./category-seeds.js";


const prisma = new PrismaClient();

async function main() {
  await prisma.categories.deleteMany();
  await prisma.categories.createMany({ data: jsonData });
}
main().catch((e) => console.log(e));
