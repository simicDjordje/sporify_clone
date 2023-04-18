import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const spotifyCoreApi = createApi({
	reducerPath: 'spotifyCoreApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://shazam.p.rapidapi.com',
		prepareHeaders: (headers) => {
			headers.set('X-RapidAPI-Key', 'd3b4d6d782msh91ca5740e73cbdcp169023jsnd29a3fb0e100')
			return headers
		}
	}),
	endpoints: (builder) => ({
		getTopCharts: builder.query({query: () => '/charts/track'}),
		getSongDetails: builder.query({query: (songid) => `/songs/get-details?key=${songid}&locale=en-US`})
	})
})

export const {useGetTopChartsQuery, useGetSongDetailsQuery} = spotifyCoreApi

