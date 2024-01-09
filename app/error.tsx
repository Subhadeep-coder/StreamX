"use client";

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type Props = {}

const ErrorPage = (props: Props) => {
    return (
        <div className='h-full flex flex-col items-center justify-center space-y-4 text-muted-foreground'>
            <p>
                Something went wrong
            </p>
            <Button variant="secondary" asChild>
                <Link href={`/`}>
                    Go back home
                </Link>
            </Button>
        </div>
    )
}

export default ErrorPage