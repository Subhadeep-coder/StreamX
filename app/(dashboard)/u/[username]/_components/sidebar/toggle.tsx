'use client';

import React from 'react';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import { useCreatorSidebar } from '@/store/useCreatorSidebar';

type Props = {}

const Toggle = (props: Props) => {
    const { collapsed, onExpand, onCollapse } = useCreatorSidebar((state) => state);

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
                            Dashboard
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

export default Toggle