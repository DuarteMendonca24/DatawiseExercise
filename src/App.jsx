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

  async function getPosts(id){
    try {
      const response = await fetch(`http://localhost:5000/posts?userId=${id}`);
      const result = await response.json();
      setPosts(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(()=>{
    localStorage.setItem("POSTS",JSON.stringify(posts))
  },[posts])
  
  console.log(posts)

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
       
        
      }
    } else {
      console.log('User not found');
      
    }

    return false
  }

 // Function to delete a post from both the state and the server
  async function deletePost(id) {
    try {
      // Send DELETE request to the JSON server
      const response = await fetch(`http://localhost:5000/posts/${id}`, {
        method: 'DELETE',
      });

      // If deletion is successful, update the local state
      if (response.ok) {
        // Remove post from state
        setPosts(posts => posts.filter(post => post.id !== id));
      } else {
        console.error('Failed to delete post from server');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

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
      // Send POST request to add the new post to the JSON server
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),  // Convert newPost object to JSON format
      });
  
      // Check if the response is successful
      if (response.ok) {
        const createdPost = await response.json();
        // Update the posts state with the new post
        setPosts((posts) => [...posts, createdPost]);
      } else {
        console.error('Failed to add post to server');
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }

  }

  async function updatePost(id, editedTitle, editedText) {
    const updatedPost = {
      title: editedTitle,
      text: editedText,
      postedAt: new Date().toISOString(), // Update the post date if needed
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
        // Update the post in state
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
        {/* Conditional rendering based on login status */}
        <Route path="/" element={<Login verifyLogin={verifyLogin} />} />
        <Route path="/profile" element={<Profile posts={posts} deletePost={deletePost} addPost={addPost} updatePost={updatePost} />} />
      </Routes>
     </Router>
    </>
  )
}

export default App
