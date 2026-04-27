import { prisma } from "../database/prisma.repository";
import { Like } from "../models/like.model";

type LikeEntity = Awaited<ReturnType<typeof prisma.like.findUnique>>;

export class LikeRepository {
    async create(data: { userId: number; tweetId: number }): Promise<Like> {
        const newLike = await prisma.like.create({ data });
        return this.mapToModel(newLike);
    }

    async delete(userId: number, tweetId: number): Promise<void> {
        await prisma.like.deleteMany({ where: { userId, tweetId } });
    }

    async findByUserAndTweet(userId: number, tweetId: number): Promise<Like | null> {
        const like = await prisma.like.findFirst({ where: { userId, tweetId } });
        return like ? this.mapToModel(like) : null;
    }

    private mapToModel(entity: NonNullable<LikeEntity>): Like {
        return new Like(
            entity.id,
            entity.userId,
            entity.tweetId,
            entity.createdAt
        );
    }
}
