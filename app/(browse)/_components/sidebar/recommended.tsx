'use client';

import { useSidebar } from '@/store/useSidebar';
import { Stream, User } from '@prisma/client'
import React from 'react'
import { UserItem, UserItemSkeleton } from './user-item';

type Props = {
    data: (User & {
        stream: { isLive: boolean } | null
    })[];
}

export const Recommended = ({ data }: Props) => {
    const { collapsed } = useSidebar((state) => state);

    const showLabel = !collapsed && data.length > 0;
    return (
        <div>
            {
                showLabel && (
                    <div className='pl-6 mb-4'>
                        <p className='text-sm text-muted-foreground'>
                            Recommended
                        </p>
                    </div>
                )
            }
            <ul className='px-2 space-y-2'>
                {
                    data.map((user) => {
                        return (
                            <UserItem
                                key={user.id}
                                username={user.username}
                                imageUrl={user.imageUrl}
                                isLive={user.stream?.isLive}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
}


export const RecommendedSkeleton = () => {
    return (
        <ul className='px-2'>
            {
                [...Array(3)].map((_, i) => {
                    return <UserItemSkeleton key={i} />
                })
            }
        </ul>
    )
}