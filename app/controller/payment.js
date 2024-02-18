import { decrypt } from "../utils/encryption.js";
import Order from "../services/orderServices.js";
import dotenv from 'dotenv'

dotenv.config();
const paymentController = {
  pay: async (req, res) => {
    try {
      const data = decrypt(req.body, process.env.CRYPTO_SECRET_KEY);
      const order_id = data.order_id;
      const pay = await Order.pay(order_id, data);
      res.json(pay);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default paymentController;
