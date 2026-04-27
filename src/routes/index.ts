import { Router } from "express";
import { userRoutes } from "./user.routes";
import { tweetRoutes } from "./tweet.routes";

const router = Router();

router.use(userRoutes);
router.use(tweetRoutes);

export { router };
