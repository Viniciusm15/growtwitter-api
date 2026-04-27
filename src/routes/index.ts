import { Router } from "express";
import { userRoutes } from "./user.routes";
import { tweetRoutes } from "./tweet.routes";
import { likeRoutes } from "./like.routes";

const router = Router();

router.use(userRoutes);
router.use(tweetRoutes);
router.use(likeRoutes);

export { router };
