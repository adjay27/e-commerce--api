import Order from "../services/orderServices.js";

const orderController = {

  orderByUser: async (req, res) => {
    try {
      const user_id = req.user.id;
      console.log(user_id);
      const orders = await Order.findByUser(user_id);
      console.log(orders);
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  checkout: async (req, res) => {
    try {
      const user_id = req.user.id;
      console.log(user_id);
      const product_id = req.body.product_id;
      const checkout = await Order.checkout(product_id, user_id);
      res.json(checkout);
    } catch (err) {
      res.status(500).json({ message: err.message });
      return;
    }
  },
};

export default orderController;
