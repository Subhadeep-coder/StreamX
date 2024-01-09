import { getSelf } from "./auth-service";
import { db } from "./db";

export const getStreams = async () => {
    let userId;
    try {
        const self = await getSelf();
        userId = self.id;
    } catch (error) {
        userId = null;
    }

    let streams = [];
    if (userId) {
        // Load by userId
        streams = await db.stream.findMany({
            where: {
                user: {
                    NOT: {
                        blocking: {
                            some: {
                                blockerId: userId
                            }
                        }
                    }
                }
            },
            select: {
                id: true,
                user: true,
                name: true,
                thumbnailUrl: true,
                isLive: true,
            },
            orderBy: [
                {
                    isLive: "desc"
                },
                {
                    updatedAt: "desc"
                }
            ]
        })
    } else {
        streams = await db.stream.findMany({
            select: {
                id: true,
                user: true,
                name: true,
                thumbnailUrl: true,
                isLive: true,
            },
            orderBy: [
                {
                    isLive: "desc"
                },
                {
                    updatedAt: "desc"
                }
            ]
        })
    }

    return streams;
}