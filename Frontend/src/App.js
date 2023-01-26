import { BrowserRouter as Router, Routes, Route,  Navigate } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from './authcontext';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/home/single/Single";
import Write from "./pages/write/Write";
import TopBar from "./components/topbar/TopBar";

/*import { LoremIpsum } from 'react-lorem-ipsum'*/

function App() {
  const User = useContext(AuthContext);
  
  console.log("current user:" + User?.uid)

  const ProtectedRoute = ({children}) => {
    if (!User) {
      return <Navigate to='/login' />
    }
    return children
  }
  return (
    <Router>
      {User ?<TopBar User = {User} /> : ''}
       <Routes>  
        <Route path='/' exact element={ <ProtectedRoute><Home/></ProtectedRoute>}></Route>
        <Route path='/posts'element= {<Home/>}></Route>
        <Route path='/register'element= {User ? <Home /> : <Register/>}></Route>
        <Route path='/login' element= { User ? <Home/> : <Login/>}></Route>
        <Route path="/post/:id" element ={<Single/>}></Route>
        <Route path='/write' element= { User?<Write/>:<Login/>}></Route>
        <Route path='/settings'element= {User?<Settings/>:<Login/>}></Route>
      </Routes> 
    
    </Router> 
  );
}

export default App;
