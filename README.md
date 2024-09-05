## (Site)Home Components

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

## Learn More

## Imports

npm i tailwind-merge
npm i react-icons

## Create Sidebar Component

'use client';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import Box from './Box';
import SidebarItem from './SidebarItem';

interface SidebarProps {
children: React.ReactNode;
}

function Sidebar({ children }: SidebarProps) {
const pathname = usePathname();
const routes = useMemo(
() => [
{
label: 'Home',
active: pathname !== '/search',
href: '/',
icon: HiHome,
},
{
label: 'Search',
active: pathname === '/search',
href: '/search',
icon: BiSearch,
},
],
[pathname]
);
return (

<div className='flex h-full'>
<div className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p2'>
<Box>
<div className='flex flex-col gap-y-4 px-5 py-4'>
{routes.map((item) => (
<SidebarItem key={item.label} {...item} />
))}
</div>
</Box>
<Box className='overflow-y-auto h-full'>Song Library</Box>
</div>
</div>
);
}
export default Sidebar;

## Create SidebarItem Component

import Link from 'next/link';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

interface SidebarItemProps {
icon: IconType;
label: string;
active?: boolean;
href: string;
}
function SidebarItem({ icon: Icon, label, active, href }: SidebarItemProps) {
return (

<Link
href={href}
className={twMerge(
`flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1 `,
active && 'text-white'
)} >
<Icon size={26} />
<p className='truncate w-full'>{label}</p>
</Link>
);
}
export default SidebarItem;

## Create Box Component

import { twMerge } from 'tailwind-merge';

interface BoxProps {
children: React.ReactNode;
className?: string;
}
function Box({ children, className }: BoxProps) {
return (

<div
className={twMerge(`bg-neutral-900 rounded-lg h-fit w-full`, className)} >
{children}
</div>
);
}
export default Box;

## Create Library Component

import { AiOutlinePlus } from 'react-icons/ai';
import { TbPlaylist } from 'react-icons/tb';

function Library() {
const onCLick = () => {
//Handle upload image
};
return (

<div className='flex flex-col'>
<div className='flex items-center justify-between px-5 pt-4'>
<div className='inline-flex items-center gap-x-2'>
<TbPlaylist className='text-neutral-400' size={26} />
<p className='text-neutral-400 font-medium text-md'>Your Library</p>
</div>
<AiOutlinePlus
					onClick={onCLick}
					className='text-neutral-400 cursor-pointer hover:text-white transition'
					size={20}
				/>
</div>
<div className='flex flex-col gap-y-2 mt-4 px-3 '>List of Songs</div>
</div>
);
}
export default Library;

## Add Library Component to Sidebar

<div className='flex h-full'>
			<div className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p2'>
				<Box>
					<div className='flex flex-col gap-y-4 px-5 py-4'>
						{routes.map((item) => (
							<SidebarItem key={item.label} {...item} />
						))}
					</div>
				</Box>
				<Box className='overflow-y-auto h-full'>
					<Library />
				</Box>
			</div>
			<main className='h-full flex-1 overflow-y-auto py-2'>{children}</main>
		</div>

## create ListItem Component

<button
onClick={onCLick}
className='relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4'
		>

<div className='relative min-h-[64px] min-w-[64px]'>
<Image className='object-fill' fill src={image} alt='Image' />
</div>
<p className='font-medium truncate py-5'>{name}</p>
<div className='absolute transition opacity-0 rounded-full items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110'>
<FaPlay className='text-black' />
</div>
</button>

## Create Header Component

<div
			className={twMerge(`
        h-fit bg-gradient-to-b from-emerald-800 p-6
        `)}
		>
			<div className='flex w-full items-center justify-between'>
				<div className='flex mb-4 items-center gap-x-2'>
					<div className='hidden md:flex items-center'>
						<button
							onClick={() => router.back}
							className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'
						>
							<RxCaretLeft className='text-white' size={35} />
						</button>
					</div>
					<div className='hidden md:flex items-center'>
						<button
							onClick={() => router.forward}
							className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'
						>
							<RxCaretRight className='text-white' size={35} />
						</button>
					</div>

    				<div className='flex md:hidden gap-2 items-center justify-between'>
    					<button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
    						<HiHome className='text-black size-6' />
    					</button>
    					<button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
    						<BiSearch className='text-black size-6' />
    					</button>
    				</div>
    			</div>
    			<div className='flex mb-4 justify-between items-center gap-x-4'>
    				<>
    					<div>
    						<Button
    							onClick={() => {}}
    							className='bg-transparent text-neutral-300 font-medium'
    						>
    							Sign up
    						</Button>
    					</div>
    					<div>
    						<Button
    							onClick={() => {}}
    							className='bg-white text-black py-2 px-6 font-extrabold'
    						>
    							Log in
    						</Button>
    					</div>
    				</>
    			</div>
    		</div>
    		{children}
    	</div>
