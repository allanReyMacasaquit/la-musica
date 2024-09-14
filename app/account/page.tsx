'use client';
import Header from '@/components/Header';
import AccountContent from './components/AccountContent';
import { useUser } from '@/hooks/useUser';

function AccountPage() {
	const user = useUser();
	return (
		<div className='bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto'>
			<Header className='from-neutral-900'>
				<AccountContent />
			</Header>
		</div>
	);
}
export default AccountPage;
