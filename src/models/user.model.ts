export interface UserDto {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export class User {
    constructor(
        private id: number,
        private name: string,
        private email: string,
        private avatar: string | null = null,
        private createdAt: Date = new Date(),
        private updatedAt: Date = new Date()
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

    public getId(): number { return this.id; }
    public getName(): string { return this.name; }
    public getEmail(): string { return this.email; }
    public getAvatar(): string | null { return this.avatar; }
    public getCreatedAt(): Date { return this.createdAt; }
    public getUpdatedAt(): Date { return this.updatedAt; }
}
