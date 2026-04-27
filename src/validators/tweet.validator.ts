import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const createTweetSchema = z.object({
    content: z.string({ required_error: "Content is required." })
        .min(1, "Content is required.")
        .max(280, "Tweet must be at most 280 characters.")
        .openapi({ example: "Hello, world!" }),
}).openapi("CreateTweet");

export const replyTweetSchema = z.object({
    content: z.string({ required_error: "Content is required." })
        .min(1, "Content is required.")
        .max(280, "Tweet must be at most 280 characters.")
        .openapi({ example: "I agree!" }),
    parentId: z.number({ required_error: "Parent tweet ID is required." })
        .int()
        .positive("Parent tweet ID must be a positive integer.")
        .openapi({ example: 1 }),
}).openapi("ReplyTweet");
