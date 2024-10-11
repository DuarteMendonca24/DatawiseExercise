import React from 'react'
import { useLocation } from 'react-router-dom';
import Post from './Post';

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
      
      {sortedPosts.map((post) => {
        
        return(
        <Post key={post.id} {...post} firstName={firstName} lastName = {lastName}></Post>
        )
        
      })}
    </>
  )
}
