"use server";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unBlockUser } from "@/lib/block-service"
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";


const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
);


export const onBlock = async (id: string) => {
    // TODO: Adapt to disconnect from LiveStream
    // TODO: Allow ability to kick the guest
    const self = await getSelf();

    let blockedUser;
    try {
        blockedUser = await blockUser(id);
    } catch (error) {

    }

    try {
        await roomService.removeParticipant(self.id, id);
    } catch (error) {
        // This means user is not in room
    }

    revalidatePath(`/u/${self.username}/community`);
    // if (blockedUser) {
    //     revalidatePath(`/${blockedUser.blocked.username}`);
    // }
    return blockedUser;
}

export const onUnBlock = async (id: string) => {
    const self = await getSelf();
    const unBlockedUser = await unBlockUser(id);

    revalidatePath(`/u/${self.username}/community`);


    return unBlockedUser;
}