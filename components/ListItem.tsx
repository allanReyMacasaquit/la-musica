'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaPlay } from 'react-icons/fa';
import PlayButton from './PlayButton';

interface ListItemProps {
	image: string;
	name: string;
	href: string;
}
function ListItem({ image, name, href }: ListItemProps) {
	const router = useRouter();
	const onClick = () => {
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
					transition pr-4'
			>
				<div
					className='
						relative 
						min-h-[64px] 
						min-w-[64px]'
				>
					<Image
						className='object-fill'
						sizes='100'
						fill
						src={image}
						alt='Image'
					/>
				</div>
				<p
					className='
						font-medium 
						truncate 
						py-5'
				>
					{name}
				</p>
				<p className='absolute right-3'>
					<PlayButton />
				</p>
			</div>
		</>
	);
}
export default ListItem;
