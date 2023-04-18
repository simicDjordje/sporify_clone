import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import {motion} from 'framer-motion'

import { Searchbar, Sidebar, MusicPlayerCustom, TopPlay } from './components'
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts } from './pages'

const App = () => {
  const { activeSong } = useSelector((state) => state.player)

  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#d6340b]">
        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {activeSong?.title && 

        <motion.div
        initial={{opacity: 0, y: 200}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className="absolute h-28 w-full bottom-0 left-0 bg-gradient-to-br from-black to-[#d6340b] backdrop-blur-lg z-10 pt-3">
        <MusicPlayerCustom />
      </motion.div>
      }
      

      {/*{activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#821b01] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}*/}
    </div>
  )
}

export default App
