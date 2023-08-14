import React from 'react'
import {RiHome2Fill } from 'react-icons/ri'
import {IoIosArrowForward } from 'react-icons/io'
import logo from '../assets/logo.png'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, NavLink } from 'react-router-dom'
const categories = [
  {name: 'Animals'},
  {name: 'Wallpapers'},
  {name: 'gaming'},
  {name: 'Coding'},
  {name: 'Animals'},
  
]
const isNotActiveStyle =  `flex items-center px-5 text-gray-500 hover:text-black transition-all duration-200 ease-in-out`
const isActiveStyle =  `flex items-center px-5 font-extrabold border-r-3 border-black   transition-all duration-300 ease-in-out`
const Sidebar = ({user, closeSidebar}) => {
  return (
  <div className="flex flex-col justify-between overflow-y-scroll min-w-210 hide-scrollbar">
    <div className="flex flex-col ">
      <Link to='/' className='flex px-5 gap-3 pt-2 w-190 items-center' onClick={()=>closeSidebar(false)}>
        <img src={logo} alt="logo" className='w-full' />
      </Link>
      <div className="flex flex-col gap-5 mt-5">
        <NavLink onClick={()=>closeSidebar(false)} to='/' className={({isActive})=> isActive? isActiveStyle : isNotActiveStyle}>
          <RiHome2Fill></RiHome2Fill>
          Home
        </NavLink>
        <h3 className='mt-3 px-4 xl:text-xl text-base'>Discover Categories</h3>
        {categories.slice(0, categories.length-1).map(category =>{
          return <NavLink onClick={()=>closeSidebar(false)} key={category.name} to={`/category/${category.name}`} className={({isActive})=> isActive? isActiveStyle : isNotActiveStyle} >{category.name}</NavLink>
        })}
      </div>
    </div>
    {user && <Link onClick={()=>closeSidebar(false)} to={`/profile/${user._id}`} className='flex  gap-3 px-5 py-2 mt-5 mb-5 items-center'>
      <img src={user.image} alt="user image" className='w-10 h-10 rounded-full' />
      <p>{user?.userName}</p>
      </Link>}
  </div>
  )
}

export default Sidebar