import React from 'react'
import { FaPlay } from "react-icons/fa";
import { CiPlay1 } from "react-icons/ci";

const Videocard = ({ video }) => {
  return (
    <div className='flex flex-col p-2 gap-2 items-center min-w-[300px] px-3'>
      <div className='h-[200px] rounded-[10px] w-[300px] overflow-hidden relative'>
        <img src={video.video} alt="" className='object-center object-cover' />
        <button className='flex bg-[#70CCE2] justify-center p-3 rounded-full text-black -translate-x-1/2 -translate-y-1/2 absolute cursor-pointer items-center left-1/2 top-1/2'><FaPlay /></button>
      </div>
      <div className='flex flex-col text-center gap-2 items-center'>
        <h2 className='text-xl font-bold'>{video.name}</h2>
        <p className='text-md w-[80%]'>{video.desc}</p>
        <hr className='w-[90%]' />
        <p className='flex text-sm gap-1 items-center'><CiPlay1 />{video.views}</p>
      </div>

    </div>

  )
}

export default Videocard
