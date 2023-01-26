import './TopBar.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../authcontext'


function TopBar({User}) {
  const User1 = useContext(AuthContext)
  return (
    <div className='top'>
        <div className='topleft'>
          <i className="topicon fa-brands fa-twitter"></i>
          <i className="topicon fa-brands fa-instagram"></i>
          <i className="topicon fa-brands fa-facebook"></i>
          <i className="topicon fa-brands fa-pinterest"></i>
        </div>
        
        <div className='topcenter'>
          <ul className='toplist'>
            <li className='toplistitem'> 
              <Link className='link' to='/'>HOME</Link></li>
            <li className='toplistitem about'> ABOUT</li>
            <li className='toplistitem contact'> CONTACT</li>
            <li className='toplistitem'> 
              <Link className='link' to='/write'>WRITE</Link></li>
            { User && <li className='toplistitem'> 
                <Link className='link' to='/settings'>LOGOUT</Link></li>}
          </ul>
        </div>
        <div className='topright'>
        {User?(
          <Link className='link' to='/settings'>
             <img className='profileimg' alt='profileimg' src={User1.photoURL}/>
          </Link>
        ): (
          <ul className="toplist">
            <li className="toplistitem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="toplistitem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
          <i className="searchicon fa-solid fa-magnifying-glass"></i>
        
        </div>
    </div>
  )
}

export default TopBar