export interface FollowDto {
    id: number;
    followerId: number;
    followingId: number;
    createdAt: Date;
}

export class Follow {
    constructor(
        private id: number,
        private followerId: number,
        private followingId: number,
        private createdAt: Date = new Date()
    ) { }

    public toJSON(): FollowDto {
        return {
            id: this.id,
            followerId: this.followerId,
            followingId: this.followingId,
            createdAt: this.createdAt,
        };
    }

    public getId(): number { return this.id; }
    public getFollowerId(): number { return this.followerId; }
    public getFollowingId(): number { return this.followingId; }
    public getCreatedAt(): Date { return this.createdAt; }
}
