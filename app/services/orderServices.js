import { Prisma } from "@prisma/client";
import Service from "./services.js";
import Cart from "./cartServices.js";
import axios from "axios";

class Order extends Service {
  model = Prisma.ModelName.Order;

  async checkout(product_id, user_id) {
    const cartUser = await Cart.cartUser(user_id);

    if (cartUser.carts.length === 0) {
      throw new Error("Cart is empty");
    }

    return this.prisma.$transaction(async (transaction) => {
      const order = await transaction.order.create({
        data: {
          date: new Date(),
          number: `ORD/${Math.floor(Math.random() * 1000)}`,
          total: cartUser.total,
          payment_status: "PENDING",
          user_id,
        },
      });

      await transaction.orderItem.createMany({
        data: cartUser.carts.map((product) => {
          return {
            order_id: order.id,
            product_id: product.product_id,
            quantity: product.quantity,
            price: product.product.price,
            total_price: product.total,
          };
        }),
      });

      await transaction.carts.deleteMany({
        where: {
          user_id,
          product_id: {
            in: product_id,
          },
        },
      });

      return {
        success: true,
        order,
      };
    });
  }

  async findByUser(id) {
    return await this.prisma[this.model].findMany({
      where: {
        user_id: Number(id),
      },
      select: {
        id: true,
        number: true,
        date: true,
        total: true,
        payment_status: true,
      },
    });
  }

  async pay(order_id, data) {
    return await this.prisma.$transaction(async (transaction) => {
      const order = await transaction.order.findUnique({
        where: {
          id: Number(order_id)
        },
      });

      if (!order) {
        throw new Error("Order not found");
      }
      console.log(order);

      try {
        const response = await axios.post('http://localhost:3000/pay', {
          amount: order.total,
          cardNumber: data.cardNumber,
          cvv: data.cvv,
          expiryMonth: data.expiryMonth,
          expiryYear: data.expiryYear,
        });
        console.log(response);
        if (response.status === 200) {
          await transaction.order.update({
            where: { id: Number(order_id) },
            data: {
              payment_status: "PAID",
            },
          });          

          const newOrder = await transaction.order.findUnique({
            where: { id: order_id },
          });

          return {
            success: true,
            message: "Payment success",
            order: newOrder,
          };
        } else {
          throw new Error("Payment failed");
        }
      } catch (err) {
        throw new Error("Payment failed");
      }
    });
  }
}

export default new Order();
