'use client';

import LibraryItem from '@/components/LibraryItem';
import LikeButton from '@/components/LikeButton';
import { useUser } from '@/hooks/useUser';
import { Song } from '@/types/types_custom';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface LikedContentProps {
	songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
	const router = useRouter();
	const { isLoading, user } = useUser();

	useEffect(() => {
		if (!isLoading && !user) {
			router.replace('/');
		}
	}, [isLoading, user, router]);

	if (songs.length === 0) {
		return (
			<div
				className='
                    flex 
                    flex-col 
                    gap-y-2 
                    w-full px-6 
                    text-neutral-400
                '
			>
				<h1 className='text-2xl md:text-3xl '>No Likes available.</h1>
			</div>
		);
	}
	return (
		<div className='flex flex-col gap-y-2 w-full p-6'>
			{songs.map((song) => (
				<div
					key={song.id}
					className=' relative flex items-center gap-x-4 w-full'
				>
					<div className='flex-1'>
						<LibraryItem onClick={() => {}} data={song} key={song.id} />
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
