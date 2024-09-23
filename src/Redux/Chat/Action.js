import { base_url } from "../../Config/api";
import { CREATE_CHAT, CREATE_GROUP, GET_ALL_USER_CHAT } from "./ActionType";

export const createChatAction=(data)=>async(dispatcher)=>{
    try {
        const req=await fetch(`${base_url}/api/chats/single`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${data.jwt}`
            },
            body:JSON.stringify(data.data)
        })
        const res=await req.json();
        if(res){
            console.log("create chat : ",res);
            dispatcher({type:CREATE_CHAT,payload:res});
        }
    } catch (error) {
        console.log(error);
    }
}

export const createGroupAction=(data)=>async(dispatcher)=>{
    try {
        const req=await fetch(`${base_url}/api/chats/group`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${data.jwt}`
            },
            body:JSON.stringify(data.data)
        })
        const res=await req.json();
        if(res){
            console.log("create group : ",res);
            dispatcher({type:CREATE_GROUP,payload:res});
        }
    } catch (error) {
        console.log(error);
    }
}

export const getAllUserChatAction=(data)=>async(dispatcher)=>{
    try {
        const req=await fetch(`${base_url}/api/chats/user`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${data.jwt}`
            }
        })
        const res=await req.json();
        if(res){
            console.log("gell all user chats : ",res);
            dispatcher({type:GET_ALL_USER_CHAT,payload:res});
        }
    } catch (error) {
        console.log(error);
    }
}