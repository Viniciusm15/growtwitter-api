import { prisma } from "../database/prisma.repository";
import { User } from "../models/user.model";
import { Tweet } from "../models/tweet.model";
import { Follow } from "../models/follow.model";

type UserBase = Awaited<ReturnType<typeof prisma.user.findUnique>>;
type UserWithRelations = NonNullable<UserBase> & {
    tweets: { id: number; content: string; userId: number; parentId: number | null; createdAt: Date; updatedAt: Date }[];
    following: { id: number; followerId: number; followingId: number; createdAt: Date }[];
    followers: { id: number; followerId: number; followingId: number; createdAt: Date }[];
};

export class UserRepository {
    async create(data: { name: string; email: string; password: string; avatar?: string | null }): Promise<User> {
        const newUser = await prisma.user.create({ data });
        return this.mapToModel(newUser);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { email } });
        return user ? this.mapToModel(user) : null;
    }

    async findById(id: number): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                tweets: { orderBy: { createdAt: "desc" } },
                followers: true,
                following: true,
            },
        });
        return user ? this.mapToModel(user) : null;
    }

    async findByEmailWithPassword(email: string): Promise<{ user: User; password: string } | null> {
        const entity = await prisma.user.findUnique({ where: { email } });
        return entity ? { user: this.mapToModel(entity), password: entity.password } : null;
    }

    private mapToModel(entity: NonNullable<UserBase> | UserWithRelations): User {
        const toTweet = (t: { id: number; content: string; userId: number; parentId: number | null; createdAt: Date; updatedAt: Date }) =>
            new Tweet(t.id, t.content, t.userId, t.parentId, t.createdAt, t.updatedAt);

        const toFollow = (f: { id: number; followerId: number; followingId: number; createdAt: Date }) =>
            new Follow(f.id, f.followerId, f.followingId, f.createdAt);

        const withRelations = entity as UserWithRelations;

        return new User(
            entity.id,
            entity.name,
            entity.email,
            entity.avatar,
            entity.createdAt,
            entity.updatedAt,
            "tweets" in entity ? withRelations.tweets.map(toTweet) : [],
            "following" in entity ? withRelations.following.map(toFollow) : [],
            "followers" in entity ? withRelations.followers.map(toFollow) : []
        );
    }
}
