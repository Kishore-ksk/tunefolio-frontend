import React, { useState, useEffect } from 'react'
import { videoData } from '../../assets/assets'
import { portImage } from '../../assets/assets'
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { FaPlay } from "react-icons/fa";
import Videocard from '../../components/Videocard'
import Songscard from '../../components/Songscard'
import Albumcard from '../../components/Albumcard'
import { useNavigate } from 'react-router-dom';
import ApiService from "../../api/ApiService";

const Portfolio = () => {

  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId"); // Retrieve logged-in user ID

  if (!userId) return; // Prevent fetching if user is not logged in

  // Fetch songs and albums data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const songsResponse = await ApiService.getSongsByUserId(userId);
        const albumsResponse = await ApiService.getAlbumsByUserId(userId);


        // Add static fields to songs data
        const songsWithStats = songsResponse.data.map(song => ({
          ...song,
          likes: Math.floor(Math.random() * 1000),   // Random likes
          share: Math.floor(Math.random() * 500),   // Random shares
          comment: Math.floor(Math.random() * 200), // Random comments
          views: Math.floor(Math.random() * 5000),   // Random views
        }));

        // Add static fields to albums data
        const albumsWithStats = albumsResponse.data.map(album => ({
          ...album,
          likes: Math.floor(Math.random() * 1000),   // Random likes
          share: Math.floor(Math.random() * 500),   // Random shares
          comment: Math.floor(Math.random() * 200), // Random comments
          views: Math.floor(Math.random() * 5000),   // Random views
        }));

        setSongs(songsWithStats);
        setAlbums(albumsWithStats);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className='p-5 pb-24'>

      {/* thumbnail */}
      <div className="flex flex-col bg-[url( bg-center bg-cover bg-no-repeat rounded-[10px] w-full gap-2 items-center py-8 relative" style={{ backgroundImage: "url('/src/assets/port-thumb.svg')" }}>

        <h2 className='sm:text-xl font-bold'>Artist Showcase</h2>
        <p className='text-center sm:text-lg'>Showcase your best tracks, albums, and collaborations in one place</p>
        <button onClick={() => navigate(`/dashboard/uploads`)} className='bg-[#70CCE2] rounded-[10px] text-black cursor-pointer font-semibold hover:bg-[#5BB8CF] mt-4  sm:mt-8 px-4 py-2'>Add New Project</button>

      </div>
      <div className="grid grid-cols-1 bg-[#0D0D0D] auto-rows-[minmax(150px,auto)] gap-6 lg:grid-cols-3 sm:py-16 py-8">
        {/* Featured Tracks & Albums*/}
        <div className="bg-center bg-cover sm:p-12 p-8 rounded-2xl lg:col-span-2 lg:row-span-2 relative border-[#2E3638] border-[0.5px]" style={{ backgroundImage: `url(${portImage[0].featuredTracksandAlbums})` }}>
          <h2 className="text-[#70CCE2] sm:text-3xl text-xl font-bold">{portImage[0].name}</h2>
          <p className="sm:text-lg text-xs text-white mt-2">{portImage[0].desc}</p>
        </div>

        {/* Your Music, Your Story */}
        <div className="flex bg-[#70CCE2] p-4 rounded-2xl text-black gap-4 items-center lg:col-span-1">
          <div className="flex bg-[#172022] justify-center p-4 rounded-[10px] items-center">
            <img src="/src/assets/disc.svg" alt="" className='2xl:w-20 lg:w-20' />
          </div>
          <div>
            <h3 className="text-lg 2xl:text-xl font-bold">Your music, Your story</h3>
            <p className="text-sm xl:font-bold">Turn up your volume on your  career,
              Showcase your best work today</p>
          </div>
        </div>

        {/* Featured Track*/}
        <div className="flex flex-col lg:row-span-3 row-span-2 bg-center bg-cover justify-between p-6 rounded-2xl text-white group lg:col-span-1 relative border-[#2E3638] border-[0.5px]" style={{ backgroundImage: `url(${portImage[3].featuredTracks})` }}>
          <div className='flex justify-between items-center pb-2'>
            <h4 className="lg:text-2xl text-lg sm:text-3xl xl:text-3xl font-bold">Featured Track</h4><PiDotsThreeOutlineFill className='xl:text-4xl lg:text-2xl sm:text-4xl text-2xl cursor-pointer' />
          </div>
          <div className='border-[#d3d3d3] border-[1.5px] rounded-[10px] py-4 relative'>
            <span className="bg-black rounded-lg absolute inset-0 opacity-50"></span>
            <h2 className="xl:text-3xl lg:text-2xl sm:text-3xl text-xl text-center font-semibold relative">{portImage[3].name}</h2>
          </div>
          <div className='flex lg:flex-col xl:flex-row justify-between text-2xl font-semibold gap-6 items-center'>
            <button className='flex bg-[#70CCE2] justify-center  rounded-full text-black cursor-pointer text-xl  duration-300 group-hover:opacity-100 items-center xl:opacity-0 transition-opacity p-4'><FaPlay /></button>
            <div className='flex 2xl:gap-10  sm:gap-10 gap-4 lg:gap-4 2xl:text-2xl text-base sm:text-2xl lg:text-lg xl:text-xl'>
              <div className='flex  gap-1 items-center '>
                <GoHeart className='font-bold' />
                <p>{portImage[1].likes}</p>
              </div>
              <div className='flex  gap-1 items-center '>
                <FaRegComment />
                <p>{portImage[1].comment}</p>
              </div>
              <div className='flex  gap-1 items-center '>
                <PiShareFat />
                <p>{portImage[1].share}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Smaller Cards */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:row-span-2">
          {/* Featured Album */}
          <div className="flex flex-col bg-brightness-50 bg-center bg-cover justify-between p-4 rounded-2xl text-white group relative border-[#2E3638] border-[0.5px]" style={{ backgroundImage: `url(${portImage[1].featuredAlbums})` }}>
            <div className='flex justify-between items-center mb-2 sm:mb-0'>
              <h4 className="lg:text-2xl sm:text-lg text-xs font-bold">Featured Album</h4><PiDotsThreeOutlineFill className='lg:text-3xl sm:text-2xl text-xs' />
            </div>
            <div>
              <h3 className="lg:text-3xl sm:text-2xl text-base text-center font-semibold">{portImage[1].name}</h3>
              <p className="text-center lg:text-md sm:text-sm mb-1 text-xs sm:font-semibold">{portImage[1].desc}</p>
            </div>
            <div className='flex flex-col xl:flex-row justify-between text-xl font-semibold gap-1 sm:gap-3 lg:gap-6 items-center'>
              <button className='flex bg-[#70CCE2] justify-center sm:p-3 p-2 lg:text-lg text-xs  rounded-full text-black cursor-pointer duration-300 group-hover:opacity-100 items-center xl:opacity-0 transition-opacity'><FaPlay /></button>
              <div className='flex 2xl:gap-10 sm:gap-4 gap-2 2xl:text-xl sm:text-lg text-xs'>
                <div className='flex gap-1 items-center'>
                  <GoHeart className='font-bold' />
                  <p>{portImage[1].likes}</p>
                </div>
                <div className='flex gap-1 items-center'>
                  <FaRegComment />
                  <p>{portImage[1].comment}</p>
                </div>
                <div className='flex gap-1 items-center'>
                  <PiShareFat />
                  <p>{portImage[1].share}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Collaborations */}
          <div className="flex flex-col bg-center bg-cover justify-between p-4 rounded-2xl text-white group relative border-[#2E3638] border-[0.5px]" style={{ backgroundImage: `url(${portImage[2].collaborations})` }}>
            <div className='flex justify-between items-center mb-2 sm:mb-0'>
              <h4 className="lg:text-2xl sm:text-lg text-xs font-bold">Collaborations</h4><PiDotsThreeOutlineFill className='lg:text-3xl sm:text-2xl text-xs' />
            </div>
            <div className='lg:pb-32'>
              <h3 className="lg:text-3xl sm:text-2xl text-base text-center font-semibold">{portImage[2].name}</h3>
              <p className="text-center lg:text-md sm:text-sm mb-1 text-xs sm:font-semibold">{portImage[2].collabrator}</p>
            </div>
            <div className='flex flex-col xl:flex-row justify-between text-xl font-semibold gap-4  sm:gap-3 lg:gap-6 items-center'>
              <button className='flex bg-[#70CCE2] justify-center sm:p-3 p-2 lg:text-lg text-xs  rounded-full text-black cursor-pointer duration-300 group-hover:opacity-100 items-center xl:opacity-0 transition-opacity'><FaPlay /></button>
              <div className='flex 2xl:gap-10 sm:gap-4 gap-2 2xl:text-xl sm:text-lg text-xs'>
                <div className='flex gap-1 items-center'>
                  <GoHeart className='font-bold' />
                  <p>{portImage[1].likes}</p>
                </div>
                <div className='flex gap-1 items-center'>
                  <FaRegComment />
                  <p>{portImage[1].comment}</p>
                </div>
                <div className='flex gap-1 items-center'>
                  <PiShareFat />
                  <p>{portImage[1].share}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>

        {/* Songs Card Section */}
        <div className='mt-16'>
          <h2 className='text-xl font-bold mb-4'>Songs</h2>
          <div className='flex justify-start gap-16 overflow-auto'>
            {songs.length > 0 ? songs.slice().reverse().map((song) => (<Songscard key={song.id} item={song} type="song" />)) : <p>Loading songs...</p>}
          </div>
        </div>


        {/* Albums Card Section */}
        <div className='my-16'>
          <h2 className='text-xl font-bold mb-4'>Albums</h2>
          <div className='flex justify-start gap-16 overflow-auto'>
            {albums.length > 0 ? albums.slice().reverse().map((album) => (<Albumcard key={album.id} item={album} type="album" />)) : <p>Loading albums...</p>}
          </div>
        </div>

      </>
      <div className='grid lg:grid-cols-3 auto-rows-[minmax(150px,auto)] gap-6 py-16'>

        {/* video and visual portfolio */}
        <div className='flex flex-col  row-span-2 bg-[#172022] bg-center bg-cover justify-around lg:justify-between p-8 rounded-2xl items-center border-[#2E3638] border-[0.5px]'>
          <h2 className='text-[#70CCE2] 2xl:text-4xl xl:text-3xl text-2xl font-bold'>Video and Visual Portfolio</h2>
          <p className='xl:text-lg text-center lg:text-start lg:text-base'>Showcase your music beyond just sound - Let the world experience it visually</p>
          <button className='bg-[#70CCE2] rounded-[10px] text-black lg:w-full cursor-pointer font-bold px-4 py-3'>Add Video</button>
        </div>

        {/* live show */}
        <div className='flex flex-col row-span-2 lg:row-span-3 bg-center bg-cover p-4 rounded-2xl gap-16 relative border-[#2E3638] border-[0.5px]' style={{ backgroundImage: `url(${portImage[5].liveShow})` }}>
          <div className='flex justify-between items-center'>
            <p className='xl:text-3xl lg:text-xl sm:text-2xl md:text-3xl text-xl font-bold'>Live Performance</p>
            <PiDotsThreeOutlineFill className='xl:text-3xl lg:text-xl sm:text-2xl md:text-3xl  cursor-pointer' />
          </div>
          <div className='flex flex-col justify-center items-center'>
            <h2 className='text-center lg:text-xl md:text-2xl sm:text-xl text-lg font-bold pb-2'>{portImage[5].name}</h2>
            <p className='text-center xl:text-base  lg:text-sm md:text-lg sm:text-base 2xl:w-[60%] xl:w-[80%] lg:w-[90%]'>{portImage[5].desc}</p>
            <button className='flex bg-[#70CCE2] justify-center mt-3 p-3 rounded-full text-black cursor-pointer items-center'><FaPlay /></button>
          </div>
        </div>

        {/* music video */}
        <div className='flex flex-col row-span-2 lg:row-span-3 bg-center bg-cover p-4 rounded-2xl gap-16 relative border-[#2E3638] border-[0.5px]' style={{ backgroundImage: `url(${portImage[6].musicVideo})` }}>
          <div className='flex justify-between items-center'>
            <p className='xl:text-3xl lg:text-xl sm:text-2xl md:text-3xl text-xl font-bold'>Music Video</p>
            <PiDotsThreeOutlineFill className='xl:text-3xl lg:text-xl sm:text-2xl md:text-3xl  cursor-pointer' />
          </div>
          <div className='flex flex-col justify-center items-center '>
            <h2 className='text-center lg:text-xl md:text-2xl sm:text-xl text-lg font-bold pb-2'>{portImage[6].name}</h2>
            <p className='text-center xl:text-base  lg:text-sm md:text-lg sm:text-base 2xl:w-[60%] xl:w-[80%] lg:w-[90%]'>{portImage[6].desc}</p>
            <button className='flex bg-[#70CCE2] justify-center mt-3 p-3 rounded-full text-black cursor-pointer items-center'><FaPlay /></button>
          </div>
        </div>

        {/* behind the beats */}
        <div className='flex flex-col row-span-1 bg-center bg-cover justify-between p-4 rounded-2xl items-start border-[#2E3638] border-[0.5px]' style={{ backgroundImage: `url(${portImage[4].behindTheBeat})` }}>
          <div className='w-full'>
            <div className='flex justify-between items-center'>
              <h2 className='xl:text-2xl lg:text-xl font-bold'>Behind The Beat</h2><PiDotsThreeOutlineFill className='text-2xl cursor-pointer' />

            </div>
            <p className='font-bold'>of <span className='text-[#70CCE2] text-xl font-bold'>{portImage[4].name}</span></p>
          </div>
          <button className='flex bg-[#70CCE2] justify-center p-3 rounded-full text-black cursor-pointer items-center'><FaPlay /></button>
        </div>
      </div>

      {/* video card section */}
      <div className='pb-16'>
        <h2 className='text-xl font-bold mb-4'>Music Videos</h2>

        <div className='flex justify-around gap-6 overflow-auto'>
          {videoData.map((video) => (<Videocard key={video.id} video={video} />))}
        </div>

      </div>

      {/* footer */}
      <div className='border-[#2E3638] border-[0.5px] py-6'>
        <p className='text-center'>© 2025 TuneFolio - All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Portfolio
