'use client';

import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import useAuthModal from '@/hooks/useAuthModal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { FaUserAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import usePlayer from '@/hooks/usePlayer';
import { useRouter } from 'next/navigation';

interface HeaderProps {
	children: React.ReactNode;
	className?: string;
}

function Header({ children, className }: HeaderProps) {
	const authModal = useAuthModal();
	const router = useRouter();
	const player = usePlayer();
	const supabaseClient = useSupabaseClient();
	const { user } = useUser();

	const handleLogout = async () => {
		const { error } = await supabaseClient.auth.signOut();
		player.reset();
		router.refresh();

		if (error) {
			toast.error(error.message);
		} else {
			toast.success('Successfully logged out.');
		}
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
				<div className='flex mb-4 justify-between items-center gap-x-4 px-2'>
					{user ? (
						<span className='flex gap-x-4 items-center'>
							<Button
								onClick={handleLogout}
								className='bg-white text-black px-6 py-2'
							>
								Logout
							</Button>
							<Button
								onClick={() => router.push('/account')}
								className='bg-white text-black px-4'
							>
								<FaUserAlt />
							</Button>
						</span>
					) : (
						<>
							<div>
								<Button
									onClick={authModal.onOpen}
									className='bg-transparent text-neutral-300 font-medium'
								>
									Sign up
								</Button>
							</div>
							<div>
								<Button
									onClick={authModal.onOpen}
									className='bg-white text-black py-2 px-6 font-extrabold'
								>
									Log in
								</Button>
							</div>
						</>
					)}
				</div>
			</div>
			{children}
		</div>
	);
}
export default Header;
