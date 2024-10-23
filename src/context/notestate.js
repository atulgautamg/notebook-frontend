import React from "react";
import { useState } from "react";
import NoteContext from "./notecontext";

const NoteState=(props)=>{
    
  const host=5000;
  const notes1=
    [
      ]
      const a={name:"hello",title:"world"};
    const [notes,setnotes]=useState(notes1);
    const addNote= async (newnote)=>{
      const title=newnote.title;
      const description=newnote.description;
      const images1=newnote.images;
      const response=await fetch(`http://localhost:5000/auth/addnotes`,
      {method:'POST',
       headers:{
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
    
       },
       body: JSON.stringify(newnote)
    })
    const json=await response.json();
          setnotes(notes.concat(json));
      }

    
  const fetchallnotes=async ()=>{
  const response=await fetch(`http://localhost:5000/auth/getnotes`,
  {method:'GET',
   headers:{
    "Content-Type": "application/json",
    "auth-token":localStorage.getItem('token')

   }
  
})

const json1= await response.json();
setnotes(json1);
  }
  {console.log('backnotes',notes)}
  const DeleteNote=async(id)=>
  {
    const response=await fetch(`http://localhost:5000/auth/deletenotes/${id}`,
    {method:'DELETE',
     headers:{
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')  
  
     },
    
  })
  
  const json2=await response.json();
  console.log(json2);
   }
    
  
  const UpdateNote=async (id,title,description,image)=>{
    const response=await fetch(`http://localhost:5000/auth/updatenotes/${id}`,
    {method:'PUT',
     headers:{
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')  
  
     },
     body: JSON.stringify({title,description,image})
    
  });
  const json=await response.json();
  console.log(json);
  console.log(id);
  let newNotes=[];
    for(let index=0;index<notes.length;index++)
    {
      const element=notes[index];
      if(element._id===id)
      {
          element.title=title;
        element.description=description;
      
        element.images=image;
         break;
      }
    }
    
  setnotes(notes);
  };
    
  {console.log(notes)}
  const updatenotes=async({name,password})=>{
    const response=await fetch('https://localhost:5000/update',{
      method:'PUT',
      headers:{
        'Content-Type':"application/json",
      },
      body:JSON.stringify({name,password})
    
    })
    const res1=response.json();
    setnotes(res1);
  }

    return (
        <NoteContext.Provider value={{a,notes,setnotes,addNote,DeleteNote,UpdateNote,fetchallnotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;