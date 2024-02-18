import Order from "../services/orderServices.js";

const paymentController = {
  pay: async (req, res) => {
    try {
      const data = req.body;
      const order_id = req.body.order_id
      const pay = await Order.pay(order_id, data);
      res.json(pay);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default paymentController;
