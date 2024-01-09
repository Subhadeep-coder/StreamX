import { getSearch } from '@/lib/search-service';
import React from 'react'
import { ResultCard, ResultCardSkeleton } from './result-card';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
    term?: string;
}

export const Results = async ({ term }: Props) => {
    const data = await getSearch(term);
    return (
        <div>
            <h2 className='text-lg mb-4 font-semibold'>
                Results for term &quot;{term}&quot;
            </h2>
            {
                data.length === 0 && (
                    <p className="text-muted-foreground text-sm">
                        No results found. Try searching for something else.
                    </p>
                )
            }
            <div className="flex flex-col gap-y-4">
                {
                    data.map((stream) => (
                        <ResultCard key={stream.id} data={stream} />
                    ))
                }
            </div>
        </div>
    )
}


export const ResultsSkeleton = () => {
    return (
        <div className="">
            <Skeleton className='h-8 mb-4 w-[290px]' />
            <div className="flex flex-col gap-y-4">
                {
                    [...Array(4)].map((_, i) => (
                        <ResultCardSkeleton key={i} />
                    ))
                }
            </div>
        </div>
    )
}