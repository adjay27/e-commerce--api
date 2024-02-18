import User from "../services/userServices.js";
import { verifyToken } from "../utils/token.js";

const userController = {
  login: async (req, res) => {
    const user = await User.login(req.body);
    res.json(user);
  },

  allUsers: async (req, res) => {
    try {
      const results = await User.getAllUsers();

      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  info: async (req, res) => {
    try {
      const token = req.headers.authorization;
      const validToken = verifyToken(token);    
      req.user = validToken;
      const results = await User.findUser(Number(req.user.id));
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  editUser: async (req,res) => {
    try {
      const id = Number(req.params.id);
      const results = await User.update(id, req.body);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  register: async (req, res) => {
    try {
      const user = await User.store(req.body);
      res.status(200).json({
        message: "User created successfully",
        data: user
      })
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteUser: async (req,res) => {
    try {
      const id = Number(req.params.id);
      const results = await User.delete(id);
      res.json({ message: "User Deleted Successfully", results });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

};

export default userController;
