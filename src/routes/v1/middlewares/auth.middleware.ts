import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

/**
 * authenticate the user
 */
export default function (req: Request, res: Response, next: NextFunction) {
  // format: `"Authorization": "Bearer ****"`
  let [schema, token] = req.header("Authorization")?.split(" ") || [] as string[];
 
  if (!token) next("headers must contain a valid auth token");
  else if (schema !== "Bearer")
    next(`the auth schema ${schema} is not supported. use Bearer`);
  else {
    // todo: generate public/private keys
    // todo: change the algorithm to RSA
    let payload = jwt.verify(token, "publicKey") as JwtPayload,
      userId = payload?.userId;

    if (userId) {
      // todo: validate the user and load the user's roles group
      let hasPermission = true;
      if (!hasPermission)
        next(
          `the user ${userId} is not authorized to access the requested resource`
        );
      else {
        // todo: use a singleton class to store the userId, to be used in the subsequent requests
        req.auth = payload;
        next();
      }
    } else {
      next("invalid jwt token");
    }
  }
}
