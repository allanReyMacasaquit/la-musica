'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PlayButton from './PlayButton';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

interface ListItemProps {
	image: string;
	name: string;
	href: string;
}
function ListItem({ image, name, href }: ListItemProps) {
	const authModal = useAuthModal();
	const { user } = useUser();
	const router = useRouter();
	const onClick = () => {
		if (!user) {
			return authModal.onOpen();
		}
		router.push('/liked');
	};
	return (
		<>
			<div
				onClick={onClick}
				className='
					relative 
					group 
					flex 
					items-center 
					rounded-md 
					overflow-hidden 
					gap-x-4 
					bg-neutral-100/10 
					hover:bg-neutral-100/20 
					transition'
			>
				<div
					className='
						relative 
						min-h-[150px] 
						w-full
						md:w-[280px]
						'
				>
					<Image
						className='object-cover'
						sizes='100vh '
						fill
						priority
						src={image}
						alt='Image'
					/>
				</div>
				<p
					className='
						truncate 
						hidden
						md:block
						'
				>
					{name}
				</p>
				<p className='absolute right-2 md:top-2'>
					<PlayButton />
				</p>
			</div>
		</>
	);
}
export default ListItem;
