import getLikedSongs from '@/actions/getLikedSongs';
import Header from '@/components/Header';
import Image from 'next/image';
import LikedContent from './components/LikedContent';

export const revalidate = 0;

async function LikedPage() {
	const songs = await getLikedSongs();

	return (
		<div
			className='
                bg-neutral-900
                rounded-lg
                h-full
                w-full
                overflow-hidden
                '
		>
			<Header>
				<div className='mt-6'>
					<div
						className='
                            flex
                            flex-col
                            md:flex-row
                            items-center
                            gap-x5'
					>
						<div
							className='
                                relative
                                h-32
                                w-32
                                lg:h-44
                                lg:w-52'
						>
							<Image
								src='/images/lamusika-1.webp'
								alt='Active Playlist'
								className='object-cover rounded-md'
								fill
								sizes='100vh'
								priority
							/>
						</div>
						<div
							className='
                                flex
                                flex-col
                                gap-y-2
                                mt-4
								mx-2
                                md:mt-0'
						>
							<p
								className='
                                    px-4
                                    hidden
                                    md:block
                                    font-semibold
                                    text-sm
                                    uppercase'
							>
								Favorites
							</p>
							<h1
								className='
                                    text-3xl 
                                    sm:text-4xl
                                    md:text-5xl  
                                    lg:text-6xl
                                    px-4 
                                    capitalize'
							>
								My Top Tracks
							</h1>
						</div>
					</div>
				</div>
			</Header>
			<div className='overflow-y-auto mx-6 h-[260px] md:h-[530px] bg-emerald-900 rounded-lg shadow-2xl shadow-emerald-900'>
				<LikedContent songs={songs} />
			</div>
		</div>
	);
}

export default LikedPage;
