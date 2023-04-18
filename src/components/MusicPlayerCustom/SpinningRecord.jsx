import React from 'react'
import {motion} from 'framer-motion'

const SpinningRecord = ({isPlaying, isActive, activeSong}) => {
	return (
		<div className="flex-1 flex justify-start items-center">
			<motion.div 
				className="h-16 w-16 mr-4 hidden sm:block"
				animate={isPlaying ? { rotate: "360deg" } : {}}
      			transition={isPlaying ? { duration: 2, repeat: Infinity, ease: 'linear' } : {duration: 0.5}}

			>
			<img src={activeSong?.images?.coverart} alt="cover art" className="rounded-full" />
			</motion.div>
			<div className="w-[50%]">
				<p className="truncate text-white font-bold text-lg">
					{activeSong?.title ? activeSong?.title : 'No active Song'}
				</p>
				<p className="truncate text-gray-300">
					{activeSong?.subtitle ? activeSong?.subtitle : 'No active Song'}
				</p>
			</div>
		</div>
	)
}

export default SpinningRecord