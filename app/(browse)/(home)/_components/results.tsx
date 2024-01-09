import { getStreams } from '@/lib/feed-service'
import React from 'react'
import { ResultCard, ResultCardSkeleton } from './result-card';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {}

export const Results = async (props: Props) => {
    const data = await getStreams();
    return (
        <div>
            <h2 className='mb-4 text-lg font-semibold'>
                Streams we think you&apos;ll like
            </h2>
            {
                data.length === 0 && (
                    <div className="text-muted-foreground text-sm">
                        No Streams Found
                    </div>
                )
            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {
                    data.map((stream) => {
                        return (
                            <ResultCard
                                key={stream.id}
                                data={stream}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}



export const ResultsSkeleton = () => {
    return (
        <div className=''>
            <Skeleton className='h-8 w-[290px] mb-4' />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {
                    [...Array(4)].map((_, i) => (
                        <ResultCardSkeleton key={i} />
                    ))
                }
            </div>
        </div>
    )
}