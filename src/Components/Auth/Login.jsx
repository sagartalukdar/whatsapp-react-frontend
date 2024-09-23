import { Alert, Button, Snackbar } from '@mui/material';
import { green } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentUser, loginAction } from '../../Redux/Auth/Action';

const Login = () => {
  const [inputData,setInputData]=useState({email:"",password:""});  
  const [openSanckBar,setOpenSnackBar]=useState(false);

  const jwt=localStorage.getItem("jwt");
  const dispatch=useDispatch();
  const {auth}=useSelector(selector=>selector);
  const navigate=useNavigate();

  const handleNavigateRegister=()=>{
   navigate("/register");
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(loginAction(inputData));
  }  
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setInputData((values=>({...values,[name]:value})));
  }  
  const handleSnackBarClose=()=>{
    setOpenSnackBar(false);
  }

  useEffect(()=>{
   if(jwt){
    dispatch(currentUser(jwt));
   }
  },[jwt])

  useEffect(()=>{
    if(auth.signIn?.jwt){
      setOpenSnackBar(true);
    }
  },[auth.signIn])

  useEffect(()=>{
    if(auth.reqUser){
      navigate("/");
    }
  },[auth.reqUser])

  return (
    <div className='flex justify-center items-center h-screen w-screen bg-slate-200'>
      <div className="w-[30%] p-10 shadow-md bg-white">
        <form 
        className='space-y-5'
        onSubmit={handleSubmit} 

        >
          <div>
            <p className='mb-2'>Email</p>
            <input 
            className='w-full rounded-md p-2 outline outline-green-500'
            type="text" 
            placeholder='enter your email'
            name='email'
            value={inputData.email}
            onChange={handleChange}
            />
          </div>

          <div>
            <p className='mb-2'>Password</p>
            <input 
            className='w-full rounded-md p-2 outline outline-green-500 border-none'
            type="text" 
            placeholder='enter your password'
            name='password'
            value={inputData.password}
            onChange={handleChange}
            />
          </div>

          <div>
            <Button 
            className='w-full' 
            type='submit'
            sx={{bgcolor:green[500]}} 
            variant='contained' 
            color='success'
            >
              Login
            </Button>
          </div>

        </form>
        <div className="flex space-x-3 items-center mt-5">
            <p className="text-green-700">Create New Account</p>
            <Button onClick={handleNavigateRegister} variant='outlined'>Register</Button>
        </div>
      </div>
      <Snackbar 
      open={openSanckBar}
      autoHideDuration={5000}
      onClose={handleSnackBarClose}
      color='success'
      >
        <Alert onClose={handleSnackBarClose} severity='success' sx={{width:'100%'}}>
          Login Successfull
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Login
