import { Request, Response } from "express";
import { TweetService } from "../services/tweet.service";
import { CreateTweetDTO, ReplyTweetDTO } from "../dtos/tweet.dto";
import { onSuccess, onError } from "../utils/api.response";

export class TweetController {
    private tweetService: TweetService;

    constructor() {
        this.tweetService = new TweetService();
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const dto: CreateTweetDTO = req.body;
            const userId = req.userId!;
            const tweet = await this.tweetService.create(userId, dto);
            return onSuccess(res, "Tweet created successfully.", tweet, 201);
        } catch (error) {
            return onError(error, res);
        }
    }

    async reply(req: Request, res: Response): Promise<Response> {
        try {
            const dto: ReplyTweetDTO = req.body;
            const userId = req.userId!;
            const tweet = await this.tweetService.reply(userId, dto);
            return onSuccess(res, "Reply created successfully.", tweet, 201);
        } catch (error) {
            return onError(error, res);
        }
    }

    async getFeed(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.userId!;
            const feed = await this.tweetService.getFeed(userId);
            return onSuccess(res, "Feed retrieved successfully.", feed);
        } catch (error) {
            return onError(error, res);
        }
    }
}
