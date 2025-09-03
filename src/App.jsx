import { useState } from 'react'
import reactLogo from './assets/react.svg'
import NavBar from './components/NavBar'
import List from './components/List'
import Footer from './components/footer'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <NavBar></NavBar>
     <List></List>
     <Footer></Footer>
   
     
    </>
  )
}

export default App
