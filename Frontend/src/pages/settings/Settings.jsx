import "./settings.css";
import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { signOut, updatePassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../authcontext";
import { useNavigate} from "react-router-dom";
import { db } from "../../firebase";


export default function Settings() {
  
 /* const logout = () => signOut(auth).then(() => {
  navigate('/login') 
}).catch((error) => {
  console.log(error) 
});  */
const navigate = useNavigate();

const deleteacc = async () => {
  await deleteDoc(doc(db, "cities", "DC"));
  navigate('/register');
  alert('Account Deleted')
}

const User = useContext(AuthContext);

const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [photo, setPhoto] = useState(User.photoURL)

const updateprofile = async () => {
  const userinforef = doc(db, "users", User.uid);
  await updateDoc(userinforef, {
    email : email,
    
    username:username,
});

await updatePassword(User, password).then(() => {
  console.log('password update successful')
}).catch((e) => {
  console.log(e.message)
});
}

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <div>
            <span className="settingsTitleDelete" onClick={ () => deleteacc} >Delete Account</span>   
            <span className="settingsTitleDelete space" onClick={() => signOut(auth)}>Logout</span>   
          </div>
        </div>
        <form className="settingsForm">
          <label>Profile Picture</label>
          <div className="settingsPP">
            {/* <img
              src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            /> */}
            <img src={photo} alt='' />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange= {(e)=> setPhoto(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder="Vikram" name="username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
          <label>Email</label>
          <input type="email" placeholder="vikram@gmail.com" name="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
          <button className="settingsSubmitButton" type="submit" onChange = {updateprofile} >
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}