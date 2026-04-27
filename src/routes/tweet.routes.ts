import { Router } from "express";
import { TweetController } from "../controllers/tweet.controller";
import { validateBody } from "../middlewares/validate.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createTweetSchema, replyTweetSchema } from "../validators/tweet.validator";

const tweetRoutes = Router();
const tweetController = new TweetController();

tweetRoutes.post('/tweets', authMiddleware, validateBody(createTweetSchema), tweetController.create.bind(tweetController));
tweetRoutes.post('/tweets/reply', authMiddleware, validateBody(replyTweetSchema), tweetController.reply.bind(tweetController));
tweetRoutes.get('/feed', authMiddleware, tweetController.getFeed.bind(tweetController));

export { tweetRoutes };
