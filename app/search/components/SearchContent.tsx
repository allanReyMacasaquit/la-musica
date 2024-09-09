'use client';
import LibraryItem from '@/components/LibraryItem';
import { Song } from '@/types/types_custom';

interface SearchContentProps {
	songs: Song[];
}

function SearchContent({ songs }: SearchContentProps) {
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
								flex flex-center gap-x-4 w-full'
						>
							<div
								className='
									flex-1'
							>
								<LibraryItem onClick={() => {}} data={song} />
							</div>
							{/* {todo} add like button here */}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default SearchContent;
