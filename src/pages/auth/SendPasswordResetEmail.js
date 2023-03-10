import React from 'react'
import { Grid,TextField,Button,Box,Alert,Typography, CircularProgress } from '@mui/material'
import { useState } from 'react'
import { useSendPasswordResetEmailMutation } from '../../services.js/userAuthApi'
export default function SendPasswordResetEmail() {
    const [server_msg,setServerMsg]=useState('')
    const [server_error,setServerError]=useState({})
    const [sendPasswordResetEmail,{isLoading}]=useSendPasswordResetEmailMutation()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const data=new FormData(e.currentTarget)
        const actualData={
            email:data.get('email'),
        }
        const res=await sendPasswordResetEmail(actualData)
        if (res.error){
            setServerError(res.error.data.errors)
            // console.log(server_error)
            setServerMsg('')
        }
        if (res.data){
            setServerError({})
            setServerMsg(res.data.msg)
            document.getElementById('password-reset-email-form').reset()
        }
    }
  return (
    <>
        <Grid container justifyContent='center'>
            <Grid item sm={6} xs={12}><Box component='form'onSubmit={handleSubmit} noValidate id="password-reset-email-form" sx={{mt:2}}>
            <TextField margin='normal'required fullWidth id='email' name='email' label="Email Address"/>
            <div style={{height:30}}>{server_error.email?<Typography style={{fontSize:12,color:'red',paddingLeft:20,paddingTop:5}}>{server_error.email[0]}</Typography>:""}
            </div>
            <Box textAlign='center'>
                {isLoading?<CircularProgress/>:<Button type='submit' variant='contained' sx={{mb:2,px:5}}>Sent </Button>}
            </Box>
            {server_error.non_field_errors?<Alert severity='error'>{server_error.non_field_errors[0]}</Alert>:''}
            {server_msg?<Alert severity="success">{server_msg}</Alert>:''}
        </Box></Grid>
        </Grid>
    </>
  )
}
