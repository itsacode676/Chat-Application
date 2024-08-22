import React from 'react'
import { PiWechatLogo } from "react-icons/pi";

const NoChats = () => {
  return (
    <div className='h-screen w-full flex flex-col relative  items-center justify-center gap-2'>
        <PiWechatLogo className='h-[100px] w-[100px] '/>
        <div className='text-2xl text-black'>No Chats</div>
    </div>
  )
}

export default NoChats