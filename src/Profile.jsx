import React from 'react'
import { useLocation } from 'react-router-dom';

export default function Profile({posts}) {
  const location = useLocation();
  const { firstName, lastName } = location.state 

  // Sort the posts by date
  const sortedPosts = [...posts].sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));

  return (
    <>
      <div className='header'>
        <h1 className='header-name'>{firstName} {lastName}'s Posts</h1>
      </div>
      
      {sortedPosts.map((post) => (
        <div key={post.id} className="posts">
          <div className="post-wrap">
            
            <div className="post-info">
              <span className="post-name">{firstName} {lastName}</span>
              <small className="post-date">{new Date(post.postedAt).toLocaleString()}</small>
            </div>

            <div className="post-title">{post.title}</div>
            <p className="post-text">{post.text}</p>

          </div>
        </div>
      ))}

      

    </>
  )
}
