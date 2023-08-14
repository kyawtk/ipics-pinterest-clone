import Navbar from './Nabar'
import Feed from './Feed'
import Search from './Search'
import PinDetail from './PinDetail'
import CreatePin from '../components/CreatePin'
import {Routes, Route} from 'react-router-dom'
import { useState } from 'react'
const Pins = ({user}) => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
   <div className="px-2 md:px-5 ">
    <div className="bg-gray-50">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user}/>
    
    </div>
    <div className="h-full">
      <Routes>
        <Route path='/' element={<Feed></Feed>}/>
        <Route path='/category/:categoryId' element={<Feed></Feed>}/>
        <Route path='/pin-details/:pinId' element={<PinDetail user={user}></PinDetail>}/>
        <Route path='/create-pin' element={<CreatePin user={user}></CreatePin>}/>
        <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Search>}/>
      </Routes>
    </div>
   </div>
  )
}

export default Pins