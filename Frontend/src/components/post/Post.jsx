import './post.css'
import LoremIpsum from 'react-lorem-ipsum'

function Post( {img}) {

  return (
    <div className='post'>
        <img className='postimg' 
        src={img.img} 
        alt=''/>
        <div className='postinfo'>
          <span className='postcat'>Music</span>
          
        </div>
        <span className='posttitle'>
          Lorem Ipsum title
        </span>
        <hr/>
        <span className='postdate'>2 days ago</span>
        <p className='postdesc'>
          <LoremIpsum p={1} />
        </p>
    </div>
  )
  }

export default Post