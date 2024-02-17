import { Prisma } from "@prisma/client";
import Service from "./services.js";
import Cart from "./cartServices.js";
import axios from "axios";

class Order extends Service {
  model = Prisma.ModelName.Order;

  async checkout() {
    const cart = await Cart.cartUser();

    if (cart.carts.length === 0) {
      throw new Error("Cart is empty");
    }

    return this.prisma.$transaction(async (transaction) => {
      const order = await transaction.order.create({
        data: {
          date: new Date(),
          number: `ORD/${Math.floor(Math.random() * 1000)}`,
          total: cart.total,
        },
      });

      await transaction.orderItem.createMany({
        data: cart.carts.map((product) => {
          return {
            order_id: order.id,
            product_id: product.product_id,
            quantity: product.quantity,
            price: product.price,
            total: product.total,
          };
        }),
      });

      await Cart.empty();
    });
  }

  async findByUser(id) {
    return await this.prisma.order.findMany({
      where: {
        user_id: Number(id),
      }
    })
  }

  async pay(order_id, data) {
    return await this.prisma.$transaction(async (transaction) => {
      const order = await transaction.order.findUnique({
        where: { id: Number(order_id) },
      });

      if (!order) {
        throw new Error("Order not found");
      }

      try {
        const response = await axios.post("http://localhost:3000/pay", {
          amount: order.total,
          cardNumber: data.cardNumber,
          cvv: data.cvv,
          expiryMonth: data.expiryMonth,
          expiryYear: data.expiryYear,
        });
        if (response.data === "200") {
          await transaction.order.update({
            where: { id: Number(order_id) },
            data: {
              payment_status: PaymentStatus.PAID,
            },
          });

          const newOrder = await transaction.order.findUnique({
            where: { id: Number(order_id) },
          });

          return {
            success: true,
            order: newOrder,
            message: "Payment success",
          };
        } else {
          throw new Error("Payment failed");
        }
      } 
      catch (err) {
        throw new Error("Payment failed");
      }
    });
  }
}

export default new Order();
