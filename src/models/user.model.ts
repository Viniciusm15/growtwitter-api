import { Tweet, TweetDto } from "./tweet.model";
import { Follow, FollowDto } from "./follow.model";

export interface UserDto {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserFullDto extends UserDto {
    tweets: TweetDto[];
    followers: FollowDto[];
    following: FollowDto[];
    followersCount: number;
    followingCount: number;
}

export class User {
    constructor(
        private id: number,
        private name: string,
        private email: string,
        private avatar: string | null = null,
        private createdAt: Date = new Date(),
        private updatedAt: Date = new Date(),
        private tweets: Tweet[] = [],
        private followers: Follow[] = [],
        private following: Follow[] = [],
    ) { }

    public toJSON(): UserDto {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            avatar: this.avatar,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    public toFullJSON(): UserFullDto {
        return {
            ...this.toJSON(),
            tweets: this.tweets.map(t => t.toJSON()),
            followers: this.followers.map(f => f.toJSON()),
            following: this.following.map(f => f.toJSON()),
            followersCount: this.followers.length,
            followingCount: this.following.length,
        };
    }

    public getId(): number { return this.id; }
    public getName(): string { return this.name; }
    public getEmail(): string { return this.email; }
    public getAvatar(): string | null { return this.avatar; }
    public getCreatedAt(): Date { return this.createdAt; }
    public getUpdatedAt(): Date { return this.updatedAt; }
    public getTweets(): Tweet[] { return this.tweets; }
    public getFollowers(): Follow[] { return this.followers; }
    public getFollowing(): Follow[] { return this.following; }
}
