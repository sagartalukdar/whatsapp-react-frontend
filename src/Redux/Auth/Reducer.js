import { CURRENT_USER, LOGIN, REGISTER, SEARCH_USER, UPDATE_USER } from "./ActionType"

const initialState={
  signUp:null,
  signIn:null,
  reqUser:null,
  searchUsers:[],
  editUser:null,
}

export const authReducer=(state=initialState,{type,payload})=>{
    if(type===REGISTER){
       return {...state,signUp:payload};
    }
    else if(type===LOGIN){
        return {...state,signIn:payload};
    }
    else if(type===CURRENT_USER){
        return {...state,reqUser:payload};
    }
    else if(type===UPDATE_USER){
        return {...state,editUser:payload};
    }
    else if(type===SEARCH_USER){
        return {...state,searchUsers:payload};
    }
    else{
        return state;
    }
}