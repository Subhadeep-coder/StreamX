"use client";

import { Volume1, Volume2, VolumeX } from 'lucide-react';
import React from 'react'
import { Hint } from '../hint';
import { Slider } from '../ui/slider';

type Props = {
    onToggle: () => void;
    onChange: (value: number) => void;
    value: number;
}

const VolumeControl = ({ onToggle, onChange, value }: Props) => {
    const isMuted = value === 0;
    const isAboveHalf = value > 50;
    let Icon = Volume1;
    if (isMuted) {
        Icon = VolumeX;
    } else if (isAboveHalf) {
        Icon = Volume2;
    }

    const label = isMuted ? "Unmute" : "Mute";

    const handleChange = (value: number[]) => {
        onChange(value[0]);
    }
    return (
        <div className='flex items-center gap-2'>
            <Hint label={label} asChild>
                <button
                    onClick={onToggle}
                    className='text-white rounded-lg p-1.5 hover:bg-white/10'
                >
                    <Icon className='h-6 w-6' />
                </button>
            </Hint>
            <Slider
                className='w-[8rem] cursor-pointer'
                onValueChange={handleChange}
                value={[value]}
                max={100}
                step={1}
            />
        </div>
    )
}

export default VolumeControl