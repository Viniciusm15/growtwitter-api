import { FollowRepository } from "../database/follow.repository";
import { UserService } from "./user.service";
import { HTTPError } from "../utils/http.error";
import { FollowResponseDTO } from "../dtos/follow.dto";

export class FollowService {
    private followRepository: FollowRepository;
    private userService: UserService;

    constructor() {
        this.followRepository = new FollowRepository();
        this.userService = new UserService();
    }

    async follow(followerId: number, followingId: number): Promise<FollowResponseDTO> {
        await this.userService.findById(followerId);
        await this.userService.findById(followingId);

        if (followerId === followingId) {
            throw new HTTPError("You cannot follow yourself.", 400);
        }

        const existing = await this.followRepository.findByFollowerAndFollowing(followerId, followingId);
        if (existing) {
            throw new HTTPError("Already following this user.", 409);
        }

        const follow = await this.followRepository.create({ followerId, followingId });
        return follow.toJSON();
    }

    async unfollow(followerId: number, followingId: number): Promise<void> {
        await this.userService.findById(followerId);
        await this.userService.findById(followingId);

        if (followerId === followingId) {
            throw new HTTPError("You cannot unfollow yourself.", 400);
        }

        const existing = await this.followRepository.findByFollowerAndFollowing(followerId, followingId);
        if (!existing) {
            throw new HTTPError("Follow not found.", 404);
        }

        await this.followRepository.delete(followerId, followingId);
    }
}
