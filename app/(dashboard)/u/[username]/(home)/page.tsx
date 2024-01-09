import { StreamPlayer } from '@/components/stream-player/index';
import { getUserByUsername } from '@/lib/user-service';
import { currentUser } from '@clerk/nextjs';
import React from 'react'

type Props = {
  params: {
    username: string;
  }
}

const CreatorPage = async ({ params }: Props) => {

  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream || externalUser?.id !== user.externalUserId) {
    throw new Error(`Unauthorized`);
  }

  return (
    <div className='h-full'>
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing
      />
    </div>
  )
}

export default CreatorPage