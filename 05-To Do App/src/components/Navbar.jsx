import React from 'react'

const Navbar = () => {
  return (
      <nav className='flex justify-between bg-slate-700 py-2'>
          <div>
            <span className='font-bold text-white text-2xl mx-9'>To Do App</span>
          </div>
          <ul className='flex justify-between gap-8 mx-9 rounded-xl py'>
              <li className='text-white cursor-pointer hover:font-bold transition-all'>Home</li>
              <li className='text-white cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
          </ul>
    </nav>
  )
}

export default Navbar