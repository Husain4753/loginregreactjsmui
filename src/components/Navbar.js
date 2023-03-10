import React from 'react'
import { AppBar,Box,Toolbar,Typography,Button } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { getToken } from '../services.js/LocalStorageService'
export default function Navbar() {
  const {access_token} = getToken()
  return (
    <>
      <Box sx={{flexGrow:1}}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant='h5' component='div' sx={{flexGrow:1}}>
              Panda shop
            </Typography>
            <Button component={NavLink} to='/' sx={{color:'white',textTransform:'none'}} style={({isActive})=>{
              return {backgroundColor:isActive?'#6d1b7b':''}
            }}>Home</Button>
            <Button component={NavLink} to='/contact' sx={{color:'white',textTransform:'none'}} style={({isActive})=>{
              return {backgroundColor:isActive?'#6d1b7b':''}
            }}>Contact</Button>
            {access_token?<Button component={NavLink} to='/dashboard' sx={{color:'white',textTransform:'none'}} style={({isActive})=>{
              return {backgroundColor:isActive?'#6d1b7b':''}
            }}>Dashboard</Button>:<Button component={NavLink} to='/loginreg' sx={{color:'white',textTransform:'none'}} style={({isActive})=>{
              return {backgroundColor:isActive?'#6d1b7b':''}
            }}>Login/Registration</Button>}

          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}
