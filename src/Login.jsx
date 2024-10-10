import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login({verifyLogin}) {

  const[username,setUsername] = useState("")
  const[password,setPassword] = useState("")
  const navigate = useNavigate();

  function handleLogin(e){
    e.preventDefault()
    const user = verifyLogin(username, password);
    if (user) {
    navigate("/profile", { state: { firstName: user.firstName, lastName: user.lastName } });
    }
  }

  return (
    <>
      <form onSubmit={handleLogin}>
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
