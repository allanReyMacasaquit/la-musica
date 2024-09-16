import { Song } from '@/types/types_custom';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const useGetSongById = (id?: string) => {
	const [isLoading, setIsLoading] = useState(false);
	const [song, setSong] = useState<Song | undefined>(undefined);
	const { supabaseClient } = useSessionContext();

	useEffect(() => {
		if (!id) return;

		let isMounted = true; // Handle unmounting to avoid state updates
		setIsLoading(true);

		const fetchSong = async () => {
			try {
				const { data, error } = await supabaseClient
					.from('songs')
					.select('*')
					.eq('id', id)
					.single();

				if (error) {
					throw new Error(error.message);
				}

				if (isMounted) {
					setSong(data as Song);
					setIsLoading(false);
				}
			} catch (error: any) {
				if (isMounted) {
					setIsLoading(false);
					toast.error(error.message || 'Failed to fetch song');
				}
			}
		};

		fetchSong();

		return () => {
			isMounted = false; // Cleanup to prevent memory leaks or setting state after unmount
		};
	}, [id, supabaseClient]);

	return useMemo(
		() => ({
			isLoading,
			song,
		}),
		[isLoading, song]
	);
};

export default useGetSongById;
