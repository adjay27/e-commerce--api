import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const bcryptRound = Number(process.env.BCRYPT_ROUND);

async function main() {
  await prisma.users.deleteMany();
  const roles = await prisma.role.findMany();

  for (let i = 0; i < 5; i++) {
    await prisma.users.create({
      data: {
        email: faker.internet.email().toLowerCase(),
        name: faker.person.fullName(),
        password: bcrypt.hashSync(`password`, bcryptRound),
        role_id: roles[Math.floor(Math.random() * roles.length)].id,
      },
    });
  }
}
main().catch((e) => console.log(e));
