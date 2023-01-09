import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/home/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";


/*import { LoremIpsum } from 'react-lorem-ipsum'*/

function App() {
  const [User, setUser] = useState(true)
  return (
    <Router>
      {User ?<TopBar User = {User} setUser = {setUser} /> : ''}
      <Routes>  
        <Route path='/' exact element={<Home/>}></Route>
        <Route path='/posts'element= {<Home/>}></Route>
        <Route path='/register'element= {User ? <Home /> : <Register/>}></Route>
        <Route path='/login' element= { User ? <Home/> : <Login/>}></Route>
        <Route path="/post/:id" element ={<Single/>}></Route>
        <Route path='/write' element= { User?<Write/>:<Login/>}></Route>
        {/* <Route path='/settings'element= {<Settings setUser = {setUser}/>}></Route> */}
        <Route path='/settings'element= {User?<Settings setUser = {setUser}/>:<Login/>}></Route>
      </Routes>
    
    </Router>
  );
}

export default App;
