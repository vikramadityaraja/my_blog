import "./login.css";
import { Link, useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";

export default function Login() {

  const navigate = useNavigate();
  const [ State, setState] = useState({
    Username: '',
    Password : ''
  })

  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false)  ;
  const [errcode, setErrcode] = useState(false);

  const onchange = (e) => {
    const value = e.target.value;
    setState({
      ...State, [e.target.name] : value
    }
  )}

  const submitlogin = async (e) => {
    e.preventDefault();
    const userdata = {
      Email : State.Email,
      Password : State.Password
    }

    try {

      await signInWithEmailAndPassword(auth, userdata.Email, userdata.Password)
         .then((userCredential) => {
           // Signed in 
           const user = userCredential.user;
           console.log(user);
           navigate('/')
         })
         .catch((error) => {
           const errorCode = error.code;
           const errorMessage = error.message;
           console.log(errorCode);
           console.log(errorMessage);
           error.code === "auth/user-not-found" && setErrcode(true) ;
         });
     } catch (error) {
       setErr(true);
       setLoading(false);
       const errorCode = error.code;
       const errorMessage = error.message;
       console.log(errorCode);
       console.log(errorMessage)
     }
  }


  return (
    <div className="login">
      <span className="loginTitle">
        Login</span>
      <form className="loginForm" onSubmit={submitlogin}>

        <label>Email</label>
        <input 
          id="loginInput" 
          type="text" 
          placeholder="Enter your email..."
          onChange={onchange}
          value = {State.Email}
          name = 'Email' />

        <label>Password</label>
        <input 
          id="loginInput" 
          type="password" 
          placeholder="Enter your password..."
          onChange={onchange}
          value = {State.Password}
          name = 'Password' />

        { loading && <span>Logging in..</span>}
        {err && <span style={{color:"red", marginTop:10}}>Error!</span>}
        {errcode && <span style={{color:"red", marginTop:10}}>Email already registered!</span>}
 
        <button className="loginButton">Login</button>
      </form>

        <button className="loginRegisterButton">
            <Link className="link" to='/register'>Register</Link> </button>
    </div>
  );
}