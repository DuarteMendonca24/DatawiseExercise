import React from 'react'

export default function Post({firstName,lastName,postedAt,title,text}) {
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
            <button>Delete</button>
          </div>
        </div>
    </>
  )
}
