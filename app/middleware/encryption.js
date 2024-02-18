import { encrypt } from "../utils/encryption.js";
import dotenv from "dotenv";

dotenv.config();
export default function encryption(req, res, next) {
  req.body = encrypt(req.body, process.env.CRYPTO_SECRET_KEY);
  console.log(process.env.CRYPTO_SECRET_KEY);
  next();
}
