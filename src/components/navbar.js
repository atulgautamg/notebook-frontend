
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate=useNavigate();
  let location = useLocation();
  React.useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  const handlelogout=()=>{
    localStorage.removeItem('token');
     navigate("/login");
  }
 const [value1,setvalue1]=useState("");
  const name1=localStorage.getItem('name');
  useEffect(()=>{
    if(value1==="logout")
    {
      handlelogout();
      setvalue1("");
    }

  },[value1])
  console.log('value1',value1);
  return (
    <div>
      <nav  className="navbar navbar-expand-lg navbar-dark bg-dark nav1">
  <div className="container-fluid nav3">
    <Link className="navbar-brand active note1" to="/">  <h2> Notebook </h2></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
 
      {!localStorage.getItem('token')? <form className="d-flex">
        
        <Link button className="btn btn-primary mx-2" type="submit" to="/login">Login</Link>
        <Link button className="btn btn-primary  mx-2" type="submit" to="/signup">Signup</Link>
      </form>: <div className='profile'> <label htmlFor="select2">{name1} </label>
      <select  name="select2" onChange={(e)=>setvalue1(e.target.value)}  id="profile1">
        <option value=""> {name1} </option>              
      
      <option value={"logout"}  > Logout </option>
        
      </select>
      
    </div>
    }   
 
    </div>
    </div>
</nav>
</div>
  )
}

export default Navbar
