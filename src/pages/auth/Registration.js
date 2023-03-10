import { TextField,Button,FormControlLabel,Checkbox,Box, Typography, Alert,CircularProgress} from '@mui/material'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { storeToken } from '../../services.js/LocalStorageService'
import { useRegisterUserMutation } from '../../services.js/userAuthApi'

export default function Registration() {
    const navigate=useNavigate()
    const [server_error,setServerError]=useState({})
    const [registerUser,{isLoading}]=useRegisterUserMutation()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const data=new FormData(e.currentTarget)
        const actualData={
            name:data.get('name'),
            email:data.get('email'),
            password:data.get('password'),
            password2:data.get('password2'),
            tc:data.get('tc')
        }
        const res=await registerUser(actualData)
        if(res.error){
            setServerError(res.error.data.errors)
            // console.log(server_error)
        }
        if(res.data){
            storeToken(res.data.token)
            navigate('/dashboard')
        }
    }
  return (<>
    <Box component='form'onSubmit={handleSubmit} noValidate id="registration-form" sx={{m:2,height:'74vh'}}>
            <TextField required fullWidth name='name' label="Name" variant="standard"/>
            <div style={{height:30}}>{server_error.name?<Typography style={{fontSize:12,color:'red',paddingLeft:20,paddingTop:5}}>{server_error.name[0]}</Typography>:""}</div>
            <TextField required fullWidth name='email' label="Email Address" type='email' variant="standard"/>
            <div style={{height:30}}>{server_error.email?<Typography style={{fontSize:12,color:'red',paddingLeft:20,paddingTop:5}}>{server_error.email[0]}</Typography>:""}</div>
            <TextField required fullWidth id='password' name='password' label="Password" type='password' variant="standard"/>
            <div style={{height:30}}>{server_error.password?<Typography style={{fontSize:12,color:'red',paddingLeft:20,paddingTop:5}}>{server_error.password[0]}</Typography>:""}</div>
            <TextField required fullWidth id='password2' name='password2' label="Confirm Password" type='password' variant="standard"/>
            <div style={{height:30}}>{server_error.password2?<Typography style={{fontSize:12,color:'red',paddingLeft:20,paddingTop:5}}>{server_error.password2[0]}</Typography>:""}</div>
            <FormControlLabel control={<Checkbox value={true} color='primary' name='tc' id='tc'/>} label="I agree to terms and condition."/>
            {server_error.tc?<span style={{fontSize:12,color:'red'}}>{server_error.tc[0]}</span>:""}
            <Box textAlign='center'>    
                {isLoading?<CircularProgress/>:<Button type='submit' variant='contained' sx={{mb:2,px:5}}>Join</Button>}
            </Box>
            {server_error.non_field_errors?<Alert severity='error'>{server_error.non_field_errors[0]}</Alert>:''}
        </Box>
    </>
  )
}
