import prisma from "../prisma.js";
export const newProduct = async ({ name, description, price, category_id }) => {
  return await prisma.products.create({
    data: {
      name,
      description,
      price,
      category_id,
    },
  });
};
