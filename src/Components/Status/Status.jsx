import React, { useState } from 'react'
import StatusUserCard from './StatusUserCard'
import "../../Styles/WebKitScroll.css";
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import StatusViewer from './StatusViewer';
import { BsArrowLeft } from 'react-icons/bs';

const Status = () => {
  const navigate=useNavigate();
  const handleNavigateHome=()=>{
    navigate("/");
  }
  const [activeStatus,setActiveStatus]=useState(false);
  const handleActiveStatus=()=>{
    setActiveStatus(true);
  }
  const handleInActiveStatus=()=>{
    setActiveStatus(false);
  }

  return (
    <div className='relative'>
      <div className='py-14 bg-[#00a884] w-[100vw]'></div>
      <div className='absolute top-6 w-full flex items-center justify-center px-[10vw] '>
        {/* left part */}
        <div className='left h-[90vh] bg-[#1e262c] lg:w-[30%] w-[50%] px-7'>
            <div className='pt-5 w-full h-[13%] flex items-center space-x-2'>
              <BsArrowLeft
                className='cursor-pointer text-2xl font-bold text-white mr-5'
                onClick={handleNavigateHome}
              />
              <div onClick={handleActiveStatus}>
                <StatusUserCard/>
              </div>
            </div>
            <hr className='mt-7'/>
            <div className='overflow-y-scroll h-[80%] scroll-hide'>
              {[1,1,1,1,1,1,1,1,1,1,1,1,1].map((item,index)=>
                <div onClick={handleActiveStatus}>
                  <StatusUserCard key={index}/>
                </div>
              )}
            </div>
        </div>
        {/* right part */}
        <div className="relative h-[90vh] lg:w-[70%] w-[50%] bg-[#0b141a] flex items-center justify-center">
           {activeStatus &&
             <AiOutlineClose 
             className='absolute top-5 right-6 text-xl text-white cursor-pointer'
             onClick={handleInActiveStatus}
             />
           }
           {activeStatus && <StatusViewer/>}
        </div>
      </div>
    </div>
  )
}

export default Status
