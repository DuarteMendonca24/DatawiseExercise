import React, { useEffect, useState } from 'react'
import './App.css'
import Login from './Login'

function App () {
  const[users,setUsers] = useState ([])
  const[posts,setPosts] = useState ([])

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
  
  console.log(posts)

  // Function to handle login verification
  function verifyLogin(username , password) {
    
    const user = users.find(user => user.email === username);

    if (user) {
  
      if (user.password === password) {
        console.log('Login successful!');
        getPosts(user.id)
      
      } else {
        console.log('Incorrect password');
        
      }
    } else {
      console.log('User not found');
    }
  }


  return (
    <>
      <Login verifyLogin={verifyLogin}></Login>
    </>
  )
}

export default App
