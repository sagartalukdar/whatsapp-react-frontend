import React from 'react'

const MessageCard = ({isReqUserMess,content}) => {
  return (
    <div className={`p-2 rounded-md max-w-[50%] ${isReqUserMess?"self-end bg-[#d9fdd3]":"self-start bg-white"}`}>
      <p>{content}</p>
    </div>
  )
}

export default MessageCard
