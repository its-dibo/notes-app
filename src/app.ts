import express, { NextFunction, Request, Response } from "express";
import apiV1 from "./routes/v1";

let app = express();

/**
 * log the request info for debugging
 * @todo setup log level
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method}: ${req.originalUrl}`);
  next();
});

app.use(
  "/api/:apiVersion",

  // check for the api versioning
  (req: Request, res: Response, next: NextFunction) => {
    let apiVersion = req.params.apiVersion
    if(!['v1'].includes(apiVersion))next(`the requested api version ${apiVersion} doesn't supported`)
    else next()
  },

// todo: dynamically load the appropriate api version
  apiV1
);
