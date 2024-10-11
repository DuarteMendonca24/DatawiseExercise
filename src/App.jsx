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
        return { firstName: user.firstName, lastName: user.lastName };
      
      } else {
        console.log('Incorrect password');
       
        
      }
    } else {
      console.log('User not found');
      
    }

    return false
  }


  return (
    <>
      
      <Router>
      <Routes>
        {/* Conditional rendering based on login status */}
        <Route path="/" element={<Login verifyLogin={verifyLogin} />} />
        <Route path="/profile" element={<Profile posts={posts} />} />
      </Routes>
     </Router>
    </>
  )
}

export default App
