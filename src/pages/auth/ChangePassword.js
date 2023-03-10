import { TextField,Box,Alert, CircularProgress} from '@mui/material'
import {Button} from '@mui/material'
import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
import { useChangeUserPasswordMutation } from '../../services.js/userAuthApi'
// import { useNavigate } from 'react-router-dom'
import { getToken } from '../../services.js/LocalStorageService'
import {Typography} from '@mui/material'
export default function ChangePassword() {
    const [server_msg,setServerMsg]=useState()
    // const navigate=useNavigate()
    const [changeUserPassword,{isLoading}]=useChangeUserPasswordMutation()
    const [server_error,setServerError]=useState({})
    const {access_token}=getToken()
    const handleSubmit=async(event)=>{
        event.preventDefault();
        const data= new FormData(event.currentTarget);
        const actualData={
            password:data.get('password'),
            password2:data.get('password2')
        }
        const res=await changeUserPassword({actualData,access_token})
        if(res.error){
            // console.log(res)
            setServerError(res.error.data.errors)
            // console.log(server_error)
            setServerMsg('')
        }
        if(res.data){
            // console.log(res.data.msg)
            setServerMsg(res.data.msg)
            setServerError({})
            document.getElementById('password-change-form').reset()
        }
    }
    // const myData=useSelector(state=>state.user)
  return (
    <>
      <Box sx={{display:'flex',flexDirection:'column',flexWrap:'wrap',max_width:600,mx:4}}>
        <h1>Change Password</h1>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{mt:1}} id="password-change-form">
            <TextField required fullWidth name='password' label="New Password" type='password' id='password' autoComplete='current-password'/>
            <div style={{height:30}}>{server_error.password?<Typography style={{fontSize:12,color:'red',paddingLeft:20,paddingTop:5}}>{server_error.password[0]}</Typography>:""}</div>
            <TextField required fullWidth name='password2' label="Confirm New Password" type='password' id='password'/>
            <div style={{height:30}}>{server_error.password2?<Typography style={{fontSize:12,color:'red',paddingLeft:20,paddingTop:5}}>{server_error.password2[0]}</Typography>:""}</div>
            <Box>
                {isLoading?<CircularProgress/>:<Button type='submit' variant='contained' sx={{mt:3,mb:2,px:5}}>Update</Button>}
            </Box>
            {server_error.non_field_errors?<Alert severity='error'>{server_error.non_field_errors}</Alert>:''}
            {server_msg?<Alert>{server_msg}</Alert>:''}
        </Box>
      </Box>
    </>
  )
}
