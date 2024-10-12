import React, { useState } from 'react'

export default function Post({id,firstName,lastName,postedAt,title,text, deletePost , updatePost}) {
  const[isEditing,setIsEditing] = useState(false)
  const[editedTitle,setEditedTitle] = useState(title)
  const[editedText,setEditedText] = useState(text)
  
  //Funtion that allows to enter and exit exit mode
  function toggleEdit(){
    setIsEditing(!isEditing)
  }

  //Funtion to handle saving the edit information
  function handleSave(){
    updatePost(id,editedTitle,editedText)
    setIsEditing(false)
  }

  return (
    <>
      <div className="posts">
          <div className="post-wrap">
            
            <div className="post-info">
              <span className="post-name">{firstName} {lastName}</span>
              <small className="post-date">{new Date(postedAt).toLocaleString()}</small>
            </div>

            {!isEditing ? (

              <>
                <div className="post-title">{title}</div>
                <p className="post-text">{text}</p>
                
                <div className='post-buttons'>
                  <button onClick={toggleEdit}>Edit</button>
                  <button onClick={()=>deletePost(id)}>Delete</button>
                </div>
             
              </>

            ) : (
              <>
                <div > 
                  <input className='post-title' type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} />
                </div>

                <div >
                  <input className='post-text' type="text" value={editedText} onChange={e => setEditedText(e.target.value)} />
                </div>

                <div className="post-buttons">
                  <button onClick={handleSave}>Save</button>
                  <button onClick={toggleEdit}>Cancel</button>
                </div>
          
              </>
               
            )}

          </div>
        </div>
    </>
  )
}
