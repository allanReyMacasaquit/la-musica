'use Client';

import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types/types_custom';
import Image from 'next/image';

interface LibraryItemProps {
	data: Song;
	onClick?: (id: string) => void;
}
function LibraryItem({ data, onClick }: LibraryItemProps) {
	const imageUrl = useLoadImage(data);

	const handleClick = () => {
		if (onClick) {
			return onClick(data.id);
		}
	};

	return (
		<div
			onClick={handleClick}
			className='
                flex
                items-center
                gap-x-3
                cursor-pointer
                hover:bg-neutral-800/50
                w-full
                h-full
                p-1
                rounded-md
                capitalize
                '
		>
			<div
				className='
                    relative
                    rounded-md
                    min-h-[48px]
                    min-w-[48px]
                    overflow-hidden
                    '
			>
				<Image
					src={imageUrl || '/images/liked.jpg'}
					fill
					sizes='100'
					alt='Image'
					priority
					className='object-cover'
				/>
			</div>
			<div
				className='
                    flex
                    flex-col
                    gap-y-1
                    overflow-hidden'
			>
				<p
					className='
                    text-white 
                    truncate'
				>
					{data.title}
				</p>
				<p
					className='
                    text-neutral-400
                    text-sm
                    truncate'
				>
					{data.author}
				</p>
			</div>
		</div>
	);
}
export default LibraryItem;
