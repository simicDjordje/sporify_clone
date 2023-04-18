import React, {useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {RiCloseLine} from 'react-icons/ri'
import {HiOutlineMenu} from 'react-icons/hi'
import {motion} from 'framer-motion'

import logo from '../assets/logo.png'
import {links} from '../assets/constants'

const NavLinksComponent = ({handleClick}) => {
	const {pathname} = useLocation()

	return (
		<div className="mt-10">
			{links.map((link) => (
				<Link to={link.to} key={link.name} onClick={()=> handleClick && handleClick()} className={`flex flex-row justify-start items-center my-8 text-sm ${pathname === link.to ? 'text-white' : 'text-gray-400'} hover:text-white font-bold`}>

					<link.icon className="w-6 h-6 mr-2" />
					{link.name}
				</Link>
			))}
		</div>
	)
}

const Sidebar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	const handleClick = () => {
		setMobileMenuOpen(!mobileMenuOpen)
	}

	return (
		<>
			<div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#a3381d]">
				<img src={logo} alt="logo" className="w-full h-14 object-contain" />
				<NavLinksComponent />
			</div>

			<div className="absolute md:hidden top-6 right-3">
				{mobileMenuOpen ? (
					<RiCloseLine onClick={handleClick} className="w-6 h-6 text-white mr-2" />
				) : (
					<HiOutlineMenu onClick={handleClick} className="w-6 h-6 text-white mr-2" />
				) }
			</div>
			{mobileMenuOpen &&  
			<motion.div
				initial={{opacity: 0, x: -100}}
				animate={{opacity: 1, x: 0}}
				transition={{duration: 0.4}}
				className="absolute top-0 h-screen bg-[#a3381d] w-2/3 z-10 p-6">
				<img src={logo} alt="logo" className="w-full h-14 object-contain" />
				<NavLinksComponent handleClick={handleClick} />
			</motion.div>}

		</>
	)
}

export default Sidebar