import { Router } from "express";
import { FollowController } from "../controllers/follow.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const followRoutes = Router();
const followController = new FollowController();

followRoutes.post('/follow/:userId', authMiddleware, followController.follow.bind(followController));
followRoutes.delete('/follow/:userId', authMiddleware, followController.unfollow.bind(followController));

export { followRoutes };
