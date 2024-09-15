import getSongs from '@/actions/getSongs';
import Header from '@/components/Header';
import ListItem from '@/components/ListItem';
import PageContent from './components/PageContent';
import usePlayer from '@/hooks/usePlayer';
import useLoadImage from '@/hooks/useLoadImage';

export const revalidate = 0;

export default async function Home() {
	const songs = await getSongs();

	return (
		<div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden'>
			<Header>
				<div className=''>
					<h1 className='text-white text-3xl font-semibold'>Welcome back</h1>
					<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
						<ListItem
							image='/images/liked.jpg'
							name='Liked Songs'
							href='Liked'
						/>
					</div>
				</div>
			</Header>
			<div className='mb-2 px-6'>
				<div className='flex justify-between items-center'>
					<h1 className='text-2xl text-white font-semi-bold'>Newest Songs</h1>
				</div>

				{songs.length === 0 ? (
					<div className='text-neutral-400'>No Songs Available</div>
				) : (
					<div className='overflow-y-auto h-[340px] md:h-[580px] bg-emerald-900 rounded-lg shadow-2xl shadow-emerald-900'>
						<PageContent songs={songs} />
					</div>
				)}
			</div>
		</div>
	);
}
