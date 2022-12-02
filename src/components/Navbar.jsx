import React from 'react'
import '../styles/Navbar.scss'

function Navbar() {
    return (
        <div className='Nav-main-cont'>

            <div className='Nav-main'>
                <div className='Nav-left'>Test</div>
                <div className='Nav-right'>
                    <div id='track'>Track Order</div>
                    <img className="nav-icon" src='/icon/search.png' />
                    <img className="nav-icon" src='/icon/user.png' />
                    <img className="nav-icon" src='/icon/shopping.png' />
                </div>

            </div>
            {/* <div>
                Timeline
            </div> */}
        </div>
    )
}

export default Navbar