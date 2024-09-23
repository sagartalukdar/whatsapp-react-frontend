import { base_url } from "../../Config/api";
import { CREATE_MESSAGE, GET_CHAT_MESSAGES } from "./ActionType";


export const createNewMessage=(data)=>async(dispatcher)=>{
   try {
      const req=await fetch(`${base_url}/api/messages/create`,{
         method:"POST",
         headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${data.jwt}`
         },
         body:JSON.stringify(data.data)
      })
      const res=await req.json();
      if(res){
         console.log("message created ",res);
         dispatcher({type:CREATE_MESSAGE,payload:res});
      }
   } catch (error) {
      console.log(error);
   }
}

export const getAllChatMessagesAction=(data)=>async(dispatcher)=>{
   try {
     const req=await fetch(`${base_url}/api/messages/chat/${data.chatId}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${data.jwt}`
        }
     })
     const res=await req.json();
     if(res){
        console.log(" chat's all messages : ",res);
        dispatcher({type:GET_CHAT_MESSAGES,payload:res});
     }
   } catch (error) {
     console.log(error);
   }
}
