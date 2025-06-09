import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/NavBar'
import Login from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import Courses from './pages/student/Courses'
import FeatureSection from './pages/student/FeatureSection'
import ContactSection from './pages/student/ContactSection'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import Sidebar from './pages/tutor/Sidebar'
import Dashboard from './pages/tutor/Dashboard'
import CourseTable from './pages/tutor/course/CourseTable'
import AddCourse from './pages/tutor/course/AddCourse'
import EditCourse from './pages/tutor/course/EditCourse'

function App() {

  return (
    <main>
     <Navbar/>
     <Routes>
      <Route path='/' element={
        <>
        <HeroSection/>
        <FeatureSection/>
        <Courses/>
        <ContactSection/>
        </>
        }/>
      <Route path='login' element={<Login/>}/>
      <Route path='my-learning' element={<MyLearning/>}/>
      <Route path="profile" element={<Profile/>}/>


      <Route path="tutor" element={<Sidebar/>}>
      <Route path="dashboard" element={<Dashboard/>}/>
      <Route path="course" element={<CourseTable/>}/>
      <Route path="course/create" element={<AddCourse/>}/>
      <Route path="course/:courseId" element={<EditCourse />} />
      </Route>
      </Routes>
    </main>
  )
}

export default App
