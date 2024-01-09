"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { ChatVariant, useChatSidebar } from '@/store/useChatSidebar';
import { useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react';
import { useMediaQuery } from 'usehooks-ts';
import { ConnectionState } from 'livekit-client';
import { ChatHeader, ChatHeaderSkeleton } from './chat-header';
import { ChatForm, ChatFormSkeleton } from './chat-form';
import { ChatList, ChatListSkeleton } from './chat-list';
import ChatCommunity from './chat-community';

type Props = {
    hostName: string;
    hostIdentity: string;
    viewerName: string;
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowedBy: boolean;
}

export const Chat = ({
    hostName,
    hostIdentity,
    viewerName,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowedBy,
}: Props) => {

    const [value, setValue] = useState("");
    const matches = useMediaQuery('(max-width: 1024px)');
    const { variant, onExpand } = useChatSidebar((state) => state);
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);

    const isOnline = participant && connectionState === ConnectionState.Connected;
    const isHidden = !isChatEnabled || !isOnline;
    const { chatMessages: messages, send } = useChat();

    useEffect(() => {
        if (matches) {
            onExpand();
        }
    }, [matches, onExpand])

    const reservedMessages = useMemo(() => {
        return messages.sort((a, b) => b.timestamp - a.timestamp);
    }, [messages])

    const onSubmit = () => {
        if (!send) {
            return;
        }
        send(value);
        setValue("");
    }

    const onChange = (value: string) => {
        setValue(value);
    }


    return (
        <div className='flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]'>
            <ChatHeader />
            {
                variant === ChatVariant.CHAT && (
                    <>
                        <ChatList
                            messages={reservedMessages}
                            isHidden={isHidden}
                        />
                        <ChatForm
                            onSubmit={onSubmit}
                            value={value}
                            onChange={onChange}
                            isHidden={isHidden}
                            isFollowersOnly={isChatFollowedBy}
                            isDelayed={isChatDelayed}
                            isFollowing={isFollowing}
                        />
                    </>
                )
            }
            {
                variant === ChatVariant.COMMUNITY && (
                    <>
                        <ChatCommunity
                            viewerName={viewerName}
                            hostName={hostName}
                            isHidden={isHidden}
                        />
                    </>
                )
            }
        </div>
    )
}


export const ChatSkeleton = () => {
    return (
        <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
            <ChatHeaderSkeleton />
            <ChatListSkeleton />
            <ChatFormSkeleton />
        </div>
    )
}