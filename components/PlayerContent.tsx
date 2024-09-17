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
import WaveSurfer from 'wavesurfer.js';
import { formatTime } from '@/app/utils/formatTime';

interface PlayerContentProps {
	song: Song;
	songUrl: string;
}
function PlayerContent({ song, songUrl }: PlayerContentProps) {
	const player = usePlayer();

	const [volume, setVolume] = useState(1);
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
				waveColor: '#537062',
				progressColor: '#F90',
				barWidth: 2,
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
		if (ws) {
			ws.on('ready', () => {
				setIsPlaying(true);
			});
		}
		return () => {
			ws?.destroy();
		};
	}, [initializeWaveSurfer]);

	useEffect(() => {
		if (waveSurfer) {
			isPlaying ? waveSurfer.play() : waveSurfer.pause();
			waveSurfer.setVolume(volume);
		}
	}, [isPlaying, volume, waveSurfer]);

	const handlePlayPause = useCallback(() => {
		if (waveSurfer) {
			waveSurfer.playPause();
			setIsPlaying((prev) => !prev);
		}
	}, [waveSurfer]);

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

	const Icon = useMemo(
		() => (isPlaying ? BsPauseFill : BsPlayFill),
		[isPlaying]
	);
	const VolumeIcon = useMemo(
		() => (volume === 0 ? HiSpeakerXMark : HiSpeakerWave),
		[volume]
	);

	// Convert seconds to minutes:seconds format

	const toggleMuteSound = () => {
		if (volume === 0) {
			setVolume(previousVolume);
		} else {
			setPreviousVolume(volume);
			setVolume(0);
		}
	};

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
					<div className='hidden md:flex'>
						<LikeButton songId={song.id} />
					</div>
					<div className='mx-4 text-white hidden md:flex'>{remainingTime}</div>
				</div>
			</div>

			<div
				className='
					h-full
					flex 
					justify-end 
					md:justify-center
					items-center 
					w-full 
					max-w-[722px] 
					gap-x-2
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
					onClick={handlePlayPause}
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
					<div ref={waveformRef} className='w-full mx-4'></div>

					<VolumeIcon
						onClick={toggleMuteSound}
						size={34}
						className='
							cursor-pointer'
					/>
					<Slider value={volume} onChange={(value) => setVolume(value)} />
				</div>
			</div>
		</div>
	);
}
export default PlayerContent;
