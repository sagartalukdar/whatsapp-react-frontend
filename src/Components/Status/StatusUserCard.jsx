import React from 'react'
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom'

const StatusUserCard = () => {
  const navigate=useNavigate();
  const handleClickStatus=()=>{
     navigate("/status/{userId}")
  }
  
  return (
    <div className='flex items-center py-3 cursor-pointer' onClick={handleClickStatus}>
      <div>
        <img 
        className='h-7 w-7 rounded-full lg:w-10 lg:h-10'
        src="https://images.pexels.com/photos/25950518/pexels-photo-25950518/free-photo-of-giraffe-walking-on-savannah.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
        alt="" 
        />
      </div>
      <div className='ml-3 text-white'>
        <p>username</p>
      </div>
    </div>
  )
}

export default StatusUserCard
