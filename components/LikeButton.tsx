'use client';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface LikeButtonProps {
	songId: string;
}

function LikeButton({ songId }: LikeButtonProps) {
	const [isLiked, setIsLiked] = useState(false);

	const { supabaseClient } = useSessionContext();
	const authModal = useAuthModal();
	const { user } = useUser();
	const router = useRouter();

	// Fetch liked song status
	const fetchLikedStatus = useCallback(async () => {
		if (!user?.id) return;

		const { data, error } = await supabaseClient
			.from('liked_songs')
			.select('*')
			.eq('user_id', user.id)
			.eq('song_id', songId)
			.single();

		if (error) {
			return;
		}

		if (data) {
			setIsLiked(true);
		}
	}, [supabaseClient, songId, user?.id]);

	useEffect(() => {
		fetchLikedStatus();
	}, [fetchLikedStatus]);

	const handleLike = async () => {
		if (!user) {
			return authModal.onOpen();
		}

		if (isLiked) {
			// Remove like
			const { error } = await supabaseClient
				.from('liked_songs')
				.delete()
				.eq('user_id', user.id)
				.eq('song_id', songId);

			if (error) {
				toast.error(error.message);
			} else {
				setIsLiked(false);
				toast.success('Like Removed!');
			}
		} else {
			// Add like
			const { error } = await supabaseClient.from('liked_songs').insert({
				song_id: songId,
				user_id: user.id,
			});

			if (error) {
				toast.error(error.message);
			} else {
				setIsLiked(true);
				toast.success('Liked!');
			}
		}
		router.refresh();
	};

	const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

	return (
		<button
			onClick={handleLike}
			className='
			hover:opacity-70 
			transition'
		>
			<Icon size={25} color={isLiked ? '#22c55e' : 'white'} />
		</button>
	);
}

export default LikeButton;
