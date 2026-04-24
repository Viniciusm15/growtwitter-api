import { prisma } from "../database/prisma.repository";
import { User } from "../models/user.model";

type UserEntity = Awaited<ReturnType<typeof prisma.user.findUnique>>;

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
        const user = await prisma.user.findUnique({ where: { id } });
        return user ? this.mapToModel(user) : null;
    }

    async findByEmailWithPassword(email: string): Promise<{ user: User; password: string } | null> {
        const entity = await prisma.user.findUnique({ where: { email } });
        return entity ? { user: this.mapToModel(entity), password: entity.password } : null;
    }

    private mapToModel(entity: NonNullable<UserEntity>): User {
        return new User(
            entity.id,
            entity.name,
            entity.email,
            entity.avatar,
            entity.createdAt,
            entity.updatedAt
        );
    }
}
