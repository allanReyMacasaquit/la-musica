'use client';
import Modal from './Modal';

function SubscribeModal() {
	let content = <div className='text-center'>No Available Products</div>;

	return (
		<Modal
			title='Only for Premium users'
			description='Listen to Music for Standard Premium '
			isOpen
			onChange={() => {}}
		>
			{content}
		</Modal>
	);
}
export default SubscribeModal;
