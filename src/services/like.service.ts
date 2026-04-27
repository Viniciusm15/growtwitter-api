import { LikeRepository } from "../database/like.repository";
import { UserService } from "./user.service";
import { TweetService } from "./tweet.service";
import { HTTPError } from "../utils/http.error";
import { LikeResponseDTO } from "../dtos/like.dto";

export class LikeService {
    private likeRepository: LikeRepository;
    private userService: UserService;
    private tweetService: TweetService;

    constructor() {
        this.likeRepository = new LikeRepository();
        this.userService = new UserService();
        this.tweetService = new TweetService();
    }

    async like(userId: number, tweetId: number): Promise<LikeResponseDTO> {
        await this.userService.findById(userId);
        await this.tweetService.findById(tweetId);

        const existing = await this.likeRepository.findByUserAndTweet(userId, tweetId);
        if (existing) {
            throw new HTTPError("Tweet already liked.", 409);
        }

        const like = await this.likeRepository.create({ userId, tweetId });
        return like.toJSON();
    }

    async unlike(userId: number, tweetId: number): Promise<void> {
        await this.userService.findById(userId);
        await this.tweetService.findById(tweetId);

        const existing = await this.likeRepository.findByUserAndTweet(userId, tweetId);
        if (!existing) {
            throw new HTTPError("Like not found.", 404);
        }

        await this.likeRepository.delete(userId, tweetId);
    }
}
