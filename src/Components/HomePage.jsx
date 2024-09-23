import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { BsEmojiSmile, BsFilter, BsMicFill, BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs'
import { TbCircleDashed } from 'react-icons/tb'
import ChatCard from './ChatCard/ChatCard'
import "../Styles/WebKitScroll.css";
import MessageCard from './MessageCard/MessageCard'
import { ImAttachment } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import Profile from './Profile/Profile'
import { Menu, MenuItem } from '@mui/material'
import CreateGroup from './Group/CreateGroup'
import { useDispatch, useSelector } from 'react-redux'
import { currentUser, logOutAction, searchUser } from '../Redux/Auth/Action'
import { createChatAction, getAllUserChatAction } from '../Redux/Chat/Action'
import { createMessageAction, createNewMessage, getAllChatMessagesAction } from '../Redux/Message/Action'
import SockJS from 'sockjs-client'
import {over} from 'stompjs'
import { base_url } from '../Config/api'

const HomePage = () => {

  const dispatch=useDispatch();
  const {auth,chat,message}=useSelector(store=>store);
  const jwt=localStorage.getItem("jwt");

  const navigate=useNavigate(); 
  const handleNavigateStatus=()=>{
    navigate("/status")
  }

  const [query,setQuery]=useState(null);  

  const handleSearch=(val)=>{
    dispatch(searchUser({query:val,jwt:jwt}))
  }
  const [currentChat,setCurrentChat]=useState(null);
  const handleClickChatCard=(userId)=>{
    setQuery("");
    dispatch(createChatAction({jwt,
      data:{
        userId
      }
    }));
  }

  const handleCurrentChat=(item)=>{
    setCurrentChat(item);
  }

  const [content,setContent]=useState("");
  const handleCreateMessage=()=>{
    dispatch(createNewMessage({
      jwt:jwt,
      data:{
        userId:auth.reqUser.id,
        chatId:currentChat.id,
        content
      }
    }));
    setContent("");
  }

  const [isProfile,setIsProfile]=useState(false);
  const handleNavigateProfile=()=>{
     navigate("/profile");
     setIsProfile(true);
     setIsGroup(false);
     handleClose();
  }

  const handleNavigateHome=()=>{
    navigate(-1);
    setIsProfile(false);
    setIsGroup(false);
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isGroup,setIsGroup]=useState(false);
  const handleCreateGroup=()=>{
    handleClose();
    navigate("/createGroup")
    setIsGroup(true);
    setIsProfile(false);
  }

  const handleIsGroup=()=>{
    setIsGroup(false);
  }

  const handleLogout=()=>{
    dispatch(logOutAction());
    navigate("/login");
  }

  useEffect(()=>{
    if(jwt!==null){
      dispatch(currentUser(jwt));
    }
  },[jwt])

  useEffect(()=>{
    if(!auth.reqUser){
      navigate("/login");
    } 
  },[auth.reqUser])

  useEffect(()=>{
    dispatch(getAllUserChatAction({jwt:jwt}));
  },[auth.reqUser,chat.created_chat,chat.created_group])

  useEffect(()=>{
    if(currentChat){
      dispatch(getAllChatMessagesAction({jwt,chatId:currentChat.id}));
    }
  },[currentChat,message.created_message])


  // real time chat =======
  const [stompClient,setStompClient]=useState(null);
  const [isConnect,setIsConnect]=useState(false);
  const [messages,setMessages]=useState([]);

  function getCookie(name){
    const value=`; ${document.cookie}`;
    const parts=value.split(`; ${name}=`);
    if(parts.length===2){
      return parts.pop().split(";").shift();
    }
  }

  const connect=()=>{
    const sock=new SockJS(`${base_url}/ws`);
    const temp=over(sock);
    setStompClient(temp);

    const headers={
      Authorization:`Bearer ${jwt}`,
      "X-XSRF-TOKEN":getCookie("XSRF-TOKEN")
    }

    temp.connect(headers,onConnect,onError);

  }

  const onError=(error)=>{
     console.log("on error : ",error);
  }

  const onConnect=()=>{
    setIsConnect(true);
  }

  const onMessageRecive=(payload)=>{
    console.log("recived messages : ",JSON.parse(payload.body));
    const recievedMessage=JSON.parse(payload.body);
    setMessages([...messages,recievedMessage]);
  }

  useEffect(()=>{
   if(isConnect && stompClient && auth.reqUser && currentChat) {
    const subscription=stompClient.subscribe("/group/"+currentChat.id.toString,onMessageRecive);
    
    return()=>{
      subscription.unsubscribe();
    }
   }
  })
  
  useEffect(()=>{
    if(message.created_message && stompClient){
      setMessages([...messages,message.created_message]);
      stompClient?.send("/app/message",{},JSON.stringify(message.created_message));
    }
  },[message.created_message])

  useEffect(()=>{
    setMessages(message.all_chat_messages);
  },[message.all_chat_messages])

  useEffect(()=>{
    connect();
  },[])
  // real time chat =======

  return (
    <div className='relative'>
      <div className="py-14 bg-[#00a884] w-full"></div>
      <div className='flex absolute top-6 left-6 right-6 bg-[#f0f2f5] h-[93vh] '>
       
        <div className='left w-[30%] bg-[#e8e9ec] h-full'>

          {isProfile ?
            <Profile handleNavigateHome={handleNavigateHome}/>
          :isGroup ?
            <CreateGroup handleIsGroup={handleIsGroup} handleNavigateHome={handleNavigateHome}/>
          :            
          <div className='w-full h-full'>
            <div className='h-[30%]'>
                <div className='flex items-center justify-between p-3'>
                    <div 
                    className='flex items-center space-x-3 cursor-pointer'
                    onClick={handleNavigateProfile}
                    >
                        <img 
                        className='rounded-full w-10 h-10 cursor-pointer'
                        src={
                          auth.reqUser?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        } 
                        alt="" />
                        <p>{auth.reqUser?.full_name}</p>
                    </div>
                    <div className='flex space-x-3 text-2xl cursor-pointer'>
                        <TbCircleDashed className='hover:bg-slate-300 rounded-full' onClick={handleNavigateStatus}/>
                        <BiCommentDetail/>                      
                        <div>                    
                          <BsThreeDotsVertical 
                            className='text-xl' 
                            id='basic-button'
                            aria-controls={open?'basic-menu':undefined}
                            aria-haspopup="true"
                            aria-expanded={open?'true':undefined}
                            onClick={handleClick}
                          />                    
                       
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              'aria-labelledby': 'basic-button',
                            }}
                          >
                            <MenuItem onClick={handleNavigateProfile}>Profile</MenuItem>
                            <MenuItem onClick={handleCreateGroup}>Create Group</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                          </Menu>
                        </div>
                    </div>
                </div>
    
                <div className='mx-[0.4rem] relative flex justify-center items-center bg-white py-4 px-3'>
                   <input 
                   className='border-none outline-none bg-slate-200 rounded-md w-[93%] px-9 py-2'
                   placeholder='search or start new chat'
                   type="text" 
                   value={query}
                   onChange={(e)=>{
                    setQuery(e.target.value)
                    handleSearch(e.target.value);
                   }}
                   />
                   <AiOutlineSearch className='absolute left-5 top-7'/>
                   <div>
                      <BsFilter className='ml-4 text-2xl'/>
                   </div>
                </div>
            </div>

            {/* search users */}
            <div className=" overflow-y-scroll mx-[0.4rem] h-[70%] scroll-bar">
              {query && auth.searchUsers?.map((item,i)=>
              <div onClick={()=>handleClickChatCard(item.id)} key={i}>
                <ChatCard name={item.full_name} image={item.profile_picture}/>
              </div>
              )}

              {!query && chat.user_all_chats?.length>0 && chat.user_all_chats?.map((item,i)=>(
                <div onClick={()=>handleCurrentChat(item)} key={i}>
                  {item.group?
                  (
                    <ChatCard name={item.chat_name} image={item.chat_image || "https://www.kindpng.com/picc/m/17-177275_unknown-infobox-image-unknown-team-hd-png-download.png"}/>
                  ) 
                  : 
                  (
                    <ChatCard 
                    name={auth.reqUser?.id===item.users[0]?.id ? item.users[1]?.full_name
                          : item.users[0]?.full_name}
                    image={auth.reqUser?.id===item.users[0]?.id ? item.users[1]?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          : item.users[0]?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    />
                  )
                  }
                </div>
              ))}

            </div>

          </div>
          }
        </div>  
     

        <div className='right w-[70%] h-full relative'>
           {!currentChat ?
            // default whatsapp web page
            <div className='flex flex-col w-full h-full items-center justify-center'> 
                <div className='max-w-[70%] text-center'>
                  <img 
                   src="https://res.cloudinary.com/zarmariya/image/upload/v1662264838/whatsapp_multi_device_support_update_image_1636207150180-removebg-preview_jgyy3t.png" 
                   alt="" 
                  />
                  <h1 className='text-4xl text-gray-600'>Whatsapp Web</h1>
                  <p className='my-9'>send and receive message without keeping your photos online. Use WhatsApp on up to 4 Linked devices and 1 phone at the same time.</p>
                </div>
            </div>
             :
            // currentChat whatsapp web page
            <div className='w-full h-full'>

              <div className='p-3 absolute top-0 w-full flex justify-between items-center '>
                <div className='space-x-4 flex items-center'>
                  <img 
                  className='w-10 h-10 rounded-full'
                  src={currentChat.group? currentChat.chat_image || "https://www.kindpng.com/picc/m/17-177275_unknown-infobox-image-unknown-team-hd-png-download.png"
                      : 
                      (
                       currentChat.users[0]?.id===auth.reqUser?.id ? currentChat.users[1]?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                       : currentChat.users[0]?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      ) 
                  } 
                  alt="" 
                  />
                  <p>
                    {currentChat.group ? currentChat.chat_name
                     :
                     (
                      currentChat.users[0]?.id === auth.reqUser?.id ? currentChat.users[1]?.full_name 
                      : currentChat.users[0]?.full_name
                     )
                    }
                  </p>
                </div>
                <div className='space-x-4 flex items-center'>
                  <AiOutlineSearch className='text-2xl'/>
                  <BsThreeDotsVertical className='text-xl'/>
                </div>
              </div>

              <div className='px-10 bg-[#d1d7db] mt-16 w-full h-[72vh] overflow-y-scroll scroll-hide'>
                <div className='space-y-2 flex flex-col justify-center py-6'>
                  {messages.length>0 && messages.map((item, i)=><MessageCard key={i} isReqUserMess={item.user?.id === auth.reqUser?.id} content={item.content}/>)}
                </div>
              </div>

              <div className="footer w-full bg-[#f0f2f5] absolute bottom-0 py-3 text-xl">
                <div className="flex justify-between items-center px-5 ">
                    <div className='flex items-center space-x-5'>
                      <BsEmojiSmile className='cursor-pointer'/>
                      <ImAttachment/>
                    </div>
                    <input 
                    className='p-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]'
                    type="text" 
                    value={content}
                    placeholder='type message'
                    onChange={(e)=>{
                      setContent(e.target.value);
                    }}
                    onKeyPress={(e)=>{
                      if(content && e.key==="Enter"){                
                        handleCreateMessage();                        
                      }
                    }}
                    />
                    <BsMicFill className='cursor-pointer'/>
                    
                </div>                  
              </div>

            </div>
           }
        </div>
      </div>
    </div>
  )
}

export default HomePage
