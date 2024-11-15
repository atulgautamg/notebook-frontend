

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
const Login = (props) => {
    const [cred,setcred]=useState({email:"",password:""});
    
     let navigate=useNavigate();
    const handleclick=async (e)=>{
e.preventDefault();
const response=await fetch(`https://notebook-backend-2.onrender.com/auth/login`,
  {method:'POST',
   headers:{
    "Content-Type": "application/json",


   },
   body: JSON.stringify({password:cred.password, email:cred.email})
  
    });
   const json=await response.json();
   console.log(json);
   if(json.success)
   { 
    localStorage.setItem('token',json.token);
    localStorage.setItem('user',json.user._id);
    localStorage.setItem('name',json.user.name);
    props.showalert("login successfully","success");
    
    navigate("/");
       
   }
   else {
    props.showalert("invalid credentails","danger");
   }
}

const onChange=(e)=>{
    setcred({...cred,[e.target.name]:e.target.value});
   }    
  return (
    <div className='loginform' >
    <div className='container login1'>
        <form className='loginform2' onSubmit={handleclick}>
  <div className="mb-3 email1">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email"  name="email"  value={cred.email} className="form-control" id="email1" onChange={onChange} aria-describedby="email"/>
  </div>
  <div className="mb-3 password1">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password"  name="password" value={cred.password} className="form-control" id="password1" onChange={onChange}/>
  </div>
  <button type="submit"  className="btn btn-primary submit1">Submit</button>
</form>
    </div>
    </div>
  )
}

export default Login
