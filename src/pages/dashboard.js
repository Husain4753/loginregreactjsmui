import React, { useEffect, useState } from 'react'
import {Button,CssBaseline,Grid,Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ChangePassword from './auth/ChangePassword';
import { getToken, removeToken } from '../services.js/LocalStorageService';
import { useDispatch } from 'react-redux';
import { unSetUserToken } from '../features/authSlice';
import { useGetloggedUserQuery } from '../services.js/userAuthApi';
import { setUserInfo, unSetUserInfo } from '../features/userSlice';

export default function Dashboard() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {access_token}=getToken()
    const {data,isSuccess}=useGetloggedUserQuery(access_token)
    const [userData,setUserData]=useState({
        email:"",
        name:""
    })
    // Store user data in local storage
    useEffect(()=>{
        if (data&&isSuccess){
            dispatch(setUserInfo({
                email:data.email,
                name:data.name,
            }))
        }
    },[data,isSuccess,dispatch])
    useEffect(()=>{
        if (data&&isSuccess){
            setUserData({
                email:data.email,
                name:data.name,
            })
        }
    },[data,isSuccess])
    console.log(data)
    const handleLogout=()=>{
        dispatch(unSetUserInfo({email:'',name:''}))
        dispatch(unSetUserToken({access_token:null}))
        removeToken()
        navigate('/loginreg')       
    }
  return (<>
      <CssBaseline/>
      <Grid container>
        <Grid item sm={4} sx={{p:5,backgroundColor:'#786006',color:'white'}}>
            <h2>Dashboard</h2>
            <Typography>
                Email: {userData.email}
            </Typography>
            <Typography>
                Name: {userData.name} 
            </Typography>
            <Button onClick={handleLogout} variant="contained" color='error' sx={{mt:8}}>Logout</Button>
        </Grid>
        <Grid item sm={8}>
            <ChangePassword/>
        </Grid>
      </Grid>
      </>
  )
}
