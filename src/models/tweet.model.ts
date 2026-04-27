export interface TweetDto {
    id: number;
    content: string;
    userId: number;
    parentId: number | null;
    createdAt: Date;
    updatedAt: Date;
}

export class Tweet {
    constructor(
        private id: number,
        private content: string,
        private userId: number,
        private parentId: number | null = null,
        private createdAt: Date = new Date(),
        private updatedAt: Date = new Date()
    ) { }

    public toJSON(): TweetDto {
        return {
            id: this.id,
            content: this.content,
            userId: this.userId,
            parentId: this.parentId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    public getId(): number { return this.id; }
    public getContent(): string { return this.content; }
    public getUserId(): number { return this.userId; }
    public getParentId(): number | null { return this.parentId; }
    public getCreatedAt(): Date { return this.createdAt; }
    public getUpdatedAt(): Date { return this.updatedAt; }
}
