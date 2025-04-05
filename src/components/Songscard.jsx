import React from 'react'
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



const Songscard = ({ item, type }) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/dashboard/${type}/${item.id}`)} className='flex flex-col bg-[#172022] p-3 rounded-[10px] w-[236px] gap-4 group items-center min-w-[236px]'>
      <div className='flex justify-between w-full items-center'>
        <p className='text-[#A8A8A8] text-md'>{item.date}</p>
        <PiDotsThreeOutlineFill className='text-2xl cursor-pointer' />
      </div>
      <div className='rounded-[10px] overflow-hidden relative'>
        <img src={item.image} alt="" className='border-[#2E3638] border-[0.5px] h-[144px] rounded-[10px] w-[193px]' />
        <button className='flex bg-[#70CCE2] justify-center p-3 rounded-full text-black -translate-x-1/2 -translate-y-1/2 absolute cursor-pointer duration-300 group-hover:opacity-100 items-center left-1/2 opacity-0 top-1/2 transition-opacity'><FaPlay /></button>
      </div>

      <p className='text-xl font-semibold'>{item.name}</p>
      <div className='flex text-[#A8A8A8] text-sm gap-6 items-center'>
        <div className='flex gap-1 items-center'>
          <GoHeart />
          <p>{item.likes}</p>
        </div>
        <div className='flex gap-1 items-center'>
          <FaRegComment />
          <p>{item.comment}</p>
        </div>
        <div className='flex gap-1 items-center'>
          <PiShareFat />
          <p>{item.share}</p>
        </div>
      </div>
    </div>
  )
}

export default Songscard
