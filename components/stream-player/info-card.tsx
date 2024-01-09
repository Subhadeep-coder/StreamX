"use client";

import { Pencil } from 'lucide-react';
import React from 'react'
import { Separator } from '../ui/separator';
import Image from 'next/image';
import InfoModal from './info-modal';

type Props = {
    hostIdentity: string;
    viewerIdentity: string;
    name: string;
    thumbnailUrl: string | null;
}

const InfoCard = ({ hostIdentity, viewerIdentity, name, thumbnailUrl }: Props) => {
    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;
    if (!isHost) {
        return null;
    }

    return (
        <div className='px-4'>
            <div className="rounded-xl bg-background">
                <div className="flex items-center gap-x-2.5 p-4">
                    <div className="rounded-md bg-blue-600 p-2 h-auto w-auto">
                        <Pencil className='h-5 w-5' />
                    </div>
                    <div>
                        <h2 className='text-sm lg:text-lg font-semibold capitalize'>
                            Edit your Stream Info
                        </h2>
                        <p className='text-xs text-muted-foreground lg:text-sm'>
                            Maximize your visibility
                        </p>
                    </div>
                    <InfoModal
                        initialName={name}
                        initialThumbnailUrl={thumbnailUrl}
                    />
                </div>
                <Separator />
                <div className="p-4 lg:p-6 space-y-4">
                    <div>
                        <h3 className='text-sm mb-2 text-muted-foreground'>
                            Name
                        </h3>
                        <p className='text-sm font-semibold'>
                            {name}
                        </p>
                    </div>
                    <div>
                        <h3 className='text-sm mb-2 text-muted-foreground'>
                            Thumbnail
                        </h3>
                        {
                            thumbnailUrl && (
                                <div className="relative aspect-video rounded-md overflow-hidden border w-[200px] border-white/10">
                                    <Image
                                        src={thumbnailUrl}
                                        alt={name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard