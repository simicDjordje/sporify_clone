import React from 'react'
import {Error, Loader, SongCard} from '../components'
import {genres} from '../assets/constants'
import {useGetTopChartsQuery} from '../redux/services/spotifyCore'
import {useDispatch, useSelector} from 'react-redux'

const Discover = () => {
	const dispatch = useDispatch()
	const {activeSong, isPlaying} = useSelector(state => state.player)
	const {data, isFetching, error} = useGetTopChartsQuery()
	const genreTitle = 'Pop'


	return (
		<div className="flex flex-col">
			<div className="flex justify-between items-center w-full sm:flex-row flex-col mt-4 mb-10">
				<h2 className="font-bold text-3xl text-white">Discover {genreTitle}</h2>
				<select
				onChange={()=>{}}
				value=""
				className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
				>
					{genres.map((genre)=>(
						<option key={genre.value} value={genre.value}>{genre.title}</option>
					))}
				</select>
			</div>

			{isFetching ? (
				<Loader />
			) : (
				(error ? (
					<Error />
				) : (
					<div className="flex sm:flex-row flex-col sm:justify-start justify-center items-center flex-wrap gap-8">
						{data?.tracks?.map((song, index) => (
							//Api data bug for this one
							song.title != 'Hotline Bling' ?
							<SongCard 
							key={song?.key} 
							song={song} 
							index={index}
							activeSong={activeSong}
							isPlaying={isPlaying}
							data={data}
							 />
							 : ''
						))}
					</div>
				))
			)}
		</div>
	)
}

export default Discover
