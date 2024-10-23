import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notecontext';
const NoteItem = (props) => {
    const context=useContext(NoteContext);
    const {DeleteNote}=context;
    const {notes1,updateNote}=props;
    const [readmore,setreadmore]=useState("");
    console.log('notes1',notes1);
    useEffect(()=>{
      if(notes1.description.length>150)
      {
        notes1.description.substring(1,30);
        setreadmore("Read more")
      }
    })
  return (
       <div className='cardtotal'>
         <div className='cardname'>
             
          <div className='cardimg'>
            <div> {notes1.images.map((data)=>(  <div> <img className='cardimg2' src={data} alt="" />  </div>
             ))}   </div>        

          </div>
              <h6 className='cardtitle1'> {notes1.title}  </h6>   
                <div className='cardesc1'>
                  <p className='carddesc'>
                  {notes1.description.substring(0,150)} <span className='readmore'>.....  </span>   </p>
                </div>       
             <div  className='cardbtn'>
             <div onClick={()=>DeleteNote(notes1._id)}>
              <button className='cardbtn1'> Delete </button>
              </div>
              <div onClick={()=>updateNote(notes1)}> 
              <button  className='cardbtn1'> <p>Update</p></button>
              </div>
             </div>
   
         </div> 


        </div>
       

  )
}

export default NoteItem
 