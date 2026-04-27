import { prisma } from "../database/prisma.repository";
import { Tweet } from "../models/tweet.model";

type TweetEntity = Awaited<ReturnType<typeof prisma.tweet.findFirst>>;

export class TweetRepository {
    async create(data: {
        content: string;
        userId: number;
        parentId?: number;
    }): Promise<Tweet> {
        const newTweet = await prisma.tweet.create({ data });
        return this.mapToModel(newTweet);
    }

    async findById(id: number): Promise<Tweet | null> {
        const tweet = await prisma.tweet.findUnique({ where: { id } });
        return tweet ? this.mapToModel(tweet) : null;
    }

    async findFeed(userId: number): Promise<Tweet[]> {
        const follows = await prisma.follow.findMany({
            where: { followerId: userId },
            select: { followingId: true }
        });

        const followingIds = follows.map((f: { followingId: number }) => f.followingId);
        const userIds = [userId, ...followingIds];

        const tweets = await prisma.tweet.findMany({
            where: {
                userId: { in: userIds }
            },
            orderBy: { createdAt: "desc" }
        });

        return tweets.map((t: TweetEntity) => this.mapToModel(t as NonNullable<TweetEntity>));
    }

    private mapToModel(entity: NonNullable<TweetEntity>): Tweet {
        return new Tweet(
            entity.id,
            entity.content,
            entity.userId,
            entity.parentId ?? null,
            entity.createdAt,
            entity.updatedAt
        );
    }
}
