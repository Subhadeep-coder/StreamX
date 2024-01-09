"use client";

import { useTracks } from '@livekit/components-react';
import { Participant, Track } from 'livekit-client';
import React, { useEffect, useRef, useState } from 'react'
import FullscreenControl from './fullscreen-control';
import { useEventListener } from 'usehooks-ts';
import VolumeControl from './volume-control';

type Props = {
    participant: Participant;
}

const LiveVideo = ({ participant }: Props) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [isFullScreen, setIsFullScreen] = useState(false);
    const [volume, setVolume] = useState(0);

    useEffect(() => {
        onVolumeChange(0);
    }, [])


    const onVolumeChange = (value: number) => {
        setVolume(+value);
        if (videoRef?.current) {
            videoRef.current.muted = value === 0;
            videoRef.current.volume = +volume * 0.01;
        }
    }

    const toggleMute = () => {
        const isMuted = volume === 0;

        setVolume(isMuted ? 50 : 0);

        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            videoRef.current.volume = isMuted ? 0.5 : 0;
        }
    }

    const toggleFullScreen = () => {
        if (isFullScreen) {
            document.exitFullscreen();
            setIsFullScreen(false);
        } else if (wrapperRef?.current) {
            wrapperRef.current.requestFullscreen();
            setIsFullScreen(true);
        }
    }

    const handleFullscreenChange = () => {
        const isCurrentlyFullscreen = document.fullscreenElement !== null;
        setIsFullScreen(isCurrentlyFullscreen);
    }

    useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

    useTracks([Track.Source.Camera, Track.Source.Microphone])
        .filter((track) => track.participant.identity === participant.identity)
        .forEach((track) => {
            if (videoRef.current) {
                track.publication.track?.attach(videoRef.current);
            }
        });
    return (
        <div
            className='relative h-full flex'
            ref={wrapperRef}
        >
            <video width="100%" ref={videoRef} />
            <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
                <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
                    <VolumeControl
                        value={volume}
                        onChange={onVolumeChange}
                        onToggle={toggleMute}
                    />
                    <FullscreenControl
                        isFullscreen={isFullScreen}
                        onToggle={toggleFullScreen}
                    />
                </div>
            </div>
        </div>
    )
}

export default LiveVideo