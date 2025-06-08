import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/NavBar'
import Login from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import Courses from './pages/student/Courses'

function App() {

  return (
    <main>
     <Navbar/>
     <Routes>
      <Route path='/' element={
        <>
        <HeroSection/>
        <Courses/>
        </>
        }/>
      <Route path='/login' element={<Login/>}/>
     </Routes>
    </main>
  )
}

export default App
