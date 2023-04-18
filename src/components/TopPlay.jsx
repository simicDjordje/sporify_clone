import React, {useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Swiper, SwiperSlide} from 'swiper/react'

import PlayPause from './PlayPause'
import {playPause, setActiveSong} from '../redux/features/playerSlice'
import {useGetTopChartsQuery} from '../redux/services/spotifyCore'

import 'swiper/css'


const TopChartCard = ({song, index, isPlaying, activeSong, handlePauseClick, handlePlayClick}) => (
	<div className="w-full flex flex-row items-center py-1 p-2 rounded-lg cursor-pointer hover:bg-white/5">
		<h3 className="text-base text-white font-bold mr-3">{index}.</h3>
		<div className="flex-1 flex flex-row justify-between items-center">
			<img src={song?.images?.coverart} alt={song?.title} className="w-10 h-10 rounded-lg" />
			<div className="flex-1 flex flex-col justify-center mx-4">
				<Link to={`/songs/${song.key}`}>
					<p className="text-xl font-bold text-white">{song?.title}</p>
				</Link>
				<Link to={`/artists/${song?.artists[0].adamid}`}>
					<p className="text-base text-gray-300 mt-2">{song?.subtitle}</p>
				</Link>
			</div>
		</div>
		<PlayPause
		isPlaying={isPlaying}
		activeSong={activeSong}
		song={song}
		handlePause={handlePauseClick}
		handlePlay={()=>{handlePlayClick(song, index)}}
		 />
	</div>
)


const TopPlay = () => {
	const dispatch = useDispatch()
	const {activeSong, isPlaying} = useSelector(state => state.player)
	const {data, isFetching, error} = useGetTopChartsQuery()

	const divRef = useRef()

	const topPlays = data?.tracks?.slice(1, 6)

	useEffect(()=>{
		divRef.current.scrollIntoView({behavior: 'smooth'})
	})

	const handlePauseClick = () => {
		dispatch(playPause(false))
	}

	const handlePlayClick = (song, index) => {
		dispatch(setActiveSong({song: {...song}, data: {...data}, index: index}))
		dispatch(playPause(true))
	}



	return (
		<div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[400px] max-w-full flex flex-col">
			{isFetching ? ('') : (<>
			<div className="w-full flex-col">
				<div className="flex flex-row justify-between items-center">
					<h2 className="text-white font-bold text-2xl">Top Charts</h2>
					<Link to="/top-charts">
						<p className="text-gray-300 text-base cursor-pointer">See more</p>
					</Link>
				</div>

				<div className="mt-4 flex flex-col gap-1">
					{topPlays?.map((song, index) => (
						song.title != 'Hotline Bling' ? 
						<TopChartCard 
						song={song} 
						index={index} 
						key={song.key}
						isPlaying={isPlaying}
						activeSong={activeSong}
						handlePauseClick={handlePauseClick}
						handlePlayClick={handlePlayClick}
						/> : ''
					))}
				</div>
			</div>

			<div className="w-full flex flex-col sm:mt-3 mt-6">
				<div className="flex flex-row justify-between items-center">
					<h2 className="text-white font-bold text-2xl">Top Artists</h2>
					<Link to="/top-artists">
						<p className="text-gray-300 text-base cursor-pointer">See more</p>
					</Link>
				</div>

			<Swiper
		        slidesPerView="auto"
		        spaceBetween={10}
		        className="mt-2"
		      >
		        {topPlays?.map((song, index) => (
								<SwiperSlide 
								key={song.key}
								style={{width: '20%', height: 'auto'}}
								className="shadow-lg rounded-full"
								>
									<Link to={`/artists/${song?.artists[0].adamid}`}>
										<img src={song?.images?.background} alt="name" className="rounded-full object-cover w-20 h-20" />
									</Link>
								</SwiperSlide>
							))}
		      </Swiper>
			</div>
			</>)}
		</div>
	)
}

export default TopPlay