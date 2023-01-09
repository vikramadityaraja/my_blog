import './TopBar.css'
import { Link } from 'react-router-dom'

function TopBar({User, setUser}) {
  
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
            <li className='toplistitem'> ABOUT</li>
            <li className='toplistitem'> CONTACT</li>
            {/* {!User &&<li className='toplistitem'> 
               <Link className='link' to='/register'>REGISTER</Link></li>} */}
            { User && <li className='toplistitem'> LOGOUT</li>}
          </ul>
        </div>
        <div className='topright'>
        {User?(
          <Link className='link' to='/settings'>
             <img className='profileimg' alt='profileimg' src='https://image.freepik.com/free-vector/man-profile-cartoon_18591-58482.jpg'/>
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