import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../authcontext";



export default function Settings() {
  
 /* const logout = () => signOut(auth).then(() => {
  navigate('/login') 
}).catch((error) => {
  console.log(error) 
});  */

const User = useContext(AuthContext);
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <div>
            <span className="settingsTitleDelete">Delete Account</span>   
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
            <img src={User.photoURL} alt='' />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder="Vikram" name="name" />
          <label>Email</label>
          <input type="email" placeholder="vikram@gmail.com" name="email" />
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}