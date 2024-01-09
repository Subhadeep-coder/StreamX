"use client";

import { onBlock } from "@/actions/block";
import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
    isFollowing: boolean;
    userId: string;
}

export const Actions = ({ isFollowing, userId }: Props) => {

    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`Your are now following ${data.following.username}`))
                .catch(() => toast.error('Something went wrong'));
        })
    }

    const handleUnFollow = () => {
        startTransition(() => {
            onUnFollow(userId)
                .then((data) => toast.success(`Your unfollowed ${data.following.username}`))
                .catch(() => toast.error('Something went wrong'));
        })
    }

    const onClick = () => {
        if (isFollowing) {
            handleUnFollow();
        } else {
            handleFollow();
        }
    }

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => toast.success(`You blocked ${data?.blocked.username}`))
                .catch(() => toast.error(`Something went wrong!`));
        })
    }

    return (
        <>
            <Button disabled={isPending} variant='primary' onClick={onClick}>
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button disabled={isPending} onClick={handleBlock}>
                Block
            </Button>
        </>
    )
}