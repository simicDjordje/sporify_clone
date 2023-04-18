import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {motion} from 'framer-motion'

import PlayPause from './PlayPause'
import {playPause, setActiveSong} from '../redux/features/playerSlice'
import NoCover from '../assets/no_cover.jpg'

const SongCard = ({song, index, activeSong, isPlaying, data}) => {
	const dispatch = useDispatch()
	const handlePauseClick = () => {
		dispatch(playPause(false))
	}

	const handlePlayClick = () => {
		dispatch(setActiveSong({song: {...song}, data: {...data}, index: index}))
		dispatch(playPause(true))
	}

	return (
		<motion.div 
		initial={{opacity: 0, y: 200}}
		animate={{opacity: 1, y: 0}}
		transition={{duration: 0.1 * index}}
		className="bg-white/5 flex flex-col lg:w-[250px] w-[290px]  p-4 rounded-lg cursor-pointer">
			<motion.div initial={{scale: 1}} whileHover={{scale: 1.02}} transition={{duration: 0.2}} className="relative w-full h-54 group">
				<div className={`absolute inset-0 flex justify-center items-center group-hover:flex bg-black bg-opacity-50 ${activeSong?.title === song?.title ? 'bg-black bg-opacity-70' : 'hidden'}`}>
					<PlayPause 
					song={song} 
					handlePause={handlePauseClick} 
					handlePlay={handlePlayClick} 
					activeSong={activeSong}
					isPlaying={isPlaying}
					/>
				</div>
				<img alt="song_img" src={song.images === undefined ? NoCover : song.images.coverart !== undefined ? song.images?.coverart : song.images?.background } />
			</motion.div>
			<div className="mt-4 flex flex-col">
				<p className="font-semibold text-lg text-white truncate">
					<Link to={`/songs/${song?.key}`}>
						{song?.title}
					</Link>
				</p>
				<p className="text-sm truncate text-gray-300 mt-1">
					<Link to={song.artists ? `/artists/${song.artists?.adamid}` : '/top-artists'}>
						{song?.subtitle}
					</Link>
				</p>
			</div>
		</motion.div>
	)
}

export default SongCard