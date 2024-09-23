import { base_url } from "../../Config/api"
import { CURRENT_USER, LOGIN, LOGOUT, REGISTER, SEARCH_USER, UPDATE_USER } from "./ActionType";

export const registerAction=(data)=>async(dispatcher)=>{
    try {
        const req=await fetch(`${base_url}/auth/signup`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data)
        })   
        const res=await req.json();
        if(res.jwt){
            console.log("register user : ",res);
            localStorage.setItem("jwt",res.jwt);
            dispatcher({type:REGISTER,payload:res});
        }
    } catch (error) {
        console.log(error);
    }
}


export const loginAction=(data)=>async(dispatcher)=>{
    try {
        const req=await fetch(`${base_url}/auth/signin`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const res=await req.json();
        console.log("Login : ",res);
        if(res.jwt){
            localStorage.setItem("jwt",res.jwt);
        }
        dispatcher({type:LOGIN,payload:res});
    } catch (error) {
        console.log(error);
    }
}

export const logOutAction=()=>async(dispatcher)=>{
    localStorage.removeItem("jwt");
    dispatcher({type:CURRENT_USER,payload:null})
}

export const currentUser=(jwt)=>async(dispatcher)=>{
    try {
        const req=await fetch(`${base_url}/api/users/profile`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${jwt}`
            }           
        })
        const res=await req.json();
        console.log("current user : ",res);
        dispatcher({type:CURRENT_USER,payload:res});
    } catch (error) {
        console.log(error);
    }
}

export const searchUser=(data)=>async(dispatcher)=>{
    try {
        const req=await fetch(`${base_url}/api/users/search?name=${data.query}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${data.jwt}`
            }           
        })
        const res=await req.json();
        console.log("search users : ",res);
        dispatcher({type:SEARCH_USER,payload:res});
    } catch (error) {
        console.log(error);
    }
}

export const updateUser=(data)=>async(dispatcher)=>{
    try {
        const req=await fetch(`${base_url}/api/users/update`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${data.jwt}`
            },
            body:JSON.stringify(data.data)        
        })
        const res=await req.json();
        console.log("update users : ",res);
        dispatcher({type:UPDATE_USER,payload:res});
    } catch (error) {
        console.log(error);
    }
}
