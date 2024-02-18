import Cart from "../services/cartServices.js";

const cartController = {
  showCart: async (req, res) => {
    try {
      const cart = await Cart.cartUser(req.user.id);
      res.json(cart);
      return;
    } catch (err) {
      res.status(500).json({ message: err.message });
      return;
    }
  },

  addToCart: async (req, res) => {
    try {
      const cart = await Cart.addToCart(
        req.user.id,
        req.body.product_id,
        req.body.quantity
      );
      res.json(cart);
      return;
    } catch (err) {
      res.status(500).json({ message: err.message });
      return;
    }
  },

  deleteCart: async (req, res) => {
    const user_id = req.user.id;
    const product_id = req.body.product_id;
    const results = await Cart.delete(product_id, user_id);
    res.json(results);
  },
};

export default cartController;
