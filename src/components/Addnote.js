import React, { useState } from 'react'
import NoteContext from '../context/notecontext';
import { useContext } from 'react';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from 'axios';
import NoteItem from './noteitem';
const Addnote = (props) => {
    
    const context=useContext(NoteContext);
    const {addNote}=context;
    const [imagestr,setimagestr]=useState([]);
    const [newnote,setnewnote]=useState({});
    const [file,setfile]=useState('');
    const [notes,setnotes]=useState({title:"",description:""});
   const addnote1=(e)=>{
   e.preventDefault();
addNote(newnote);
setnotes({title:"",description:""});
props.showalert("Note added successfully","success");
   }
   const onchange=(e)=>{
    setnotes({...notes,[e.target.name]:e.target.value});
           
      }    
      //console.log(notes.image1);
const onsend=async(e)=>{
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
    const newnote={...notes, images:list}
    setnewnote(newnote);
 } catch (error) {
        console.log(error);
 }

}
console.log('newnote',newnote);
    
return (
    <div>
          <div className='container'>
    <h2>Add a note</h2>
    <div className='notecontainer'>
    <form>
  <div className="mb-3 ">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text"   className="form-control" id="title" name="title" value={notes.title} onChange={onchange} minLength={5} required aria-describedby="title"/>

  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Enter content</label>
    <textarea type="text"   className="form-control" name="description"  onChange={onchange} minLength={5} value={notes.description} required id="description"/>
  </div>
  <div>
  <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setfile(e.target.files)}
                  style={{ display: "none" }}
                />
                <img className='img2'
              src={
                file
                  ? URL.createObjectURL(file[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />

  </div>
  <div>  <button className='imgbtn' onClick={onsend}>  Add image </button> </div>
  <div>
  <button type="submit" disabled={notes.title.length<5 || notes.description.length<5} onClick={addnote1} className="btnadd">Add Note</button>
  
</div>
</form>
</div>
<h2>Your Notes</h2>
        
    </div>
    </div>
  )
}

export default Addnote
