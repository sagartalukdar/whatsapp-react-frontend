import { CREATE_CHAT, CREATE_GROUP, GET_ALL_USER_CHAT } from "./ActionType"

const initialState={
  created_chat:null,
  created_group:null,
  user_all_chats:[]
}

export const chatReducer=(state=initialState,{type,payload})=>{
   if(type===CREATE_CHAT){
    return {...state,created_chat:payload};
   }
   else if(type===GET_ALL_USER_CHAT){
    return {...state,user_all_chats:payload};
   }
   else if(type===CREATE_GROUP){
    return {...state,created_group:payload};
   }
   else return state ;
}