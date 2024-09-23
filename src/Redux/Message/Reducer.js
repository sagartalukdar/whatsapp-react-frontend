import { CREATE_MESSAGE, GET_CHAT_MESSAGES } from "./ActionType"

const initialState={
    created_message:null,
    all_chat_messages:[]
}

export const messageReducer=(state=initialState,{type,payload})=>{
  
    if(type===CREATE_MESSAGE){
        return {...state,created_message:payload};
    }
    else if(type===GET_CHAT_MESSAGES){
        return {...state,all_chat_messages:payload};
    }
    return state;
}

