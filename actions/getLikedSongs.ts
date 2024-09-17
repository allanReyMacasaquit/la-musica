import { Song } from '@/types/types_custom';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getLikedSongs = async (): Promise<Song[]> => {
	const supabase = createServerComponentClient({
		cookies: cookies,
	});

	try {
		// Use getUser() to securely retrieve the authenticated user
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser();

		// Check for authentication errors or missing user data
		if (userError || !user?.id) {
			console.error(
				'Error fetching user or user not authenticated:',
				userError?.message
			);
			return [];
		}

		// Fetch liked songs for the authenticated user
		const { data, error } = await supabase
			.from('liked_songs')
			.select('*, songs(*)') // Select the liked_songs along with the related songs
			.eq('user_id', user.id) // Filter by the authenticated user's ID
			.order('created_at', { ascending: false });

		if (error) {
			console.error('Error fetching liked songs:', error.message);
			return [];
		}

		// Ensure the returned data is valid and matches the expected Song type
		const likedSongs: Song[] = (data || [])
			.map((item: any) => item.songs)
			.filter((song: any) => song); // Filter out any invalid songs

		return likedSongs;
	} catch (error) {
		console.error('Error in getLikedSongs:', (error as Error).message);
		return [];
	}
};

export default getLikedSongs;
