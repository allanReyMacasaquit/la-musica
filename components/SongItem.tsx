'use client';

import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types/types_custom';
import Image from 'next/image';
import PlayButton from './PlayButton';

interface SongItemProps {
	data: Song;
	onClick: (id: string) => void;
}
function SongItem({ data, onClick }: SongItemProps) {
	const imagePath = useLoadImage(data);
	return (
		<div
			onClick={() => onClick(data.id)}
			className='
                relative
                group
                flex
                flex-col
                items-center
                justify-center
                rounded-md
                overflow-hidden
                gap-x-4
                bg-neutral-400/5
                cursor-pointer
                hover:bg-neutral-400/10
                transition
                p-1

    '
		>
			<div
				className='
                    relative
                    aspect-square
                    w-full
                    h-full
                    rounded-md
                    overflow-hidden
            '
			>
				<Image
					className='object-cover'
					src={imagePath || '/images/liked.jpg'}
					fill
					sizes='100vh'
					alt='Image'
					priority
				/>
			</div>
			<div
				className=' 
          flex 
          flex-col 
          items-start 
          w-full 
          pt-4'
			>
				<p
					className='
          px-2
            capitalize  
            font-semibold 
            truncate 
            w-full'
				>
					{data.title}
				</p>
				<p
					className='
          px-2
          capitalize
        text-neutral-400
          text-sm
          pb-2
          w-full
          truncate'
				>
					{data.author}
				</p>
			</div>
			<div
				className='
          absolute
          bottom-20
          right-3
          '
			>
				<PlayButton />
			</div>
		</div>
	);
}
export default SongItem;
