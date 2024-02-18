import prisma from "../prisma.js";
import { verifyToken } from "../utils/token.js";
export const authorizePermission = (permission) => {
    return async (req, res, next) => {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          message: "Token is required!",
        });
      }
      
      const validToken = verifyToken(token);
      if (!validToken) {
        return res.status(401).json({
          message: "INVALID_TOKEN",
        });
      }
      
      req.user = validToken;
      
      if (!req.user) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      
      const permissionRecord = await prisma.permissionRole.findMany({
        where: { role_id: req.user.role_id },
        include: { permission : true },
      });

      console.log(permissionRecord);
        
      const permissions = permissionRecord.map(
        (record) => record.permission.name
      );

      console.log(permissions);
      if (!permissions.includes(permission)) {
        return res.status(403).json({
          message: `You don't have the required permission to perform this action`,
        });
      }
      next();
    };
  };