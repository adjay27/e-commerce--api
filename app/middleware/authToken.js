import prisma from "../prisma.js";
export const authToken = async (req, res, next) => {
  //checking if the token is present in the header of request
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Token is required!",
    });
  }

  // const validToken = await prisma.token.findUnique({
  //   where: { token },
  //   include: {
  //     user: {
  //       select: {
  //         id: true,
  //         email: true,
  //         name: true,
  //         is_blocked: true,
  //         role_id: true,
  //       },
  //     },
  //   },
  // });

  // if (!validToken) {
  //   return res.status(401).json({
  //     message: "INVALID_TOKEN",
  //   });
  // }

  // if (validToken.expires_in < new Date()) {
  //   return res.status(401).json({
  //     message: "The token has expired",
  //   });
  // }

  // if (validToken.user.is_blocked) {
  //   return res.status(403).json({
  //     message: "User account is blocked",
  //   });
  // }

  // req.user = validToken.user;

  next();
};
