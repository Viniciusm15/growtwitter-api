import { Request, Response } from "express";
import { LikeService } from "../services/like.service";
import { onSuccess, onError } from "../utils/api.response";

export class LikeController {
    private likeService: LikeService;

    constructor() {
        this.likeService = new LikeService();
    }

    async like(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.userId!;
            const tweetId = Number(req.params.tweetId);
            const result = await this.likeService.like(userId, tweetId);
            return onSuccess(res, "Tweet liked successfully.", result, 201);
        } catch (error) {
            return onError(error, res);
        }
    }

    async unlike(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.userId!;
            const tweetId = Number(req.params.tweetId);
            await this.likeService.unlike(userId, tweetId);
            return onSuccess(res, "Tweet unliked successfully.", null, 200);
        } catch (error) {
            return onError(error, res);
        }
    }
}
