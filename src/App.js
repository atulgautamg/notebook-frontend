import './App.css';
import React from "react";
import Navbar from './components/navbar';
import Home from './components/home';
import About from './components/about';
import Notestate from './context/notestate';
import Alert from './components/alert';
import Signup from './components/signup';
import Login from './components/login';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Practice1 from './context/Practice1';

function App() {
  const [alert,setalert]=useState(null);
  const showalert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setalert(null);
    }, 2000);
  }

  return (
    <>  
    <Notestate>     
        
       <Router>
       
        
        <Navbar/>
        <Alert alert={alert}></Alert>
        <Routes>
          <Route path="/"  key={'/'} element={<Home showalert={showalert} ></Home> }></Route>
          <Route path="/home" key={"/home"} element={<Home ></Home> }></Route>
          <Route path="/about" key={"about"} element={<About ></About> }></Route>          
          <Route path="/login"  key={"/login"}  element={<Login showalert={showalert} ></Login> }></Route>          
          <Route path="/signup"  key={"/signup"} element={<Signup showalert={showalert}></Signup> }></Route>  
          <Route path='/prac' element={<Practice1/>}></Route>      
          <Route path='/note2' element={<Notestate/>}></Route>      
          
          </Routes>     
     </Router>
     </Notestate>
    </>
  );
}

export default App;
