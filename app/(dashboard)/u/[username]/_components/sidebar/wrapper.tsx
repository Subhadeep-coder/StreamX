"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/useCreatorSidebar";
import React from "react";

type Props = {
    children: React.ReactNode;
}

export const Wrapper = ({ children }: Props) => {

    const { collapsed } = useCreatorSidebar((state) => state);

    return (
        <aside
            className={cn("fixed left-0 flex flex-col h-full bg-background border-r w-[70px] lg:w-60 z-50 border-[#2d2e35]",
                collapsed && "lg:w-[70px]"
            )}
        >
            {children}
        </aside>
    )
}