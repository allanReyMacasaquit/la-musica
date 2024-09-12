'use client';
import LibraryItem from '@/components/LibraryItem';
import LikeButton from '@/components/LikeButton';
import useOnPlay from '@/hooks/useOnPlay';
import { Song } from '@/types/types_custom';

interface SearchContentProps {
	songs: Song[];
}

function SearchContent({ songs }: SearchContentProps) {
	const onPlay = useOnPlay(songs);
	return (
		<div>
			{songs.length === 0 ? (
				<div
					className='
						flex
						flex-col
						gap-y-2
						w-full
						px-2
						text-neutral-400'
				>
					No Songs Found!
				</div>
			) : (
				<div className='flex flex-col gap-y-2 w-full px-6'>
					{songs.map((song) => (
						<div
							key={song.id}
							className='
								flex 
								flex-center 
								gap-x-4 
								w-full'
						>
							<div
								className='
									relative
									w-full
									flex
									items-center'
							>
								<LibraryItem onClick={(id: string) => onPlay(id)} data={song} />
								<div className='absolute right-5 top-4'>
									<LikeButton songId={song.id} />
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default SearchContent;
