import './posts.css'
import Post from '../post/Post'
import mapper from '../../mapper'

function Posts() {
const Mappers = mapper.map((pic, index) => <Post key = {index} img = {pic.img}/>)
  return (
    <div className='posts'>
      {Mappers}
    </div>
  )
}

export default Posts