import { Request, Response } from "express";
import { FollowService } from "../services/follow.service";
import { onSuccess, onError } from "../utils/api.response";

export class FollowController {
    private followService: FollowService;

    constructor() {
        this.followService = new FollowService();
    }

    async follow(req: Request, res: Response): Promise<Response> {
        try {
            const followerId = req.userId!;
            const followingId = Number(req.params.userId);
            const result = await this.followService.follow(followerId, followingId);
            return onSuccess(res, "User followed successfully.", result, 201);
        } catch (error) {
            return onError(error, res);
        }
    }

    async unfollow(req: Request, res: Response): Promise<Response> {
        try {
            const followerId = req.userId!;
            const followingId = Number(req.params.userId);
            await this.followService.unfollow(followerId, followingId);
            return onSuccess(res, "User unfollowed successfully.", null, 200);
        } catch (error) {
            return onError(error, res);
        }
    }
}
