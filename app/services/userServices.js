import { Prisma } from "@prisma/client";
import Service from "./services.js";
import { generateToken } from "../utils/token.js";
import bcrypt from "bcrypt";

class User extends Service {
  model = Prisma.ModelName.Users;

  async getAllUsers() {
    return await this.prisma[this.model].findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role_id: true,
        role: {
          select: {
            name: true,
          },
        },
        is_blocked: true,
      }
    });
  }

  async findUser(id) {
    return await this.prisma[this.model].findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        email: true,
        role_id: true,
        role: {
          select: {
            name: true,
          },
        },
        is_blocked: true,
      }
    });
  }
  
  async login(data) {
    const user = await this.prisma[this.model].findUnique({
      where: { email: data.email.toLowerCase() },
    });
    if (!user) {
      throw new Error("Email not found");
    }
    if (!bcrypt.compareSync(data.password, user.password)) {
      throw new Error("Password not match");
    }

    const accessToken = generateToken({ id: user.id });
    return accessToken;
  }
  async store(data) {
    return await this.prisma[this.model].create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        password: bcrypt.hashSync(
          `${data.password}`,
          Number(process.env.BCRYPT_ROUND)
        ),
        role_id: 2,
      },
    });
  }
}

export default new User();
