import React from 'react'
import { useLocation } from 'react-router-dom';

export default function Profile({posts}) {
  const location = useLocation();
  const { firstName, lastName } = location.state 
  return (
    <>
      <h1>{firstName} {lastName}'s Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
            <small>Posted  on {new Date(post.postedAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>

    </>
  )
}
