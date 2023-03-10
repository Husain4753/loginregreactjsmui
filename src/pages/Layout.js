import { CssBaseline } from '@mui/material';
import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from "../components/Navbar" ;
export default function Layout() {
  return (
    <>
    <CssBaseline/>
        <Navbar/>
        <Outlet/>
    </>
  )
}
