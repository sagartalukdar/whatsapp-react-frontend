import React, { useEffect, useState } from 'react'
import './ProgressBar.css';

const ProgressBar = ({index,currentIndex,duration}) => {
  const isActive=index===currentIndex;
  const [progress,setProgress]=useState(0);  

  useEffect(()=>{
    const intervalId=setInterval(() => {
      setProgress((pre)=>{
        if(pre<100){
          return pre+1;
        }   
        clearInterval(intervalId);    
        return pre;
      })
    }, [duration/100]);
    return ()=>clearInterval(intervalId);
  },[isActive, progress])

  useEffect(()=>{
    setProgress(0);
  },[currentIndex])

  return (
    <div className={`progress-bar-container ${isActive?'active':""}`}>
      <div className={`${isActive?'progress-bar':''}`} style={{width:`${progress}%`}}></div>
    </div>
  )
}

export default ProgressBar
