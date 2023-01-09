import './header.css'
import WebFont from 'webfontloader';
import { useEffect } from 'react';

function Header() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Ms Madi', 'Cedarville Cursive', 'Pacifico']
      }
    });
   }, []);
  
  return (
    <div className='header'>
        <div className='headertitles'>
            <span className='headertitlesm'>My</span>
            <span className='headertitlelg'>Blog</span>
        </div>
        <img src='./pics/1.jpeg'
        alt='headerimg' className='headerimg'/>
    </div>
  )
}

export default Header