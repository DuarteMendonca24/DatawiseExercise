import React, { useEffect, useState } from 'react'
import './style.css'
import Login from './Login'
import Profile from './Profile';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App () {
  const[users,setUsers] = useState ([])
  const[posts,setPosts] = useState (()=>{
    const localValue = localStorage.getItem("POSTS")
    if(localValue === null) return []
    return JSON.parse(localValue)
  })

  //function to get the users from json database
  async function getUsers(){
    try {
      const response = await fetch("http://localhost:5000/users");
      const result = await response.json();
      setUsers(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
  }

  useEffect(() =>{
    getUsers()
  },[])

  //function to get posts based on the user id
  async function getPosts(id){
    try {
      const response = await fetch(`http://localhost:5000/posts?userId=${id}`);
      const result = await response.json();
      setPosts(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  //hook to save the user posts in local storage,allowing page refresh
  useEffect(()=>{
    localStorage.setItem("POSTS",JSON.stringify(posts))
  },[posts])
  

  // Function to handle login verification
  function verifyLogin(username , password) {
    
    const user = users.find(user => user.email === username);

    if (user) {
  
      if (user.password === password) {
        console.log('Login successful!');
        getPosts(user.id)
   
        return { firstName: user.firstName, lastName: user.lastName , userId: user.id };
      
      } else {
        console.log('Incorrect password');
        alert('Incorrect password');
      }
    } else {
      console.log('User not found');
      alert('User not found');
    }

    return false
  }

  // Function to delete a post from both the state and the server
  async function deletePost(id) {
    try {
      const response = await fetch(`http://localhost:5000/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts => posts.filter(post => post.id !== id));
      } else {
        console.error('Failed to delete post from server');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  //Function to add a post to the state and the server
  async function addPost(title,description,userId){
    console.log(userId)
    const newPost = {
      "userId": userId,
      "postedAt": new Date().toISOString(),
      "title": title,
      "text": description,
      "id": crypto.randomUUID()
    };
    
    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
  
      if (response.ok) {
        const createdPost = await response.json();
        setPosts((posts) => [...posts, createdPost]);
      } else {
        console.error('Failed to add post to server');
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }

  }

  //Function to update post based on the edit information
  async function updatePost(id, editedTitle, editedText) {
    const updatedPost = {
      title: editedTitle,
      text: editedText,
    };
  
    try {
      const response = await fetch(`http://localhost:5000/posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });
  
      if (response.ok) {
        const updatedPostFromServer = await response.json();
        setPosts((posts) =>
          posts.map((post) => (post.id === id ? updatedPostFromServer : post))
        );
      } else {
        console.error('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  }
  
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Login verifyLogin={verifyLogin} />} />
        <Route path="/profile" element={<Profile posts={posts} deletePost={deletePost} addPost={addPost} updatePost={updatePost} />} />
      </Routes>
     </Router>
    </>
  )
}

export default App
