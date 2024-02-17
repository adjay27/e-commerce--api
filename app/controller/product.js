import Products from "../services/productServices.js";

const productController = {
  getAllProduct: async (req, res) => {
    const products = await Products.findAll();
    res.json(products);
  },

  getProduct: async (req, res) => {
    const product = await Products.find(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  },

  searchProduct: async (req, res) => {
    const query = req.params.query;
    const products = await Products.searchProducts(query, 1, 1);
    if (products.length === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(products);
    }
  },

  addProduct: async (req, res) => {
    try {
      const results = await Products.store(req.body);
      res.json({ message: "Product Created Successfully", results });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  editProduct: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const results = await Products.update(id, req.body);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const results = await Products.delete(id);
      res.json({ message: "Product Deleted Successfully", results });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  //
};
export default productController;
