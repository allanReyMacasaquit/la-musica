'use client';

import LibraryItem from '@/components/LibraryItem';
import LikeButton from '@/components/LikeButton';
import useLoadImage from '@/hooks/useLoadImage';
import useOnPlay from '@/hooks/useOnPlay';
import usePlayer from '@/hooks/usePlayer';
import { useUser } from '@/hooks/useUser';
import { Song } from '@/types/types_custom';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import {
	BsFillPauseFill,
	BsFillPlayFill,
	BsFillStopFill,
	BsSkipBackward,
	BsSkipForward,
} from 'react-icons/bs';
import WaveSurfer from 'wavesurfer.js';

interface LikedContentProps {
	songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
	const router = useRouter();
	const { isLoading, user } = useUser();
	const player = usePlayer();
	const onPlay = useOnPlay(songs);
	const activeSong = songs.find((song) => song.id === player.activeId) || null;
	const activeImagePath = useLoadImage(activeSong as Song);

	useEffect(() => {
		if (!isLoading && !user) {
			router.replace('/');
		}
	}, [isLoading, user, router]);

	if (songs.length === 0) {
		return (
			<div className='flex flex-col gap-y-2 w-full px-4 text-neutral-400'>
				<h1 className='text-2xl md:text-3xl'>No Likes available.</h1>
			</div>
		);
	}

	return (
		<div className='flex flex-col gap-y-2 w-full p-2 md:p-4'>
			<div className='relative h-32 w-full lg:h-44 lg:w-44 mb-4'>
				<Image
					src={activeImagePath || '/images/top-tracks.png'}
					alt='Active Playlist'
					className='object-cover rounded-xl'
					fill
					sizes='100vw 100vh'
					priority
				/>
			</div>

			{songs.map((song) => (
				<div
					key={song.id}
					className={`relative flex items-center gap-x-2 w-full ${
						activeSong?.id === song.id
							? 'bg-emerald-950 rounded-lg'
							: 'bg-emerald-900'
					}`}
				>
					<div className='flex-1'>
						<LibraryItem
							onClick={(id: string) => onPlay(id)}
							data={song}
							key={song.id}
						/>
					</div>
					<div className='absolute top-4 right-2'>
						<LikeButton songId={song.id} />
					</div>
				</div>
			))}
		</div>
	);
};

export default LikedContent;
