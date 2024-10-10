import React, { useState } from 'react'

export default function Login({verifyLogin}) {

  const[username,setUsername] = useState("")
  const[password,setPassword] = useState("")

  function handleLogin(e){
    e.preventDefault()
    verifyLogin(username,password)
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
