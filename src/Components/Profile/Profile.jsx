import React, { useEffect, useState } from 'react'
import { BiCheck, BiCheckCircle } from 'react-icons/bi';
import { BsArrowLeft, BsCheck, BsPencil } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { currentUser, updateUser } from '../../Redux/Auth/Action';
import { CircularProgress } from '@mui/material';

const Profile = ({handleNavigateHome}) => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {auth}=useSelector(selector=>selector);

  const jwt=localStorage.getItem("jwt");

  const [userName,setUserName]=useState("");

  const [imageFile,setImageFile]=useState("");
  const [imageProgress,setImageProgress]=useState(false);

  const [flag,setFlag]=useState(false);
  const handleFlagTrue=()=>{
    setFlag(true);
  }
  const handleFlagFalse=()=>{
    dispatch(updateUser({
      jwt,
      data:{
        full_name:userName
      }
    }));
    setUserName("");
    setFlag(false);
  }

  const handleUploadImage=async(file)=>{
    setImageProgress(true);     
    const data=new FormData();
    data.append("file",file);
    data.append('cloud_name',"dj2wdfbxm");
    data.append('upload_preset',"whatsapp");

    await fetch("https://api.cloudinary.com/v1_1/dj2wdfbxm/image/upload",{
      method:"POST",
      body:data       
    }).then((res)=>res.json())
    .then((data)=>{
      setImageFile(data.url.toString());
      dispatch(updateUser({
        jwt,
        data:{
        profile_picture:data.url.toString()
        }
      }));
    })
    setImageProgress(false);
    setImageFile("");
  }

  useEffect(()=>{
    dispatch(currentUser(jwt));
  },[auth.editUser])

  return (
    <div className='w-full h-full'>

      <div className='flex items-center space-x-5 bg-[#008069] text-white pt-14 px-10 pb-5'>
        <BsArrowLeft 
        className='cursor-pointer text-2xl font-bold'
        onClick={handleNavigateHome}
        />
        <p className='cursor-pointer font-semibold text-2xl'>Profile</p>
      </div>

      <div className='relative flex flex-col items-center justify-center my-5'>
        <label htmlFor="imageInput">
            <img 
             className='rounded-full w-[15vw] h-[15vw] cursor-pointer'
             src={imageFile || auth.reqUser?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
             alt="" 
            />
        </label>
        {imageProgress && <CircularProgress className='absolute top-[5rem] left-[45%] ' color='inherit' />}
        <input 
        className='hidden'
        id='imageInput'
        type="file" 
        onChange={(e)=>handleUploadImage(e.target.files[0])}
        />
      </div>

      <div className='w-full px-5 bg-white'>
        <p className='py-1'>{auth.reqUser?.full_name}</p>
        {flag ?
          <div className='flex w-full justify-between items-end pb-2'>
            <input 
            className='outline-none border-b-2 border-blue-700 p-2 w-[80%]'
            type="text" 
            value={userName}
            placeholder='Enter your name'
            onChange={(e)=>{
              setUserName(e.target.value);
            }}
            />
            <BiCheck onClick={handleFlagFalse} className='cursor-pointer text-3xl'/>
          </div>
        :
        <div className='w-full flex justify-between items-center'>
            <p className='py-3'>{auth.reqUser?.full_name}</p>
            <BsPencil onClick={handleFlagTrue} className='cursor-pointer'/>
        </div>  
        }
      </div>

      <div className="px-3 w-full">
        <p className="py-5 text-center">L Suscipit magnam neque, reprehenderit consequuntur nostrum eos? Repellat!</p>
      </div>

    </div>
  )
}

export default Profile
