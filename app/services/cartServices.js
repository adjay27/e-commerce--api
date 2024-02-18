import { Prisma } from "@prisma/client";
import Service from "./services.js";
import Products from "./productServices.js";

class Cart extends Service {
  model = Prisma.ModelName.Carts;

  async cartUser(id) {
    const carts = await this.prisma.carts.findMany({
      where: {
        user_id: Number(id),
      },
      include: {
        product: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const total = carts.reduce((acc, cart) => acc + cart.total, 0);

    const total_items = carts.reduce((acc, cart) => acc + cart.quantity, 0);

    return { carts, total: total, total_items: total_items };
  }

  async addToCart(user_id, product_id, quantity) {
    const product = await Products.find(product_id);

    if (!product) throw new Error("Product not found");

    // Find if product exist in the cart
    const existInCart = await this.prisma.carts.findFirst({
      where: {
        product_id,
        user_id,
      },
    });
    // Update quantity if product exist
    if (existInCart) {
      return await this.prisma.carts.update({
        where: {
          id: existInCart.id,
        },
        data: {
          quantity: existInCart.quantity + quantity,
          total_price: (existInCart.quantity + quantity) * product.price,
        },
      });
    } else {
      return await this.prisma.carts.create({
        data: {
          product_id,
          user_id,
          quantity,
          total: quantity * product.price,
        },
      });
    }
  }

  async delete(product_id, user_id) {
    return await this.prisma[this.model].delete({
      where: {
        product_id: {
          in: product_id
        },
        user_id: user_id,
      },
    });
  }
}

export default new Cart();
