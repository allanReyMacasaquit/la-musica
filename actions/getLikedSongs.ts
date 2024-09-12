import { Song } from '@/types/types_custom';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getLikedSongs = async (): Promise<Song[]> => {
	const supabase = createServerComponentClient({
		cookies: cookies,
	});

	try {
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session?.user?.id) {
			// Handle case where user is not logged in or session is invalid
			return [];
		}

		const { data, error } = await supabase
			.from('liked_songs')
			.select('*, songs(*)')
			.eq('user_id', session.user.id)
			.order('created_at', { ascending: false });

		if (error) {
			console.error('Error fetching liked songs:', error.message);
			return [];
		}

		// Ensure the returned data matches the expected Song type
		const likedSongs: Song[] = data
			.map((item: any) => item.songs)
			.filter((song: any) => song);

		return likedSongs;
	} catch (error) {
		console.error('Error in getLikedSongs:', (error as Error).message);
		return [];
	}
};

export default getLikedSongs;
