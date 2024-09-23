import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const MemberSelector = ({handleRemoveMember,member}) => {
  return (
    <div className='flex items-center bg-slate-300 rounded-full p-1'>
      <img 
      className='w-7 h-7 rounded-full'
      src={member.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
      alt="" 
      />
      <p className="px-2">{member.full_name}</p>
      <AiOutlineClose className='pr-1 cursor-pointer' onClick={handleRemoveMember}/>
    </div>
  )
}

export default MemberSelector
