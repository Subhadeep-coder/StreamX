"use client";

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/useSidebar';
import React from 'react'
import { RecommendedSkeleton } from './recommended';
import { ToggleSkeleton } from './toggle';
import { useIsClient } from 'usehooks-ts';
import { FollowingSkeleton } from './following';

type Props = {
    children: React.ReactNode;
}

const Wrapper = ({ children }: Props) => {
    const isClient = useIsClient();
    const { collapsed } = useSidebar((state) => state);

    if (!isClient) {
        return (
            <aside className={cn('fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50')}>
                <ToggleSkeleton />
                <FollowingSkeleton />
                <RecommendedSkeleton />
            </aside>
        );
    }

    return (
        <aside className={cn('fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2d2e35] z-50', collapsed && 'w-[70px]')}>
            {children}
        </aside>
    )
}

export default Wrapper