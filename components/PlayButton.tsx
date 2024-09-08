import { FaPlay } from 'react-icons/fa6';

function PlayButton() {
	return (
		<button
			className='
                transition
                opacity-0
                rounded-full
                flex
                p-2
                items-center
                bg-green-500
                drop-shadow-md
                translate
                translate-y-1/4
                group-hover:opacity-100
                group-hover:translate-y-0
                hover:scale-110'
		>
			<FaPlay className='text-black' size={20} />
		</button>
	);
}
export default PlayButton;
