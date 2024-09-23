import React, { useEffect, useState } from 'react'
import { stories } from './DummyStory';
import ProgressBar from './ProgressBar';

const StatusViewer = () => {
  const [currentIndex,setCurrentIndex]=useState(0);
  const handleNextStory=()=>{
    if(currentIndex<stories?.length-1){
      setCurrentIndex(currentIndex+1);
    }else{
      setCurrentIndex(0);
    }
  }
  useEffect(()=>{
   const intervalID=setInterval(() => {
    handleNextStory();
   }, 3000);
   return ()=>clearInterval(intervalID);
  },[currentIndex])

  return (
    <div className='relative flex justify-center items-center h-full w-[80%] bg-slate-950'>
      <div className='h-full w-full flex items-center justify-center'>
        <img 
        className='h-[85%] w-full '
        src={stories?.[currentIndex].image} 
        alt="" 
        />
        <div className='absolute top-0 left-0 flex w-full'>
        {stories?.map((item,index)=><ProgressBar key={index} index={index} currentIndex={currentIndex} duration={3000}/>)}
        </div>
      </div>
    </div>
  )
}

export default StatusViewer
