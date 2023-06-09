import { Router, Request, Response, NextFunction } from "express";
import sendNotesRoute from "./send-notes";
import listNotesRoute from "./list-notes";
import authMiddleware from "./middlewares/auth.middleware";

let router = Router({ mergeParams: true });

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`api v1 is loaded ${req.method}: ${req.url}`);
  next();
});
router.use(authMiddleware);

// todo: add upload middleware to accept media files
// 'multer' is recommended
router.post("/send", sendNotesRoute);
router.get("/list/all", listNotesRoute);
router.get("/list", listNotesRoute);

export default router;
