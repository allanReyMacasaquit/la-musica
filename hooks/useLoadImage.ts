import { Song } from '@/types_custom';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

function useLoadImage(song: Song) {
	const supabaseClient = useSupabaseClient();

	if (!song) {
		return null;
	}

	const { data: imageData } = supabaseClient.storage
		.from('images')
		.getPublicUrl(song.image_path);

	return imageData.publicUrl;
}
export default useLoadImage;
