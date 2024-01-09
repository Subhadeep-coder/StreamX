'use client';

import { useUser } from '@clerk/nextjs';
import { Fullscreen, KeyRound, MessageSquare, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react'
import { NavItems, NavItemsSkeleton } from './nav-item';

type Props = {}


const Navigation = (props: Props) => {
    const pathname = usePathname();
    const { user } = useUser();
    const routes = [
        {
            label: "Stream",
            href: `/u/${user?.username}`,
            icon: Fullscreen,
        },
        {
            label: "Keys",
            href: `/u/${user?.username}/keys`,
            icon: KeyRound,
        },
        {
            label: "Chat",
            href: `/u/${user?.username}/chat`,
            icon: MessageSquare,
        },
        {
            label: "Community",
            href: `/u/${user?.username}/community`,
            icon: Users,
        },
    ]

    if (!user?.username) {
        return (
            <ul className='space-y-2'>
                {
                    [...Array(4)].map((_, i) => (
                        <NavItemsSkeleton key={i} />
                    ))
                }
            </ul>
        )
    }

    return (
        <ul className='space-y-2 px-2 pt-4 lg:pt-0'>
            {
                routes.map((route) => (
                    <NavItems
                        key={route.href}
                        label={route.label}
                        icon={route.icon}
                        href={route.href}
                        isActive={pathname === route.href}
                    />
                ))
            }
        </ul>
    )
}

export default Navigation