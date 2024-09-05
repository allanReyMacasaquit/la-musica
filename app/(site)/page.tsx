import Header from '@/components/Header';
import ListItem from '@/components/ListItem';

export default function Home() {
	return (
		<div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-hidden '>
			<Header>
				<div className='mb-2'>
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
			<div className='mt-2 mb-2 px-6'>
				<div className='flex justify-between items-center'>
					<h1 className='text-2xl text-white font-semi-bold'>Newest Songs</h1>
				</div>
				<div>Lists of Songs</div>
			</div>
		</div>
	);
}
