import './sidebar.css'

function Sidebar() {
  return (
    <div className='sidebar'>
        <div className='sidebaritem'>
            <span className='sidebartitle'>ABOUT ME</span>
            
            <img src='./pics/3.jpeg' alt='' className='sidebarimg'/>
            <p> Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
                amet ex esse.Sunt eu ut nostrud id quis proident.
            </p>
        </div>
        <div className='sidebaritem'>
            <span className='sidebartitle'>CATEGORIES</span>
            <ul className='sidebarlist'>
                <li className='sidebarlistitem'>Life</li>
                <li className='sidebarlistitem'>Music</li>
                <li className='sidebarlistitem'>Style</li>
                <li className='sidebarlistitem'>Sport</li>
                <li className='sidebarlistitem'>Tech</li>
                <li className='sidebarlistitem'>Cinema</li>
            </ul>
        </div>
        <div className='sidebaritem'>
            <span className='sidebartitle'>FOLLOW US</span>
            <div className='sidebarsocial'>
                <i className="sidebaricon fa-brands fa-twitter"></i>
                <i className="sidebaricon fa-brands fa-instagram"></i>
                <i className="sidebaricon fa-brands fa-facebook"></i>
                <i className="sidebaricon fa-brands fa-pinterest"></i>
            </div>
        </div>
    </div>
  )
}

export default Sidebar