import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type Props = {}

const NotFoundPage = (props: Props) => {
    return (
        <div className='h-full flex flex-col items-center justify-center space-y-4 text-muted-foreground'>
            <h1 className='text-4xl'>404</h1>
            <p className=''>
                We couldn&apos;t find the user your&apos;e looking for
            </p>
            <Button variant="secondary" asChild>
                <Link href={`/`}>
                    Go back home
                </Link>
            </Button>
        </div>
    )
}

export default NotFoundPage