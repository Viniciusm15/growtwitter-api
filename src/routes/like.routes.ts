import { Router } from "express";
import { LikeController } from "../controllers/like.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const likeRoutes = Router();
const likeController = new LikeController();

likeRoutes.post('/likes/:tweetId', authMiddleware, likeController.like.bind(likeController));
likeRoutes.delete('/likes/:tweetId', authMiddleware, likeController.unlike.bind(likeController));

export { likeRoutes };
