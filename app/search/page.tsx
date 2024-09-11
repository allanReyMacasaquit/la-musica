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
        overflow-y-auto'
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
			<SearchContent songs={songs} />
		</div>
	);
}

export default SearchPage;
