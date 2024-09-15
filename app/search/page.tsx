import getSongsbyTitle from '@/actions/getSongsByTitle';
import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import SearchContent from './components/SearchContent';

interface SearchPageProps {
	searchParams: {
		title: string;
	};
}
export const revalidate = 0;
async function SearchPage({ searchParams }: SearchPageProps) {
	const songs = await getSongsbyTitle(searchParams.title);

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
				<div
					className='
            flex 
            flex-col 
            gap-y-6 
            mb-2'
				>
					<h1
						className='
              text-white 
              text-3xl 
              font-semibold'
					>
						Search
					</h1>
					<SearchInput />
				</div>
			</Header>
			<div className='overflow-y-auto h-[350px] md:h-[580px] shadow-2xl shadow-emerald-900'>
				<SearchContent songs={songs} />
			</div>
		</div>
	);
}

export default SearchPage;
