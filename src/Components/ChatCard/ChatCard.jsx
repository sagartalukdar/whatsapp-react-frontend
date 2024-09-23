import React from 'react'

const ChatCard = ({name,image}) => {
  return (
    <div className='flex items-center justify-center group p-2 my-[0.1rem] bg-white cursor-pointer'>
      <div className='w-[20%]'>
        <img 
        className='h-14 w-14 rounded-full'
        src={
          image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        } 
        alt="" 
        />
      </div>
      <div className='pl-5 w-[80%] flex flex-col'>
        <div className='flex justify-between items-center'>
            <p className='text-lg font-semibold'>{name}</p>
            <p className='text-sm text-green-700'>22:12</p>
        </div>
        <div className="flex justify-between items-center">
            <p>message ..</p>
            <div className='flex space-x-2 items-center'>
                <p className='text-xs py-1 px-2 text-white bg-green-500 rounded-full'>5</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ChatCard
