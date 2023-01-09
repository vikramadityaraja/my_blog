import "./register.css"

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

const Register = () => {

  const Navigate = useNavigate()

  const [ State, setState] = useState({
    Username: '',
    Email: '',
    Password : ''
  })
  const onchange = (e) => {
    const value = e.target.value;
    setState({
      ...State, [e.target.name] : value
    }
  )}

  const postcall = event => {
    event.preventDefault();
    const data = {
      Username: State.Username,
      Email: State.Email,
      Password : State.Password
    }
    axios.post("http://localhost:4000/register",data,{
      headers: {
        'Content-Type': 'application/json'
      }
    }
    ).then((res) => {
      //alert('registered')
      console.log(res)
      Navigate('/login')
     }).catch((error) => console.log(error.code))
    }
    return (
        <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={postcall}>

          <label>Username</label>
          <input 
            className="registerInput" 
            type="text" 
            placeholder="Enter your username..."
            onChange={onchange}
            value = {State.Username}
            name = 'Username' />

          <label>Email</label>
          <input 
            className="registerInput" 
            type="text" 
            placeholder="Enter your email..." 
            onChange={onchange}
            value = {State.Email}
            name = 'Email'/>

          <label>Password</label>
          <input 
            className="registerInput" 
            type="password" 
            placeholder="Enter your password..."
            onChange={onchange}
            value = {State.Password}
            name = 'Password' />

          <button className="registerButton" type="submit">Register</button>
        </form>

          <button className="registerLoginButton">
              <Link className="link" to='/login'>Login</Link>
          </button>
    </div>
    )
}

export default Register