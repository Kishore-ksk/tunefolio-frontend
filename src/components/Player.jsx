import { useState, useEffect } from "react";
import { LuCirclePause } from "react-icons/lu";
import { LuCirclePlay } from "react-icons/lu";
import { MdSkipNext } from "react-icons/md";
import { MdSkipPrevious } from "react-icons/md";
import { PiSpeakerSimpleHighFill } from "react-icons/pi";
import { SlLoop } from "react-icons/sl";
import { GoHeart } from "react-icons/go";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { BsThreeDots, BsChevronUp, BsChevronDown } from "react-icons/bs";
import ApiService from "../api/ApiService";
import { IoIosArrowUp } from "react-icons/io";


const STATIC_SONG = {
  image: "/src/assets/unknownimage.svg",
  name: "Unknown Song",
};
const STATIC_ARTIST = "Unknown Artist";


function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState([STATIC_SONG]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [artistName, setArtistName] = useState(STATIC_ARTIST);
  const [showIcons, setShowIcons] = useState(false);


  useEffect(() => {
    const fetchSongsAndArtist = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const songsResponse = await ApiService.getSongs();
          setSongs(songsResponse.data.length > 0 ? songsResponse.data : [STATIC_SONG]);
          const userResponse = await ApiService.getUser();
          setArtistName(userResponse.data.name || STATIC_ARTIST);
        } else {
          setSongs([STATIC_SONG]);
          setArtistName(STATIC_ARTIST);
        }
      } catch (error) {
        console.error("Error fetching songs or user:", error);
        setSongs([STATIC_SONG]);
        setArtistName(STATIC_ARTIST);
      }
    };

    fetchSongsAndArtist();
  }, []);

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex bg-[#0D0D0D]/60 h-[10%] justify-between p-3 text-white w-full bottom-0 fixed items-center left-0 z-50" style={{ backdropFilter: 'blur(10px)' }}>
      <div className="flex w-[180px] gap-4 items-center lg:w-[248px]">
        <img src={songs[currentSongIndex]?.image || STATIC_SONG.image} alt="" className="border-[#2E3638] border-[0.5px] h-8 rounded-[10px] w-8 cursor-pointer lg:h-12 lg:w-12" />
        <div className="text-xs lg:text-sm"><strong>{songs[currentSongIndex]?.name || STATIC_SONG.name}</strong><br />{artistName}</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center">
          <button onClick={handlePrevious} className="text-[#70CCE2] text-3xl cursor-pointer hover:scale-105 transition-all"><MdSkipPrevious /></button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="rounded-full text-[#70CCE2] text-4xl cursor-pointer hover:scale-105 transition-all"
          >
            {isPlaying ? <LuCirclePause /> : <LuCirclePlay />}
          </button>
          <button onClick={handleNext} className="text-[#70CCE2] text-3xl cursor-pointer hover:scale-105 transition-all"><MdSkipNext /></button>
        </div>
        <div className="gap-5 hidden items-center lg:flex">
          <p className="hidden lg:block">1:45</p>
          <div className="bg-[#343A3B] rounded-full w-[30vw] cursor-pointer max-w-[500px] xl:w-[60vw]">
            <hr className="bg-[#70CCE2] border-none h-1 rounded-full w-[16vw]" />
          </div>
          <p className="hidden lg:block">4:21</p>
        </div>

      </div>
      <div className="gap-8 hidden items-center lg:flex">
        <button className="text-[#70CCE2] text-2xl cursor-pointer hover:scale-105 transition-all">
          <PiSpeakerSimpleHighFill />
        </button>
        <button className="text-[#70CCE2] text-2xl cursor-pointer hover:scale-105 transition-all">
          <SlLoop />
        </button>
        <button className="text-[#70CCE2] text-2xl cursor-pointer hover:scale-105 transition-all">
          <GoHeart />
        </button>
        <button className="text-[#70CCE2] text-2xl cursor-pointer hover:scale-105 transition-all">
          <MdOutlinePlaylistAdd />
        </button>
        <button className="text-[#70CCE2] text-2xl cursor-pointer hover:scale-105 transition-all">
          <BsThreeDots />
        </button>
      </div>

 

      {/* Arrow Button for Small Screens */}
      <button
        onClick={() => setShowIcons(!showIcons)}
        className="flex justify-center text-[#70CCE2] text-2xl cursor-pointer hover:scale-105 items-center lg:hidden transition-all"
      >
        {showIcons ? <BsChevronDown /> : <BsChevronUp />}
      </button>

      {/* Icon Section (Hidden on Small Screens, Shown when Arrow is Clicked) */}
 <div
        className={`absolute bottom-full  right-0 bg-black p-4 rounded-lg shadow-lg flex gap-6 items-center justify-center lg:hidden ${
          showIcons ? "flex" : "hidden"
        }`}
      >
        <button className="text-[#70CCE2] text-2xl cursor-pointer hover:scale-105 transition-all">
          <PiSpeakerSimpleHighFill />
        </button>
        <button className="text-[#70CCE2] text-2xl cursor-pointer hover:scale-105 transition-all">
          <SlLoop />
        </button>
        <button className="text-[#70CCE2] text-2xl cursor-pointer hover:scale-105 transition-all">
          <GoHeart />
        </button>
        <button className="text-[#70CCE2] text-2xl cursor-pointer hover:scale-105 transition-all">
          <MdOutlinePlaylistAdd />
        </button>
        <button className="text-[#70CCE2] text-2xl cursor-pointer hover:scale-105 transition-all">
          <BsThreeDots />
        </button>
      </div>
    </div>
  );
}

export default Player;
