"use client";

import React from 'react'
import { VerifiedMark } from '../verified-mark';
import BioModal from './bio-modal';

type Props = {
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    bio: string | null;
    followedByCount: number;
}

const AboutCard = ({
    hostName,
    hostIdentity,
    viewerIdentity,
    bio,
    followedByCount,
}: Props) => {

    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;

    const followedByLabel = followedByCount === 1 ? "follower" : "followers";

    return (
        <div className='px-4'>
            <div className="group rounded-xl bg-background p-6 flex lg:p-10 flex-col gap-y-3">
                <div className="flex items-center justify-between">
                    <div className='flex items-center gap-y-2 font-semibold text-lg lg:text-2xl'>
                        About {hostName}
                        <VerifiedMark />
                    </div>
                    {
                        isHost && (
                            <BioModal initialValue={bio} />
                        )
                    }
                </div>
                <div className="text-sm text-muted-foreground">
                    <span className='font-semibold text-primary'>{followedByCount}</span> {followedByLabel}
                </div>
                <p className='text-sm'>
                    {bio || ""}
                </p>
            </div>
        </div>
    )
}

export default AboutCard