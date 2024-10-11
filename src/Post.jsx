import React from 'react'

export default function Post({id,firstName,lastName,postedAt,title,text, deletePost}) {
  return (
    <>
      <div className="posts">
          <div className="post-wrap">
            
            <div className="post-info">
              <span className="post-name">{firstName} {lastName}</span>
              <small className="post-date">{new Date(postedAt).toLocaleString()}</small>
            </div>

            <div className="post-title">{title}</div>
            <p className="post-text">{text}</p>
            <button onClick={()=>deletePost(id)}>Delete</button>
          </div>
        </div>
    </>
  )
}
