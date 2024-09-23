import { Alert, Button, Snackbar } from '@mui/material';
import { green } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentUser, registerAction } from '../../Redux/Auth/Action';

const Register = () => {
  const [inputData,setInputData]=useState({full_name:"", email:"",password:""});  
  const [openSanckBar,setOpenSnackBar]=useState(false);

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {auth}=useSelector(store=>store);
  const jwt=localStorage.getItem("jwt");

  const handleNavigateLogin=()=>{
   navigate("/login");
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    setOpenSnackBar(true);
    dispatch(registerAction(inputData));
  }  
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setInputData((values)=>({...values,[name]:value}))
  }  
  const handleSnackBarClose=()=>{
    setOpenSnackBar(false);
  }

  useEffect(()=>{
    if(jwt!==null){
      dispatch(currentUser(jwt));
    }
  },[jwt])

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
            <p className='mb-2'>Full Name</p>
            <input 
            className='w-full rounded-md p-2 outline outline-green-500'
            type="text" 
            placeholder='enter your full name'
            value={inputData.full_name}
            name='full_name'
            onChange={handleChange}
            />
          </div>

          <div>
            <p className='mb-2'>Email</p>
            <input 
            className='w-full rounded-md p-2 outline outline-green-500'
            type="email" 
            placeholder='enter your email'
            value={inputData.email}
            name='email'
            onChange={handleChange}
            />
          </div>

          <div>
            <p className='mb-2'>Password</p>
            <input 
            className='w-full rounded-md p-2 outline outline-green-500 border-none'
            type="password" 
            placeholder='enter your password'
            value={inputData.password}
            name='password'
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
              Register
            </Button>
          </div>

        </form>
        <div className="flex space-x-3 items-center mt-5">
            <p className="text-green-700">Already have Account ?</p>
            <Button onClick={handleNavigateLogin} variant='outlined'>Login</Button>
        </div>
      </div>
      <Snackbar 
      open={openSanckBar}
      autoHideDuration={5000}
      onClose={handleSnackBarClose}
      color='success'
      >
        <Alert onClose={handleSnackBarClose} severity='success' sx={{width:'100%'}}>
          Account Created Successfully
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Register
