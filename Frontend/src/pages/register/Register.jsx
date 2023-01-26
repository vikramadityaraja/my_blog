import "./register.css";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc,arrayUnion, Timestamp} from 'firebase/firestore';
import { TiTick } from 'react-icons/ti';
import { auth, storage, db } from "../../firebase";
import { v4 as uuid } from "uuid";
import Moment from 'moment';
import samplepic from '../../pic/defaultblogpic.jpg'

const Register = () => {

  const Navigate = useNavigate();

  const [errcode, setErrcode] = useState(false);
  const formatDate = Moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
  const [ State, setState] = useState({
    Username: '',
    Email: '',
    Password : ''
  })
  const [registerimage, setRegisterimage] = useState('');
  const onchange = (e) => {
    const value = e.target.value;
    setState({
      ...State, [e.target.name] : value
    }
  )}
  const postCall = async (event) => {
    event.preventDefault();
    const data = {
      Username: State.Username,
      Email: State.Email,
      Password : State.Password
    }
    try {
      //Create user
     const res = await createUserWithEmailAndPassword(auth, data.Email, data.Password)
      
      console.log(res.user);
      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${data.Username + date}`);

      await uploadBytesResumable(storageRef, registerimage).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              username:data.Username,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName:data.Username,
              email:data.Email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userPosts", res.user.uid), {
              posts: arrayUnion({
                postid: uuid(),
                desc:"This is the sample blog post!",
                userid: res.user.uid,
                title:"First sample blog",
                tag:"post",
                date: Timestamp.now(),
                formatdate: formatDate,
                img:samplepic,
                
              }),
            });
            Navigate('/login')
          
          } catch (error) {
            console.log(error);
            
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage)
          }
        });
      });
    } catch (error) {
      
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      error.code === "auth/email-already-in-use" && setErrcode(true) ;
      console.log(errorMessage)
    }
  }
    return (
        <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={postCall}>

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

          <div className="uploadimage"><label htmlFor="registerimage" style={{cursor:"pointer"}}> Upload Image</label>
          <input id="registerimage" type='file' style={{display:"none"}} onChange = {(e) => setRegisterimage(e.target.files[0])}/>
          { registerimage && <TiTick style={{marginleft:"5px"}}/>} </div>
          {errcode && <span style={{color:"red", marginTop:10}}>Email already registered!</span>}
          <button className="registerButton" type="submit" >Register</button>
        </form>

          <button className="registerLoginButton">
              <Link className="link" to='/login'>Login</Link>
          </button>
    </div>
    )
}

export default Register;