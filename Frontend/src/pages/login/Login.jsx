import "./login.css";
import { Link, redirect as Redirect} from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Login() {

  
  const [ State, setState] = useState({
    Username: '',
    Password : ''
  })
  const onchange = (e) => {
    const value = e.target.value;
    setState({
      ...State, [e.target.name] : value
    }
  )}

  const submitlogin = () => {

    const userdata = {
      Username : State.Username,
      Password : State.Password
    }

    const headers= {
      headers : {
      'content-Type' : 'application/json'
    }}

    axios.post("http://localhost:4000/login",
        userdata,
        headers).then(res => window.localStorage.setItem("token", res.data.token),
        <Redirect to="/" />).catch(err => console.log(err))
  }


  return (
    <div className="login">
      <span className="loginTitle">
        Login</span>
      <form className="loginForm" onSubmit={submitlogin}>

        <label>Username</label>
        <input 
          className="loginInput" 
          type="text" 
          placeholder="Enter your User name..."
          onChange={onchange}
          value = {State.Username}
          name = 'Username' />

        <label>Password</label>
        <input 
          className="loginInput" 
          type="password" 
          placeholder="Enter your password..."
          onChange={onchange}
          value = {State.Password}
          name = 'Password' />

        <button className="loginButton">Login</button>
      </form>

        <button className="loginRegisterButton">
            <Link className="link" to='/register'>Register</Link> </button>
    </div>
  );
}