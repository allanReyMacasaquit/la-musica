'use client';
import Button from '@/components/Button';
import { postData } from '@/libs/helpers';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSubscribeModal from '@/hooks/useSubscribeModal';
import { useUser } from '@/hooks/useUser';
import Image from 'next/image';
import Box from '@/components/Box';

const AccountContent = () => {
	const router = useRouter();
	const subscribeModal = useSubscribeModal();
	const { isLoading, subscription, user } = useUser();

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!isLoading && !user) {
			router.replace('/');
		}
	}, [isLoading, user, router]);

	const redirectToCustomerPortal = async () => {
		setLoading(true);
		try {
			const { url, error } = await postData({
				url: '/api/create-portal-link',
			});
			window.location.assign(url);
		} catch (error) {
			if (error) return alert((error as Error).message);
		}
		setLoading(false);
	};

	return (
		<div className='mb-7 px-6'>
			{!subscription && (
				<div className='flex flex-col gap-y-4'>
					<p>No active plan.</p>
					<Button onClick={subscribeModal.onOpen} className='w-[300px]'>
						Subscribe
					</Button>
				</div>
			)}
			{subscription && (
				<div className='flex flex-col gap-y-4 pt-6'>
					<p>
						You are currently on the
						<b> {subscription?.prices?.products?.name} </b>
						plan.
					</p>
					<Button
						disabled={loading || isLoading}
						onClick={redirectToCustomerPortal}
						className='w-full mt-6 items-center'
					>
						Open customer portal
					</Button>
				</div>
			)}
			<Box className='bg-emerald-800 p-2 mt-10 rounded-xl  w-full '>
				<div>
					<div className='mx-4 flex'>
						<div>
							<Image
								src='/images/account.svg'
								width={100}
								height={100}
								priority
								alt='Profile'
								className='profile-picture'
							/>
							<h2>Name: {user?.email?.substring(0, 5)}...</h2>
							<p>Email: {user?.email}</p>
						</div>
					</div>
				</div>
			</Box>
		</div>
	);
};

export default AccountContent;
