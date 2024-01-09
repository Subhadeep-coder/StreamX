import { StreamPlayerSkeleton } from '@/components/stream-player'
import React from 'react'

type Props = {}

const UserLoading = (props: Props) => {
    return (
        <div className='h-full'>
            <StreamPlayerSkeleton />
        </div>
    )
}

export default UserLoading