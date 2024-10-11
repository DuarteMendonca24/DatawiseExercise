import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Post from './Post';

export default function Profile({posts , deletePost , addPost}) {
  const location = useLocation();
  const { firstName, lastName , userId} = location.state 
  const sortedPosts = [...posts].sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));  // Sort the posts by date
  const[title,setTitle] = useState([])
  const[description,setDescription] = useState([])

  function handleAdd(e){
    e.preventDefault()
    console.log("UserID is" + userId)
    addPost(title,description,userId)
  }

  return (
    <>
      <div className='header'>
        <h1 className='header-name'>{firstName} {lastName}'s Posts</h1>
      </div>

      <form onSubmit={handleAdd}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)}></input>
        </div>

        <div>
          <label>Description</label>
          <input type="text" value={description} onChange={e => setDescription(e.target.value)}></input>
        </div>

        <button>Add</button>
      </form>
    
      
      {sortedPosts.map((post) => {

        return(
        <Post key={post.id} {...post} firstName={firstName} lastName = {lastName} deletePost={deletePost}></Post>
        )
        
      })}
    </>
  )
}
