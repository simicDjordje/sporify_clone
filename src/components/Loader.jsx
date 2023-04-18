import React from 'react'
import {Bars} from 'react-loader-spinner'

const Loader = ({title}) => {
	return (
		<div className="w-full flex justify-center items-center flex-col">
			<Bars
			  height="30"
			  width="30"
			  color="#fff"
			  ariaLabel="bars-loading"
			  wrapperStyle={{}}
			  wrapperClass=""
			  visible={true}
			/>
			<h1 className="font-bold text-2xl text-white mt-2">{title || 'Loading'}</h1>
		</div>
	)
}

export default Loader