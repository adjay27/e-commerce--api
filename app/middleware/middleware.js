import prisma from "../prisma.js";
import { verifyToken } from "../utils/token.js";
export const authorizePermission = (permission) => {
    return async (req, res, next) => {
      const verify = verifyToken(req.headers.authorization);
        if (!verify) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      req.user = verify;
      const permissionRecord = await prisma.permissionRole.findMany({
        where: { role_id: verify.id },
        include: { permission : true },
      });
      
  
      const permissions = permissionRecord.map(
        (record) => record.permission.name
      );
      
      if (!permissions.includes(permission)) {
        return res.status(403).json({
          message: `You don't have the required permission to perform this action`,
        });
      }
      next();
    };
  };