import useAuthModal from '@/hooks/useAuthModal';
import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbPlaylist } from 'react-icons/tb';

function Library() {
	const authModal = useAuthModal();
	const uploadmodal = useUploadModal();
	const { user } = useUser();

	const onClick = () => {
		if (!user) {
			return authModal.onOpen();
		}
		return uploadmodal.onOpen();
	};
	return (
		<div className='flex flex-col'>
			<div className='flex items-center justify-between px-4 pt-4'>
				<div className='inline-flex items-center gap-x-2'>
					<TbPlaylist className='text-neutral-400' size={26} />
					<p className='text-neutral-400 font-medium text-md'>Your Library</p>
				</div>
				<AiOutlinePlus
					onClick={onClick}
					className='text-neutral-400 cursor-pointer hover:text-white transition'
					size={20}
				/>
			</div>
			<div className='flex flex-col gap-y-2 mt-4 px-3 '>List of Songs</div>
		</div>
	);
}
export default Library;
