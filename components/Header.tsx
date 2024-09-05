'use client';

import { useRouter } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';
import Button from './Button';

interface HeaderProps {
	children: React.ReactNode;
	className?: string;
}

function Header({ children, className }: HeaderProps) {
	const router = useRouter();

	const handleLogout = () => {
		//Logout Functionality
	};
	return (
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
	);
}
export default Header;
