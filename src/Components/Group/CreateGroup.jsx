import React, { useEffect, useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import MemberSelector from './MemberSelector';
import ChatCard from '../ChatCard/ChatCard';
import { CircularProgress } from '@mui/material';
import { BiCheck } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../Redux/Auth/Action';
import { createGroupAction } from '../../Redux/Chat/Action';
import { useNavigate } from 'react-router-dom';

const CreateGroup = ({handleNavigateHome,handleIsGroup}) => {
  const [newGroup,setNewGroup]=useState(false);  
  const [groupMember,setGroupMember]=useState(new Set());
  const [query,setQuery]=useState("");
  const [isImageUploading,setIsImageUploading]=useState(false);
  const [groupName,setGroupName]=useState("");
  const [imageUrl,setImageUrl]=useState("");


  let userIds=[];
  for(let item of groupMember){
    userIds.push(item.id);
  }


  const navigate=useNavigate();
  const jwt=localStorage.getItem("jwt");
  const dispatch=useDispatch();
  const {auth}=useSelector(selector=>selector);

  const handleRemoveMember=(item)=>{
    groupMember.delete(item);
    setGroupMember(groupMember);
  }

  const handleSearch=(val)=>{
    dispatch(searchUser({jwt,query:val}))
  }

  const handleCreateGroup=()=>{
      dispatch(createGroupAction({jwt,
        data:{
          userIds,
          chat_name:groupName,
          chat_image:imageUrl
        }
      }));
      navigate("/");
      setNewGroup(false);
      handleIsGroup();
      setImageUrl("");
      setGroupName("");
  }

  const handleUploadImage=async(file)=>{

    const data=new FormData();
    data.append("file",file);
    data.append('cloud_name',"dj2wdfbxm");
    data.append('upload_preset',"whatsapp");

    await fetch("https://api.cloudinary.com/v1_1/dj2wdfbxm/image/upload",{
      method:"POST",
      body:data       
    }).then((res)=>res.json())
    .then((data)=>{
      setImageUrl(data.url.toString());      
    })
    setIsImageUploading(false);
  }

  return (
    <div className='w-full h-full'>
      {!newGroup?
        <div className="w-full h-full relative">
         
          <div className='w-full h-[20%] flex items-center space-x-5 bg-[#008069] text-white pt-16 px-10 pb-5'>
            <BsArrowLeft className='cursor-pointer text-2xl font-bold' onClick={handleNavigateHome}/>
            <p className='text-xl font-semibold'>Add Group Members</p>
          </div>

          <div className=' w-full h-[15%] bg-white px-3 py-4'>
           
            <div className='flex space-x-2 space-y-1 items-center flex-wrap w-full'>
              {groupMember.size>0 && 
              Array.from(groupMember).map((item,i)=>
              <MemberSelector 
              key={i} 
              member={item} 
              handleRemoveMember={()=>handleRemoveMember(item)}
              />
              )}
            </div>

            <input 
            className='outline-none border-b-2 border-[#8888] p-2 w-[93%]'
            placeholder='Search User'
            type="text" 
            onChange={(e)=>{
              handleSearch(e.target.value);
              setQuery(e.target.value);
            }}
            value={query}
            />           

          </div>

          <div className='bg-white w-full h-[50%] px-1 overflow-y-scroll scroll-bar scroll-hide'>
            {query && auth.searchUsers.length>0 && auth.searchUsers.map((item,i)=>
              <div onClick={()=>{
                groupMember.add(item);
                setGroupMember(groupMember);
                setQuery("");
              }}
              key={i}
              >
                <ChatCard name={item.full_name} image={item.profile_picture}/>
              </div>
            )}           
          </div>

          <div className={`w-full h-[15%] bg-slate-300 absolute bottom-0 flex items-center justify-center ${groupMember.size>0? 'cursor-pointer':'cursor-not-allowed'}`}>
           
              <div 
              className={`w-12 h-12 rounded-full ${groupMember.size>0? 'bg-green-700':'bg-green-400'} flex items-center justify-center`}
              onClick={groupMember.size>0 ?()=>setNewGroup(true):()=>setNewGroup(false)}
              >
                <BsArrowRight className={`text-3xl ${groupMember.size>0? 'text-white':'text-slate-200'} font-bold`}/>
              </div>
            
          </div>
          
        </div>
        :
     
        <div className="w-full h-full ">
          <div className="w-full h-[20%] flex items-center space-x-5 bg-[#008069] pt-16 px-10 pb-5 text-white">
            <BsArrowLeft
              className="cursor-pointer text-2xl font-bold"
              onClick={() => setNewGroup(false)}
            />
            <p className="text-xl font-semibold">{groupName || "New Group"}</p>
          </div>
    
          <div className="relative w-full flex flex-col justify-center items-center my-5">
            <label htmlFor="imageInput">
              <img
                className="w-[15vw] h-[15vw] cursor-pointer rounded-full"
                src={
                  imageUrl ||
                  "https://images.pexels.com/photos/46924/pexels-photo-46924.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
                alt=""
              />
              {isImageUploading && (
                <CircularProgress
                  className="absolute top-[5rem] left-[45%] "
                  color="inherit"
                />
              )}
            </label>
            <input
              className="hidden"
              type="file"
              id="imageInput"
              onChange={(e) => {
                setIsImageUploading(true);
                handleUploadImage(e.target.files[0]);
              }}
            />
          </div>
    
          <div className="w-full flex flex-col justify-between items-center py-2 px-5">
            <input
              className={
                "w-full outline-none border-b-2 border-green-500 p-2 bg-transparent"
              }
              type="text"
              placeholder="Group Name"
              onChange={(e) => {
                setGroupName(e.target.value);
              }}
              value={groupName}
            />
            {groupName && (
              <div
                className="w-[10%] mt-10 flex justify-center items-center"
                onClick={handleCreateGroup}
              >
                <BiCheck className="font-semibold cursor-pointer hover:bg-green-500 hover:text-white bg-slate-300 rounded-full text-3xl  " />
              </div>
            )}
          </div>
        </div>
        
      }
    </div>
  )
}

export default CreateGroup
