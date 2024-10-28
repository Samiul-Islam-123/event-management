import React from 'react'

const Nav = () => {
  return (
    <nav className=' w-full h-[10vh] flex justify-between items-center md:px-12 px-8 fixed top-0 left-0'>
        <div className=' logo'>wwwwwwwww</div>
        
        <ul className=' flex gap-10 '>
            <li>Home</li>
            <li>Events</li>
            <li>Contact</li>
        </ul>

        <div className=' profile h-10 w-10 rounded-full bg-black/40'></div>
    </nav>
  )
}

export default Nav