'use client';

import { Song } from '@/types/types_custom';
import useOnPlay from '@/hooks/useOnPlay';
import SongItem from '@/components/SongItem';

interface PageContentProps {
	songs: Song[];
}

function PageContent({ songs }: PageContentProps) {
	const onPlay = useOnPlay(songs);
	return (
		<div
			className='
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-8
            gap-4
            mt-2
			px-2'
		>
			{songs.map((item) => (
				<SongItem
					key={item.id}
					data={item}
					onClick={(id: string) => onPlay(id)}
				/>
			))}
		</div>
	);
}

export default PageContent;
