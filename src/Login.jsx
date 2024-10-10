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
    <div className='container'>
      <form onSubmit={handleLogin}>
        <div className="login-wrapper">
        
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={username} onChange={e => setUsername(e.target.value)} />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <button className="login-button">Login</button>
          
        </div>
      </form>

    </div>
  )
}
