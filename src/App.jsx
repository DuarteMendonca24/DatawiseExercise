import React, { useEffect, useState } from 'react'
import './App.css'

function App () {
  const[users,setUsers] = useState ([])
  const[posts,setPosts] = useState ([])
  const[username,setUsername] = useState("")
  const[password,setPassword] = useState("")
  const[isLoggedIn,setIsLoggedIn] = useState(false)

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
  function verifyLogin(e) {
    e.preventDefault(); 
    
    const user = users.find(user => user.email === username);

    if (user) {
  
      if (user.password === password) {
        console.log('Login successful!');
        setIsLoggedIn(true)
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
      <form onSubmit={verifyLogin}>
        <div>
          <label>Email</label>
          <input type="email" value={username} onChange={e => setUsername(e.target.value)}></input>
          
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
        </div>
        <button>Login</button>
      </form>
   
    </>
  )
}

export default App
