import React from 'react'
import NoteContext from '../context/notecontext';
import { useContext } from 'react';
import NoteItem from './noteitem';
import Addnote from './Addnote';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import {useNavigate } from 'react-router-dom';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from 'axios';
const Notes = (props) => {
    const context=useContext(NoteContext);
    const {notes,fetchallnotes,UpdateNote}=context;
    let navigate=useNavigate();
     useEffect(()=>{
      if(localStorage.getItem('token'))
      {
        fetchallnotes();
        
      }
      else  {
        navigate('/login');
      }
       
     })
    const ref = useRef('');
    
    const [note,setnote]=useState({eid:"",etitle:"",edescription:"",eimage:[]});
    
    
    const updateNote=(currentnotes)=>{
      ref.current.click();
      console.log('noteid2',currentnotes._id);
      setnote({eid:currentnotes._id,etitle:currentnotes.title,edescription:currentnotes.description,eimage:currentnotes.images});
}
  console.log('fetchnotes',notes);
    const addnote1=(e)=>{
      ref.current.click();
     UpdateNote(note.eid,note.etitle,note.edescription,note.eimage);
      console.log('noteid',note.eid);
      console.log('noteimage',note.eimage);  
    e.preventDefault();

   }
   
    const addimage=async(e)=>{
      e.preventDefault();
     try {
      
        const list=await Promise.all(Object.values(file).map(async file1=>{
        const data=new FormData();
        data.append("file",file1);
        data.append("upload_preset","rvfevrlh");
        const uploadimage= await axios.post("https://api.cloudinary.com/v1_1/dmph3xbq9/image/upload",data);
        
           const {url}=uploadimage.data;
             return url;
        }))
        const newnote={...note, eimage:list}
        setnote(newnote);
       
     } catch (error) {
            console.log(error);
     }
    
    } 
    console.log("newnoteimage",note.eimage);
  
   console.log('finanote',note);
   console.log('noteid1',note.eid)
   const [file,setfile]=useState('');
   const [flag,setflag]=useState(0);
   const onchange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value});
   }  
   console.log('note',note)  
   const {showalert}=props;
  return (
    <div>
    <Addnote showalert={showalert} ></Addnote>
    
<Modal
        backdrop="static"
        
      ></Modal>   
      <button ref={ref} type="button" className="btn btn-info btn-lg d-none" data-bs-toggle="modal"  data-bs-target="#myModal"></button>

<div id="myModal" className="modal fade" role="dialog">
  <div className="modal-dialog">

    
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">Edit Note</h4>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="etitle" className="form-label">Title</label>
    <input type="text"  className="form-control" id="etitle" name="etitle" onChange={onchange}minLength={5} required value={note.etitle}  aria-describedby="etitle"/>

  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">Enter content</label>
    <textarea type="text" className="form-control edesc" name="edescription"  minLength={5} required value={note.edescription} onChange={onchange} id="edescription"/>  
  </div>
  <div>
    
   {flag===0? <div> Images: {note.eimage.map((data)=>( <div> <img className='img2' src={data} alt="" /></div>))}
   <div> <button className='addimg2' onClick={()=>setflag(1)}>  Change Image </button> </div>
   </div>:
   <div>
   <label htmlFor="file1">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file1"
                  multiple
                  onChange={(e) => setfile(e.target.files)}
                  style={{ display: "none" }}
                />
                <img className='img2'
              src={
                file
                  ? URL.createObjectURL(file[0])
                  : note.eimage[0]
              }
              alt=""
            />
            <button className='addimg1' onClick={addimage}> Add Image  </button>
   </div>}
    
    
  </div>
  
  <button type="submit" disabled={note.etitle.length<5 || note.edescription.length<5}  onClick={addnote1} className="btn btn-primary">Add</button>
</form>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-bs-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
       <div className="row my-3 container1">
       {(notes.length===0 && 'No notes are here')}
      {notes.map((note)=>{
      return <NoteItem key={note._id} notes1={note} updateNote={updateNote}/>
   })}   
    
    </div>
    </div>
  )
}

export default Notes
