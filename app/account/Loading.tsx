'use client';
import Box from '@/components/Box';
import { FadeLoader } from 'react-spinners';

function Loading() {
	return (
		<Box className='h-full flex justify-center items-center'>
			<FadeLoader color='#22c55e' height={15} width={5} radius={2} margin={2} />
		</Box>
	);
}
export default Loading;
