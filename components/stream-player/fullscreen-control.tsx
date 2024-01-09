'use client';

import { Maximize, Minimize } from 'lucide-react';
import React from 'react'
import { Hint } from '../hint';

type Props = {
    isFullscreen: boolean;
    onToggle: () => void;
}

const FullscreenControl = ({ isFullscreen, onToggle }: Props) => {
    const Icon = isFullscreen ? Minimize : Maximize;
    const label = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";

    return (
        <div className='flex items-center justify-center gap-4'>
            <Hint label={label} asChild>
                <button
                    onClick={onToggle}
                    className='text-white p-1.5 rounded-lg hover:bg-white/10'
                >
                    <Icon />
                </button>
            </Hint>
        </div>
    )
}

export default FullscreenControl