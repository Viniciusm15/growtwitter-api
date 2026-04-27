import { z } from "zod";
import { TweetDto } from "../models/tweet.model";
import { createTweetSchema, replyTweetSchema } from "../validators/tweet.validator";

export type CreateTweetDTO = z.infer<typeof createTweetSchema>;
export type ReplyTweetDTO = z.infer<typeof replyTweetSchema>;

export type TweetResponseDTO = TweetDto;
