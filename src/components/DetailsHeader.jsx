import React from 'react'
import {Link} from 'react-router-dom'

const DetailsHeader = ({artistId, artistData, songData}) => {
	return (
		<div className="relative w-full flex flex-col">
			<div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28">
				<div className="absolute inset-0 flex items-center">
					<img 
						alt="art"
						src={songData?.images?.coverart}
						className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-contain border-2 shadow-xl shadow-black"
					/>
					<div className="ml-5">
						<p className="text-white text-xl sm:text-3xl font-bold">{songData?.title}</p>
						<p className="text-gray-300 text-base mt-2">{songData?.subtitle}</p>
						<p className="text-gray-400 text-base mt-2">{songData?.genres?.primary}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DetailsHeader