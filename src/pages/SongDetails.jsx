import React from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {DetailsHeader, Loader, Error, RelatedSongs} from '../components'
import {setActiveSong, PlayPause} from '../redux/features/playerSlice'
import {useGetSongDetailsQuery} from '../redux/services/spotifyCore'

const SongDetails = () => {
	const dispatch = useDispatch()
	const {songid} = useParams()
	const {activeSong, isPlaying} = useSelector(state => state.player)
	const {data, isFetching, error} = useGetSongDetailsQuery(songid)
	
	if(error) return <Error />

	return (
		isFetching ? (
			<Loader title={'Getting song details'} />
		) : (
			<div className="flex flex-col">
				<DetailsHeader artistId="" songData={data} />
				<div className="mb-10">
					<h2 className="font-bold text-white text-3xl my-2">Lyrics:</h2>
					<div className="mt-5">
						{data?.sections[1].type === 'LYRICS' ? 
							data?.sections[1].text.map((line, index) => (
								<p className="text-gray-300 text-base my-1" key={line}>{line}</p>
							))
						 : <p className="text-gray-300 text-base my-1">Sorry, no lyrics found</p>}
					</div>
				</div>
			</div>
		)
	)
}

export default SongDetails