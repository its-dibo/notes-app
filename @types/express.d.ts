declare namespace Express {
    interface Request {
      // add arbitrary keys to the request
      // for example the AuthMiddleware extracts the user info from JWT and adds it to req.user
      [key: string]: any;
    }
  }