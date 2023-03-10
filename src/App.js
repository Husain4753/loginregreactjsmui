import Layout from "./pages/Layout";
import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Loginreg from "./pages/auth/Loginreg";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/dashboard";
import { useSelector } from "react-redux";

function App() {
  const {access_token}= useSelector(state=>state.auth)
  return (
    <>
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="contact" element={<Contact/>}/>
          <Route path="loginreg" element={!access_token?<Loginreg/>:<Navigate to='/dashboard'/>}/>
          <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail/>}/>
          <Route path='api/user/reset/:id/:token' element={<ResetPassword/>}/></Route>
        <Route path="/dashboard" element={access_token?<Dashboard/>:<Navigate to='/loginreg'/>}/>
        <Route path='*' element={<h1>Error 404 Page Not Found!!</h1>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
