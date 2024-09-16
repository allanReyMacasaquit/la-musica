'use client';

import { Song } from '@/types/types_custom';
import LibraryItem from './LibraryItem';
import LikeButton from './LikeButton';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import Slider from './Slider';
import usePlayer from '@/hooks/usePlayer';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useSound from 'use-sound';
import WaveSurfer from 'wavesurfer.js';

interface PlayerContentProps {
	song: Song;
	songUrl: string;
}
function PlayerContent({ song, songUrl }: PlayerContentProps) {
	const player = usePlayer();

	const [volume, setVolume] = useState(0);
	const [previousVolume, setPreviousVolume] = useState(volume);
	const [isPlaying, setIsPlaying] = useState(false);

	const waveformRef = useRef<HTMLDivElement | null>(null);
	const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);

	const [remainingTime, setRemainingTime] = useState('0:00');

	// Initialize WaveSurfer for visual waveform
	const initializeWaveSurfer = useCallback(() => {
		if (waveformRef.current && song) {
			const ws = WaveSurfer.create({
				container: waveformRef.current,
				waveColor: '#1a8955',
				progressColor: '#F90',
				barWidth: 3,
				barHeight: 1,
				barGap: 2,
				height: 60,
				url: songUrl,
			});
			// Update remaining time as the song plays
			ws.on('audioprocess', () => {
				const duration = ws.getDuration();
				const currentTime = ws.getCurrentTime();
				const timeLeft = duration - currentTime;
				setRemainingTime(formatTime(timeLeft));
			});

			setWaveSurfer(ws);

			return ws;
		}
	}, [song, songUrl]);

	useEffect(() => {
		const ws = initializeWaveSurfer();
		return () => {
			ws?.destroy();
		};
	}, [initializeWaveSurfer]);

	const Icon = useMemo(
		() => (isPlaying ? BsPauseFill : BsPlayFill),
		[isPlaying]
	);
	const VolumeIcon = useMemo(
		() => (volume === 0 ? HiSpeakerXMark : HiSpeakerWave),
		[volume]
	);

	const onPlayNext = useCallback(() => {
		const currentIndex = player.ids.findIndex((id) => id === player.activeId);
		const nextSong = player.ids[currentIndex + 1] || player.ids[0];
		player.setId(nextSong);
	}, [player]);

	const onPlayPrevious = useCallback(() => {
		const currentIndex = player.ids.findIndex((id) => id === player.activeId);
		const previousSong =
			player.ids[currentIndex - 1] || player.ids[player.ids.length - 1];
		player.setId(previousSong);
	}, [player]);

	const [play, { pause, sound }] = useSound(songUrl, {
		volume: volume,
		onplay: () => {
			setIsPlaying(true), waveSurfer?.play();
		},
		onend: () => {
			setIsPlaying(false);
			waveSurfer?.stop();
			onPlayNext();
		},
		onpause: () => {
			{
				setIsPlaying(false), waveSurfer?.pause();
			}
		},
		format: ['mp3'],
	});

	useEffect(() => {
		sound?.play();
		waveSurfer?.play();
		return () => {
			sound?.unload();
		};
	}, [sound, waveSurfer]);

	const handlePlay = () => `${isPlaying ? pause() : play()}`;

	// Convert seconds to minutes:seconds format
	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
	};
	// const toggleMuteSound = () => {
	// 	if (volume === 0) {
	// 		setVolume(previousVolume);
	// 		waveSurfer?.pause();
	// 	} else {
	// 		setPreviousVolume(volume);
	// 		setVolume(0);
	// 	}
	// };

	return (
		<div
			className='
                grid 
                grid-cols-2 
                md:grid-cols-3     
                h-full'
		>
			<div
				className='
                    flex
                    w-full
                    justify-start'
			>
				<div
					className='
                
                        flex 
                        items-center
                        gap-x-4'
				>
					<LibraryItem data={song} />
					<LikeButton songId={song.id} />
				</div>
			</div>
			<div
				className='
                    flex
                    md:hidden
                    col-auto
                    w-full
                    justify-end
                    items-center
                    '
			>
				<div
					onClick={() => {
						handlePlay();
						waveSurfer?.playPause();
					}}
					className='
                        h-10
                        w-10
                        flex
                        justify-center
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer'
				>
					<Icon size={30} className='text-black' />
				</div>
			</div>
			<div
				className='
					hidden
					h-full
					md:flex 
					justify-center 
					items-center 
					w-full 
					max-w-[722px] 
					gap-x-6
				'
			>
				<AiFillStepBackward
					onClick={onPlayPrevious}
					size={30}
					className='
					text-neutral-400 
					cursor-pointer 
					hover:text-white 
					transition
					'
				/>
				<div
					onClick={() => {
						handlePlay(); // Call your existing handlePlay function
						waveSurfer?.playPause(); // Toggle play/pause on WaveSurfer instance
					}}
					className='
						flex 
						items-center 
						justify-center
						h-10
						w-10 
						rounded-full 
						bg-white 
						p-1 
						cursor-pointer
						'
				>
					<Icon size={30} className='text-black' />
				</div>
				<AiFillStepForward
					onClick={onPlayNext}
					size={30}
					className='
					text-neutral-400 
					cursor-pointer 
					hover:text-white 
					transition
					'
				/>
			</div>
			<div
				className='
					hidden 
					md:flex 
					w-full 
					justify-end 
					pr-2'
			>
				<div
					className='
						flex 
						items-center 
						gap-x-2 
						w-full'
				>
					<div ref={waveformRef} className='w-full'></div>
					<div className='ml-4 text-white'>{remainingTime}</div>
					{/* <VolumeIcon
						onClick={toggleMuteSound}
						size={34}
						className='
							cursor-pointer'
					/>
					<Slider value={volume} onChange={(value) => setVolume(value)} /> */}
				</div>
			</div>
		</div>
	);
}
export default PlayerContent;
