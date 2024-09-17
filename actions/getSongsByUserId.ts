import { Song } from '@/types/types_custom';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

async function getSongsByUserId(): Promise<Song[]> {
	const supabase = createServerComponentClient({
		cookies: cookies,
	});

	// Use getUser() to securely fetch authenticated user info
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getUser();

	if (sessionError) {
		console.log(sessionError.message);
		return [];
	}

	// Ensure the user object exists
	if (!sessionData?.user) {
		console.log('No authenticated user found.');
		return [];
	}

	// Fetch songs by user ID
	const { data, error } = await supabase
		.from('songs')
		.select('*')
		.eq('user_id', sessionData.user.id)
		.order('created_at', { ascending: false });

	if (error) {
		console.log('Error fetching songs:', error.message);
		return [];
	}

	return (data as Song[]) || [];
}

export default getSongsByUserId;
