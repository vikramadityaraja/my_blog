import "./settings.css";
import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { deleteUser, signOut, updatePassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../authcontext";
import { useNavigate} from "react-router-dom";


export default function Settings() {
  
  const User = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(User.profileURL);


const deleteacc = async() => {
  await deleteUser(User);
  alert('Account Deleted')
  navigate('/register');
}

const updateprofile = async (e) => {
  e.preventDefault();
  
  try{
  await updateProfile(User,{
    
    displayName : username,
    photoURL : photo,

});

await updatePassword(User, password).then(() => {
  console.log('password update successful')
}).catch((e) => {
  console.log(e.message)
});
}
catch(e){
  console.log(e.message)
}}
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <div className="delnsign">
            <span className="settingsTitleDelete" onClick={  deleteacc} >Delete Account</span>   
            <span className="settingsTitleDelete space" onClick={() => signOut(auth)}>Logout</span>   
          </div>
        </div>
        <form className="settingsForm">
          <label>Profile Picture</label>
          <div className="settingsPP">
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
          <input type="text" placeholder='username' name="username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
          <label>Email</label>
          <input type="email" placeholder={User.email} name="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
          <button className="settingsSubmitButton" type="submit" onChange = {updateprofile} >
            Update
          </button>
        </form>
      </div>
      <Sidebar id="sidebarsettings"/>
    </div>
  );
}