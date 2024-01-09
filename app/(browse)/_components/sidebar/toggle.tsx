'use client';

import React from 'react';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useSidebar } from '@/store/useSidebar';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

type Props = {}

export const Toggle = (props: Props) => {
    const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

    const label = collapsed ? 'Expand' : 'Collapse';
    return (
        <>
            {
                collapsed && (
                    <div className="hidden lg:flex items-center justify-center w-full pt-4 mb-4">
                        <Hint
                            label={label}
                            side="right"
                            asChild
                        >
                            <Button
                                className='p-2 h-auto'
                                variant="ghost"
                                onClick={onExpand}
                            >
                                <ArrowRightFromLine className='h-4 w-4' />
                            </Button>
                        </Hint>
                    </div>
                )
            }
            {
                !collapsed && (
                    <div className="p-3 pl-6 mb-2 flex items-center w-full">
                        <p className='font-semibold text-primary'>
                            For you
                        </p>
                        <Hint
                            label={label}
                            side="right"
                            asChild
                        >
                            <Button
                                className='p-2 h-auto ml-auto'
                                variant="ghost"
                                onClick={onCollapse}
                            >
                                <ArrowLeftFromLine className='h-4 w-4' />
                            </Button>
                        </Hint>
                    </div>
                )
            }
        </>
    )
}

export const ToggleSkeleton = () => {
    return (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-center w-full">
            <Skeleton className='h-6 w-[100px]' />
            <Skeleton className='h-6 w-6' />
        </div>
    )
}