import { Prisma } from "@prisma/client";
import Service from "./services.js";

class Product extends Service {
  model = Prisma.ModelName.Products;

  async searchProducts(query, page = 1, perPage = 10) {
    if (Object.keys(query).length === 0) {
      return { error: "Query(s) required", status: 400 };
    }

    const totalCount = await this.prisma[this.model].count({
      where: {
        name: {
          contains: query.name,
        },
        ...(query.category ? { category_id: Number(query.category) } : {}),
      },
    });

    const totalPages = Math.ceil(totalCount / perPage);

    const offset = (page - 1) * perPage;

    const results = await this.prisma[this.model].findMany({
      where: {
        name: {
          contains: query.name,
        },
        ...(query.category ? { category_id: Number(query.category) } : {}),
      },
      skip: offset,
      take: perPage,
    });

    let nextPage = null;
    if (page < totalPages) {
      nextPage = `/products/search?page=${page + 1}&perPage=${perPage}`;
    }

    const response = {
      results,
      pagination: {
        totalPages,
        currentPage: page,
        perPage,
        nextPage,
      },
      status: 200,
    };

    return results.length === 0
      ? { error: "No results found", status: 404 }
      : response;
  }

  async find(id) {
    try {
      return await this.prisma[this.model].findUnique({
        where: { id: Number(id) },
      });
    } catch (err) {
      throw new Error("Not found");
    }
  }

  async findAll() {
    return await this.prisma[this.model].findMany();
  }
}

export default new Product();
