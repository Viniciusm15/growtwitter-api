export interface LikeDto {
    id: number;
    userId: number;
    tweetId: number;
    createdAt: Date;
}

export class Like {
    constructor(
        private id: number,
        private userId: number,
        private tweetId: number,
        private createdAt: Date = new Date()
    ) { }

    public toJSON(): LikeDto {
        return {
            id: this.id,
            userId: this.userId,
            tweetId: this.tweetId,
            createdAt: this.createdAt,
        };
    }

    public getId(): number { return this.id; }
    public getUserId(): number { return this.userId; }
    public getTweetId(): number { return this.tweetId; }
    public getCreatedAt(): Date { return this.createdAt; }
}
