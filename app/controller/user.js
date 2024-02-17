import User from "../services/userServices.js";

const userController = {
  login: async (req, res) => {
    const user = await User.login(req.body);
    res.json(user);
  },

  allUsers: async (req, res) => {
    try {
      const results = await User.get()
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  info: async (req, res) => {
    try {
      const results = await User.find(Number(req.params.id));
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  register: async (req, res) => {
    try {
      const user = await User.store(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default userController;
