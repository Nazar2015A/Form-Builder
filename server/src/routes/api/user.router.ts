import { Router } from "express";
import userController from "../../controller/user.controller";
const router: Router = Router();

router.get("/api/user", userController.getUser.bind(userController));

export default router;
