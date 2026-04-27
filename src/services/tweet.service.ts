import { TweetRepository } from "../database/tweet.repository";
import { UserService } from "./user.service";
import { HTTPError } from "../utils/http.error";
import { CreateTweetDTO, ReplyTweetDTO, TweetResponseDTO } from "../dtos/tweet.dto";

export class TweetService {
    private tweetRepository: TweetRepository;
    private userService: UserService;

    constructor() {
        this.tweetRepository = new TweetRepository();
        this.userService = new UserService();
    }

    async create(userId: number, data: CreateTweetDTO): Promise<TweetResponseDTO> {
        await this.userService.findById(userId);

        const tweet = await this.tweetRepository.create({
            content: data.content,
            userId,
        });

        return tweet.toJSON();
    }

    async reply(userId: number, data: ReplyTweetDTO): Promise<TweetResponseDTO> {
        await this.userService.findById(userId);

        const parentTweet = await this.tweetRepository.findById(data.parentId);

        if (!parentTweet) {
            throw new HTTPError("Parent tweet not found.", 404);
        }

        const tweet = await this.tweetRepository.create({
            content: data.content,
            userId,
            parentId: data.parentId,
        });

        return tweet.toJSON();
    }

    async getFeed(userId: number): Promise<TweetResponseDTO[]> {
        const tweets = await this.tweetRepository.findFeed(userId);
        return tweets.map((t) => t.toJSON());
    }
}
