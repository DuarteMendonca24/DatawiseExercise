import React, { useState } from 'react'

export default function Post({id,firstName,lastName,postedAt,title,text, deletePost , updatePost}) {
  const[isEditing,setIsEditing] = useState(false)
  const[editedTitle,setEditedTitle] = useState(title)
  const[editedText,setEditedText] = useState(text)
  
  function toggleEdit(){
    setIsEditing(!isEditing)
  }

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
                <button onClick={()=>deletePost(id)}>Delete</button>
                <button onClick={toggleEdit}>Edit</button>

              </>

            ) : (
              <>
               <div>
              
                <input type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} />
              </div>

                <div>
            
                <input type="text" value={editedText} onChange={e => setEditedText(e.target.value)} />
              </div>

              <button onClick={toggleEdit}>Cancel</button>
              <button onClick={handleSave}>Save</button>
              
              </>
               





            )}
             
           

            
          </div>
        </div>
    </>
  )
}
