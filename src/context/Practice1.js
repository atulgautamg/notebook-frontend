import React, { Children, createContext, useContext, useState } from 'react'
import NoteContext from './notecontext';
const Practice1 = () => {
    const [cred,setcred]=useState({name:"",password:""});
    const context1=useContext(NoteContext);
    const {addNote1}=context1;
    const onchange1=(e)=>{
    setcred({...cred,[e.target.name]:e.target.value});}
    const onsubmit=()=>{
     addNote1(cred.name,cred.password);
      
     }
     

    return (
    <div>
      <div>  
      Name:   <input name="name" value={cred.name} type="text" onChange={onchange1} />
      Password: <input name="password" value={cred.password} onChange={onchange1} ></input>
       </div>
       <div> <button onClick={onsubmit}> submit </button>  </div>

    </div>
  )
}

export default Practice1
