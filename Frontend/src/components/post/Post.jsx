import './post.css'
import LoremIpsum from 'react-lorem-ipsum'

function Post( {img}) {
  return (
    <div className='post'>
        <img className='postimg' 
        src={img} 
        alt=''/>
        <div className='postinfo'>
          <span className='postcat'>Music</span>
          <span className='postcat'>Life</span>
        </div>
        <span className='posttitle'>
          Lorem ipsum dolor sit almost
        </span>
        <hr/>
        <span className='postdate'>1 hour ago</span>
        <p className='postdesc'>
          <LoremIpsum p={1}/>
        </p>
    </div>
  )
  }

export default Post