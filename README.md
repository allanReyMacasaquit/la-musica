This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

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
