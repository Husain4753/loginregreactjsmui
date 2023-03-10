import React , {useEffect, useState}from 'react'
import { TextField,Button,Box,Alert, CircularProgress } from '@mui/material'
import { NavLink , useNavigate} from 'react-router-dom'
import { useLoginUserMutation } from '../../services.js/userAuthApi'
import {Typography} from '@mui/material'
import { getToken, storeToken } from '../../services.js/LocalStorageService'
import { useDispatch } from 'react-redux'
import { setUserToken } from '../../features/authSlice'

export default function Userlogin() {
    const navigate=useNavigate()
    const [server_error,setServerError]=useState({})
    const [loginUser,{isLoading}]=useLoginUserMutation()
    const dispatch=useDispatch()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const data=new FormData(e.currentTarget)
        const actualData={
            email:data.get('email'),
            password:data.get('password')
        }
        const res=await loginUser(actualData)
        // console.log(res)
        if(res.error){
            // console.log(server_error.non_field_errors)
            setServerError(res.error.data.errors)
        }
        if(res.data){
            storeToken(res.data.token)
            let {access_token}=getToken()
            dispatch(setUserToken({access_token:access_token}))
            navigate('/dashboard')
        }
    }
    let {access_token}=getToken()
    useEffect(()=>{
        dispatch(setUserToken({access_token:access_token}))
    },[access_token,dispatch])
  return (
    <>
        <Box component='form'onSubmit={handleSubmit} noValidate id="loginform" sx={{m:2,height:'74vh'}}>
            <TextField variant="standard" required fullWidth id='email' name='email' label="Email Address"/>
            <div style={{height:30}}>{server_error.email?<Typography style={{fontSize:12,color:'red',paddingLeft:20,paddingTop:5}}>{server_error.email[0]}</Typography>:""}</div>
            <TextField required fullWidth id='password'  variant="standard" name='password' label="Password" type='password'/>
            <div style={{height:30}}>{server_error.password?<Typography style={{fontSize:12,color:'red',paddingLeft:20,paddingTop:5}}>{server_error.password[0]}</Typography>:""}</div>
            <Box textAlign='center'>
                {isLoading?<CircularProgress/>:<Button type='submit' variant='contained' sx={{mb:2,px:5}}>Login</Button>}
            </Box>
            <NavLink to='/sendpasswordresetemail'>
                Forget Password ?
            </NavLink>
            {server_error.non_field_errors?<Alert severity='error'>{server_error.non_field_errors[0]}</Alert>:''}
        </Box>
    </>
  )
}
