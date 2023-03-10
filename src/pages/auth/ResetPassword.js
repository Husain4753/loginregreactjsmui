import React ,{useState}from 'react'
import { useParams } from 'react-router-dom'
import {Alert}  from '@mui/joy'
import {Button} from '@mui/material'
import {Typography} from '@mui/joy'
import { Grid,Box, TextField } from '@mui/material'
import { useResetPasswordMutation } from '../../services.js/userAuthApi'
export default function ResetPassword() {
    const [server_msg,setServerMsg]=useState('')
    const [server_error,setServerError]=useState({})
    const [resetPassword]=useResetPasswordMutation()
    const {id,token}=useParams()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const data=new FormData(e.currentTarget)
        const actualData={
            password:data.get('password'),
            password2:data.get('password2'),
        }
        const res=await resetPassword({actualData,id,token})
        if (res.error){
            setServerError(res.error.data.errors)
            // console.log(server_error)
            setServerMsg('')
        }
        if (res.data){
            setServerError({})
            setServerMsg(res.data.msg)
        }
    }
  return (
    <>
        <Grid container justifyContent='center'>
            <Grid item sm={6} xs={12}><Box component='form'onSubmit={handleSubmit} noValidate id="password-reset-form" sx={{mt:2}}>
            <TextField margin='normal' required fullWidth id='password' name='password' label="Password" type='password'/>
            <div style={{height:30}}>{server_error.password?<Typography style={{fontSize:12,color:'red',paddingLeft:20,paddingTop:5}}>{server_error.password[0]}</Typography>:""}</div>
            <TextField required fullWidth id='password2' name='password2' label="Confirm Password" type='password'/>
            <div style={{height:30}}>{server_error.password2?<Typography style={{fontSize:12,color:'red',paddingLeft:20,paddingTop:5}}>{server_error.password2[0]}</Typography>:""}</div>
            <Box textAlign='center'>
                <Button type='submit' variant='contained' sx={{mb:2,px:5}}>Sent </Button>
            </Box>
            {server_error.non_field_errors?<Alert severity="error">{server_error.non_field_errors[0]}</Alert>:''}
            {server_msg?<Alert severity="success">{server_msg}</Alert>:''}
        </Box></Grid>
        </Grid>
    </>
  )
}
