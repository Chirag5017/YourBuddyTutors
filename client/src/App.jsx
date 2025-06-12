import { Route, Routes } from 'react-router-dom'
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
import CreateLecture from './pages/tutor/lecture/CreateLecture'
import EditLecture from './pages/tutor/lecture/EditLecture'
import CourseDetail from './pages/student/CourseDetail'
import CourseProgress from './pages/student/CourseProgress'
import SearchPage from './pages/student/SearchPage'
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from './components/ProtectedRoutes'
import PurchaseCourseProtectedRoute from './components/PurchaseCourseProtectedRoute'
import { ThemeProvider } from './components/ThemeProvider'

function App() {

  return (
    <main>
   <ThemeProvider>
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
      <Route path="course/search" element={<SearchPage />} />

      <Route path="my-learning" element={
      <ProtectedRoute>
        <MyLearning />
      </ProtectedRoute>
    } />

    <Route path="profile" element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    } />

    {/* <Route path="course/search" element={
      <ProtectedRoute>
        <SearchPage />
      </ProtectedRoute>
    } /> */}

    <Route path="course-detail/:courseId" element={
      <ProtectedRoute>
        <CourseDetail />
      </ProtectedRoute>
    } />

    <Route path="course-progress/:courseId" element={
      <ProtectedRoute>
        <PurchaseCourseProtectedRoute>
          <CourseProgress />
        </PurchaseCourseProtectedRoute>
      </ProtectedRoute>
    } />

       <Route path="login" element={
      <AuthenticatedUser>
        <Login />
      </AuthenticatedUser>
    } />

      <Route path="tutor" element=
      {<>
      <AdminRoute>
      <Sidebar/>
      </AdminRoute>
      </>}>
      <Route path="dashboard" element={<Dashboard/>}/>
      <Route path="course" element={<CourseTable/>}/>
      <Route path="course/create" element={<AddCourse/>}/>
      <Route path="course/:courseId" element={<EditCourse />} />
      <Route path="course/:courseId/lecture" element={<CreateLecture />} />
      <Route path="course/:courseId/lecture/:lectureId" element={<EditLecture />} />
      </Route>
      </Routes>
   </ThemeProvider>
    </main>
  )
}

export default App


