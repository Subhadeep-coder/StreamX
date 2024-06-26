'use client';

import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import CopyButton from './copy-button';
import { Button } from '@/components/ui/button';

type Props = {
    value: string | null;
}

const KeyCard = ({ value }: Props) => {

    const [show, setShow] = useState(false);

    return (
        <div className='rounded-xl bg-muted p-6'>
            <div className="flex items-center gap-x-10">
                <p className='font-semibold shrink-0'>
                    Stream Key
                </p>
                <div className="w-full space-y-2">
                    <div className="flex w-full items-center gap-x-2">
                        <Input
                            value={value || ""}
                            type={show ? "text" : "password"}
                            disabled
                            placeholder='Stream Key'
                        />
                        <CopyButton value={value || ""} />
                    </div>
                    <Button
                        size="sm"
                        variant="link"
                        onClick={() => setShow(!show)}
                    >
                        {show ? "Hide" : "Show"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default KeyCard