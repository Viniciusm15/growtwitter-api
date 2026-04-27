import { prisma } from "../database/prisma.repository";
import { Follow } from "../models/follow.model";

type FollowEntity = Awaited<ReturnType<typeof prisma.follow.findUnique>>;

export class FollowRepository {
    async create(data: { followerId: number; followingId: number }): Promise<Follow> {
        const newFollow = await prisma.follow.create({ data });
        return this.mapToModel(newFollow);
    }

    async delete(followerId: number, followingId: number): Promise<void> {
        await prisma.follow.deleteMany({ where: { followerId, followingId } });
    }

    async findByFollowerAndFollowing(followerId: number, followingId: number): Promise<Follow | null> {
        const follow = await prisma.follow.findFirst({ where: { followerId, followingId } });
        return follow ? this.mapToModel(follow) : null;
    }

    private mapToModel(entity: NonNullable<FollowEntity>): Follow {
        return new Follow(
            entity.id,
            entity.followerId,
            entity.followingId,
            entity.createdAt
        );
    }
}
