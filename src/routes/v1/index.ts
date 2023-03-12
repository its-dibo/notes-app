import { Router } from 'express';
import sendNotesRoute from "./send-notes";
import listNotesRoute from "./list-notes";
import authMiddleware from "./middlewares/auth.middleware";

// todo: setup authentication middleware
let router = Router({ mergeParams: true });

router.use(authMiddleware)
router.post('/send',sendNotesRoute)
router.get('/list',listNotesRoute)

export default router

