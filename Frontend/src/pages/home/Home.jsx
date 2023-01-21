import './home.css'
import Header from '../../components/header/Header'
import Posts1 from '../../components/posts/Posts1'
import Sidebar from '../../components/sidebar/Sidebar'


function Home() {
  return (
    <>
      
      <Header/>
      <div className='home'>
          <Posts1/>
          <Sidebar/>
      </div>
    </>
  )
}

export default Home